import './index.scss'
import { AppLoader, PageProjects } from './components/components'
import {
    loadProjectData,
    pause,
    getRouterHooks
} from './shared/utils'
import { Router } from '../core'

class App {
    router?: Router
    projectData?: Promise<any[]>

    boot() {
        const preloadTasks: any[] = [
            [loadProjectData, 'Retrieving projects data...'],
            [() => pause(1200), 'Enjoying cool loader for a while...']
        ]
    
        const unusedCallback = (data: any) => {
            // Just to remember me I implemented an optional callback
            // in AppLoader constructor params.
            // It takes the result of Promise.all as parameter
            // and is called once all tasks are done.
        }
    
        const appLoader = new AppLoader(preloadTasks, unusedCallback)

        this.projectData = new Promise((resolve, reject) => {
            window.addEventListener('projectDataLoad', (event: any) => {
                resolve(event.detail)
            })

            pause(5000).then(() => {
                reject('Projects data could not load. Please try again later.')
            })
        })
    
        document.body.appendChild(appLoader)

        return this
    }

    quickBoot() {
        this.projectData = loadProjectData()

        return this
    }

    initializeRouter() {
        Router.setRoute('/codemon', PageProjects, { title: 'Projects | Grégory Albouy' })
        Router.setRoute('/sarahcornish', PageProjects, { title: 'Projects | Grégory Albouy' })
        Router.setRoute('/trocdestrains', PageProjects, { title: 'Projects | Grégory Albouy' })
        Router.setRoute('/basketmanager', PageProjects, { title: 'Projects | Grégory Albouy' })

        this.router = new Router({
            container: document.getElementById('routing') as Element,
            notFoundPath: '/not-found',
            hooks: getRouterHooks()
        })

        return this
    }
}

export const app = new App()
    .boot()
    // .quickBoot()
    .initializeRouter()