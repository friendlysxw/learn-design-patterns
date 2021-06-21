/*
 * @Author: your name
 * @Date: 2021-06-21 15:20:57
 * @LastEditTime: 2021-06-21 16:44:31
 * @LastEditors: Please set LastEditors
 * @Description: 模板方法模式
 * @FilePath: \learn-design-patterns\dp-8\index.js
 * 
 * 核心：
 * 
 * 基于继承的一种设计模式
 * 
 * 模板方法规定了执行哪些抽象方法及抽象方法的执行顺序
 * 
 * 更好的说法是：定义了算法框架
 * 
 */
console.log('// 第一个例子————Coffee or Tea');

console.log('1、先泡一杯咖啡');
var Coffee=function(){};
Coffee.prototype.boilWater=function(){
    console.log('把水煮开');
}
Coffee.prototype.brewCoffeeGriends=function(){
    console.log('用沸水冲泡咖啡');
}
Coffee.prototype.pourInCup=function(){
    console.log('把咖啡倒进杯子');
}
Coffee.prototype.addSugarAndMilk=function(){
    console.log('加糖和牛奶');
}
Coffee.prototype.init=function(){
    this.boilWater();
    this.brewCoffeeGriends();
    this.pourInCup();
    this.addSugarAndMilk();
}
var coffee= new Coffee();
coffee.init();

console.log('2、泡一壶茶');
var Tea=function(){};
Tea.prototype.boilWater=function(){
    console.log('把水煮开');
}
Tea.prototype.steepTeaBag=function(){
    console.log('用沸水浸泡菜叶0');
}
Tea.prototype.pourInCup=function(){
    console.log('把茶叶倒进杯子');
}
Tea.prototype.addLemon=function(){
    console.log('加柠檬');
}
Tea.prototype.init=function(){
    this.boilWater();
    this.steepTeaBag();
    this.pourInCup();
    this.addLemon();
}
var tea=new Tea();
tea.init();

console.log('// 分离出共同点，创建抽象父类————start');
var Beverage=function(){};
Beverage.prototype.boilWater=function(){
    console.log('把水煮开');
}
Beverage.prototype.brew=function(){   //  空方法，应该有子类重写
    throw new Error('子类必须重写brew方法');
};
Beverage.prototype.pourInCup=function(){   //  空方法，应该有子类重写
    throw new Error('子类必须重写pourInCup方法');
};
Beverage.prototype.addCondiments=function(){   //  空方法，应该有子类重写
    throw new Error('子类必须重写addCondiments方法');
};
Beverage.prototype.init=function(){
    this.boilWater();
    this.brew();
    this.pourInCup();
    this.addCondiments();
}
console.log('创建Coffee子类');
var Coffee=function(){};
Coffee.prototype=new Beverage();
Coffee.prototype.brew=function(){
    console.log('用沸水冲泡咖啡');
}
Coffee.prototype.pourInCup=function(){
    console.log('把咖啡倒进杯子');
}
Coffee.prototype.addCondiments=function(){
    console.log('加糖和牛奶');
}
var coffee= new Coffee();
coffee.init();
console.log('创建Tea子类');
var Tea=function(){};
Tea.prototype=new Beverage();
Tea.prototype.brew=function(){
    console.log('用沸水浸泡菜叶0');
}
Tea.prototype.pourInCup=function(){
    console.log('把茶叶倒进杯子');
}
Tea.prototype.addCondiments=function(){
    console.log('加柠檬');
}
var tea=new Tea();
tea.init();