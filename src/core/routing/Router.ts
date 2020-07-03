import BaseComponent from '../components/BaseComponent'

export type RouteComponent = BaseComponent | typeof BaseComponent
type RouteMap = Map<string, RouteTuple>
type RouteTuple = { component: RouteComponent, title?: string }
interface RouteOptions {
    title?: string
    beforeAppend?: Function
    afterAppend?: Function
    beforeRemove?: Function
    afterRemove?: Function
}
// type RouteObject = { [path: string]: typeof HTMLElement }
// type RouteAnimation = (prev: RouteComponent, next: RouteComponent ) => Promise<void>
// type RouterOptions = {
//     animate?: RouteAnimation,
//     defaultPath?: string,
//     listen?: boolean
// }

export default class Router {
    static routes: RouteMap = new Map()
    // currentPath: string
    // currentPage: RouteComponent
    currentRouteTuple: RouteTuple
    currentComponent: RouteComponent
    targetContainer: Node


    /**
     * TODO: remove initialization steps that prevents from having several instances
     */
    constructor() {
        this.listen()
        const root = Router.routes.get('/')

        if (!root) throw new Error('Router error: No root path specified.')

        this.targetContainer = document.body.querySelector('app-root-test') as Node // do checks

        this.currentRouteTuple = root
        this.currentComponent = new (this.currentRouteTuple.component as any)()
        this.targetContainer.appendChild(this.currentComponent as Node)
    }

    static setRoute(path: string, component: RouteComponent, options: RouteOptions) {
        Router.routes.set(path, { component, title: options.title })
    }

    listen() {
        window.addEventListener('navigate', (event: any) => {
            const { href } = event.detail
            this.to(href)
        })
    }

    to(href: string) {

        const { pathname } = new URL(href)
        const page = Router.routes.get(pathname)

        if (!page) throw new Error(`Route ${pathname} does not exist.`)

        const { component, title } = page
        window.history.pushState(null, title as string, href)


        // preRemove hook
        this.targetContainer.removeChild(this.currentComponent as Node)
        // postRemove hook

        this.currentComponent = new (component as any)()

        // preAppend hook
        this.targetContainer.appendChild(this.currentComponent as Node)
        // postAppend hook

    }
}

// move to index.ts?
// export const router = new Router()

// export default class Router {
//     routes: RouteMap
//     current: RouteComponent
//     animate?: RouteAnimation

//     constructor(routes: RouteMap | RouteObject, options: RouterOptions = {}) {
//         const { defaultPath, animate, listen } = options

//         this.routes = routes
//         this.current = new this.routes['/']()
//         if (animate) this.animate = animate
//         this.init()
//         this.listen()
//     }

//     listen() {
//         window.addEventListener('popstate', (event) => console.log(event))
//     }
//     init() {
//         document.body.appendChild(this.current)
//     }

//     async goto(path: string, animate?: RouteAnimation) {
//         const prev = this.current
//         const next = new this.routes[path]()
//         this.current = next

//         window.history.pushState(null, '', path)
//         prev.insertAdjacentElement('afterend', next)
//         if (animate) await animate(prev, next)
//         prev.remove()

//     }
// }

// const animationCallback = (prev: any, next: any) => {
//     return console.log('animationCallback() called')
// }

// const animate = () => new Promise((resolve) => {
//     animationCallback('', '')
//     resolve()
// })


// console.log(new Map({
//     salut: 'Fred',
//     jean: 'non'
// }))