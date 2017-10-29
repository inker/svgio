"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var download_js_1 = require("download.js");
var optimizeSvg_1 = require("./optimizeSvg");
exports.downloadSvgAsPicture = function (title, root, format) {
    return exports.svgToPictureDataUrl(root, format).then(function (dataURL) { return download_js_1.downloadUrl(title, dataURL); });
};
exports.svgToPictureDataUrl = function (root, format) {
    return exports.svgToCanvas(root).then(function (canvas) { return canvas.toDataURL('image/' + format); });
};
function svgToDataUrl(root) {
    return "data:image/svg+xml;base64," + btoa(new XMLSerializer().serializeToString(root));
}
exports.svgToDataUrl = svgToDataUrl;
exports.svgToCanvas = function (root) {
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
};
function svgToPicture(root) {
    var dataUrlPromise = exports.svgToPictureDataUrl(root, 'png');
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
        root = optimizeSvg_1.default(root);
    }
    var img = document.createElement('img');
    img.width = parseInt(root.getAttribute('width') || '') || parseInt(root.style.width || '');
    img.height = parseInt(root.getAttribute('height') || '') || parseInt(root.style.height || '');
    img.src = svgToDataUrl(root);
    return img;
}
exports.svgToImg = svgToImg;
//# sourceMappingURL=index.js.map