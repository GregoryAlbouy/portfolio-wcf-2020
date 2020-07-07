import HTML_STR from './PageNotFound.c.html'
import CSS_STR from './PageNotFound.c.scss'
import { Component, LightComponent, Route } from '../../../core'

@Component({
    tagname: 'page-not-found',
    template: { html: HTML_STR, css: CSS_STR }
})
@Route('/not-found')
export default class PageNotFound extends LightComponent {}