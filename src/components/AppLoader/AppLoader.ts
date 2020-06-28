import HTML_STR from './AppLoader.c.html'
import CSS_STR from './AppLoader.c.scss'
import { Component, ShadowComponent } from '../../core'
import LoaderTask from './LoaderTask'
import EBuilder from 'ebuilder-js'

// type LoaderTask = { id: string, value: any, EBO?: object }
type LoaderProps = {
    tasks: LoaderTask[],
    callback?: Function
}

@Component({
    tagname: 'app-loader',
    template: { html: HTML_STR, css: CSS_STR }
})
export default class AppLoader extends ShadowComponent
{
    props: LoaderProps = {
        tasks: []
    }

    constructor(tasks: any[], callback?: Function) {
        super()

        this.props.tasks = tasks.map((task) => new LoaderTask(task))
        if (callback) this.props.callback = callback
    }

    async connectedCallback() {
        this.compose(this.$messages)
            .setChildren(this.props.tasks.map((task) => task.EBO || ''))

        const data = await this.fulfillTasks()
        if (this.props.callback) this.props.callback(data)
        this.dismiss()
    }

    fulfillTasks() {
        return Promise.all(this.props.tasks.map((task) => task.promise))
    }

    dismiss() {
        this.classList.add('out')

        // Remove node after fixed duration
        const duration = 1000 // or this.props.transitionDuration if choice is given
        setTimeout(() => this.remove(), duration)

        // Remove node after transition ends -- not working if tasks are immediate (synchronous)
        // this.ontransitionend = (event: TransitionEvent) => {
        //     if (!(event.propertyName === 'opacity' && this.getComputedValue('opacity') === '0')) return
        //     this.parentNode!.removeChild(this)
        // }
    }
}