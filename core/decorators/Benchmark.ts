export default function Benchmark() {
    return (target: any, methodName: string, descriptor: PropertyDescriptor) => {
        const originalMethod = descriptor.value
        descriptor.value = function(...args: any[]) {
            const t0 = performance.now()
            const result = originalMethod.apply(this, args)
            const t1 = performance.now()
            const dt = t1 - t0

            const string = `${target.constructor.name}.${methodName}()`

            console.table({
                [string]: { 'EXECUTION TIME': dt }
            })
            return result
        }
    }
}