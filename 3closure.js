// 构建闭包环境
// 我们知道在 JavaScript 中的作用域（scope）只有全局作用域（global scope）、函数作用域（function scope）以及从 ES6 开始才有的块级作用域（block scope）。
// 如果要将一段代码中的变量、函数等的定义隔离出来，受限于 JavaScript 对作用域的控制，只能将这段代码封装到一个 Function 中，通过使用 function scope 来达到作用域隔离的目的。
// 也因为需要这种使用函数来达到作用域隔离的目的方式，于是就有 IIFE（立即调用函数表达式），这是一个被称为“自执行匿名函数”的设计模式。

// Eg.1 Start
// (function foo() {
//   const a = 1;
//   console.log(a);
// })(); // 无法从外部访问变量
// console.log(a); // 抛出错误："Uncaught ReferenceError: a is not defined"
// Eg.1 End

// 当函数变成立即执行的函数表达式时，表达式中的变量不能从外部访问，它拥有独立的词法作用域。不仅避免了外界访问 IIFE 中的变量，而且又不会污染全局作用域，弥补了 JavaScript 在 scope 方面的缺陷。
// 一般常见于写插件和类库时，如 JQuery 当中的沙箱模式

// Eg.2 Start
// (function (window) {
//   var jQuery = function (selector, context) {
//     return new jQuery.fn.init(selector, context);
//   };
//   jQuery.fn = jQuery.prototype = function () {
//     //原型上的方法，即所有jQuery对象都可以共享的方法和属性
//   };
//   //   jQuery.fn.init.prototype = jQuery.fn;
//   window.jQeury = window.$ = jQuery; //如果需要在外界暴露一些属性或者方法，可以将这些属性和方法加到window全局对象上去
// })(window);
// Eg.2 End

// 当将 IIFE 分配给一个变量，不是存储 IIFE 本身，而是存储 IIFE 执行后返回的结果。
// Eg.3 Start
const result = (function () {
  const name = "张三";
  return name;
})();
console.log(result); // "张三"
// Eg.3 End
