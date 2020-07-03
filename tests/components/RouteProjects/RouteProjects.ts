import HTML_STR from './RouteProjects.c.html'
import CSS_STR from './RouteProjects.c.scss'
import { Component, ShadowComponent, Route } from '../../../src/core'

@Component({
    tagname: 'route-projects',
    template: { html: HTML_STR, css: CSS_STR }
})
@Route('/projects')
export default class RouteProjects extends ShadowComponent {}