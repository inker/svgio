export function getStyleRulesAsText(): string {
    let text = ''
    for (const sheet of document.styleSheets as any as CSSStyleSheet[]) {
        console.log(sheet.cssText)
        const rules = sheet.cssRules
        // cross-origin style sheets don't have rules
        if (!rules) {
            console.log(sheet)
            continue
        }
        for (const rule of rules as any as CSSRule[]) {
            text += rule.cssText
        }
    }
    console.log('css text ready')
    return text
}
