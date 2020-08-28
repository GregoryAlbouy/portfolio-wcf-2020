import HTML_STR from './PageAll.c.html'
import CSS_STR from './PageAll.c.scss'
import { Component, LightComponent, Route } from '../../../core'

@Component({
    tagname: 'page-all',
    template: { html: HTML_STR, css: CSS_STR }
})
@Route('/all')
export default class PageAll extends LightComponent {}