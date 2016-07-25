declare module "draft-js" {
  import * as Immutable from 'immutable'

  export type HITS = '16-07-26A' | 'ABC' | 'DEF'
  export type EntityType = 'FIELD' | 'LINK' | 'TOKEN' | 'PHOTO'
  export type EntityMutability = 'MUTABLE' | 'IMMUTABLE' | 'SEGMENTED'
  export type EditorChangeType = 'undo' |
    'redo' |
    'change-selection' |
    'insert-characters' |
    'backspace-character' |
    'delete-character' |
    'remove-range' |
    'split-block' |
    'insert-fragment' |
    'change-inline-style' |
    'change-block-type' |
    'apply-entity' |
    'reset-block' |
    'adjust-depth' |
    'spellcheck-change'

  export type DraftBlockType = 'unstyled' |
    'paragraph' |
    'header-one' |
    'header-two' |
    'header-three' |
    'header-four' |
    'header-five' |
    'header-six' |
    'unordered-list-item' |
    'ordered-list-item' |
    'blockquote' |
    'code-block' |
    'atomic'
  // -------------------
  export interface ContentState{ contentState:string }
  export type InlineStyle = Immutable.OrderedSet<string>
  export function convertFromRaw(rawState:{blocks:RawDraftContentBlock[], entityMap:{}}):ContentState

  export interface InlineStyleRange {
    offset:number
    length:number
    style:string
  }
  export interface EntityRange {
    key : number 
    offset : number
    length : number
  }
  export class EditorState {  
    static push(
      editorState:EditorState,
      contentState:ContentState,
      changeType:EditorChangeType
      ):EditorState
    static acceptSelection(
      editorState:EditorState, 
      selection:SelectionState
    ):EditorState

    getCurrentContent():ContentState
    getSelection():SelectionState
    getCurrentInlineStyle():InlineStyle
  }
  export interface RawDraftContentBlock {
    key?:string
    type: DraftBlockType,
    text: string,
    depth?: number,
    inlineStyleRanges?: InlineStyleRange[],
    entityRanges?: EntityRange[],
    data?: Object
  }
  export interface SelectionState {
    isCollapsed():boolean
    getFocusOffset():number
    set(propName:'focusOffset',propValue:number):SelectionState  // from Immutable
  }
  export namespace Modifier {
    function removeInlineStyle(
      contentState:ContentState,
      selectionState:SelectionState,
      inlineStyle:string
    ):ContentState
    function insertText(
      contentState:ContentState, 
      targetRange:SelectionState, 
      text:string, 
      inlineStyle?:InlineStyle, 
      entityKey?:string):ContentState
  }
  export namespace RichUtils { // might have to switch this to a const object
    function toggleInlineStyle(
      editorState:EditorState,
      inlineStyle:string
    ):EditorState
    function toggleLink(
      editorState:EditorState,
      targetSelection:SelectionState,
      entityKey?:string
    ):void
  } 
  export class EntityInstance {
    getType():EntityType
  }

  export namespace Entity {
    function create(
      type:EntityType, 
      mutability:EntityMutability, 
      data?:{}
    ):string
    function get(key:string):EntityInstance
  }
  export interface CharacterMetadata { 
    getEntity():string|null
  }
  export interface ContentBlock {
    findEntityRanges(
      filterFn:(value:CharacterMetadata)=>boolean,
      calback:(start:number, end:number)=>void
    ):void
  }  
}