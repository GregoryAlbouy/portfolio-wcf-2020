import BaseComponent from './BaseComponent'

export default abstract class ShadowComponent extends BaseComponent
{
    constructor() {
        super(true)
    }
}