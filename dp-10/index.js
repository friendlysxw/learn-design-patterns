/*
 * @Author: your name
 * @Date: 2021-06-22 15:47:14
 * @LastEditTime: 2021-06-23 14:30:42
 * @LastEditors: Please set LastEditors
 * @Description: 职责链模式
 * @FilePath: \learn-design-patterns\dp-10\index.js
 * 
 * 核心：约定条件向下传递，直到可以解决
 * 
 */

console.log('// 定金处理案例————start');
/**
 * @description: 
 * @param {*} orderType 订单类型
 * @param {*} pay   是否已支付定金
 * @param {*} stock 库存数量
 * @return {*}
 */
var order=function(orderType,pay,stock){
    if(orderType===1){  // 500元定金购买模式
        if(pay===true){ //  已支付定金
            console.log('500元定金预购，得到100元优惠券');
        }else{  // 为支付定金，降低到普通购买模式
            if(stock>0){    //  用于普通购买的设计还有库存
                console.log('普通购买，无优惠券');
            }else{
                console.log('手机库存不足');
            }
        }
    }else if(orderType===2){    // 200元定金购买模式
        if(pay===true){
            console.log('200元定金预购，得到50元优惠券');
        }else{
            if(stock>0){
                console.log('普通购买，无优惠券');
            }else{
                console.log('设计库存不足');
            }
        }
    }else if(orderType===3){    // 普通购买
        if(stock>0){
            console.log('普通购买，无优惠券');
        }else{
            console.log('设计库存不足');
        }
    }
}
order(1,true,500);

console.log('// 用职责链模式重构代码————start');
// 500元订单
var order500=function(orderType,pay,stock){
    if(orderType===1&&pay===true){
        console.log('500元定金预购，得到100元优惠券');
    }else{
        order200(orderType,pay,stock);  // 将请求传递改200元订单
    }
}
// 200元订单
var order200=function(orderType,pay,stock){
    if(orderType===2&&pay===true){
        console.log('200元定金预购，得到50优惠券');
    }else{
        orderNormal(orderType,pay,stock);   // 将请求传递给普通订单
    }
}
// 普通购买订单
var orderNormal=function(orderType,pay,stock){
    if(stock>0){
        console.log('普通购买，无优惠券');
    }else{
        console.log('手机库存不足');
    }
}
order500(1,true,500);
order500(1,false,500);
order500(2,true,500);
order500(3,false,500);
order500(3,false,0);

console.log('// 灵活可拆分的职责链节点————start');
var order500=function(orderType,pay,stock){
    if(orderType===1&&pay===true){
        console.log('500元定金预定，得到100优惠券');
    }else{
        return 'nextSuccessor'; // 我不知道下一个节点是谁，反正吧请求往后面传递
    }
};
var order200=function(orderType,pay,stock){
    if(orderType===2&&pay===true){
        console.log('200元定金预定，得到50优惠券');
    }else{
        return 'nextSuccessor'; // 我不知道下一个节点是谁，反正吧请求往后面传递
    }
};
var orderNormal=function(orderType,pay,stock){
    if(stock>0){
        console.log('普通购买，无优惠券');
    }else{
        console.log('手机库存不足');
    }
}
var Chain=function(fn){
    this.fn=fn;
    this.nextSuccessor=null;
}
Chain.prototype.setNextSuccessor=function(nextSuccessor){
    return this.nextSuccessor=nextSuccessor;
}
Chain.prototype.passRequest=function(){
    var ret=this.fn.apply(this,arguments);
    if(ret==='nextSuccessor'){
        return this.nextSuccessor&&this.nextSuccessor.passRequest.apply(this.nextSuccessor,arguments);
    }
    return ret;
}
// 现在把3个订单函数分别包装成职责链的节点
var chainOrder500 = new Chain(order500);
var chainOrder200 = new Chain(order200);
var chainOrderNormal = new Chain(orderNormal);
// 然后指定节点在职责链中的顺序
chainOrder500.setNextSuccessor(chainOrder200);
chainOrder200.setNextSuccessor(chainOrderNormal);
// 最后把请求传递给第一个节点
chainOrder500.passRequest(1,true,500);
chainOrder500.passRequest(2,true,500);
chainOrder500.passRequest(3,false,500);
chainOrder500.passRequest(1,false,0);

console.log('// 异步的职责链————start');
Chain.prototype.next=function(){
    return this.nextSuccessor && this.nextSuccessor.passRequest.apply(this.nextSuccessor,arguments);
}
var fn1=new Chain(function(){
    console.log(1);
    return 'nextSuccessor';
});
var fn2=new Chain(function(){
    console.log(2);
    var self=this;
    setTimeout(function(){
        self.next();
    },1000)
})
var fn3=new Chain(function(){
    console.log(3);
})
fn1.setNextSuccessor(fn2).setNextSuccessor(fn3);
fn1.passRequest();

console.log('// 用AOP实现职责链————start');
Function.prototype.after=function(fn){
    var self=this;
    return function(){
        var ret = self.apply(this,arguments);
        if(ret==='nextSuccessor'){
            return fn.apply(this,arguments);
        }
        return ret;
    }
}
var order=order500.after(order200).after(orderNormal);
order(1,true,500);
order(2,true,500);
order(1,false,500);
