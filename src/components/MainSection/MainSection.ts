import HTML_STR from './MainSection.c.html'
import CSS_STR from './MainSection.c.scss'
import { Component, LightComponent } from '../../../core'

@Component({
    tagname: 'main-section',
    template: { html: HTML_STR, css: CSS_STR }
})
export default class MainSection extends LightComponent
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