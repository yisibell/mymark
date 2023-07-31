var getType = function (value) {
    var s = Object.prototype.toString.call(value);
    return s.slice(s.indexOf(' ') + 1, s.length - 1);
};

function fillTextAutoLine(str, canvas, initX, initY, lineHeight) {
    var ctx = canvas.getContext('2d');
    if (ctx) {
        var canvasWidth = canvas.width;
        var lineWidth = 0;
        var lastSubStrIndex = 0;
        for (var i = 0; i < str.length; i++) {
            lineWidth += ctx.measureText(str[i]).width;
            if (lineWidth > canvasWidth - initX) {
                ctx.fillText(str.substring(lastSubStrIndex, i), initX, initY);
                initY += lineHeight;
                lineWidth = 0;
                lastSubStrIndex = i;
            }
            if (i === str.length - 1) {
                ctx.fillText(str.substring(lastSubStrIndex, i + 1), initX, initY);
            }
        }
    }
}

var watermark = function (options) {
    var _a = options.container, container = _a === void 0 ? 'body' : _a, _b = options.width, width = _b === void 0 ? '400px' : _b, _c = options.height, height = _c === void 0 ? '300px' : _c, _d = options.content, content = _d === void 0 ? 'mymark' : _d, _e = options.textAlign, textAlign = _e === void 0 ? 'center' : _e, _f = options.textBaseline, textBaseline = _f === void 0 ? 'middle' : _f, _g = options.font, font = _g === void 0 ? '18px Microsoft Yahei' : _g, _h = options.fillStyle, fillStyle = _h === void 0 ? 'rgba(184, 184, 184, 0.3)' : _h, _j = options.lineHeight, lineHeight = _j === void 0 ? 25 : _j, _k = options.rotate, rotate = _k === void 0 ? 20 : _k, _l = options.zIndex, zIndex = _l === void 0 ? 1024 : _l, _m = options.observe, observe = _m === void 0 ? true : _m, _o = options.open, open = _o === void 0 ? true : _o;
    if (!open)
        return;
    var containerEl = typeof container === 'string'
        ? document.querySelector(container)
        : container;
    if (!containerEl)
        return;
    var canvas = document.createElement('canvas');
    canvas.setAttribute('width', width);
    canvas.setAttribute('height', height);
    var ctx = canvas.getContext('2d');
    if (!ctx)
        return;
    ctx.textAlign = textAlign;
    ctx.textBaseline = textBaseline;
    ctx.font = font;
    ctx.fillStyle = fillStyle;
    ctx.rotate((Math.PI / 180) * rotate);
    var x = parseFloat(width) / 2;
    var y = parseFloat(height) / 2;
    if (getType(content) === 'Array') {
        content.forEach(function (v, i) {
            fillTextAutoLine(v, canvas, x, y + lineHeight * i, lineHeight);
        });
    }
    else {
        fillTextAutoLine(content, canvas, x, y, lineHeight);
    }
    var base64Url = canvas.toDataURL();
    var __wm = document.querySelector('.__wm');
    var watermarkDiv = __wm || document.createElement('div');
    var styleStr = "\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%; \n    z-index: ".concat(zIndex, ";\n    pointer-events: none;\n    background-repeat: repeat;\n    background-image: url('").concat(base64Url, "')");
    watermarkDiv.setAttribute('style', styleStr);
    watermarkDiv.classList.add('__wm');
    if (!__wm) {
        containerEl.style.position = 'relative';
        containerEl.insertBefore(watermarkDiv, containerEl.firstChild);
    }
    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
    if (observe && MutationObserver) {
        var mo_1 = new MutationObserver(function () {
            var __wm = document.querySelector('.__wm');
            if ((__wm && __wm.getAttribute('style') !== styleStr) || !__wm) {
                mo_1.disconnect();
                watermark(JSON.parse(JSON.stringify(options)));
            }
        });
        mo_1.observe(containerEl, {
            attributes: true,
            subtree: true,
            childList: true,
        });
    }
};

export { fillTextAutoLine, watermark };
