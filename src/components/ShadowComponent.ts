import BaseComponent from './BaseComponent'

abstract class ShadowComponent extends BaseComponent
{
    constructor() {
        super(true)
    }
}

export default ShadowComponent