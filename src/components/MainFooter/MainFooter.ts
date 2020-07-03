import HTML_STR from './MainFooter.c.html'
import CSS_STR from './MainFooter.c.scss'
import { Component, ShadowComponent } from '../../../core'

@Component({
    tagname: 'main-footer',
    template: { html: HTML_STR, css: CSS_STR }
})
export default class MainFooter extends ShadowComponent {}