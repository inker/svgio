import getStyleRulesAsText from './getStyleRulesAsText'

export default (root: SVGSVGElement): SVGSVGElement => {
  const optimized = root.cloneNode(true) as typeof root
  const dummyElements = optimized.querySelectorAll('[id^=dummy]') as any as Element[]
  for (const dummy of dummyElements) {
    const dummysParent = dummy.parentNode
    if (dummysParent) {
      dummysParent.removeChild(dummy)
    }
  }
  optimized.style.left = optimized.style.top = ''
  const plate = optimized.querySelector('#station-plate')
  if (plate) {
    const platesParent = plate.parentNode
    if (platesParent) {
      platesParent.removeChild(plate)
    }
  }
  const styleElement = document.createElement('style')
  styleElement.textContent = getStyleRulesAsText()
  const defs = optimized.querySelector('defs')
  if (defs) {
    defs.insertBefore(styleElement, defs.firstChild)
  }
  return optimized
}
