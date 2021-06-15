/*
 * @Author: your name
 * @Date: 2021-06-15 15:05:43
 * @LastEditTime: 2021-06-15 15:34:06
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