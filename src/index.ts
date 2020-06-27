import './index.scss'
import { AppLoader } from './components/components'
import {
    loadProjectData,
    pause
} from './shared/utils'
import Router from './core/Router'
import { routes } from './routes'

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


export const router = new Router(routes)
// router.goto(window.location.hash)

console.log(window.location.hash)

boot()
// fastBoot()

