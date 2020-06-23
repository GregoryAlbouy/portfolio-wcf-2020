import HTML_STR from './AsideInfo.c.html'
import CSS_STR from './AsideInfo.c.scss'
import { Component, ShadowComponent } from '../components'

@Component({
    tagname: 'aside-info',
    template: { html: HTML_STR, css: CSS_STR }
})
export default class AsideInfo extends ShadowComponent {
    connectedCallback() {
        this.$content.innerHTML = this.htmlContent
    }
}