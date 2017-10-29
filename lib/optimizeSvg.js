"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getStyleRulesAsText_1 = require("./getStyleRulesAsText");
exports.default = function (root) {
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
    styleElement.textContent = getStyleRulesAsText_1.default();
    var defs = optimized.querySelector('defs');
    if (defs) {
        defs.insertBefore(styleElement, defs.firstChild);
    }
    return optimized;
};
//# sourceMappingURL=optimizeSvg.js.map