import { Router } from '../../src/core'
import { RouteHome } from "../components/test-components"
import { AppRootTest } from "../components/test-components"

export default class RoutingTest {
    constructor() {
        console.log('------------- ROUTING TEST ------------')

        document.body.appendChild(new AppRootTest())

        const router = new Router()
    }
}