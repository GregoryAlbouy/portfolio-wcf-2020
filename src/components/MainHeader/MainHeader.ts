import HTML_STR from './MainHeader.c.html'
import CSS_STR from './MainHeader.c.scss'
import { Component, ShadowComponent } from '../../../core'

@Component({
    tagname: 'main-header',
    template: { html: HTML_STR, css: CSS_STR }
})
export default class MainHeader extends ShadowComponent {}