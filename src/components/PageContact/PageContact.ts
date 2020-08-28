import HTML_STR from './PageContact.c.html'
import CSS_STR from './PageContact.c.scss'
import { Component, LightComponent, Route } from '../../../core'

@Component({
    tagname: 'page-contact',
    template: { html: HTML_STR, css: CSS_STR }
})
@Route('/contact', { title: 'Contact | Grégory Albouy' })
export default class PageContact extends LightComponent {}