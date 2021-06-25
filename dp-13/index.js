/*
 * @Author: your name
 * @Date: 2021-06-24 16:06:27
 * @LastEditTime: 2021-06-25 15:26:32
 * @LastEditors: Please set LastEditors
 * @Description: 状态模式
 * @FilePath: \learn-design-patterns\dp-13\index.js
 * 
 * 核心：允许一个对象在其内部状态改变时改变它的行为，对象看起来似乎修改了它的类
 * 
 * 基本状态模式案例查看：light.html
 */

console.log('// Javascript版本的状态机————start');

console.log('// 状态机-电灯');
var FSM ={
    off:{
        buttonWasPressed:function(){
            console.log('关灯');
            this.button.innerHTML='下一个按我是开灯';
            this.currState=FSM.on;
        }
    },
    on:{
        buttonWasPressed:function(){
            console.log('开灯');
            this.button.innerHTML='下一个按我是关灯';
            this.currState=FSM.off;
        }
    }
}
var Light=function(){
    this.currState= FSM.off;    // 设置当前状态
    this.button=null;
}
Light.prototype.init=function(){
    var button=document.createElement('button');
    var self=this;
    button.innerHTML='已关灯';
    this.button=document.body.appendChild(button);
    this.button.onclick=function(){
        self.currState.buttonWasPressed.call(self); // 把请求委托给FSM状态机
    }
};
var light=new Light();
light.init();

console.log('// 闭包状态机-电灯');
var delegate=function(client,delegation){
    return {
        buttonWasPressed:function(){    // 将客户的操作委托给delegation对象
            return delegation.buttonWasPressed.apply(client,arguments);
        }
    }
}
var FSM2 ={
    off:{
        buttonWasPressed:function(){
            console.log('关灯');
            this.button.innerHTML='下一个按我是开灯';
            this.currState=this.onState;
        }
    },
    on:{
        buttonWasPressed:function(){
            console.log('开灯');
            this.button.innerHTML='下一个按我是关灯';
            this.currState=this.offState;
        }
    }
}
var Light=function(){
    this.offState=delegate(this,FSM2.off);
    this.onState=delegate(this,FSM2.on);
    this.currState=this.offState;   // 设置初始状态为关闭状态
    this.button=null;
}
Light.prototype.init=function(){
    var button=document.createElement('button');
    var self=this;
    button.innerHTML='已关灯';
    this.button=document.body.appendChild(button);
    this.button.onclick=function(){
        self.currState.buttonWasPressed();
    }
}
var light=new Light();
light.init();