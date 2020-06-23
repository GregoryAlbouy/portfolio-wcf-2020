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
        window.addEventListener('projectDataLoaded', this.fill2.bind(this))
    }

    fill(event: any) {
        const imageBaseURL = 'http://localhost/gregoryalbouy-front-wcf/assets/images/projects/'
        const fixSpaces = (input: string) => input.replace(/\s+/g, '%20')
        // Using html parser
        const data = event.detail
            .filter((project: any) => !project.isDisabled)
            .map((project: any) => ({
                ...project,
                tagsString: project.tags.map(fixSpaces).join(','),
                title: fixSpaces(project.title),
                description: fixSpaces(project.description),
                image: project.image ? imageBaseURL + project.image : ''
            }))
            console.log(__dirname)
        console.log(data)
        this.setProps({ projects: data })

        // Using constructor
        // const data = event.detail
        // console.log(data)
        // this.compose(this.$list)
        //     .setChildren(data.map((project: any) => new ProjectCard(project)))
    }

    fill2(event: any): void {
        const imageBaseURL = 'https://gregoryalbouy.com/media/images/projects/'

        const data = event.detail
            .filter((project: any) => !project.isDisabled)
            .map((project: any) => ({ ...project, image: project.image ? imageBaseURL + project.image : undefined }))

        const createProjectCard = (project: any) => EBuilder('li').setChildren(new ProjectCard(project))
        
        EBuilder(this.$list).setChildren(data.map(createProjectCard))
    }
}