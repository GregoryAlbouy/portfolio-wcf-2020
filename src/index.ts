import './index.scss'
import { AppLoader } from './components/components'
import {
    loadProjectJSON,
    loadProjectData,
    pause
} from './shared/utils'

const boot = () => {

    const preloadTasks: any[] = [
        loadProjectJSON,
        // [loadProjectData, 'Retrieving projects data...'],
        [() => pause(400), 'Loading projects data...'],
        [() => pause(1200), 'Enjoying cool loader for a while...'],
    ]

    const dispatchAllLoaded = (data: any) => {
        window.dispatchEvent(new CustomEvent('allLoaded', { detail: data }))
    }

    const appLoader = new AppLoader(preloadTasks, dispatchAllLoaded)

    document.body.appendChild(appLoader)
}

boot()