import { Router } from "../core"
import { RouteHome } from "./components/test-components"
import { AppRootTest } from "./components/test-components"





export default function routingTest() {
    console.log('------------- ROUTING TEST ------------')
    
    document.body.appendChild(new AppRootTest())
    const router = new Router()
}