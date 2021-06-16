/*
 * @Author: your name
 * @Date: 2021-06-16 15:09:24
 * @LastEditTime: 2021-06-16 16:10:29
 * @LastEditors: Please set LastEditors
 * @Description: 迭代器模式
 * @FilePath: \learn-design-patterns\dp-4\index.js
 * 
 * 核心：
 * 提供一种方法访问一个聚合对象中的各个元素，而又不需要暴露该对象的内部表示。
 */
console.log('// 实现自己的迭代器————start');
var each=function(ary,callback){
    for (let i = 0; i < ary.length; i++) {
        callback.call(ary[i],i,ary[i]);        
    }
}
each([1,2,3],function(i,n){
    console.log([i,n]);
})

console.log('// 内部迭代器和外部迭代器————start');

console.log('1、内部迭代器');
// 判断两个数组是否相等的函数
var compare=function(ary1,ary2){
    if(ary1.length!==ary2.length){
        throw new Error('ary1和ary2不相等')
    }
    each(ary1,function(i,n){
        if(n!==ary2[i]){
            throw new Error('ary1 和 ary2不相等');
        }
    })
    console.log('ary1 和 ary2 相等');
}
// compare([1,2,3],[1,2,4]);

console.log('2、外部迭代器');
var Iterator=function(obj){
    var current=0;
    var next = function(){
        current +=1;
    }
    var isDone =function(){
        return current >=obj.length;
    }
    var getCurrItem =function(){
        return obj[current]
    }
    return {
        next,
        isDone,
        getCurrItem
    }
}
// 改写compare函数
var compare=function(iterator1,iterator2){
    while(!iterator1.isDone()&&!iterator2.isDone()){
        if(iterator1.getCurrItem()!==iterator2.getCurrItem()){
            throw new Error('iterator1 和 iterator2 不相等');
        }
        iterator1.next();
        iterator2.next();
    }
    console.log('iterator1 和 iterator2 相等 ');
}
var iterator1=Iterator([1,2,3]);
var iterator2=Iterator([1,2,3]);
compare(iterator1,iterator2)

console.log('// 迭代类数组对象和对象字面量————start');

console.log('// 倒叙迭代器————start');
var reverseEach=function(ary,callback){
    for (let i = ary.length-1; i>=0; i--) {
       callback(i,ary[i])
    }
}
reverseEach([0,1,2],function(i,n){
    console.log(n);
})

console.log('// 中止迭代器————start');
var each=function(ary,callback){
    for (let i = 0; i < ary.length; i++) {
        if(callback(i,ary[i])===false){
            break;
        }
    }
}
each([1,2,3,4],function(i,n){
    if(n>3){
        return false;
    }
    console.log(n);
})

