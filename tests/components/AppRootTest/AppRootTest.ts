import HTML_STR from './AppRootTest.c.html'
import CSS_STR from './AppRootTest.c.scss'
import { Component, LightComponent } from '../../../src/core'

@Component({
    tagname: 'app-root-test',
    template: { html: HTML_STR, css: CSS_STR }
})
export default class AppRootTest extends LightComponent {}