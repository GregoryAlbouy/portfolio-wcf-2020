import HTML_STR from './NavComponent.c.html'
import CSS_STR from './NavComponent.c.scss'
import { Component, ShadowComponent } from '../../../src/core'

@Component({
    tagname: 'nav-component',
    template: { html: HTML_STR, css: CSS_STR }
})
export default class NavComponent extends ShadowComponent {}