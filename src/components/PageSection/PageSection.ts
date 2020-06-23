import HTML_STR from './PageSection.c.html'
import CSS_STR from './PageSection.c.scss'
import { Component, LightComponent } from '../components'

@Component({
    tagname: 'page-section',
    template: { html: HTML_STR, css: CSS_STR }
})
export default class PageSection extends LightComponent
{
    props: ComponentProps = {
        title: '',
    }

    static get observedAttributes() {
        return ['data-title']
    }

    connectedCallback() {
        this.$content.innerHTML = this.htmlContent
    }
}