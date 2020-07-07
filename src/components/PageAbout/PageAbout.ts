import HTML_STR from './PageAbout.c.html'
import CSS_STR from './PageAbout.c.scss'
import { Component, LightComponent, Route } from '../../../core'

@Component({
    tagname: 'page-about',
    template: { html: HTML_STR, css: CSS_STR }
})
@Route('/', { shortcut: 'a' })
export default class PageAbout extends LightComponent {}