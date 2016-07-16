export enum Formats { UNKNOWN= 0, FMT2014 = 20140, FMT2014A= 20141, FMT2015= 20150 }

export class TristId {
  uid:string | null
  filename:string | null
  constructor(uid:string | undefined, filename:string | undefined) {
    this.uid = uid || null
    this.filename = filename || null
  }
  toString() {
    let {uid,filename} = this
    return `${uid}/${filename}`
  }
}
