import { Router } from '../../core'
import { RouteHome } from '../components/test-components'
import { AppRootTest } from '../components/test-components'
import EBuilder from 'ebuilder-js'

export default class RoutingTest {
    constructor() {
        console.log('------------- ROUTING TEST ------------')

        const appRootTest = new AppRootTest()

        document.body.appendChild(appRootTest)

        const router = new Router({
            container: appRootTest,
            // appendBefore: true,
            hooks: {
                beforeRemove: this.beforeRemoveAnimation,
                beforeAppend: this.beforeAppendAnimation,
                afterAppend: this.afterAppendAnimation
            },
        })
    }

    beforeRemoveAnimation(element: any) {
        const duration = 1000

        EBuilder(element).setStyle({
            opacity: '0',
            transform: 'rotate(90deg)',
            transformOrigin: 'top left',
            transitionProperty: `opacity, transform`,
            transitionDuration: `${duration}ms`,
            transitionTimingFunction: 'cubic-bezier(.5, -1.5, 1, 1)'
        })

        return new Promise(resolve => setTimeout(resolve, duration))
    }

    beforeAppendAnimation(element: any) {
        const duration = 1000

        EBuilder(element).setStyle({
            opacity: '0',
            transform: 'rotate(-90deg)',
            transformOrigin: 'top left',
            transitionProperty: `opacity, transform`,
            transitionDuration: `${duration}ms`
        })

        return new Promise(resolve => resolve())
    }

    afterAppendAnimation(element: any) {
        const duration = 1000

        EBuilder(element).set({
            'style@timeout:0': {
                opacity: '1',
                transform: 'rotate(0)'
            }
        })

        return new Promise(resolve => setTimeout(resolve, duration))
    }
}