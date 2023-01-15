const select = DOM => document.querySelector(DOM)

select('#btn-copy').addEventListener('click', e => {
  // 建立 Range 物件
  const range = document.createRange()
  const texts = select('#shortURL')
  range.selectNode(texts)
  // 取得 Selection 物件
  const selection = window.getSelection()
  selection.removeAllRanges()
  selection.addRange(range)
  document.execCommand('copy')
  selection.removeAllRanges()
})
