// JS Proxy getPrototypeOf()是一个代理方法，当读取代理对象的原型时，该方法就会被调用。语法：

// const p = new Proxy(obj, {
//   getPrototypeOf(target) { // target 被代理的目标对象。
//   ...
//   }
// });
// 当 getPrototypeOf 方法被调用时，this 指向的是它所属的处理器对象，getPrototypeOf 方法的返回值必须是一个对象或者 null。

// 在 JavaScript 中，有下面这五种操作（方法/属性/运算符）可以触发 JS 引擎读取一个对象的原型，也就是可以触发 getPrototypeOf() 代理方法的运行：
// •Object.getPrototypeOf()[5]
// •Reflect.getPrototypeOf()[6]
// •proto[7]
// •Object.prototype.isPrototypeOf()[8]
// •instanceof[9]

// 如果遇到了下面两种情况，JS 引擎会抛出 TypeError[10] 异常：
// •getPrototypeOf() 方法返回的不是对象也不是 null。
// •目标对象是不可扩展的，且 getPrototypeOf() 方法返回的原型不是目标对象本身的原型。

// Eg.1 Start
// const obj = {};
// const proto = {};
// const handler = {
//   getPrototypeOf(target) {
//     console.log(target === obj); // true
//     console.log(this === handler); // true
//     return proto;
//   },
// };
// var p = new Proxy(obj, handler); // obj是被代理的对象，也就是handler.getPrototypeOf的target参数
// console.log(Object.getPrototypeOf(p) === proto); // true
// Eg.1 End

// 5 种触发 getPrototypeOf 代理方法的方式：
// Eg.2 Start
// const obj = {};
// const p = new Proxy(obj, {
//   getPrototypeOf(target) {
//     return Array.prototype;
//   },
// });

// console.log(
//   Object.getPrototypeOf(p) === Array.prototype, // true
//   Reflect.getPrototypeOf(p) === Array.prototype, // true
//   p.__proto__ === Array.prototype, // true
//   Array.prototype.isPrototypeOf(p), // true
//   p instanceof Array // true
// );
// Eg.2 End

// ============= 两种异常的情况：=======================

// getPrototypeOf() 方法返回的不是对象也不是 null
// Eg.3 Start
// const obj = {};
// const p = new Proxy(obj, {
//   getPrototypeOf(target) {
//     return "foo";
//   },
// });
// Object.getPrototypeOf(p); // Uncaught TypeError: 'getPrototypeOf' on proxy: trap returned neither object nor null
// Eg.3 End

// 目标对象是不可扩展的，且 getPrototypeOf() 方法返回的原型不是目标对象本身的原型
// Eg.4 Start
// const obj = Object.preventExtensions({}); // obj不可扩展
// const p = new Proxy(obj, {
//   getPrototypeOf(target) {
//     return {};
//   },
// });
// Object.getPrototypeOf(p); // Uncaught TypeError: 'getPrototypeOf' on proxy: proxy target is non-extensible but the trap did not return its actual prototype
// Eg.4 End

// 如果对上面的代码做如下的改造就没问题
// Eg.5 Start
const obj = Object.preventExtensions({}); // obj不可扩展
const p = new Proxy(obj, {
  getPrototypeOf(target) {
    // target就是上面的obj
    return obj.__proto__; // 返回的是目标对象本身的原型
  },
});
console.log(Object.getPrototypeOf(p)); // 不报错
// Eg.5 End
