# mymark

A canvas watermark builder. 水印生成工具。

# Installation

```bash
# yarn
$ yarn add mymark

# npm
$ npm i mymark
```

# Usage

```js
// 导入
import { watermark } from 'mymark'
// 调用, options 参数具体见下表
watermark(options)
```

## 以 `<script>` 标签的方式引用

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>watermark demo</title>
    <style>
      #app {
        height: 95vh;
      }
    </style>
  </head>
  <body>
    <div id="app">hello watermark!</div>
    <script src="./mymark.umd.js"></script>

    <script>
      // MyMark 被暴露到 window
      const { watermark } = MyMark

      watermark({ content: 'build by elenh' })
    </script>
  </body>
</html>
```

## 在有模块系统的项目中使用

```js
import { watermark } from 'mymark'
watermark({ content: 'build by elenh' })
```

# options 参数

|     键名     |             类型              |                                   说明                                    |           默认值           |
| :----------: | :---------------------------: | :-----------------------------------------------------------------------: | :------------------------: |
|  container   |    `Selector` 或 `HTMLElement`    |                              水印插入的容器                               |        `body` 元素         |
|    width     |           `string`            |                          生成水印 canvas 的 宽度                          |          '400px'           |
|    height    |           `string`            |                          生成水印 canvas 的 高度                          |          '300px'           |
|  textAlign   |           `string`            |                       水印文字在水平方向上如何放置                        |          'center'          |
| textBaseline |           `string`            |                               水印文字基线                                |          'middle'          |
|     font     |           `string`            |                                字号，字体                                 |   '18px Microsoft Yahei'   |
|  lineHeight  |           `number`            |                                   行高                                    |             25             |
|  fillStyle   |           `string`            |                                 字体颜色                                  | 'rgba(184, 184, 184, 0.3)' |
|   content    | `string` 或 `Array of string` | 水印文本内容，当类型是 `Array of string` 时，可做到水平居中换行的文本效果 |       '@aidol/utils'       |
|    rotate    |           `number`            |                             水印文本旋转角度                              |             20             |
|    zIndex    |           `number`            |                         生成的水印块的 z-index 值                         |            1024            |
|   observe    |           `boolean`           |              是否监视 DOM 变更，防止用户恶意删除水印节点 dom              |            true            |
|     open     |           `boolean`           |                               是否开启水印                                |            true            |
