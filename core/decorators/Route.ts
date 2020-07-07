// import type { RouteComponent } from '../routing/Router'
import BaseComponent from '../components/BaseComponent'
import { Router } from '../routing'

interface RouteOptions {
    title?: string
    shortcut?: string
}

/**
 * Component class decorator: automatically do Route stuff
 */
export default function Route(path: string, options: RouteOptions = {}) {
    return (target: typeof BaseComponent) => {
        Router.setRoute(path, target, options)
    }
}