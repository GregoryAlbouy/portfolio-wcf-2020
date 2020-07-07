import { Component } from "../decorators"
import LightComponent from './LightComponent'

@Component({
    tagname: 'route-link',
    template: {
        html: '<a href="{{to}}" data-link>{{content}}</a>'
    }
})
export default class RouteLink extends LightComponent {
    props = {
        content: '',
        to: ''
    }
    $a: HTMLAnchorElement

    constructor() {
        super()
        this.props.content = this.htmlContent
        this.props.to = this.getAttribute('to') || ''
        this.$a = this.select('a') as HTMLAnchorElement
        this.listen()
    }

    static get observedAttributes() {
        return ['to']
    }

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        if (newValue === oldValue) return
        if (name === 'to') {
            this.setTo(newValue)
        }
    }

    listen() {
        window.addEventListener('pagechange', (event: any) => {
            const { pathname } = event.detail
            pathname === this.props.to
                ? this.setAttribute('is-active', '')
                : this.removeAttribute('is-active')
        })
    }

    setTo(value: string) {
        this.props.to = value
        this.$a.setAttribute('href', value)
        this.attachClickEvent()

        // this.onclick = (function(this: RouteLink) { console.log(this.props.to); return false; }).bind(this)
    }

    attachClickEvent() {
        const isSpecialClick = (event: MouseEvent) => (
            event.ctrlKey
            || event.metaKey
            || event.shiftKey
            || (event.button && event.button === 1)
        )

        const handleClick = (event: Event) => {
            if (isSpecialClick(event as MouseEvent)) return
            if (!this.$a.href) return


            event.preventDefault()
            
            // // solution 1: use unique router instance, which must be instanciated in the core
            // import { router } from '../routing'
            // router.to(href)

            // solution 2: use custom events
            window.dispatchEvent(new CustomEvent('navigate', { detail: {
                href: this.$a.href
            }}))
        }

        this.$a.addEventListener('click', (event) => event.preventDefault())
        this.addEventListener('click', handleClick, true)
    }

}