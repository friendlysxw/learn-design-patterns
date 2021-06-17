/*
 * @Author: your name
 * @Date: 2021-06-16 16:19:41
 * @LastEditTime: 2021-06-17 17:22:33
 * @LastEditors: Please set LastEditors
 * @Description: 发布-订阅模式（观察者模式）
 * @FilePath: \learn-design-patterns\dp-5\index.js
 * 
 * 核心：当一个对象的状态发生改变时，所有依赖于它的对象都将得到通知
 * 
 * 优点：时间上的解耦，对象之间的解耦
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

console.log("// 发布订阅模式的通用实现————start");
var Event={
    clientList:[],
    listen:function(key,fn){
        if(!this.clientList[key]){
            this.clientList[key]=[];
        }
        this.clientList[key].push(fn);  // 订阅的消息添加进缓存列表
    },
    trigger: function(){
        var key=Array.prototype.shift.call(arguments);
        var fns=this.clientList[key];
        if(!fns || fns.length===0){ // 如果没有绑定对应的消息
            return false;
        }
        for (let i = 0; i < fns.length; i++) {
            const fn = fns[i];
            fn.apply(this,arguments);   //  arguments 是trigger时带上的参数
        }
    }
}
var installEvent =function(obj){
    for (const i in Event) {
        obj[i]=Event[i]
    }
}
var salesOffices={};
installEvent(salesOffices);
console.log('salesOffices',salesOffices);

console.log('// 取消订阅的事件————start');
Event.remove=function(key,fn){
    var fns=this.clientList[key];
    if(!fns){   // 如果key对应的消息没有被人订阅，则直接返回
        return false;
    }
    if(!fn){    // 如果没有插入具体的回调函数，表示需要取消key对应消息的所有订阅
        fns && (fns.length=0);
    }else{
        for (var l=fns.length-1;l>=0;l--) { // 反向遍历订阅的回调函数列表
            var _fn=fns[l];
            if(_fn===fn){
                fns.splice(l,1);    //  删除订阅者的回调函数
            }
            
        }
    }
}

var salesOffices={};
installEvent(salesOffices);

console.log('// 全局的发布-订阅对象');
var Event=(function(){
    var clientList={},listen,trigger,remove;
    listen=function(key,fn){
        if(!this.clientList[key]){
            this.clientList[key]=[];
        }
        this.clientList[key].push(fn);  // 订阅的消息添加进缓存列表
    },
    trigger=function(){
        var key=Array.prototype.shift.call(arguments);
        var fns=this.clientList[key];
        if(!fns || fns.length===0){ // 如果没有绑定对应的消息
            return false;
        }
        for (let i = 0; i < fns.length; i++) {
            const fn = fns[i];
            fn.apply(this,arguments);   //  arguments 是trigger时带上的参数
        }
    }
    remove=function(key,fn){
        var fns=this.clientList[key];
        if(!fns){   // 如果key对应的消息没有被人订阅，则直接返回
            return false;
        }
        if(!fn){    // 如果没有插入具体的回调函数，表示需要取消key对应消息的所有订阅
            fns && (fns.length=0);
        }else{
            for (var l=fns.length-1;l>=0;l--) { // 反向遍历订阅的回调函数列表
                var _fn=fns[l];
                if(_fn===fn){
                    fns.splice(l,1);    //  删除订阅者的回调函数
                }
                
            }
        }
    }
    return {
        listen,trigger,remove
    }
})()

console.log('// 模块间通信————start');

console.log('// 解决全局事件的命名冲突————start');
var Event=(function(){
    var global=this,Event,_default='default';
    Event=function(){
        var _listen,_trigger,_remove,
            _slice=Array.prototype.slice,
            _shift=Array.prototype.shift,
            _unshift=Array.prototype.unshift,
            namespaceCache={},
            _create,find,
            each=function(ary,fn){
                var ret;
                for (let i = 0; i < ary.length; i++) {
                    const n = ary[i];
                    ret=fn.call(n,i,n);
                }
                return ret;
            }
        _listen=function(key,fn,cache){
            if(!cache[key]){
                cache[key]=[]
            }
            cache[key].push(fn);
        }
        _remove=function(key,cache,fn){
            if(cache[key]){
                if(fn){
                    for (let i = 0; i < cache[key].length; i++) {
                        if(cache[key][i]===fn){
                            cache[key].splice(i,1);
                        }
                    }
                }else{
                    cache[key]=[];
                }
            }
        }
        _trigger=function(){
            var cache=_shift.call(arguments),
                key=_shift.call(arguments),
                args=arguments,
                _self=this,
                ret,
                stack=cache[key];
            if(!stack||!stack.length){
                return;
            }
            return each(stack,function(){
                return this.apply(_self,args);
            })
        }
        _create=function(namespace){
            var namespace=namespace || _default;
            var cache={},
                offlineStack=[],    //  离线事件
                ret={
                    listen:function(key,fn,last){
                        _listen(key,fn,cache);
                        if(offlineStack===null){
                            return;
                        }
                        if(last==='last'){
                            offlineStack.length && offlineStack.pop()();
                        }else{
                            each(offlineStack,function(){
                                this();
                            })
                        }
                        offlineStack=null;
                    },
                    one:function(key,fn,last){
                        _remove(key,cache);
                        this.listen(key,fn,last);
                    },
                    remove:function(key,fn){
                        _remove(key,cache,fn);
                    },
                    trigger:function(){
                        var fn,args,_self=this;
                        _unshift.call(arguments,cache);
                        args=arguments;
                        fn=function(){
                            return _trigger.apply(_self,args);
                        }
                        if(offlineStack){
                            return offlineStack.push(fn);
                        }
                        return fn();
                    }
                };
                return namespace?(namespaceCache[namespace]?namespaceCache[namespace]:namespaceCache[namespace]=ret):ret;
        };
        return {
            create:_create,
            one:function(key,fn,last){
                var event=this.create();
                event.one(key,fn,last);
            },
            remove:function(key,fn){
                var event=this.create();
                event.remove(key,fn);
            },
            listen:function(key,fn,last){
                var event=this.create();
                event.listen(key,fn,last);
            },
            trigger:function(){
                var event=this.create();
                event.trigger.apply(this,arguments);
            }
        };
    }();
    return Event;
})()