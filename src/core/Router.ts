type RouteComponent = HTMLElement
type RouteMap = { [path: string]: typeof HTMLElement }
type RouteObject = { [path: string]: typeof HTMLElement }
type RouteAnimation = (prev: RouteComponent, next: RouteComponent ) => Promise<void>
type RouterOptions = {
    animate?: RouteAnimation,
    defaultPath?: string,
    listen?: boolean
}

export default class Router {
    routes: RouteMap
    current: RouteComponent
    animate?: RouteAnimation

    constructor(routes: RouteMap | RouteObject, options: RouterOptions = {}) {
        const { defaultPath, animate, listen } = options

        this.routes = routes
        this.current = new this.routes['/']()
        if (animate) this.animate = animate
        this.init()
        this.listen()
    }

    listen() {
        window.addEventListener('popstate', (event) => console.log(event))
    }
    init() {
        document.body.appendChild(this.current)
    }

    async goto(path: string, animate?: RouteAnimation) {
        const prev = this.current
        const next = new this.routes[path]()
        this.current = next

        window.history.pushState(null, '', path)
        prev.insertAdjacentElement('afterend', next)
        if (animate) await animate(prev, next)
        prev.remove()

    }
}

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