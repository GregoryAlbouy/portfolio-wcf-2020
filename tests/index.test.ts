/**
 * Entry point when running 'npm test' (default port 9998)
 */

import '../src/index.scss'
import RoutingTest from './modules/routing.test'
// import { loadProjectData } from './shared/utils'

// loadProjectData()
new RoutingTest()