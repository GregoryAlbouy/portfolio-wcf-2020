/**
 * Entry point when running 'npm test' (default port 9998)
 */

import './index.scss'
import TestComponent from './tests/components/TestComponent/TestComponent'
import MiniChat from './tests/components/MiniChat/MiniChat'
// import MiniChat from './components/MiniChat/MiniChat'
// import { loadProjectData } from './shared/utils'
import IO from './tests/IO'

// loadProjectData()
document.body.appendChild(new TestComponent())
document.body.appendChild(new MiniChat())
// IO()
// document.body.appendChild(new MiniChat())