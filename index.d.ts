declare module "@trystal/interfaces" {
    import {Map,List} from 'immutable'
    export interface Payload {
        id: string
        format?: string
        trystup?: string
        link?: string
        imgLink?: string
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

    // thes support immutablejs core for trists
    export type PayloadPropName = 'id' | 'trystup' | 'format'
    export type NodePropName = 'id' | 'rlevel' | 'prev' | 'next' | 'PV' | 'NV' | 'payload';

    export interface PayloadIM extends Map<PayloadPropName, string> { toJS(): Payload; }
    export interface NodeIM extends Map<NodePropName, PayloadIM | string | number> { toJS(): Node; }
    
    export interface ChainIM extends Map<string, NodeIM> {}
    export interface IDListIM extends List<string> {}
}
