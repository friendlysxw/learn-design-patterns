/*
 * @Author: your name
 * @Date: 2021-06-15 15:05:43
 * @LastEditTime: 2021-06-16 14:40:25
 * @LastEditors: Please set LastEditors
 * @Description: 代理模式
 * @FilePath: \learn-design-patterns\dp-3\index.js
 * 
 * 核心：
 */

console.log('// 小明追MM的故事————start')
console.log('1、直接送花')
var Flower=function(){};
var xiaoming={
    sendFlower:function(target){
        var flower=new Flower();
        target.receiveFlower(flower);
    }
}
var A={
    receiveFlower:function(flower){
        console.log('收到花'+flower);
    }
}
xiaoming.sendFlower(A);

console.log('2、通过代理送，小明通过B来给A送花');
var Flower=function(){};
var xiaoming={
    sendFlower:function( target ){
        var flower=new Flower();
        target.receiveFlower(flower);
    }
}
var B={
    receiveFlower:function(flower){
        A.receiveFlower(flower);
    }
}
var A={
    receiveFlower:function(flower){
        console.log('收到花'+flower);
    }
}
xiaoming.sendFlower(B)

console.log('3、通过代理送，小明通过B来给A送花，并且B会选择A心情好的时候再把花转交给A');
var Flower=function(){};
var xiaoming={
    sendFlower:function( target ){
        var flower=new Flower();
        target.receiveFlower(flower);
    }
}
var B={
    receiveFlower:function(flower){
        A.listenGoodMood(function(){    // 监听A的好心情
            A.receiveFlower(flower);
        })
    }
}
var A={
    receiveFlower:function(flower){
        console.log('收到花'+flower);
    },
    listenGoodMood:function(fn){
        setTimeout(function(){ // 假设5秒之后A的心情变好
            fn()
        },5000)
    }
}
xiaoming.sendFlower(B)
console.log('// 虚拟代理：把一些开销很大的对象，延迟到真正需要它的时候才去创建————start')
var B={
    receiveFlower:function(flower){
        A.listenGoodMood(function(){    // 监听A的好心情
            var flower=new Flower();    // 延迟创建flower对象
            A.receiveFlower(flower);
        })
    }
}

console.log('// 缓存代理————start')
console.log('// 计算乘积')
var mult = function(){
    console.log('开始计算乘积');
    var a=1;
    for (let i = 0; i < arguments.length; i++) {
        a=a*arguments[i];
    }
    return a;
}
console.log(mult(2,3))
console.log(mult(2,3,4))
// 加入缓存代理函数
var proxyMult=(function(){
    var cache={};
    return function(){
        var args=Array.prototype.join.call(arguments,',');
        if(args in cache){
            return cache[args];
        }
        return cache[args]=mult.apply(this,arguments);
    }
})()
console.log(proxyMult(1,2,3,4));
console.log(proxyMult(1,2,3,4));

console.log('// 高阶函数动态创建代理————start')
// 计算乘积
var mult = function(){
    var a=1;
    for (let i = 0; i < arguments.length; i++) {
        a=a*arguments[i];
    }
    return a;
}
// 计算加和
var plus=function(){
    var a=0;
    for (let i = 0; i < arguments.length; i++) {
        a =a+ arguments[i];
    }
    return a;
}
// 创建缓存代理的工厂
var createProxyFactory=function(fn){
    var cache={};
    return function(){
        var args=Array.prototype.join.call(arguments,',');
        if(args in cache){
            return cache[args];
        }
        return cache[args]=fn.apply(this,arguments);
    }
}
var proxyMult=createProxyFactory(mult);
var proxyPlus=createProxyFactory(plus);
console.log(proxyMult(1,2,3,4))
console.log(proxyMult(1,2,3,4))
console.log(proxyPlus(1,2,3,4))
console.log(proxyPlus(1,2,3,4))