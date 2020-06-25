/**
 * Entry point when running 'npm test' (default port 9998)
 */

import './index.scss'
import TestComponent from './tests/components/TestComponent/TestComponent'
// import { loadProjectData } from './shared/utils'

// loadProjectData()
document.body.appendChild(new TestComponent())