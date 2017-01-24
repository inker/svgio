"use strict";
function getStyleRulesAsText() {
    var text = '';
    for (var _i = 0, _a = document.styleSheets; _i < _a.length; _i++) {
        var sheet = _a[_i];
        console.log(sheet.cssText);
        var rules = sheet.cssRules;
        // cross-origin style sheets don't have rules
        if (!rules) {
            console.log(sheet);
            continue;
        }
        for (var _b = 0, _c = rules; _b < _c.length; _b++) {
            var rule = _c[_b];
            text += rule.cssText;
        }
    }
    console.log('css text ready');
    return text;
}
exports.getStyleRulesAsText = getStyleRulesAsText;
//# sourceMappingURL=res.js.map