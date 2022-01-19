interface Options {
  container?: string | HTMLElement
  content?: string | Array<string>
  width?: string
  height?: string
  textAlign?: string
  textBaseline?: string
  font?: string
  fillStyle?: string
  lineHeight?: number
  rotate?: number
  zIndex?: number
  observe?: boolean
  open?: boolean
}

declare function watermark(options: Options): void

export { watermark };
