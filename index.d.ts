declare module "@trystal/interfaces" {
    import {Map,List} from 'immutable'
    
    export enum Formats { UNKNOWN= 0, FMT2014 = 20140, FMT2014A= 20141, FMT2015= 20150 }

    export interface IdTable<T> { [id:string]:T}

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

    export interface Chain extends IdTable<Node> { }

    export interface Trist {
        nodes: Chain
    }

    // thes support immutablejs core for trists
    export type PayloadPropName = 'id' | 'trystup' | 'format'
    export type NodePropName = 'id' | 'rlevel' | 'prev' | 'next' | 'PV' | 'NV' | 'payload';
    export type TristPropName = 'trist' | 'history' | 'index' | 'context' | 'nodes'
    export type ContextPropName = 'aid' | 'fid' | 'hid'

    export interface PayloadIM extends Map<PayloadPropName, string> { toJS(): Payload; }
    export interface NodeIM extends Map<NodePropName, PayloadIM | string | number> { toJS(): Node; }
    
    export interface ChainIM extends Map<string, NodeIM> {}
    export interface IDListIM extends List<string> {}

    export type ContextIM = Map<ContextPropName,string>
    export type TristIM = Map<TristPropName, ChainIM|ContextIM>

    namespace Cloud {
        export interface MapItem {
            id:string, 
            rlevel?:number, 
            format?:string, 
            next?:string, 
            vnext?:string, 
            isDeleted:boolean
        }
        export interface ContentItem  {
            id:string, 
            link?:string, 
            imgLink?:string, 
            text?:string
        }
        export interface Edit {
            lineId:string,
            delta:string,
            isPatch:boolean
        }
        export interface Revision {
            authorId: string
            date: Date
            edits: Edit[]
            adds: string[]
            dels: string[]
        }
        export interface Trist {
            version?: Formats,
            map?: MapItem[],
            contents?: ContentItem[],
            revisions?: Revision[]
        }
    }
}
