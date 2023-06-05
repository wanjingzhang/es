// JavaScript中constructor属性指向创建当前对象的构造函数，该属性是存在原型里的，且是不可靠的 JavaScript中constructor属性[2]

function test() {}
const obj = new test();
console.log(obj.hasOwnProperty("constructor")); // false
console.log(obj.__proto__.hasOwnProperty("constructor")); // true
console.log(obj.__proto__ === test.prototype); // true
console.log(test.prototype.hasOwnProperty("constructor")); // true

/** constructor是不可靠的 */
function Foo() {}
Foo.prototype = {};
const foo = new Foo();
console.log(foo.constructor === Object); // true，可以看出不是Foo了

// constructor也是一种用于创建和初始化class[3]创建的对象的特殊方法 Class构造方法[4]
// 几个典型的constructor：

(async function () {})().constructor === Promise;

// 浏览器环境下
this.constructor.constructor === Function;
window.constructor.constructor === Function;

// node环境下
this.constructor.constructor === Function;
global.constructor.constructor === Function;
