/**
 * Entry point when running 'npm test' (default port 9998)
 */

import './index.scss'
import SomeTest from './tests/some-test.test.js'
import TestComponent from './tests/components/test-component/test-component'

SomeTest()
document.body.appendChild(new TestComponent())