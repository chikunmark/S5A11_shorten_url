////////////////// test copy 2
const select = DOM => document.querySelector(DOM)

select('#btn-copy').addEventListener('click', () => {
  navigator.clipboard
    .writeText(select('#shortURL').innerHTML)
    .then(() => alert('複製成功'))
    .catch(err => {
      alert('出錯了，還請重新試試')
      console.alert(err)
    })
})
