import HTML_STR from './AppRoot.c.html'
import CSS_STR from './AppRoot.c.scss'
import { Component, LightComponent } from '../../core'

@Component({
    tagname: 'app-root',
    template: { html: HTML_STR, css: CSS_STR }
})
export default class AppRoot extends LightComponent {}