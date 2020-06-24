// import projectsJSON from '../data/projects.json'

export const loadPage = new Promise((resolve) => window.addEventListener('load', resolve))

// export const loadProjectJSON = () =>  window.dispatchEvent(new CustomEvent('projectDataLoaded', { detail: projectsJSON }))

export const loadProjectData = async () => {
    const apiURL = 'https://gregoryalbouy-backend.ew.r.appspot.com/api/v1/projects'
    const data = await (await fetch(apiURL)).json()

    window.dispatchEvent(new CustomEvent('projectDataLoaded', { detail: data }))
    return data
}

export const pause = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const removeTargetAfterFadeout = (event: TransitionEvent) => {
    const target = event.target as Element
    if (event.propertyName !== 'opacity'|| window.getComputedStyle(target).opacity !== '0') return
    target.parentNode!.removeChild(target)
}