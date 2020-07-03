import HTML_STR from './Route404.c.html'
import CSS_STR from './Route404.c.scss'
import { Component, ShadowComponent, Route } from '../../../core'

@Component({
    tagname: 'route-404',
    template: { html: HTML_STR, css: CSS_STR }
})
@Route('/404')
export default class Route404 extends ShadowComponent {}