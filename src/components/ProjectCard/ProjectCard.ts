import HTML_STR from './ProjectCard.c.html'
import CSS_STR from './ProjectCard.c.scss'
import { Component, ShadowComponent } from '../../../core'

@Component({
    tagname: 'project-card',
    template: { html: HTML_STR, css: CSS_STR }
})
export default class ProjectCard extends ShadowComponent
{
    props = {
        id: '',
        slug: '',
        name: '',
        description: '',
        image: '',
        tags: [],
        demo: '',
        repo: '',
        addedOn: null
    }

    constructor(data: any) {
        super()
        if (data) this.setProps(this.sanitize(data))
    }

    sanitize(rawData: any): any {
        const data = Object.create(null)

        Object.keys(rawData).forEach((key) => {
            if (!(key in this.props)) return
            data[key] = rawData[key]
        })
        data.addedOn = rawData["added_on"]

        return data
    }
}