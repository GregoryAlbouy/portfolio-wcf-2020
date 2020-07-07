import HTML_STR from './PageProjects.c.html'
import CSS_STR from './PageProjects.c.scss'
import { Component, LightComponent, Route } from '../../../core'

@Component({
    tagname: 'page-projects',
    template: { html: HTML_STR, css: CSS_STR }
})
@Route('/projects', { title: 'Projects | Grégory Albouy', shortcut: 'p' })
export default class PageProjects extends LightComponent {}