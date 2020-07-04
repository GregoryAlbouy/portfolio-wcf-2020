import { Router } from '../../core'
import { AppRootTest } from '../components/test-components'
import { pause } from '../../src/shared/utils'
import EBuilder from 'ebuilder-js'

export default class RoutingTest {
    constructor() {
        console.log('------------- ROUTING TEST ------------')

        const appRootTest = new AppRootTest()
        const router = new Router({
            container: appRootTest,
            // appendBefore: true,
            hooks: {
                beforeRemove: this.beforeRemoveAnimation,
                beforeAppend: this.beforeAppendAnimation,
                afterAppend: this.afterAppendAnimation
            },
        })

        document.body.appendChild(appRootTest)

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

        console.log('beforeRemove hook')

        return pause(duration)
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

        console.log('beforeAppend hook')

        return Promise.resolve()
    }

    afterAppendAnimation(element: any) {
        const duration = 1000

        EBuilder(element).set({
            'style@timeout:0': {
                opacity: '1',
                transform: 'rotate(0)'
            }
        })

        console.log('afterAppend hook')

        return pause(duration)
    }
}