export default class Check {
    static areEqualArrays(a: any, b: any) {
        return (
            Array.isArray(a) && Array.isArray(b)
            && a.length === b.length
            && a.reduce((acc, curr) => acc && b.includes(curr), true)
        )
    }
}