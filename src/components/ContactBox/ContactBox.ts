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
            const response = await postMessage(messageData)

            if (response.status !== 201) throw new Error('Invalid message')
            this.handleSuccess(response)
        } catch(error) {
            this.handleError(error)
        }
    }

    handleSuccess(response?: any) {
        this.$form.reset()
        this.notify(true)
    }

    handleError(error?: any) {
        this.notify(false)
    }

    notify(isSuccess: boolean) {
        const notificationTemplate = isSuccess ? this.$success : this.$error
        this.root.appendChild(notificationTemplate.content.cloneNode(true))
        setTimeout(() => this.select('aside-info')!.remove(), 3000)
    }
}