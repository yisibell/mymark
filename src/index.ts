import getType from './lib/getType'
import fillTextAutoLine from './lib/fillTextAutoLine'
import Options from './interface/options'

/**
 * 水印生成工具
 * 调用方式: watermark({ content: 'mymark' })
 */
const watermark: (options: Options) => void = (options) => {
  const {
    container = 'body',
    width = '400px',
    height = '300px',
    content = 'mymark',
    textAlign = 'center',
    textBaseline = 'middle',
    font = '18px Microsoft Yahei',
    fillStyle = 'rgba(184, 184, 184, 0.3)',
    lineHeight = 25,
    rotate = 20,
    zIndex = 1024,
    observe = true,
    open = true,
  } = options

  if (!open) return

  const containerEl =
    typeof container === 'string'
      ? document.querySelector(container)
      : container

  if (!containerEl) return

  const canvas = document.createElement('canvas')
  canvas.setAttribute('width', width)
  canvas.setAttribute('height', height)

  const ctx = canvas.getContext('2d')

  if (!ctx) return
  ;(ctx as any).textAlign = textAlign
  ;(ctx as any).textBaseline = textBaseline

  ctx.font = font
  ctx.fillStyle = fillStyle
  ctx.rotate((Math.PI / 180) * rotate)

  const x = parseFloat(width) / 2
  const y = parseFloat(height) / 2

  if (getType(content) === 'Array') {
    ;(content as unknown as Array<string>).forEach((v, i) => {
      fillTextAutoLine(v, canvas, x, y + lineHeight * i, lineHeight)
    })
  } else {
    fillTextAutoLine(content as string, canvas, x, y, lineHeight)
  }

  const base64Url = canvas.toDataURL()
  const __wm = document.querySelector('.__wm')
  const watermarkDiv = __wm || document.createElement('div')
  const styleStr = `
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%; 
    z-index: ${zIndex};
    pointer-events: none;
    background-repeat: repeat;
    background-image: url('${base64Url}')`

  watermarkDiv.setAttribute('style', styleStr)
  watermarkDiv.classList.add('__wm')

  if (!__wm) {
    ;(containerEl as HTMLElement).style.position = 'relative'
    containerEl.insertBefore(watermarkDiv, containerEl.firstChild)
  }

  const MutationObserver =
    window.MutationObserver || window.WebKitMutationObserver

  if (observe && MutationObserver) {
    const mo = new MutationObserver(function () {
      const __wm = document.querySelector('.__wm') // 只在__wm元素变动才重新调用 watermark
      if ((__wm && __wm.getAttribute('style') !== styleStr) || !__wm) {
        // 避免一直触发
        mo.disconnect()

        watermark(JSON.parse(JSON.stringify(options)))
      }
    })

    mo.observe(containerEl, {
      attributes: true,
      subtree: true,
      childList: true,
    })
  }
}

export { watermark, fillTextAutoLine }
