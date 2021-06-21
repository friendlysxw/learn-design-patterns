/*
 * @Author: your name
 * @Date: 2021-06-21 13:53:02
 * @LastEditTime: 2021-06-21 15:05:14
 * @LastEditors: Please set LastEditors
 * @Description: 组合模式
 * @FilePath: \learn-design-patterns\dp-7\index.js
 * 
 * 核心：上层对象和下层对象拥有相同的方法
 * 
 */

console.log('// 更强大的宏命令————start');
var MacroCommand=function(){
    return {
        commandsList:[],
        add:function(command){
            this.commandsList.push(command);
        },
        execute:function(){
            for (let i = 0; i < this.commandsList.length; i++) {
                const command = this.commandsList[i];
                command.execute();
            }
        }
    }
}
var openAcCommand={
    execute:function(){
        console.log('打开空调');
    }
}
/** 家里的电视和音响是连接在一起的，所以可以用一个宏命令来组合打开电视和打开音响的命令 */
var openTvCommand={
    execute:function(){
        console.log('打开电视');
    }
}
var openSoundCommand={
    execute:function(){
        console.log('打开音响');
    }
}
var macroCommand1=MacroCommand();
macroCommand1.add(openTvCommand)
macroCommand1.add(openSoundCommand)

/** 关门、打开电脑和打开登陆QQ的命令 */
var closeDoorCommand={
    execute:function(){
        console.log('关门');
    }
}
var openPcCommand={
    execute:function(){
        console.log('开电脑');
    }
}
var openQQCommand={
    execute:function(){
        console.log('登陆QQ');
    }
}
var macroCommand2=MacroCommand();
macroCommand2.add(closeDoorCommand);
macroCommand2.add(openPcCommand);
macroCommand2.add(openQQCommand);
/** 现在把所有的命令组合成一个“超级命令” */
var macroCommand=MacroCommand();
macroCommand.add(openAcCommand);
macroCommand.add(macroCommand1);
macroCommand.add(macroCommand2);
/** 最后给遥控器绑定“超级命令” */
var suporCommand=function(){};
var setCommand=(function(command){
    suporCommand=function(){
        command.execute();
    }
})(macroCommand);
// 触发执行超级命令
suporCommand();

console.log('// 组合模式的例子————扫描文件夹');
/** Folder */
var Folder=function(name){
    this.name=name;
    this.files=[];
}
Folder.prototype.add=function(file){
    this.files.push(file);
}
Folder.prototype.scan=function(){
    console.log('开始扫描文件夹：'+this.name);
    for (let i = 0; i < this.files.length; i++) {
        const file = this.files[i];
        file.scan();
    }
}
/** File */
var File=function(name){
    this.name=name;
}
File.prototype.add=function(){
    console.error('文件下面不能再添加文件');
}
File.prototype.scan=function(){
    console.log('开始扫描文件：'+this.name);
}

/** 原本存在的文件夹及文件 */
var folder=new Folder('学习资料');
var folder1=new Folder('Javascript');
var folder2=new Folder('jQuery');
var file1=new File('JavaScript 设计模式与开发实践');
var file2=new File('精通jQuery');
var file3=new File('重构与模式');

folder1.add(file1);
folder2.add(file2);

folder.add(folder1);
folder.add(folder2);
folder.add(file3);

/** 把以下文件夹及文件复制到原有的树（文件夹）中 */
var folder3=new Folder('Nodejs');
var file4=new File('深入浅出Node.js');
folder3.add(file4);
var file5=new File('Javascript 语言精髓与编程实践');

folder.add(folder3);
folder.add(file5);
/** 执行扫描 */
folder.scan();