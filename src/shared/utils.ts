import EBuilder from 'ebuilder-js'

export const loadProjectData = async () => {
    const URL = __API_BASE_URL__ + '/api/v1/projects'
    const data = await (await fetch(URL)).json()

    // choose between event / return
    window.dispatchEvent(new CustomEvent('projectDataLoad', { detail: data }))
    return data
}

export const postMessage = async (messageData: MessageData) => {
    try {
        const response = await fetch(__API_BASE_URL__ + '/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify(messageData)
        })

        if (!response.ok && response.status === 400) throw new Error(response.statusText)

        return response.json()
    } catch(error) {
        // oops, todo
    }
}

export const pause = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const removeTargetAfterFadeout = (event: TransitionEvent) => {
    const target = event.target as Element
    if (event.propertyName !== 'opacity' || window.getComputedStyle(target).opacity !== '0') return
    target.parentNode!.removeChild(target)
}

export const getRouterHooks = () => {
    const container = document.getElementById('routing')!
    const duration = 800
    const loadingBar = EBuilder('div').setStyle({
        position: 'absolute',
        top: '0',
        left: '0',
        zIndex: '5000',
        width: '100%',
        height: '.4rem',
        background: 'var(--main-color)',
        transform: 'scaleX(0)',
        transformOrigin: 'left',
        transition: `transform ${duration}ms`,
        // willChange: 'transform'
    })

    const beforeRemove = (element: Element) => {
        element.classList.add('out')

        loadingBar
            .setStyle({
                transform: 'scaleX(0)'
            })
            .set({
                'style@timeout:0': {
                    transform: 'scaleX(1)',
                    transformOrigin: 'left'
                }
            })
            .into(container)

        return pause(duration)
    }

    const beforeAppend = (element: any) => {
        element.classList.add('in')

        return Promise.resolve()
    }

    const afterAppend = (element: any) => {
        const newDuration = duration

        setTimeout(() => {
            element.classList.remove('in')
            loadingBar.setStyle({
                transformOrigin: 'right',
                transform: 'scaleX(0)',
                transitionDuration: `${newDuration}ms`
            })
        }, 50)


        setTimeout(loadingBar.out, newDuration)

        return pause(newDuration)
    }

    return {
        beforeRemove,
        beforeAppend,
        afterAppend,
    }
}