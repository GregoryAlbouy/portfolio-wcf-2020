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
            container: appRootTest
        })
    }
}