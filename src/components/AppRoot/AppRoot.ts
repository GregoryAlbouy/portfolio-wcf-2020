import HTML_STR from './AppRoot.c.html'
import CSS_STR from './AppRoot.c.scss'
import {
    Component,
    LightComponent
} from '../components'
import { router } from '../../index'
import EBuilder from 'ebuilder-js'
import { registerDecorator } from 'handlebars'

@Component({
    tagname: 'app-root',
    template: { html: HTML_STR, css: CSS_STR }
})
export default class AppRoot extends LightComponent {
    connectedCallback() {
        EBuilder('div').set({
            style: {
                width: '200px',
                height: '200px',
                background: '#0FE',
                position: 'fixed',
                top: '10%',
                left: '10%',
                cursor: 'pointer'
            },
            listeners: ['click', () => router.goto('#admin', (prev: any, next: any) => new Promise((resolve) => {
                next.style.position = 'absolute'
                next.style.opacity = '0'
                prev.style.transition = 'opacity 1s'
                next.style.transition = 'opacity 1s'
                prev.style.opacity = '0'
                next.style.opacity = '1'

                setTimeout(resolve, 1000)
            }))]
        }).into(this.root)
    }
}