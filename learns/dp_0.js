/*
 * @Author: your name
 * @Date: 2021-06-01 16:18:11
 * @LastEditTime: 2021-06-03 15:39:55
 * @LastEditors: Please set LastEditors
 * @Description: 学习设计模式前的准备
 * @FilePath: \learn-design-patterns\learns\dp_0.js
 */

/**
 * this 指向
 */

// 1.作为对象的方法调用,this指向该对象
var obj={
    a:1,
    getA:function(){
        console.log( this === obj );
        console.log( this.a );
    }
}
obj.getA();

// 2.作为普通函数调用,this指向全局对象
global.name = 'globalName';
var getName = function(){
    return this.name;
}
console.log( getName() );

global.name = 'globalName2';
var myObject={
    name:'sven',
    getName:function(){
        return this.name;
    }
}
var getName=myObject.getName;
console.log( getName() );

// 3.构造器调用，this指向new运算符调用的函数
var MyClass=function(){
    this.name='sven';
};
var obj=new MyClass();
console.log(obj.name);

// 4.Function.prototype.call 或Function.prototype.apply调用，可以动态修改this
var obj1 = {
    name:'sven',
    getName:function(){
        return this.name;
    }
}
var obj2 = {
    name:'anne'
}
console.log(obj1.getName());
console.log(obj1.getName.call(obj2));

/**
 * apply 和 call
 */

// apply使用
var func=function(a,b,c){
    console.log(this.name)
    console.log([a,b,c])
}
var obj={name:'apply'}
func.apply(obj,[1,2,3]);

// call使用
var obj={name:'call'}
func.call(obj,1,2,3);

// Function.prototype.bind实现
Function.prototype.bind=function(context){
    var self = this;
    return function(){
        return self.apply(context,arguments);
    }
}
var obj={
    name:'sven'
}
var func=function(){
    console.log(this.name);
}.bind(obj);
func();

// 借用其他对象的方法
(function(){
    Array.prototype.push.call(arguments,3);
    console.log(arguments);
})(1,2)

/**
 * 闭包和高阶函数
 */