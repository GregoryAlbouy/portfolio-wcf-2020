import handlebars from 'handlebars'
import Build from 'ebuilder-js'

type self = typeof BaseComponent

abstract class BaseComponent extends HTMLElement
{
    static TEMPLATE_STR = ''

    root: ShadowRoot | HTMLElement
    htmlContent: string

    props: ComponentProps = {}
    ;[ref: string]: any


    constructor(isShadow = false) {
        super()
        
        this.root = isShadow ? this.attachShadow({ mode: 'open' }) : this

        const rawTemplate = (this.constructor as self).TEMPLATE_STR
        const processedTemplate = handlebars.compile(rawTemplate, { noEscape: true })(this.props)

        this.htmlContent = this.innerHTML

        this.root.appendChild(
            Build('template')
                .setContent(processedTemplate)
                .element.content.cloneNode(true)
        )
    }

    parse(html: string) {
        const replaceMatchWithPropValue = (source:string, propName:string) => {
            return this.props[propName] ? this.props[propName] : source
        }
        return html.replace(/{{\s?([\w]+)\s?}}/g, replaceMatchWithPropValue)
    }

    select(query: string, fromLight?: boolean): Element | null {
        return fromLight ? this.querySelector(query) : this.root!.querySelector(query)
    }

    selectAll(query: string, fromLight?: boolean): NodeListOf<Element> {
        return fromLight ? this.querySelectorAll(query) : this.root!.querySelectorAll(query)
    }

    compose(source?: any) {
        return source ? Build(source) : {
            ...Build(this),
            wait: async function(this: Element, ms: number) {
                const pause = () => new Promise(res => setTimeout(() => res(this), ms))

                await pause()
                return this
        }}
    }

    setProp(propName: string, value: any) {
        this.props[propName] = value
        this.render()
    }

    setProps(input: object) {
        Object.assign(this.props, input)
        this.render()
    }

    setRefList() {
        const refList = this.selectAll('[data-ref]')
        refList.forEach(this.setRef.bind(this))
    }

    setRef(refElement: Element) {
        const refName = '$' + refElement.getAttribute('data-ref');
        // refElement.removeAttribute('data-ref', null)
        this[refName] = refElement
    }

    attributeChangedCallback(attr: string, oldValue: string, newValue: string) {
        if (newValue === oldValue) return
        if (attr.split('data-')[1] in this.props) {
            const name = attr.replace(/^data-/, '')
            this.setProp(name, newValue)
        }
    }

    getComputedValue(name: string) {
        return (window.getComputedStyle(this) as any)[name]
    }

    render() {
        const rawTemplate = (this.constructor as self).TEMPLATE_STR
        const processedTemplate = handlebars.compile(rawTemplate, { noEscape: true })(this.props)

        // not the best, but works for now
        this.root.innerHTML = processedTemplate

        this.setRefList()
        this.dispatchEvent(new CustomEvent('rendered'))
    }
}

export default BaseComponent