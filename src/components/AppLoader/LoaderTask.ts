import EBuilder from 'ebuilder-js'
import { removeTargetAfterFadeout } from '../../shared/utils'

class LoaderTask
{
    promise: any
    message?: string
    EBO?: any

    constructor(task: any) {
        // if task has message ([myTask, 'doing my task...'])
        if (Array.isArray(task)) {
            const [actualTask, taskMessage] = task
            this.message = `${taskMessage}`
            this.promise = this.getPromiseFromRawTask(actualTask)
            this.setEBO()
            this.wrapActionInEmitter()
        } else {
            this.promise = this.getPromiseFromRawTask(task)
        }
    }

    getPromiseFromRawTask(task: any) {
        return task instanceof Function ? task() : task
    }

    setEBO() {
        this.EBO = EBuilder('li').set({
            children: `<span>${this.message}</span>`,
            listeners: [
                ['fulfill', this.handleFulfill.bind(this)],
                ['transitionend', removeTargetAfterFadeout]
            ]
        })
    }

    handleFulfill() {
        this.EBO.setClasses('vanish')
    }

    wrapActionInEmitter() {
        const action = this.promise

        const wrapper = new Promise((resolve) => {
            const emit = (data?: any) => {
                this.EBO!.dispatch('fulfill')
                resolve(data)
            } 

            action instanceof Promise ? action.then(emit) : emit()
        })

        this.promise = wrapper
    }
}

export default LoaderTask