/**
 * TODO:
 * - LOT of clean-up & refacto
 * - Add custom generic animation function support
 * - Add built-in animations
 * - Add support for hooks as a tuple [Function, number] in addition to Promise
 * - DYNAMIC route support???
 * - option to pass data when appending a component: new SomeComponent(data)
 */

import type BaseComponent from '../components/BaseComponent'

// export type BaseComponent = BaseComponent
type RouteMap = Map<string, RoutePage>
type RoutePage = { component: typeof BaseComponent, title?: string }
type RouteOptions = {
    title?: string
}
type RouterOptions = {
    defaultPath?: string,
    container?: Element,
    listen?: boolean
    hooks?: RouterHookMap
    appendBefore?: boolean
}
type RouterHook = (element: BaseComponent) => Promise<any>
type RouterHookMap = {
    beforeRemove?: RouterHook,
    afterRemove?: RouterHook,
    beforeAppend?: RouterHook,
    afterAppend?: RouterHook
}

export default class Router {
    static routes: RouteMap = new Map()
    // currentPath: string
    
    currentPage: RoutePage
    // currentComponentInstance = null
    currentComponent: BaseComponent

    container: Element = document.querySelector('app-root') as Element

    // Move in a more adequate class, or get it through another way
    // (e.g. via selector before any action, OR specify app name upstream)
    defaultTitle: string = document.querySelector('title')?.textContent || ''

    hooks: RouterHookMap = {}

    options = {
        appendBefore: false
    }

    constructor(options: RouterOptions = {}) {

        const { container, hooks, appendBefore } = options

        if (container) this.container = container 
        if (appendBefore) this.options.appendBefore = !!appendBefore

        this.setHooks(hooks as RouterHookMap)

        this.listen()
        const root = Router.routes.get('/')

        if (!root) throw new Error('Router error: No root path specified.')

        this.currentPage = root
        this.currentComponent = new (this.currentPage.component as any)()
        this.container.appendChild(this.currentComponent as Node)

        const { origin, pathname } = window.location
        if (pathname !== '/') this.to(origin + pathname, { skip: true })
    }

    static setRoute(path: string, component: typeof BaseComponent, options: RouteOptions) {
        Router.routes.set(path, { component, title: options.title })
    }

    setHooks(hooks: RouterHookMap) {
        Object.assign(this.hooks, hooks)
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

    // TODO: change href to path?
    async to(href: string, options: { skip?: boolean, appendBefore?: boolean } = {}) {
        try {
            const page = this.getPageFromHrefValue(href)
            const { skip, appendBefore } = options
    
            this.performDOM(page, { skip, appendBefore })
            window.history.pushState(null, page.title || '', href)

        } catch(error) {
            console.warn(error)
            const errorData = JSON.parse(error.message)
            if (errorData.code === 404) this.handle404(errorData.pathname)
            // console.warn(errorData)
        }
    }

    async performDOM(page: RoutePage, options: { skip?: boolean, appendBefore?: boolean } = {}) {
        const { beforeRemove, afterRemove, beforeAppend, afterAppend } = this.hooks
        const { component, title } = page
        const { skip, appendBefore } = options
        const prevComponent = this.currentComponent
        const nextComponent = new (component as any)()

        const performRemove = async () => {
            if (beforeRemove && !skip) await beforeRemove(prevComponent)
            this.container.removeChild(prevComponent as Node)
            if (afterRemove && !skip) await afterRemove(prevComponent)
        }

        const performAppend = async () => {
            if (beforeAppend && !skip) await beforeAppend(nextComponent)
            this.container.appendChild(nextComponent as Node)
            if (afterAppend && !skip) await afterAppend(nextComponent)
        }

        const performActions = async () => {
            const actions = [performRemove, performAppend]
            const actionStack = this.options.appendBefore ? actions.reverse() : actions

            for (const action of actionStack) await action()
        }

        this.setPageTitle(title)
        this.currentPage = page
        this.currentComponent = nextComponent

        await performActions()

    }

    // setCurrentComponent(component: RouteComponent) {
    //     this.currentComponent = new (component as any)()
    // }

    setPageTitle(value?: string) {
        const titleElement = document.querySelector('title')
        if (!titleElement) return
        titleElement.textContent = value || this.defaultTitle
    }

    handle404(requestedPath?: string) {
        this.to(window.location.origin + '/404')
    }
}

/**
 * Hook model n.1
 * { hooks: { beforeAppend: hook1 } }
 */
const hook = (element: any) => new Promise(resolve => {
    const animateForOneSec = (el: any) => new Promise(resolve => setTimeout(resolve, 1000))
    
    animateForOneSec(element).then(resolve)
})

/**
 * Hook model n.2
 * { hooks: { beforeAppend: [hook2, 1000] } }
 */
const hook2 = (element: any) => {
    const animateForOneSec = (el: any) => {}

    animateForOneSec(element)
}