declare module "@trystal/interfaces/cloud" {
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
    export class TristId {
        uid:string | null
        filename:string | null
        constructor(uid:string | undefined, filename:string | undefined);
        toString():string
    }
}
declare module "@trystal/interfaces/immutable" {
    import {List,Map} from 'immutable'
    import * as JS from '@trystal/interfaces/js'

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
declare module "@trystal/interfaces/js" {
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

    export interface Range {
        anchor: Node
        focus: Node
        first: Node
        last: Node
        allNodes: Node[]
        visibleNodes: Node[]
        level: number
        multinode: boolean
    }

    export interface Format {
        isBold      : boolean
        isItalic    : boolean
        isStrikeout : boolean
        isUnderline : boolean
        fg          : number
        bg          : number
        family      : number
        fontSize    : number
    }
    export interface FindParams {
        searchUp?:boolean, 
        fromStart?:boolean
    }
}

declare module "@trystal/interfaces" {
    import {Map,List} from 'immutable'
    import * as Cloud from '@trystal/interfaces/cloud' 
    import * as IMM from '@trystal/interfaces/immutable'
    import * as JS from '@trystal/interfaces/js' 
    export {JS, IMM, Cloud}
}
