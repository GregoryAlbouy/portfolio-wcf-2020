import BaseComponent from './BaseComponent'

export default abstract class LightComponent extends BaseComponent
{
    constructor() {
        super()
    }

    select(query: string): Element | null {
        return super.select(query, true)
    }

    selectAll(query: string): NodeListOf<Element> {
        return super.selectAll(query, true)
    }
}