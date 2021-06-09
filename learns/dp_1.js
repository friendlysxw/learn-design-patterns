/*
 * @Author: your name
 * @Date: 2021-05-28 16:23:49
 * @LastEditTime: 2021-06-09 16:58:05
 * @LastEditors: Please set LastEditors
 * @Description: 单例模式
 * @FilePath: \learn-design-patterns\learns\dp_1.js
 * 
 * 单例模式的核心是确保只有一个实例，并提供全局访问。
 * 
 */


console.log('// 简单单例模式————start')
var Singleton = function(name){
    this.name = name;
    this.instance = null;
}
Singleton.prototype.getName = function(){
    console.log(this.name);
};
Singleton.getInstance=function(name){
    if(!this.instance){
        this.instance=new Singleton(name);
    }
    return this.instance;
}
var a=Singleton.getInstance('sven1');
var b=Singleton.getInstance('sven2');
console.log(a===b);

console.log('// 透明的单例模式————start')
var CreateLog=(function(){
    var instance;
    var CreateLog=function(log){
        if(instance){
            return instance;
        }
        this.log=log;
        this.init();
        return instance=this;
    }
    CreateLog.prototype.init=function(){
        console.log(this.log);
    }
    return CreateLog;
})();
var a=new CreateLog('log1');
var b=new CreateLog('log2');
console.log(a===b);

console.log('// 用代理实现单例模式————start')
var CreateLog=function(log){
    this.log=log;
    this.init();
}
CreateLog.prototype.init=function(){
    console.log(this.log)
}
var ProxySingletonCreateLog=(function(){
    var instance;
    return function(log){
        if(!instance){
            instance=new CreateLog(log);
        }
        return instance;
    }
})();
var a=ProxySingletonCreateLog('proxy1');
var b=ProxySingletonCreateLog('proxy2');
console.log(a===b);

console.log('// JavaScript中的单例模式————start')
// 单例的变量
var a={}; 
// 1、使用命名空间
var namespace1 = {
    a: function(){
        console.log(1)
    },
    b: function(){
        console.log(2)
    }
}
// 动态创建命名空间
var MyApp= {};
MyApp.namespace=function(name){
    var parts = name.split('.');
    var current = MyApp; // 引用最外层对象
    for (const attr of parts) {
        if(!current[attr]){
            current[attr]={};
        }
        current=current[attr]; // 引用当前的属性对象
    }
}
MyApp.namespace('event');
MyApp.namespace('dom.style');
console.log(MyApp);
// 2、使用闭包封装私有变量
var user=(function(){
    var __name='sven',__age=29;
    return {
        getUserInfo:function(){
            return __name+'-'+__age;
        }
    }
})();

console.log('// 【重点】惰性单例————start');
// 1、加载时创建obj对象
var createLog=(function(){
    var obj={
        log:'Im Log Obj'
    }
    return obj;
})();
var mockOnclick=function(log){ // 模拟点击事件，执行事件改变log
    createLog.log=log
    return createLog;
}
var obj=mockOnclick('click log1');
console.log(obj);
// 2、惰性创建obj对象
var createLog=function(){
    var obj={
        log:'Im Log Obj'
    }
    return obj;
}
var mockOnclick=function(log){ // 模拟点击事件，执行事件改变log
    var obj=createLog();
    obj.log=log;
    return obj;
}
var obj2=mockOnclick('click log2');
console.log(obj2);
// 3、惰性创建单例的obj对象
var createLog=(function(){
    var obj;
    return function(){
        if(!obj){
            obj={
                log:'Im Log Obj'
            }
        }
        return obj;
    }
})()
var mockOnclick=function(log){ // 模拟点击事件，执行事件改变log
    var obj=createLog();
    obj.log=log;
    return obj;
}
var obj3=mockOnclick('click log3');
var obj4=mockOnclick('click log4');
console.log(obj3);
console.log(obj4);
console.log(obj3===obj4);


console.log('// 通用的惰性单例————start');
// 提取单例通用部分
var getSingle=function(fn){
    var result;
    return function(){
        return result || (result= fn.apply(this,arguments));
    }
}
// 创建单一log
var createLog=getSingle(function(){
    var obj={
        log:'Im Log Obj'
    }
    return obj;
});
// 创建单一div
var createDiv=getSingle(function(){
    var div={
        html:'Im Div Html'
    }
    return div;
})
var mockOnclick=function(log){ // 模拟点击事件，执行事件改变log
    var obj=createLog();
    obj.log=log;
    return obj;
}
var obj5=mockOnclick('click log5');
var obj6=mockOnclick('click log6');
console.log(obj5)
console.log(obj6)
console.log(obj5===obj6)