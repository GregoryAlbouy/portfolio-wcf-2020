/**
 * Entry point when running 'npm test' (default port 9998)
 */

import '../src/index.scss'
// import TestComponent from './tests/components/TestComponent/TestComponent'
// import { loadProjectData } from './shared/utils'
import RoutingTest from './modules/routing.test'

// loadProjectData()
// document.body.appendChild(new TestComponent())

new RoutingTest()