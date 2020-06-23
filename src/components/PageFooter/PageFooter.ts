import HTML_STR from './PageFooter.c.html'
import CSS_STR from './PageFooter.c.scss'
import { Component, ShadowComponent } from '../components'

@Component({
    tagname: 'page-footer',
    template: { html: HTML_STR, css: CSS_STR }
})
export default class PageFooter extends ShadowComponent {}