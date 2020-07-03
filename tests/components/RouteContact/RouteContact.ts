import HTML_STR from './RouteContact.c.html'
import CSS_STR from './RouteContact.c.scss'
import { Component, ShadowComponent, Route } from '../../../core'

@Component({
    tagname: 'route-contact',
    template: { html: HTML_STR, css: CSS_STR }
})
@Route('/contact', { title: 'Contact | Gregory Albouy' })
export default class RouteContact extends ShadowComponent {}