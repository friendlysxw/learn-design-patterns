/*
 * @Author: your name
 * @Date: 2021-06-23 14:29:56
 * @LastEditTime: 2021-06-23 15:55:32
 * @LastEditors: Please set LastEditors
 * @Description: 中介者模式
 * @FilePath: \learn-design-patterns\dp-11\index.js
 * 
 * 核心：
 * 
 */

console.log('// 中介者模式的例子：泡泡堂游戏————start');
function Player(name){
    this.name = name;
    this.enemy = null;  // 敌人
}
Player.prototype.win=function(){
    console.log(this.name+' won');
}
Player.prototype.lose=function(){
    console.log(this.name+' lost');
}
Player.prototype.die=function(){
    this.lose();
    this.enemy.win();
}
// 创建两个玩家
var player1=new Player('皮蛋');
var player2=new Player('小乖');
// 给玩家相互设置敌人
player1.enemy=player2;
player2.enemy=player1;
player1.die()

console.log('// 为游戏增加队伍');
var players=[];
function Player(name,teamColor){
    this.partners = []; // 队友列表
    this.enemies=[]; // 敌人列表
    this.state='live'; // 玩家状态
    this.name=name; // 角色名字
    this.teamColor=teamColor;   // 队伍颜色
}
Player.prototype.win=function(){    // 玩家团队胜利
    console.log('winner:'+this.name);   
}
Player.prototype.lose=function(){   // 玩家团队失败
    console.log('loser:'+this.name);
}

Player.prototype.die=function(){    // 玩家死亡
    var all_dead=true;
    this.state='dead';  // 设置玩家状态为死亡
    for (let i = 0; i < this.partners.length; i++) {
        const partner = this.partners[i];
        if(partner.state!=='dead'){ // 如果还有一个队友没有死亡，则游戏还未失败
            all_dead=false;
            break;
        }
    }
    if(all_dead === true){  // 如果队友全部死亡
        this.lose();    // 通知自己游戏失败
        for (let i = 0; i < this.partners.length; i++) {    // 通知所有队友玩家游戏失败
            const partner = this.partners[i];
            partner.lose();
        }
        for (let i = 0; i < this.enemies.length; i++) { // 通知所有敌人游戏胜利
            const enemie = this.enemies[i];
            enemie.win();
        }
    }
}
// 定义一个工厂来创建玩家
var playerFactory=function(name,teamColor){
    var newPlayer=new Player(name,teamColor); // 创建新玩家
    for (let i = 0; i < players.length; i++) { // 通知所有玩家，有新角色加入
        const player = players[i];
        if(player.teamColor === newPlayer.teamColor){   // 如果是同一对的玩家
            player.partners.push(newPlayer);    // 相互添加到队友列表
            newPlayer.partners.push(player);
        }else{
            player.enemies.push(newPlayer); // 相互添加到敌人列表
            newPlayer.enemies.push(player);
        }
    }
    players.push(newPlayer);
    return newPlayer;
}
// 创建玩家
// 红队
var player1=playerFactory('皮蛋','red');
var player2=playerFactory('小乖','red');
var player3=playerFactory('宝宝','red');
var player4=playerFactory('小强','red');
// 蓝队
var player5=playerFactory('黑妞','blue');
var player6=playerFactory('葱头','blue');
var player7=playerFactory('胖墩','blue');
var player8=playerFactory('海盗','blue');
// 让红队玩家全部死亡
player1.die();
player2.die();
player3.die();
player4.die();

console.log('用中介者模式改造泡泡堂游戏————start');
function Player2(name,teamColor){
    this.state='alive'; // 玩家状态
    this.name=name; // 角色名字
    this.teamColor=teamColor;   // 队伍颜色
}
Player2.prototype.win=function(){
    console.log(this.name+' won');
}
Player2.prototype.lose=function(){
    console.log(this.name+' lost');
}
// 玩家死亡
Player2.prototype.die=function(){
    this.state='dead';
    playerDirector.reciveMessage('playerDead',this);    // 给中介者发送消息，玩家死亡
}
// 移出玩家
Player2.prototype.remove=function(){
    playerDirector.reciveMessage('removerPlayer',this); // 给中介者发送消息，移出一个玩家
}
// 玩家换队
Player2.prototype.changeTeam=function(color){
    playerDirector.reciveMessage('changeTeam',this,color);  // 给中介者发送消息，玩家换队
}

// 定义中介者
var playerDirector=(function(){
    var players={}; // 保存所有玩家
    var operations={};  // 中介者可以执行的操作
    // 新增玩家
    operations.addPlayer=function(player){
        var teamColor=player.teamColor; // 玩家的队伍颜色
        players[teamColor]=players[teamColor] || [];    // 如果该颜色的玩家还没有成立队伍，则新成立一个
        players[teamColor].push(player);    // 添加玩家进队伍
    };
    // 移出玩家
    operations.removePlayer=function(player){
        var teamColor=player.teamColor; // 玩家的队伍颜色
        var teamPlayers=players[teamColor] || [];   // 该队伍所有成员
        for (let i = 0; i < teamPlayers.length; i++) {
            const teamPlayer = teamPlayers[i];
            if(teamPlayer===player){
                teamPlayers.splice(i,1);
            }
        }
    }
    // 玩家换队
    operations.changeTeam=function(player,newTeamColor){
        operations.removePlayer(player);    // 从原队伍中删除
        player.teamColor=newTeamColor;  // 改变队伍颜色
        operations.addPlayer(player);   // 新增到新队伍中
    }
    // 玩家死亡
    operations.playerDead=function(player){
        var teamColor=player.teamColor;
        var teamPlayers=players[teamColor]; // 玩家所在队伍
        var all_dead=true;
        for (let i = 0; i < teamPlayers.length; i++) {
            const teamPlayer = teamPlayers[i];
            if(teamPlayer.state!=='dead'){
                all_dead=false;
                break;
            }
        }
        if(all_dead===true){    // 全部死亡
            for (let i = 0; i < teamPlayers.length; i++) {
                const teamPlayer = teamPlayers[i];
                teamPlayer.lose();  // 本队所有玩家lose
            }
            for (const color in players) {
                if(color!==teamColor){
                    var teamPlayers=players[color]; // 其它队伍的玩家
                    for (let i = 0; i < teamPlayers.length; i++) {
                        const teamPlayer = teamPlayers[i];
                        teamPlayer.win();   // 其它队伍所有玩家win
                    }
                }
            }
        }
    }
    var reciveMessage=function(){
        var message=Array.prototype.shift.call(arguments);  // arguments的第一个参数为消息名称
        operations[message].apply(this,arguments);
    }
    return {
        reciveMessage:reciveMessage
    }
})();
// 创建玩家的工厂
var playerFactory=function(name,teamColor){
    var newPlayer=new Player2(name,teamColor);   // 创建一个新的玩家对象
    playerDirector.reciveMessage('addPlayer',newPlayer);    // 给中介者发送消息，新增玩家
    return newPlayer;
}
// 创建玩家
// 红队
var player1=playerFactory('皮蛋','red');
var player2=playerFactory('小乖','red');
var player3=playerFactory('宝宝','red');
var player4=playerFactory('小强','red');
// 蓝队
var player5=playerFactory('黑妞','blue');
var player6=playerFactory('葱头','blue');
var player7=playerFactory('胖墩','blue');
var player8=playerFactory('海盗','blue');
// 让红队玩家全部死亡
player1.die();
player2.die();
player3.die();
player4.die();