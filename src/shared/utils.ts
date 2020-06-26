export const loadProjectData = async () => {
    const URL = __API_BASE_URL + '/api/v1/projects'
    const data = await (await fetch(URL)).json()

    // choose between event / return
    window.dispatchEvent(new CustomEvent('projectDataLoad', { detail: data }))
    return data
}

export const postMessage = async (messageData: MessageData) => {
    try {
        const response = await fetch(__API_BASE_URL + '/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify(messageData)
        })

        if (!response.ok && response.status === 400) throw new Error(response.statusText)

        return response.json()
    } catch(error) {
        console.warn(error)
    }
}

export const pause = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const removeTargetAfterFadeout = (event: TransitionEvent) => {
    const target = event.target as Element
    if (event.propertyName !== 'opacity' || window.getComputedStyle(target).opacity !== '0') return
    target.parentNode!.removeChild(target)
}