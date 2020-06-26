const API_BASE_URL = 'https://gregoryalbouy-backend.ew.r.appspot.com/'

export const loadProjectData = async () => {
    const URL = API_BASE_URL + '/api/v1/projects'
    const data = await (await fetch(URL)).json()

    // choose between event / return
    window.dispatchEvent(new CustomEvent('projectDataLoad', { detail: data }))
    return data
}

export const postMessage = async (messageData: MessageData) => {
    const response = await fetch(API_BASE_URL + '/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify(messageData)
    })

    return response.json()
}

export const pause = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const removeTargetAfterFadeout = (event: TransitionEvent) => {
    const target = event.target as Element
    if (event.propertyName !== 'opacity' || window.getComputedStyle(target).opacity !== '0') return
    target.parentNode!.removeChild(target)
}