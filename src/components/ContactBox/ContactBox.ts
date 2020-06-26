import HTML_STR from './ContactBox.c.html'
import CSS_STR from './ContactBox.c.scss'
import { Component, ShadowComponent } from '../components'
import { postMessage } from '../../shared/utils'

@Component({
    tagname: 'contact-box',
    template: { html: HTML_STR, css: CSS_STR }
})
export default class ContactBox extends ShadowComponent {
    connectedCallback() {
        this.$form.addEventListener('submit', (event: any) => {
            event.preventDefault()
            this.sendMessage()
        })
    }

    async sendMessage() {
        const messageData = {
            email: this.$email.value,
            subject: this.$subject.value,
            message: this.$message.value
        }

        try {
            const json = await postMessage(messageData)

            this.handleSuccess(json)

        } catch(error) {
            this.handleError(error)
        }
    }

    handleSuccess(response: any) {
        console.log('success, response: ', response)
        this.$form.reset()
    }

    handleError(error: any) {
        console.warn('error, response: ', error)
    }
}