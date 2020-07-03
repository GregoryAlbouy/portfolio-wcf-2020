/**
 * TODO:
 * - LOT of clean-up & refacto
 * - Add custom hooks support
 * - Add custom generic animation function support
 */

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
type RouteAnimation = (prev: RouteComponent, next: RouteComponent ) => Promise<void>
type RouterOptions = {
    animation?: RouteAnimation,
    defaultPath?: string,
    container?: Node,
    listen?: boolean
}

export default class Router {
    static routes: RouteMap = new Map()
    // currentPath: string
    // currentPage: RouteComponent
    currentRouteTuple: RouteTuple
    currentComponent: RouteComponent
    container: Node = document.querySelector('app-root')!

    // Move in a more adequate class, or get it through another way
    // (e.g. via selector before any action, OR specify app name upstream)
    defaultTitle = document.querySelector('title')!.textContent


    /**
     * TODO: remove initialization steps that prevents from having several instances
     */
    constructor(options: RouterOptions = {}) {
        const { container } = options

        if (container) this.container = container 

        this.listen()
        const root = Router.routes.get('/')

        if (!root) throw new Error('Router error: No root path specified.')

        // this.container = document.body.querySelector('app-root-test') as Node // do checks

        this.currentRouteTuple = root
        this.currentComponent = new (this.currentRouteTuple.component as any)()
        this.container.appendChild(this.currentComponent as Node)
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

    getPageFromHrefValue(href: string) {
        const { pathname } = new URL(href)
        const page = Router.routes.get(pathname)
        
        if (!page) throw new Error(JSON.stringify({
            code: 404,
            pathname
        }))
        // if (!page) throw new Error(pathname)

        return page
    }

    to(href: string) {
        console.log(href)
        try {
            const page = this.getPageFromHrefValue(href)

            const { component, title } = page
    
    
            this.setPageTitle(title)
            window.history.pushState(null, title || '', href)
    
            // preRemove hook
            this.container.removeChild(this.currentComponent as Node)
            // postRemove hook
    
            this.currentComponent = new (component as any)()
    
            // preAppend hook
            this.container.appendChild(this.currentComponent as Node)
            // postAppend hook
        } catch(error) {
            const errorData = JSON.parse(error.message)
            if (errorData.code === 404) this.handle404(errorData.pathname)
        }

    }

    setPageTitle(value?: string) {
        const titleElement = document.querySelector('title')
        if (!titleElement) return
        titleElement.textContent = value || this.defaultTitle
    }

    handle404(requestedPath?: string) {
        this.to(window.location.origin + '/404')
    }
}