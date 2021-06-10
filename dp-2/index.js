/*
 * @Author: your name
 * @Date: 2021-06-10 15:46:38
 * @LastEditTime: 2021-06-10 16:38:14
 * @LastEditors: Please set LastEditors
 * @Description: 策略模式
 * @FilePath: \learn-design-patterns\learns\dp_2.js
 * 
 * 核心：定义一系列的算法，把它们一个个封装起来，并且使它们可以互相替换
 * 
 */

console.log('// 使用策略模式计算奖金————start')
console.log('1、最初的实现')
var calculateBonus=function(performanceLevel,salary){
    if( performanceLevel === 'S'){
        return salary *4;
    }
    if( performanceLevel === 'A'){
        return salary *3;
    }
    if( performanceLevel === 'B'){
        return salary *2;
    }
}
var cb_B=calculateBonus('B',20000);
var cb_S=calculateBonus('S',6000);
console.log(cb_B)
console.log(cb_S)
console.log('2、使用组合函数重构代码')
var performanceS=function(salary){
    return salary*4;
}
var performanceA=function(salary){
    return salary*3;
}
var performanceB=function(salary){
    return salary*2;
}
var calculateBonus=function(performanceLevel,salary){
    if( performanceLevel === 'S'){
        return performanceS(salary);
    }
    if( performanceLevel === 'A'){
        return performanceA(salary);
    }
    if( performanceLevel === 'B'){
        return performanceB(salary);
    }
}
var cb_A=calculateBonus('A',10000);
console.log(cb_A)
console.log('3、使用策略模式重构代码')
// 策略类
var performanceS=function(){};
performanceS.prototype.calculate=function(salary){
    return salary*4;
}
var performanceA=function(){};
performanceA.prototype.calculate=function(salary){
    return salary*3;
}
var performanceB=function(){};
performanceB.prototype.calculate=function(salary){
    return salary*2;
}
// 奖金类
var Bonus=function(){
    this.salary=null;   // 原始工资
    this.strategy = null;   // 绩效等级对应的策略对象 
};
Bonus.prototype.setSalary=function(salary){
    this.salary=salary; // 设置员工的原始工资
};
Bonus.prototype.setStrategy=function(strategy){
    this.strategy=strategy; // 设置员工绩效等级对应的策略对象
}
Bonus.prototype.getBonus=function(){ // 取得奖金数额
    return this.strategy.calculate(this.salary); // 把计算奖金的操作委托给对应的策略对象
}
var bonus = new Bonus();
bonus.setSalary(10000);
bonus.setStrategy(new performanceS());
console.log(bonus.getBonus());
bonus.setStrategy(new performanceA());
console.log(bonus.getBonus());

console.log('// JavaScript版本的策略模式————start');
var strategies={
    "S":function(salary){
        return salary * 4;
    },
    "A":function(salary){
        return salary * 3;
    },
    "B":function(salary){
        return salary * 2;
    }
}
var calculateBonus=function(level,salary){
    return strategies[level](salary);
}
console.log(calculateBonus('S',20000));
console.log(calculateBonus('A',10000));