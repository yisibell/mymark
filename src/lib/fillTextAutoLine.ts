/**
 * 填充文本自动换行
 * @param str: 要绘制的字符串
 * @param ctx: canvas 对象
 * @param initX: 绘制字符串起始x坐标
 * @param initY: 绘制字符串起始y坐标
 * @param lineHeight: 字行高，自己定义个值即可
 */
export default function fillTextAutoLine(
  str: string,
  canvas: HTMLCanvasElement,
  initX: number,
  initY: number,
  lineHeight: number
) {
  const ctx = canvas.getContext('2d')

  if (ctx) {
    const canvasWidth = canvas.width
    let lineWidth = 0
    let lastSubStrIndex = 0

    for (let i = 0; i < str.length; i++) {
      lineWidth += ctx.measureText(str[i]).width

      if (lineWidth > canvasWidth - initX) {
        // 减去initX, 防止边界出现的问题
        ctx.fillText(str.substring(lastSubStrIndex, i), initX, initY)
        initY += lineHeight
        lineWidth = 0
        lastSubStrIndex = i
      }

      if (i === str.length - 1) {
        ctx.fillText(str.substring(lastSubStrIndex, i + 1), initX, initY)
      }
    }
  }
}
