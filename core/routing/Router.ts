/**
 * TODO:
 * - Add custom generic animation function support
 * - Add built-in animations
 * - Add support for hooks as a tuple [Function, number] in addition to Promise
 * - Add 'routes: []' option that overwrites decorator routes
 * - DYNAMIC route support???
 * - option to pass data when appending a component: new SomeComponent(data)
 * 
 * FIX:
 * - new (component as any)()
 * - proper 404 handling
 */

import type BaseComponent from '../components/BaseComponent'


type RouterOptions = {
    defaultPath?: string,
    container?: Element,
    listen?: boolean
    hooks?: RouterHookMap
    appendBefore?: boolean
}
type RouterStateParams = {
    page: RoutePage,
    nextComponent: BaseComponent
    title?: string
}
type RouterHookMap = {
    beforeRemove?: RouterHook,
    afterRemove?: RouterHook,
    beforeAppend?: RouterHook,
    afterAppend?: RouterHook
}
type RouterHook = (element: BaseComponent) => Promise<any>

type RouteMap = Map<string, RoutePage>
type RoutePage = { component: typeof BaseComponent, title?: string }
type RouteOptions = {
    title?: string
}

export default class Router {
    static routes: RouteMap = new Map()
    
    options = {
        appendBefore: false
    }

    container: Element
    defaultTitle: string

    currentPage?: RoutePage
    currentComponent?: BaseComponent
    hooks: RouterHookMap = {}


    constructor(options: RouterOptions = {}) {
        const { container, hooks, appendBefore } = options
        const { origin, pathname } = window.location

        this.container = container || document.querySelector('app-root') as Element
        this.defaultTitle = document.querySelector('title')?.textContent || ''
        this.options.appendBefore = !!appendBefore

        this.setHooks(hooks as RouterHookMap)
        this.loadURL(origin + pathname)
        this.listen()
    }

    static setRoute(path: string, component: typeof BaseComponent, options: RouteOptions) {
        Router.routes.set(path, { component, title: options.title })
    }

    loadURL(url: string) {
        this.to(url, { skip: true })
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

        return page
    }

    // TODO: change href to path?
    async to(href: string, options: { skip?: boolean } = {}) {
        try {
            const page = this.getPageFromHrefValue(href)
            const { skip } = options
    
            this.performDOM(page, { skip })
            window.history.pushState(null, page.title || '', href)

        } catch(error) {
            // console.warn(error)
            const errorData = JSON.parse(error.message)
            if (errorData.code === 404) this.handle404(errorData.pathname)
            // console.warn(errorData)
        }
    }

    /**
     * TODO: use decorators for hooks
     */
    async performDOM(page: RoutePage, options: { skip?: boolean } = {}) {
        const { beforeRemove, afterRemove, beforeAppend, afterAppend } = this.hooks
        const { component, title } = page
        const { skip } = options
        const prevComponent = this.currentComponent
        const nextComponent = new (component as any)()

        const performRemove = async () => {
            if (!prevComponent) return
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

        this.setCurrentState({ page, nextComponent, title })

        await performActions()

    }

    setCurrentState({ page, nextComponent, title }: RouterStateParams) {
        this.setPageTitle(title)
        this.currentPage = page
        this.currentComponent = nextComponent
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