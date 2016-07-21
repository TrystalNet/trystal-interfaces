import {Map,List} from 'immutable'
import {Formats} from "@trystal/constants"

export namespace Cloud {
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
    export interface TristId {
        uid:string | null
        filename:string
    }
}
export namespace IMM {
    export namespace Payload {
        export type PropName = 'id' | 'trystup' | 'format'
        export type PropType = string
        export interface IState extends Map<PropName, PropType> { toJS(): Payload; }
    }
    export namespace Node {
        export type PropName = 'id' | 'rlevel' | 'prev' | 'next' | 'PV' | 'NV' | 'payload'
        export type PropType = Payload.IState | string | number | null
        interface IState extends Map<PropName, PropType> { toJS(): Node; }
    }
    export namespace Chain {
        export interface IState extends Map<string, Node.IState> {}
    }
    export namespace Context {
        export type PropName = 'aid' | 'fid' | 'hid'
        export type PropType = string | null
        export interface IState extends Map<PropName,PropType> {}
    }
    export namespace Trist {
        export type PropName = 'trist' | 'history' | 'index' | 'context' | 'nodes'
        export type PropType = Chain.IState|Context.IState
        export interface IState extends Map<PropName, PropType> {}
    }
    export interface IDList extends List<string> {}
}

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



