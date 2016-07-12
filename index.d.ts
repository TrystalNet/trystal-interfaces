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

declare module "@trystal/data-gen" {
    import {Chain} from "@trystal/interfaces"
    export function buildChain(nodeSpec:string):Chain
    export function dump(chain:Chain):string 
}
