import HTML_STR from './MainNav.c.html'
import CSS_STR from './MainNav.c.scss'
import { Component, ShadowComponent } from '../../../core'

@Component({
    tagname: 'main-nav',
    template: { html: HTML_STR, css: CSS_STR }
})
export default class MainNav extends ShadowComponent {
    // connectedCallback() {
    //     window.addEventListener('keydown', (event: KeyboardEvent) => {
    //         if (event.key === 't') this.togglePosition()
    //     })
    // }

    // togglePosition() {
    //     this.classList.toggle('bottom')
    // }
}