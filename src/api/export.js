import request from './axInstance.js'

function exportMethod(data) {
  request({
    method: data.method,
    url: data.url,
    responseType: 'blob'
  }).then((res) => {
    const link = document.createElement('a')
    let blob = new Blob([res], { type: 'application/x-excel' })
    link.style.display = 'none'
    link.href = URL.createObjectURL(blob);
    link.download = data.fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }).catch(err => {
    console.log(err)
  })
}

export default exportMethod