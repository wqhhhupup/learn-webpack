import _ from 'lodash'
import dayjs from 'dayjs'
console.log("hello index!!!!");


console.log(dayjs(), "index");


_.join(["wei", "qihang"])


const button = document.createElement("button")
const body = document.querySelector("body")
button.innerHTML = "加载元素"
body.appendChild(button)
button.addEventListener("click", () => {
  import(/*webpackChunkName:'element'*//*webpackPrefetch:true*/"./element.js").then(({ default: element }) => {
    body.appendChild(element)

    // console.log(element, "element");
  })
})