import HTML_STR from './PageHeader.c.html'
import CSS_STR from './PageHeader.c.scss'
import { Component, ShadowComponent } from '../components'

@Component({
    tagname: 'page-header',
    template: { html: HTML_STR, css: CSS_STR }
})
export default class PageHeader extends ShadowComponent {}