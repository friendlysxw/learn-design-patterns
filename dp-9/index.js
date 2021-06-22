/*
 * @Author: your name
 * @Date: 2021-06-21 16:49:18
 * @LastEditTime: 2021-06-22 15:35:09
 * @LastEditors: Please set LastEditors
 * @Description: 享元模式
 * @FilePath: \learn-design-patterns\dp-9\index.js
 * 
 * 核心：运用共享技术有效支持大量细粒度的对象
 * 
 * 用时间换空间的设计模式
 */

console.log('// 初始享元模式————start');
// 模特拍照类
var Model=function(sex,underwear){
    this.sex=sex;
    this.underwear=underwear;
};
Model.prototype.takePhoto=function(){
    console.log('sex='+this.sex+' underwer='+this.underwear);
}
// 制作10个男模特，一起穿男装，并拍照
for (let i = 0; i < 10; i++) {
    var maleModel=new Model('male','underwear'+i);
    maleModel.takePhoto();
}
// 制作10个女模特，一起穿女装，并拍照
for (let j = 0; j < 10; j++) {
    var femaleModel=new Model('female','underwear'+j);
    femaleModel.takePhoto();
}

// 使用享元模式改造
var Model=function(sex){
    this.sex=sex;
}
Model.prototype.takePhoto=function(){
    console.log('sex='+this.sex+' underwer='+this.underwear);
}
// 分别创建一个男模特和一个女模特
var maleModel=new Model('male');
var femaleModel=new Model('male');
// 给男模特依次穿上所有男装，并拍照
for (let i = 0; i < 10; i++) {
    maleModel.underwear='underwear'+i;
    maleModel.takePhoto();
}
// 给女模特依次穿上所有女装，并拍照
for (let j = 0; j < 10; j++) {
    femaleModel.underwear='underwear'+j;
    femaleModel.takePhoto();
}

console.log('// 通用对象池————start');
var objectPoolFactory=function(createObjFn){
    var objectPool=[];
    return {
        create:function(){
            var obj=objectPool.length===0?createObjFn.apply(this,arguments):objectPool.shift();
            return obj;
        },
        recover:function(obj){
            objectPool.push(obj);
        }
    }
}