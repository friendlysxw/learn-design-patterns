/*
 * @Author: your name
 * @Date: 2021-06-01 16:18:11
 * @LastEditTime: 2021-06-07 16:49:30
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

// 闭包：封装变量

// 闭包：延续局部变量的寿命

// 闭包：内存管理

// 。。。

// 高阶函数：函数作为参数传递

// 高阶函数：函数作为返回值输出

// 高阶函数：实现AOP（面向切面编程）
Function.prototype.before=function(beforefn){
    var __self=this; // 保存原函数的引用
    return function(){ // 返回包含了原函数和新函数的“代理”函数
        beforefn.apply(this.arguments); // 执行新函数，修正this
        return __self.apply(this.arguments); // 执行原函数
    }
}

Function.prototype.after=function(afterfn){
    var __self=this;
    return function(){
        var ret= __self.apply( this , arguments );
        afterfn.apply( this,arguments);
        return ret;
    }
}

var func=function(){
    console.log(2);
}

func =func.before(function(){
    console.log(1)
}).after(function(){
    console.log(3)
})

func();
// 高阶函数：函数柯里化
// 1、常规
var monthlyCost=0;
var cost = function(money){
    monthlyCost+=money;
}
cost(100);
cost(200);
console.log(monthlyCost);
// 2、简易柯里化
var cost=(function(){
    var args=[];
    return function(){
        if (arguments.length===0) {
            var money=0;
            for (let i = 0; i < args.length; i++) {
                money+=args[i];
            }
            return money;
        }else{
            [].push.apply(args,arguments);
        }
    }
})();
cost(100);
cost(200);
cost(300,600);
console.log(cost());
// 3、通用柯里化
var currying=function(fn){
    var args=[];
    return function(){
        if(arguments.length===0){
            return fn.apply(this,args);
        }else{
            [].push.apply(args,arguments);
            return arguments.callee;
        }
    }
}

var cost =(function(){
    var money=0;
    return function(){
        for (let i = 0; i < arguments.length; i++) {
            money+=arguments[i];
        }
        return money;
    }
})();

var cost=currying(cost); // 转化成currying函数

cost(100);
cost(200);
cost(300);
console.log(cost())