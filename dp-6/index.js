/*
 * @Author: your name
 * @Date: 2021-06-17 17:24:35
 * @LastEditTime: 2021-06-18 17:30:38
 * @LastEditors: Please set LastEditors
 * @Description: 命令模式
 * @FilePath: \learn-design-patterns\dp-6\index.js
 * 
 * 核心：知道自己当前要表达一件事情，但并不知道这件事情让谁去实现，及怎么实现，及实现的结果
 * 
 */

console.log('// 宏命令————start');
// 定义接收者极其行为
var closeDoorCommand={
    execute: function(){
        console.log('关门');
    },
    undo: function(){
        console.log('门又回到了打开状态');
    }
}
var openPcCommand={
    execute:function(){
        console.log('开电脑');
    },
    undo: function(){
        console.log('电脑又回到了关闭状态');
    }
}
var openQQCommand={
    execute:function(){
        console.log('登陆QQ');
    },
    undo: function(){
        console.log('QQ又回到了未登录状态');
    }
}
// 定义宏命令
var MacroCommand=function(){
    return {
        commandsList:[],
        add: function(command){
            this.commandsList.push(command);
        },
        execute:function(){ // 执行命令
            for (let i = 0; i < this.commandsList.length; i++) {
                const command = this.commandsList[i];
                command.execute();
            }
        },
        undo:function(){    // 撤销命令
            for (let i = 0; i < this.commandsList.length; i++) {
                const command = this.commandsList[i];
                command.undo();
            }
        }
    }
}
var macroCommand= MacroCommand();
macroCommand.add(closeDoorCommand);
macroCommand.add(openPcCommand);
macroCommand.add(openQQCommand);
macroCommand.execute();
macroCommand.undo();