import HTML_STR from './ProjectCard.c.html'
import CSS_STR from './ProjectCard.c.scss'
import { Component, ShadowComponent } from '../components'

@Component({
    tagname: 'project-card',
    template: { html: HTML_STR, css: CSS_STR }
})
export default class ProjectCard extends ShadowComponent
{
    props: ComponentProps = {
        name: '',
        description: '',
        image: '',
        tags: [],
        demo: '',
        repo: ''
    }

    constructor(data: any) {
        super()

        if (data) this.setProps(data)
    }
}