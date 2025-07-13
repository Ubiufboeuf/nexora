const encoder = new TextEncoder()
// const decoder = new TextDecoder()

export class Cursor {
  category: string | undefined = undefined
  last_id: string | undefined = undefined

  constructor (category: string | undefined, id: string | undefined) {
    if (category) this.category = category ?? undefined
    if (id) this.last_id = id
  }

  public toB64 (): string {
    const cursorJson = JSON.stringify(this)
    // const cursorB64 = Buffer.from(cursorJson, 'utf8').toString('base64url')
    // console.log({ cursorJson })
    const data = encoder.encode(cursorJson)
    let binaryString = ''
    for (let i = 0; i < data.length; i++) {
      binaryString += String.fromCharCode(data[i])
    }
    const cursorB64 = btoa(binaryString)
    return cursorB64
  }

  static fromB64 (cursorStr: string): Cursor {
    // const cursorJsonStr = Buffer.from(cursorStr, 'base64url').toString('utf8')
    const cursorJsonStr = atob(cursorStr)
    const cursorJson = JSON.parse(cursorJsonStr)
    const newCursor = new Cursor(cursorJson?.category, cursorJson?.last_id)
    newCursor.last_id = cursorJson.last_id
    return newCursor
  }
}
