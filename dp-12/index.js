/*
 * @Author: your name
 * @Date: 2021-06-24 13:41:19
 * @LastEditTime: 2021-06-24 15:28:08
 * @LastEditors: Please set LastEditors
 * @Description: 装饰者模式
 * @FilePath: \learn-design-patterns\dp-12\index.js
 * 
 * 核心：为对象动态加入行为
 * 
 */
console.log('// 模拟传统面向对象语言的装饰者模式————start')
console.log('// 飞机大战游戏');
var Plane = function(){};
Plane.prototype.fire=function(){
    console.log('发射普通子弹');
}

var MissileDecorator=function(plane){
    this.plane=plane;
}
MissileDecorator.prototype.fire=function(){
    this.plane.fire();
    console.log('发射导弹');
}

var AtomDecorator=function(plane){
    this.plane = plane;
}
AtomDecorator.prototype.fire=function(){
    this.plane.fire();
    console.log('发射原子弹');
}

var plane=new Plane();
plane=new MissileDecorator(plane);
plane=new AtomDecorator(plane);
plane.fire();

console.log('// javascript 的装饰者————start');
var plane={
    fire: function(){
        console.log('发射普通子弹');
    }
}
var missileDecorator = function(){
    console.log('发射导弹');
}
var atomDecorator=function(){
    console.log('发射原子弹');
}
var fire1=plane.fire;
plane.fire=function(){
    fire1();
    missileDecorator();
}
var fire2=plane.fire;
plane.fire=function(){
    fire2();
    atomDecorator();
}
plane.fire()