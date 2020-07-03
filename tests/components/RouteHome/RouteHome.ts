import HTML_STR from './RouteHome.c.html'
import CSS_STR from './RouteHome.c.scss'
import { Component, ShadowComponent, Route } from '../../../src/core'

@Component({
    tagname: 'route-home',
    template: { html: HTML_STR, css: CSS_STR }
})
@Route('/')
export default class RouteHome extends ShadowComponent {}