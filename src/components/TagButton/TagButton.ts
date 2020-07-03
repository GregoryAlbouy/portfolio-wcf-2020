import HTML_STR from './TagButton.c.html'
import CSS_STR from './TagButton.c.scss'
import { Component, ShadowComponent } from '../../../core'

@Component({
    tagname: 'tag-button',
    template: { html: HTML_STR, css: CSS_STR }
})
export default class TagButton extends ShadowComponent {
    props = {
        name: '',
        isActive: false
    }

    constructor(name: string) {
        super()

        if (name) this.props.name = name
    }
    
    connectedCallback() {
        if (!!this.props.name) return
        
        this.setProps({
            name: this.htmlContent
        })
    }

    toggleIsActive() {
        this.setIsActive(!this.props.isActive)
    }

    setIsActive(isActive: boolean) {
        this.props.isActive = isActive
        this.props.isActive
            ? this.$button.classList.add('is-active')
            : this.$button.classList.remove('is-active')
    }
}