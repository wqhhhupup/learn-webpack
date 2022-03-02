
// import '../css/index.css'
import "../css/testless.less"
function component() {
  const ele = document.createElement("div")
  ele.innerText = "你好啊 世界"
  ele.className = "content"
  const img = new Image(300, 300)
  img.src = require("../img/qy.jpg").default
  ele.appendChild(img)
  // console.log("object");
  return ele

}

document.body.appendChild(component())