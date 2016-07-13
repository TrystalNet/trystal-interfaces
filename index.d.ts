
declare module "@trystal/interfaces" {
    import {Map,List} from 'immutable'

    namespace JS {
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
    }

    namespace IMM {
        export type PayloadPropName = 'id' | 'trystup' | 'format'
        export type NodePropName = 'id' | 'rlevel' | 'prev' | 'next' | 'PV' | 'NV' | 'payload';
        export type TristPropName = 'trist' | 'history' | 'index' | 'context' | 'nodes'
        export type ContextPropName = 'aid' | 'fid' | 'hid'

        export interface Payload extends Map<PayloadPropName, string> { toJS(): JS.Payload; }
        export interface Node extends Map<NodePropName, Payload | string | number> { toJS(): JS.Node; }
        export interface Chain extends Map<string, Node> {}
        export interface Context extends Map<ContextPropName,string> {}
        export interface Trist extends Map<TristPropName, Chain|Context> {}

        export interface IDList extends List<string> {}
    }

    namespace Cloud {
        export enum Formats { UNKNOWN= 0, FMT2014 = 20140, FMT2014A= 20141, FMT2015= 20150 }
        
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

    export {JS, IMM, Cloud}
}
