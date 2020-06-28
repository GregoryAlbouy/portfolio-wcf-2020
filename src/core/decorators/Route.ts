interface RouteOptions {
    beforeAppend?: Function
    afterAppend?: Function
    beforeRemove?: Function
    afterRemove?: Function
}

/**
 * Component class decorator: automatically do Route stuff
 */
export default function Route(path: string, options: RouteOptions = {}) {
    return (target: Function) => {
        console.log(`My name is ${target.name}, I'm a route and my @Route decorator works well.`)
    }
}