import HTML_STR from './AdminRoot.c.html'
import CSS_STR from './AdminRoot.c.scss'
import {
    Component,
    LightComponent
} from '../components'
import { router } from '../../index'

@Component({
    tagname: 'admin-root',
    template: { html: HTML_STR, css: CSS_STR }
})
export default class AdminRoot extends LightComponent {
    connectedCallback() {
        this.onclick = function() {
            router.goto('/')
        }
    }
}