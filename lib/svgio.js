"use strict";
var res_1 = require("./res");
function download(title, dataURL) {
    var a = document.createElement('a');
    a.href = dataURL;
    a.download = title;
    a.click();
}
function downloadSvgAsPicture(title, root, format) {
    svgToPictureDataUrl(root, format).then(function (dataURL) { return download(title, dataURL); });
}
exports.downloadSvgAsPicture = downloadSvgAsPicture;
function svgToPictureDataUrl(root, format) {
    return svgToCanvas(root).then(function (canvas) { return canvas.toDataURL('image/' + format); });
}
exports.svgToPictureDataUrl = svgToPictureDataUrl;
function svgToCanvas(root) {
    return new Promise(function (resolve, reject) {
        var img = svgToImg(root, true);
        img.onload = function (e) {
            var canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            var c2d = canvas.getContext('2d');
            if (!c2d) {
                return reject(new Error('2d context does not exist on canvas'));
            }
            c2d.drawImage(img, 0, 0);
            resolve(canvas);
        };
    });
}
exports.svgToCanvas = svgToCanvas;
function svgToPicture(root) {
    var dataUrlPromise = svgToPictureDataUrl(root, 'png');
    var img = document.createElement('img');
    img.width = parseInt(root.getAttribute('width') || '') || parseInt(root.style.width || '');
    img.height = parseInt(root.getAttribute('height') || '') || parseInt(root.style.height || '');
    return dataUrlPromise.then(function (dataUrl) {
        img.src = dataUrl;
        return img;
    });
}
exports.svgToPicture = svgToPicture;
function svgToImg(root, appendExternalStyles) {
    if (appendExternalStyles === void 0) { appendExternalStyles = false; }
    if (appendExternalStyles) {
        root = optimizeSvg(root);
    }
    var img = document.createElement('img');
    img.width = parseInt(root.getAttribute('width') || '') || parseInt(root.style.width || '');
    img.height = parseInt(root.getAttribute('height') || '') || parseInt(root.style.height || '');
    img.src = svgToDataUrl(root);
    return img;
}
exports.svgToImg = svgToImg;
function svgToDataUrl(root) {
    return "data:image/svg+xml;base64," + btoa(new XMLSerializer().serializeToString(root));
}
exports.svgToDataUrl = svgToDataUrl;
function optimizeSvg(root) {
    var optimized = root.cloneNode(true);
    var dummyElements = optimized.querySelectorAll('[id^=dummy]');
    for (var _i = 0, dummyElements_1 = dummyElements; _i < dummyElements_1.length; _i++) {
        var dummy = dummyElements_1[_i];
        var dummysParent = dummy.parentNode;
        if (dummysParent) {
            dummysParent.removeChild(dummy);
        }
    }
    optimized.style.left = optimized.style.top = '';
    var plate = optimized.querySelector('#station-plate');
    if (plate) {
        var platesParent = plate.parentNode;
        if (platesParent) {
            platesParent.removeChild(plate);
        }
    }
    var styleElement = document.createElement('style');
    styleElement.textContent = res_1.getStyleRulesAsText();
    var defs = optimized.querySelector('defs');
    if (defs) {
        defs.insertBefore(styleElement, defs.firstChild);
    }
    return optimized;
}
//# sourceMappingURL=svgio.js.map