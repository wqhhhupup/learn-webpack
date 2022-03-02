module.exports = {
  presets: [
    [
      "@babel/preset-env", {
        useBuiltIns: "usage",
        corejs: 3
        // {
        //   // false  不引用任何的 polyfill 相关代码 
        //   // usage  代码中需要哪些 polyfill 就引用哪些相关的api
        //   // useBuiltIns: "usage",
        //   useBuiltIns: false,
        //   corejs: 3
        // }
      }
    ],
    // ["@babel/preset-typescript"]  //  typescript 预设
  ]
}