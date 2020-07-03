import BaseComponent from '../components/BaseComponent'

interface ComponentOptions {
    tagname: string
    template?: TemplateObject
    _extends?: string
    attributes?: StringObject
    listeners?: EventTuple[]
}

type DefineOptions = [
    string,
    CustomElementConstructor,
    ElementDefinitionOptions?
]

/**
 * Component class decorator: automatically generates the full html string template
 * (including stylesheet) from the separate files, add the optionals attributes and
 * listeners then define the component.
 * 
 * TODO: move in a separate file
 * TODO: add attributeChangedCallback() rewriting
 * TODO: RE-FAC-TO!!!
 */
export default function Component(options: ComponentOptions) {
    return (target: Function) => {
        const connectedCallbackOrigin = target.prototype.connectedCallback
        const { tagname, template, _extends, attributes, listeners } = options

        if (target.prototype instanceof BaseComponent && template) {
            const styleStr = template.css ? `<style>\n${template.css}\n</style>\n` : ''
            const templateStr = styleStr + template.html
    
            Object.defineProperty(target, 'TEMPLATE_STR', { value: templateStr })
        }

        target.prototype.connectedCallback = function() {
            if (attributes) Object.keys(attributes).forEach((name) => this.setAttribute(name, attributes[name]))

            if (listeners) listeners.forEach(([event, handler, options]) => this.addEventListener(event, handler, options))

            if (target.prototype instanceof BaseComponent) {
                this.render()
                this.setRefList()
            }


            if (connectedCallbackOrigin) connectedCallbackOrigin.apply(this)
        }

        // Define element

        const defineOptions: DefineOptions = [tagname, target as CustomElementConstructor]

        if (_extends) defineOptions.push({ extends: _extends })

        customElements.define(...defineOptions)
    }
}