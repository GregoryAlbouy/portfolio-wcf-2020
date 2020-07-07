import HTML_STR from './TestComponent.c.html'
import CSS_STR from './TestComponent.c.scss'
import { Component, ShadowComponent } from '../../../core'


@Component({
    tagname: 'test-component',
    template: { html: HTML_STR, css: CSS_STR }
})
export default class TestComponent extends ShadowComponent {
    props = {
        name: 'Sparta',
        array: [
            { fname: 'salut', lname: 'ça va ?' },
            { fname: 'ça va', lname: 'et toi ?' }
        ]
    }
}