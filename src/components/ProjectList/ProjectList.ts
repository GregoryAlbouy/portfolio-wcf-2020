import HTML_STR from './ProjectList.c.html'
import CSS_STR from './ProjectList.c.scss'
import {
    Component,
    LightComponent,
    ShadowComponent,
    ProjectCard
} from '../components'
import EBuilder from 'ebuilder-js'

@Component({
    tagname: 'project-list',
    template: { html: HTML_STR, css: CSS_STR }
})
export default class ProjectList extends ShadowComponent
{
    props: ComponentProps = {
        projects: []
    }

    connectedCallback() {
        window.addEventListener('projectDataLoaded', this.fill.bind(this))
    }

    fill(event: any): void {
        const data = event.detail.filter((project: any) => !project.isDisabled)

        const createProjectCard = (project: any) => EBuilder('li').setChildren(new ProjectCard(project))
        
        EBuilder(this.$list).setChildren(data.map(createProjectCard))
    }
}