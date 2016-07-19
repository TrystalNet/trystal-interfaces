declare module "@trystal/interfaces/cloud" {
    import {Formats} from "@trystal/constants"
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
declare module "@trystal/interfaces/immutable" {
    import {List,Map} from 'immutable'
    import * as JS from '@trystal/interfaces/js'

    export namespace Payload {
        export type PropName = 'id' | 'trystup' | 'format'
        export type PropType = string
        export interface IState extends Map<PropName, PropType> { toJS(): JS.Payload; }
    }

    export namespace Node {
        export type PropName = 'id' | 'rlevel' | 'prev' | 'next' | 'PV' | 'NV' | 'payload'
        export type PropType = Payload.IState | string | number
        interface IState extends Map<PropName, PropType> { toJS(): JS.Node; }
    }

    export namespace Chain {
        export interface IState extends Map<string, Node> {}
    }

    export namespace Context {
        export type PropName = 'aid' | 'fid' | 'hid'
        export type PropType = string
        export interface IState extends Map<PropName,PropType> {}
    }

    export namespace Trist {
        export type PropName = 'trist' | 'history' | 'index' | 'context' | 'nodes'
        export type PropType = Chain|Context.IState
        export interface IState extends Map<PropName, PropType> {}
    }

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

