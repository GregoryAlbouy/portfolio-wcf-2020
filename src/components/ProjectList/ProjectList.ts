import HTML_STR from './ProjectList.c.html'
import CSS_STR from './ProjectList.c.scss'
import EBuilder from 'ebuilder-js'
import Check from '../../shared/Check'
import { Component, ShadowComponent } from '../../../core'
import { ProjectCard } from '../components'
import { app } from '../../'
import { pause } from '../../shared/utils'


@Component({
    tagname: 'project-list',
    template: { html: HTML_STR, css: CSS_STR }
})
export default class ProjectList extends ShadowComponent
{
    static loadedData = []

    props: ComponentProps = {
        projects: [],
        currentDisplay: []
    }

    async connectedCallback() {
        // window.addEventListener('projectDataLoad', this.handleDataLoad.bind(this))
        // if (ProjectList.loadedData.length)
        //     window.dispatchEvent(new CustomEvent('projectDataLoad', { detail: ProjectList.loadedData }))
        const projectData = await app.projectData
        // try {
            this.handleDataLoad({ detail: projectData })
        // } catch {
        //     await pause(50)
        //     this.connectedCallback()
        //     console.log('iteration')
        // }
    }

    handleDataLoad(event: any): void {
        const data = event.detail.filter((project: any) => !project.isDisabled)
        const tagList = data.reduce((acc: any, curr: any) => [...acc, ...curr.tags], data[0].tags)
        const tagSet: Set<string> = new Set(tagList)

        ProjectList.loadedData = data

        this.setProps({
            projects: data,
            currentDisplay: data
        }, false)

        this.appendProjectCards()
        this.appendTagFilters(tagSet)
    }

    handleFilter = (filters: Set<string>) => {
        const filtered = !filters.size
            ? this.props.projects
            : this.props.projects.filter((project: any) => {
                return [...filters].reduce((acc: any, curr: any) => {
                    return acc && project.tags.includes(curr)
                }, true)
            })

        if (Check.areEqualArrays(this.props.currentDisplay, filtered)) return

        this.setProps({
            currentDisplay: filtered
        }, false)

        this.applyFilters()
    }

    applyFilters() {
        const items = [...this.$list.childNodes]
            .filter((node: Node) => node instanceof HTMLLIElement)
            .reverse()
            .map((item: HTMLLIElement, i: number) => EBuilder(item)
                .setStyle({ transition: `opacity 400ms ${50 * i}ms` })
                .setStyle({ opacity: 0 })
            )

        const duration = 50 * items.length

        setTimeout(() => {
            while (this.$list.firstElementChild) this.$list.removeChild(this.$list.firstElementChild)
            this.appendProjectCards()
        }, duration)
    }

    appendProjectCards() {
        const createProjectCard = (project: any, i: number) => EBuilder('li')
            .set({
                children: new ProjectCard(project),
                style: {
                    opacity: 0,
                    transition: `opacity 400ms ${50 * i}ms`
                }
            })
            .setStyle({ 'opacity@timeout:0': 1 })

        const display = !!this.props.currentDisplay.length
            ? this.props.currentDisplay.map(createProjectCard)
            : this.$empty.content.cloneNode(true)

        EBuilder(this.$list).setChildren(display)

        if (this.select('.clear-button')) {
            (this.select('.clear-button') as HTMLButtonElement).onclick = this.$filterBox.clear
        }
    }

    appendTagFilters(tagSet: Set<string>) {
        this.$filterBox.setFilters(tagSet, this.handleFilter)
    }
}