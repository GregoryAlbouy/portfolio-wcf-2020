import './index.scss'
import { AppLoader } from './components/components'
import {
    loadProjectData,
    pause
} from './shared/utils'
import { Router } from './core'

const boot = () => {

    const preloadTasks: any[] = [
        [loadProjectData, 'Retrieving projects data...'],
        [() => pause(1200), 'Enjoying cool loader for a while...'],
    ]

    const dispatchAllLoaded = (data: any) => {
        window.dispatchEvent(new CustomEvent('allLoaded', { detail: data }))
    }

    const appLoader = new AppLoader(preloadTasks, dispatchAllLoaded)

    document.body.appendChild(appLoader)
}

const fastBoot = loadProjectData

boot()
// fastBoot()

