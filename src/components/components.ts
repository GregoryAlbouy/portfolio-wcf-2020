import BaseComponent from './BaseComponent'
import LightComponent from './LightComponent'
import ShadowComponent from './ShadowComponent'
import AppLoader from './AppLoader/AppLoader'
import AppRoot from './AppRoot/AppRoot'
import PageHeader from './PageHeader/PageHeader'
import PageFooter from './PageFooter/PageFooter'
import PageSection from './PageSection/PageSection'
import ProjectCard from './ProjectCard/ProjectCard'
import ProjectList from './ProjectList/ProjectList'
import AsideInfo from './AsideInfo/AsideInfo'
import FilterBox from './FilterBox/FilterBox'
import TagButton from './TagButton/TagButton'


export {
    BaseComponent,
    LightComponent,
    ShadowComponent,
    AppRoot,
    AppLoader,
    PageHeader,
    PageFooter,
    PageSection,
    ProjectCard,
    ProjectList,
    AsideInfo,
    FilterBox,
    TagButton
}

interface ComponentOptions {
    tagname: string,
    template: TemplateObject,
    attributes?: StringObject,
    listeners?: EventTuple[]
}

/**
 * Component class decorator: automatically generates the full html string template
 * (including stylesheet) from the separate files, add the optionals attributes and
 * listeners then define the component.
 * 
 * TODO: move in a separate file
 * TODO: add attributeChangedCallback() rewriting
 */
export function Component(options: ComponentOptions) {
    return (target: Function) => {
        const connectedCallbackOrigin = target.prototype.connectedCallback
        const { tagname, template, attributes, listeners } = options
        const styleStr = template.css ? `<style>\n${template.css}\n</style>\n` : ''
        const templateStr = styleStr + template.html

        Object.defineProperty(target, 'TEMPLATE_STR', { value: templateStr })

        target.prototype.connectedCallback = function() {
            if (attributes) Object.keys(attributes).forEach((name) => this.setAttribute(name, attributes[name]))

            if (listeners) listeners.forEach(([event, handler, options]) => this.addEventListener(event, handler, options))

            this.render()
            this.setRefList()

            if (connectedCallbackOrigin) connectedCallbackOrigin.apply(this)
        }
        
        customElements.define(tagname, target as CustomElementConstructor)
    }
}