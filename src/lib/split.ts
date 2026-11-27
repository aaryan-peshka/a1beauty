/** Split an element's text into word spans (each in an overflow mask) for staggered reveals. */
export function splitWords(el: HTMLElement | null): HTMLElement[] {
  if (!el) return []
  const source = el.dataset.split ?? el.textContent ?? ''
  el.textContent = ''
  const words = source.split(' ')
  const out: HTMLElement[] = []
  words.forEach((word, i) => {
    const mask = document.createElement('span')
    mask.className = 'split-word'
    const inner = document.createElement('span')
    inner.className = 'split-word__in'
    inner.textContent = word
    mask.appendChild(inner)
    el.appendChild(mask)
    if (i < words.length - 1) el.appendChild(document.createTextNode(' '))
    out.push(inner)
  })
  return out
}

/** Split into characters, keeping words unbreakable. */
export function splitChars(el: HTMLElement | null): HTMLElement[] {
  if (!el) return []
  const source = el.dataset.split ?? el.textContent ?? ''
  el.textContent = ''
  const out: HTMLElement[] = []
  source.split(' ').forEach((word, w, all) => {
    const wordEl = document.createElement('span')
    wordEl.className = 'split-chars'
    for (const char of word) {
      const mask = document.createElement('span')
      mask.className = 'split-char'
      const inner = document.createElement('span')
      inner.className = 'split-char__in'
      inner.textContent = char
      mask.appendChild(inner)
      wordEl.appendChild(mask)
      out.push(inner)
    }
    el.appendChild(wordEl)
    if (w < all.length - 1) el.appendChild(document.createTextNode(' '))
  })
  return out
}
