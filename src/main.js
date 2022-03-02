import { add } from './js/add.js'

import './css/index.css';
// import './js/component.js'
import _ from 'lodash'
import dayjs from 'dayjs'
// import { electron } from 'webpack';
// console.log("hello index!!!!");


console.log(dayjs(), "main");


_.join(["wei", "qihang"])


add(30, 45)

console.log("hello main !!!!!!");
// const p = new Promise((resolve, reject) => {

// })



import(/*webpackChunkName:"foo"*/"./foo.js").then(res => {
  console.log("res", res);
})
import(/*webpackChunkName:"foo2"*/"./foo2.js").then(res => {
  console.log("res", res);
})