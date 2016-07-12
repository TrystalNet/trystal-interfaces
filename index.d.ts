declare module "@trystal/interfaces" {
    export interface Payload {
        id: string
        format?: string
        trystup?: string
    }

    export interface Node {
        id:string
        prev?: string
        next?: string
        PV?: string
        NV?: string
        rlevel?: number
        payload?: Payload
    }

    export interface Chain {
        [id:string] : Node
    }

}
