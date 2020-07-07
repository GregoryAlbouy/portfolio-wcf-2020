declare const __API_BASE_URL__: string
declare type MessageData = {
    email: string,
    subject: string,
    message: string
}

// TODO: move to /core
declare type ComponentProps = Record<string, any>
declare type ComponentRefs = Record<string, Element>
declare type TemplateObject = { html: string, css?: string }
declare type EventTuple = [
    string,
    (this: any, event: any) => any,
    (boolean | AddEventListenerOptions)?
]