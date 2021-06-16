/*
 * @Author: your name
 * @Date: 2021-06-16 16:19:41
 * @LastEditTime: 2021-06-16 17:14:45
 * @LastEditors: Please set LastEditors
 * @Description: 发布-订阅模式（观察者模式）
 * @FilePath: \learn-design-patterns\dp-5\index.js
 * 
 * 核心：
 * 
 */

console.log('// 自定义事件————start');

console.log('1、订阅楼房出售消息');
var salesOffices={};    // 定义售楼处（发布者）
salesOffices.clientList=[]; // 缓存列表，存放订阅者的回调函数（电话花名册）
salesOffices.listen=function(fn){ // 增加订阅者
    this.clientList.push(fn); // 订阅的消息添加进缓存列表
};
salesOffices.trigger=function(){ // 发布消息
    for (let i = 0; i < this.clientList.length; i++) {
        const fn = this.clientList[i];
        fn.apply(this,arguments);   // arguments 是发布消息时带上的参数
    }
}
salesOffices.listen(function(price,squareMeter){ // 小明订阅消息
    console.log('小明订阅消息');
    console.log('价格='+price);
    console.log('平方米='+squareMeter);
});
salesOffices.listen(function(price,squareMeter){ // 小红订阅消息
    console.log('小红订阅消息');
    console.log('价格='+price);
    console.log('平方米='+squareMeter);
});

salesOffices.trigger(200000,88);
salesOffices.trigger(300000,110);

console.log('2、让订阅者只订阅自己感兴趣的消息');
var salesOffices={};    // 定义售楼处（发布者）
salesOffices.clientList=[]; // 缓存列表，存放订阅者的回调函数（电话花名册）
salesOffices.listen=function(key,fn){
    if(!this.clientList[key]){  // 如果还没有订阅此类消息，给此类消息创建一个缓存列表
        this.clientList[key]=[];
    }
    this.clientList[key].push(fn);
}
salesOffices.trigger=function(){    // 发布消息
    var key=Array.prototype.shift.call(arguments);  // 取出消息类型
    var fns=this.clientList[key];   // 取出该消息对应的回调函数集合
    if(!fns || fns.length===0){ // 如果没有订阅该消息，则返回
        return false;
    }
    for (let i = 0; i < fns.length; i++) {
        const fn = fns[i];
        fn.apply(this,arguments);   // arguments是发布消息时附带的参数
    }
}
salesOffices.listen('squareMeter88',function(price){    // 小明订阅88平米房子的消息
    console.log('价格='+price);
})  
salesOffices.listen('squareMeter110',function(price){   // 小红订阅110平米房子的消息
    console.log('价格='+price);
})
salesOffices.trigger('squareMeter88',200000);
salesOffices.trigger('squareMeter110',300000);