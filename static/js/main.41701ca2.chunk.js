(this["webpackJsonpmalwoden-test"]=this["webpackJsonpmalwoden-test"]||[]).push([[0],{18:function(e,t,a){"use strict";a.r(t);var r,n,o,i,s,l=a(5),c=a.n(l),u=a(10),h=a.n(u),d=a(0),p=a(4),y=a(11),m=a(12),f=a(2),v=a(3),b=a(1);!function(e){e[e.none=0]="none",e[e.tree=1]="tree",e[e.mountain=2]="mountain",e[e.hedge=4]="hedge",e[e.mushroomRed=5]="mushroomRed",e[e.mushroomPurple=6]="mushroomPurple",e[e.mushroomDarkPurple=7]="mushroomDarkPurple",e[e.wall=8]="wall"}(s||(s={}));var g,w=(r={},Object(b.a)(r,s.none,!1),Object(b.a)(r,s.tree,!0),Object(b.a)(r,s.mountain,!0),Object(b.a)(r,s.hedge,!0),Object(b.a)(r,s.mushroomRed,!0),Object(b.a)(r,s.mushroomPurple,!0),Object(b.a)(r,s.mushroomDarkPurple,!0),Object(b.a)(r,s.wall,!0),r),x=(n={},Object(b.a)(n,s.none,d.f.fromCharCode(d.a.blackSquare,d.b.Black,d.b.Black)),Object(b.a)(n,s.tree,d.f.fromCharCode(d.a.blackSpadeSuit,d.b.Green)),Object(b.a)(n,s.mountain,d.f.fromCharCode(d.a.blackUpPointingTriangle,d.b.Brown)),Object(b.a)(n,s.hedge,d.f.fromCharCode(d.a.greekSmallLetterPi)),Object(b.a)(n,s.mushroomRed,d.f.fromCharCode(d.a.blackSpadeSuit,d.b.Red)),Object(b.a)(n,s.mushroomPurple,d.f.fromCharCode(d.a.blackClubSuit,d.b.MediumPurple)),Object(b.a)(n,s.mushroomDarkPurple,d.f.fromCharCode(d.a.blackSpadeSuit,d.b.Purple)),Object(b.a)(n,s.wall,d.f.fromCharCode(d.a.asterisk,d.b.White)),n),C=(o={},Object(b.a)(o,s.none,d.f.fromCharCode(d.a.blackSquare,d.b.Black.blendPercent(d.b.DimGray,50),d.b.Black.blendPercent(d.b.DimGray,50))),Object(b.a)(o,s.tree,d.f.fromCharCode(d.a.blackSpadeSuit,d.b.Black.blendPercent(d.b.DimGray,20),d.b.Black.blendPercent(d.b.DimGray,50))),Object(b.a)(o,s.mountain,d.f.fromCharCode(d.a.blackUpPointingTriangle,d.b.DarkGray)),Object(b.a)(o,s.hedge,d.f.fromCharCode(d.a.greekSmallLetterPi)),Object(b.a)(o,s.mushroomRed,d.f.fromCharCode(d.a.blackSpadeSuit,d.b.Gray)),Object(b.a)(o,s.mushroomPurple,d.f.fromCharCode(d.a.blackClubSuit,d.b.DimGray)),Object(b.a)(o,s.mushroomDarkPurple,d.f.fromCharCode(d.a.blackSpadeSuit,d.b.DarkGray)),Object(b.a)(o,s.wall,d.f.fromCharCode(d.a.asterisk,d.b.Gray)),o),S=(i={},Object(b.a)(i,s.none,!1),Object(b.a)(i,s.tree,!0),Object(b.a)(i,s.mountain,!0),Object(b.a)(i,s.hedge,!0),Object(b.a)(i,s.mushroomRed,!0),Object(b.a)(i,s.mushroomPurple,!0),Object(b.a)(i,s.mushroomDarkPurple,!0),Object(b.a)(i,s.wall,!0),i);!function(e){e.LOW="low",e.MID="mid",e.HIGH="high",e.WARNING="warning"}(g||(g={}));var A,k,P=new(function(){function e(){Object(f.a)(this,e),this.maxLogs=7,this.entries=[],this.lastEntry="",this.lastEntryCount=1}return Object(v.a)(e,[{key:"addEntryLow",value:function(e){this.addEntry(g.LOW,e)}},{key:"addEntryMid",value:function(e){this.addEntry(g.MID,e)}},{key:"addEntryHigh",value:function(e){this.addEntry(g.HIGH,e)}},{key:"addEntryWarning",value:function(e){this.addEntry(g.WARNING,e)}},{key:"addEntry",value:function(e,t){for(t===this.lastEntry?(this.lastEntryCount++,this.entries.pop(),this.entries.push([e,"".concat(t," (x").concat(this.lastEntryCount,")")])):(this.entries.push([e,t]),this.lastEntryCount=1),this.lastEntry=t;this.entries.length>this.maxLogs;)this.entries.shift()}},{key:"length",value:function(){return this.entries.length}}]),e}()),O=52,E=38,G=function(){function e(t,a,r,n){Object(f.a)(this,e),this.name=void 0,this.startPos=void 0,this.entites=void 0,this.map=void 0,this.fow=void 0,this.fowVisited=void 0,this.name=t,this.map=a,this.entites=r,this.startPos=n,this.fow=!0,this.fowVisited=new d.k.Table(this.map.width,this.map.height)}return Object(v.a)(e,[{key:"addEntity",value:function(e){this.entites.push(e)}},{key:"removeEntity",value:function(e){this.entites=this.entites.filter((function(t){return t.id!==e.id}))}}]),e}(),j=new d.i.AleaRNG;function M(e){return{id:Math.random().toString(),name:"Scorpion",enemy:!0,position:e.position,renderPriority:2,glyph:d.f.fromCharCode(d.a.poundSign,d.b.AliceBlue),ai:"chase",collision:!0,vision:6,stats:{hp:10,maxHp:10,level:1,attack:6,armor:3,exp:50}}}function I(e){return{id:Math.random().toString(),name:"Ants",enemy:!0,position:e.position,renderPriority:2,glyph:d.f.fromCharCode(d.a.caret,d.b.AliceBlue),ai:"wander",collision:!0,vision:6,stats:{hp:6,maxHp:6,level:1,attack:4,armor:3,exp:50}}}function T(e){return{id:Math.random().toString(),name:"Rabbit",enemy:!0,position:e.position,renderPriority:2,glyph:d.f.fromCharCode(d.a.rUpper,d.b.WhiteSmoke),ai:"wander",collision:!0,vision:6,stats:{hp:8,maxHp:8,level:1,attack:8,armor:3,exp:50}}}function N(e){return{id:Math.random().toString(),name:"Ladybug",enemy:!0,position:e.position,renderPriority:2,glyph:d.f.fromCharCode(d.a.lUpper,d.b.Red),ai:"wander",collision:!0,stats:{hp:1,maxHp:1,level:1,attack:2,armor:2,exp:10}}}function R(e){return{id:Math.random().toString(),name:"Shell Guardian",enemy:!0,position:e.position,renderPriority:2,glyph:d.f.fromCharCode(d.a.at,d.b.Red),ai:"guard",collision:!0,stats:{hp:20,maxHp:20,level:1,attack:9,armor:3,exp:70}}}function D(e){return{id:Math.random().toString(),name:"Mal",player:!0,position:e.position,incomingDamage:[],renderPriority:1,glyph:d.f.fromCharCode(d.a.at,d.b.Yellow),vision:7,collision:!0,stats:{hp:15,maxHp:15,level:1,attack:3,armor:1,exp:0}}}function H(e){return{id:Math.random().toString(),name:"Stairs",position:e.position,renderPriority:3,glyph:d.f.fromCharCode(d.a.downwardsArrow,d.b.Cyan),stairs:!0}}function L(e){var t=j.nextItem([1,1,1,2]),a=1===t?d.b.LightBlue:d.b.Cyan;return{id:Math.random().toString(),name:"Berry",position:e.position,renderPriority:4,glyph:d.f.fromCharCode(d.a.bullet,a),consumable:{hp:t}}}function W(e){var t=j.nextItem([20,20,20,30,30,50]);return{id:Math.random().toString(),name:"Snail Book",position:e.position,renderPriority:4,glyph:d.f.fromCharCode(d.a.equals,d.b.Brown),consumable:{exp:t}}}function _(e,t){for(var a=0;a<e.width;a++)for(var r=0;r<e.height;r++)0!==a&&a!==e.width-1&&0!==r&&r!==e.height-1||e.set({x:a,y:r},t)}function U(e,t,a,r){var n=e,o=t,i=new d.e.CellularAutomata(n,o,{aliveValue:s.tree,deadValue:s.none});i.randomize(.63),i.doSimulationStep(3),i.connect(),_(i.table,s.tree);for(var l=[],c=0;c<i.table.width;c++)for(var u=0;u<i.table.height;u++)0===i.table.get({x:c,y:u})&&l.push({x:c,y:u});var h,p=new d.i.AleaRNG,y=p.shuffle(l),m=[],f=0,v=y[f++];a&&m.push(D({position:v})),m.push(H({position:y[f++]}));for(var b=0;b<r.enemies;b++){var g=p.nextBoolean()?(h={position:y[f++]},{id:Math.random().toString(),name:"Mantis",enemy:!0,position:h.position,renderPriority:2,glyph:d.f.fromCharCode(d.a.mUpper,d.b.Orange),ai:"chase",collision:!0,vision:6,stats:{hp:3,maxHp:3,level:1,attack:3,armor:2,exp:20}}):N({position:y[f++]});m.push(g)}for(var w=0;w<r.berries;w++){var x=L({position:y[f++]});m.push(x)}for(var C=0;C<r.books;C++){var S=W({position:y[f++]});m.push(S)}return new G(r.name,i.table,m,v)}function B(e,t,a,r){var n=e,o=t,i=new d.e.DrunkardsWalk({width:n,height:o,topology:"four"});i.walkSteps({steps:1/0,maxCoveredTiles:1e3});for(var l=0;l<i.table.width;l++)for(var c=0;c<i.table.height;c++){var u=i.table.get({x:l,y:c});i.table.set({x:l,y:c},u?s.none:s.mountain)}_(i.table,s.mountain);for(var h=[],p=0;p<i.table.width;p++)for(var y=0;y<i.table.height;y++)0===i.table.get({x:p,y:y})&&h.push({x:p,y:y});var m,f=new d.i.AleaRNG,v=f.shuffle(h),b=[],g=0,w=v[g++];a&&b.push(D({position:w})),b.push(H({position:v[g++]}));for(var x=0;x<r.enemies;x++){var C=f.nextItem([I({position:v[g++]}),I({position:v[g++]}),(m={position:v[g++]},{id:Math.random().toString(),name:"Snake",enemy:!0,position:m.position,renderPriority:2,glyph:d.f.fromCharCode(d.a.sUpper,d.b.Green),ai:"chase",collision:!0,vision:6,stats:{hp:5,maxHp:5,level:1,attack:5,armor:3,exp:70}})]);b.push(C)}for(var S=0;S<r.scorpions;S++)b.push(M({position:v[g++]}));for(var A=0;A<r.berries;A++){var k=L({position:v[g++]});b.push(k)}for(var P=0;P<r.books;P++){var O=W({position:v[g++]});b.push(O)}return new G(r.name,i.table,b,w)}function Y(e,t,a,r){var n=e,o=t,i=new d.e.CellularAutomata(n,o,{aliveValue:s.tree,deadValue:s.none});i.randomize(.63),i.doSimulationStep(3),i.connect(),_(i.table,s.tree);for(var l=new d.i.AleaRNG,c=0;c<i.table.width;c++)for(var u=0;u<i.table.height;u++){if(i.table.get({x:c,y:u})===s.tree)switch(l.nextItem([0,1,2,3])){case 0:break;case 1:i.table.set({x:c,y:u},s.mushroomRed);break;case 2:i.table.set({x:c,y:u},s.mushroomPurple);break;case 3:i.table.set({x:c,y:u},s.mushroomDarkPurple)}}for(var h=[],p=0;p<i.table.width;p++)for(var y=0;y<i.table.height;y++)0===i.table.get({x:p,y:y})&&h.push({x:p,y:y});var m,f=l.shuffle(h),v=[],b=0,g=f[b++];a&&v.push(D({position:g})),r.mysticShell||v.push(H({position:f[b++]}));for(var w=0;w<r.enemies;w++){var x=l.nextBoolean()?(m={position:f[b++]},{id:Math.random().toString(),name:"Squirrel",enemy:!0,position:m.position,renderPriority:2,glyph:d.f.fromCharCode(d.a.qUpper,d.b.IndianRed),ai:"chase",collision:!0,vision:6,stats:{hp:10,maxHp:10,level:1,attack:8,armor:4,exp:70}}):T({position:f[b++]});v.push(x)}for(var C=0;C<r.berries;C++){var S=L({position:f[b++]});v.push(S)}for(var A=0;A<r.books;A++){var k=W({position:f[b++]});v.push(k)}if(r.mysticShell){for(var P=f[b++],O=function(e){i.table.isInBounds(e)&&i.table.set(e,s.none)},E=-3;E<=3;E++)for(var j=-3;j<=3;j++){O({x:P.x+E,y:P.y+j})}var M=[{x:P.x+2,y:P.y-1},{x:P.x+2,y:P.y-2},{x:P.x+1,y:P.y-2},{x:P.x-1,y:P.y-2},{x:P.x-2,y:P.y-2},{x:P.x-2,y:P.y-1},{x:P.x-2,y:P.y+1},{x:P.x-2,y:P.y+2},{x:P.x-1,y:P.y+2},{x:P.x+1,y:P.y+2},{x:P.x+2,y:P.y+2},{x:P.x+2,y:P.y+1}],I=[{x:P.x+2,y:P.y-0},{x:P.x+0,y:P.y-2},{x:P.x-2,y:P.y-0},{x:P.x-0,y:P.y+2}];v.push(function(e){return{id:Math.random().toString(),name:"The Mystic Shell!",position:e.position,renderPriority:4,glyph:d.f.fromCharCode(d.a.at,d.b.MediumPurple),consumable:{winCondition:!0}}}({position:P}));for(var N=0,U=M;N<U.length;N++){var B=U[N];i.table.isInBounds(B)&&i.table.set(B,s.wall)}for(var Y=0,F=I;Y<F.length;Y++){var V=F[Y];O(V),v.push(R({position:V}))}}return new G(r.name,i.table,v,g)}function F(e){switch(e){case 1:return U(O,E,!0,{name:"The Short Grass",enemies:7,books:1,berries:5});case 2:return U(O,E,!1,{name:"The Tall Grass",enemies:10,books:1,berries:5});case 3:return B(O,E,!1,{name:"The Gravel Path",enemies:10,scorpions:0,berries:9,books:1});case 4:return B(O,E,!1,{name:"The Scorpion Den",enemies:3,scorpions:7,berries:9,books:2});case 5:return Y(O,E,!1,{name:"The Mushroom Patch",enemies:7,berries:10,books:2,mysticShell:!1});case 6:return Y(O,E,!1,{name:"Shrine of the Mystic Shell",enemies:7,berries:10,books:2,mysticShell:!0})}throw new Error("Stage ID not recognized!")}!function(e){e[e.GAME_START=0]="GAME_START",e[e.PLAYER_TURN=1]="PLAYER_TURN",e[e.ENEMY_TURN=2]="ENEMY_TURN",e[e.AWAITING_INPUT=3]="AWAITING_INPUT",e[e.GAME_WIN=4]="GAME_WIN",e[e.GAME_LOSS=5]="GAME_LOSS"}(A||(A={})),function(e){e.UP="up",e.DOWN="down",e.LEFT="left",e.RIGHT="right"}(k||(k={}));new d.i.AleaRNG;var V={stageCount:1,stage:F(1),posCache:new Map,playerCache:void 0,help:!0,currentGameState:A.GAME_START};function X(){P.addEntryHigh("You are reborn. Let the snailing continue!"),V.stageCount=1;var e=F(V.stageCount);V.stage=e,V.currentGameState=A.GAME_START}function q(e){return e*(e+1)/2*100}var K=function(){function e(){Object(f.a)(this,e)}return Object(v.a)(e,[{key:"loop",value:function(e){var t=e.entites.find((function(e){return e.player}));if(t&&t.stats){var a=t.stats.level,r=t.stats.exp;if(q(a)<=r){P.addEntryHigh("You have leveled up!");var n=Math.round(Math.random());t.stats.hp=t.stats.hp+2+n,t.stats.maxHp=t.stats.maxHp+2+n,t.stats.attack=t.stats.attack+1,t.stats.armor=t.stats.armor+1,t.stats.level=t.stats.level+1}}}}]),e}(),z={high:d.b.Cyan,mid:d.b.White,low:d.b.Gray,warning:d.b.Red},J=function(){function e(){Object(f.a)(this,e),this.mouse=new d.g.MouseHandler}return Object(v.a)(e,[{key:"loop",value:function(e){var t,a,r=e.terminal,n=e.mapTerminal;r.clear();var o=V.stage.entites.find((function(e){return e.player})),i=(null===o||void 0===o||null===(t=o.viewShed)||void 0===t?void 0:t.area)||new Map;if(d.d.box(r,{title:"Player",origin:{x:0,y:0},width:15,height:20}),o&&o.stats){r.writeAt({x:2,y:2},"HP: ".concat(o.stats.hp,"/").concat(o.stats.maxHp)),Q(r,{x:2,y:3},10,o.stats.hp/o.stats.maxHp,d.b.Red);var s=q(o.stats.level),l=q(o.stats.level-1),c=s-l,u=o.stats.exp-l;r.writeAt({x:2,y:5},"EXP"),Q(r,{x:2,y:6},10,u/c,d.b.Gold),r.writeAt({x:2,y:9},"Level:  ".concat(o.stats.level)),r.writeAt({x:2,y:10},"Attack: ".concat(o.stats.attack)),r.writeAt({x:2,y:11},"Armor:  ".concat(o.stats.armor))}r.writeAt({x:2,y:18},"(h) help"),d.d.box(r,{title:"Log",origin:{x:16,y:40},width:53,height:9});for(var h=0;h<P.length();h++){var f=Object(m.a)(P.entries[h],2),v=f[0],b=f[1],g=z[v];r.writeAt({x:17,y:41+h},b,g)}d.d.box(r,{origin:{x:16,y:0},width:53,height:39}),r.writeAt({x:17,y:0}," Stage ".concat(V.stageCount," | ").concat(V.stage.name," "));for(var w=0;w<V.stage.map.width;w++)for(var S=0;S<V.stage.map.height;S++){var k={x:w,y:S},O=V.stage.map.get({x:w,y:S});if(V.stage.fowVisited.isInBounds(k)&&V.stage.fowVisited.get(k)){if(void 0!==O){var E=C[O];E&&n.drawGlyph({x:w,y:S},E)}}else n.drawCharCode(k,d.a.blackSquare,d.b.DimGray.blendPercent(d.b.Black,70),d.b.DimGray.blendPercent(d.b.Black,70))}var G=[];i.forEach((function(e){var t=V.stage.map.get(e),a=V.posCache.get("".concat(e.x,":").concat(e.y))||[];if(G.push.apply(G,Object(y.a)(a)),void 0!==t){var r=x[t];r&&n.drawGlyph(e,r)}if(null===a||void 0===a?void 0:a.length){var o,i=a.sort((function(e,t){return t.renderPriority-e.renderPriority})),s=Object(p.a)(i);try{for(s.s();!(o=s.n()).done;){var l=o.value;n.drawGlyph(l.position,l.glyph)}}catch(c){s.e(c)}finally{s.f()}}})),d.d.box(r,{title:"Info",origin:{x:0,y:21},width:15,height:28});for(var j=G.filter((function(e){return e.enemy&&e.stats})).sort((function(e,t){return e.id.localeCompare(t.id)})),M=0;M<Math.min(j.length,5);M++){var I=j[M],T=23+3*M;r.writeAt({x:2,y:T},I.name),Q(r,{x:2,y:T+1},10,I.stats.hp/I.stats.maxHp,I.glyph.fore)}var N=this.mouse.getPos(),R=r.pixelToChar(N),D={x:R.x-17,y:R.y-1};if(null===o||void 0===o||null===(a=o.viewShed)||void 0===a?void 0:a.area.has("".concat(D.x,":").concat(D.y))){var H=V.posCache.get("".concat(D.x,":").concat(D.y));(null===H||void 0===H?void 0:H.length)&&function(e,t,a){if(t.x<50){var r={x:t.x+3,y:t.y};e.drawCharCode({x:t.x+1,y:t.y},d.a.leftwardsArrow,d.b.DarkSlateGray,d.b.White),e.drawCharCode({x:t.x+2,y:t.y},d.a.blackSquare,d.b.White,d.b.DarkSlateGray),e.writeAt(r,a,d.b.White,d.b.DarkSlateGray)}else{e.drawCharCode({x:t.x-1,y:t.y},d.a.rightwardsArrow,d.b.DarkSlateGray,d.b.White),e.drawCharCode({x:t.x-2,y:t.y},d.a.blackSquare,d.b.White,d.b.DarkSlateGray);var n={x:t.x-2-a.length,y:t.y};e.writeAt(n,a,d.b.White,d.b.DarkSlateGray)}}(r,R,H[0].name)}V.currentGameState===A.GAME_WIN&&function(e){e.clear();var t=12,a=15;e.writeAt({x:t,y:a},"Mal",d.b.Yellow),e.writeAt({x:t+4,y:a},"found the"),e.writeAt({x:t+14,y:a},"Mystic Shell!",d.b.MediumPurple);var r=12,n=10;$.faceRight?(e.writeAt({x:r+$.dX,y:n},"@",d.b.MediumPurple),e.writeAt({x:r+1+$.dX,y:n},"_,",d.b.Yellow)):(e.writeAt({x:r-3+$.dX,y:n},",_",d.b.Yellow),e.writeAt({x:r-1+$.dX,y:n},"@",d.b.MediumPurple));e.writeAt({x:5,y:20},"With the shell's wisdom, the snail kingdom"),e.writeAt({x:7,y:22},"would propser under a new golden age."),e.writeAt({x:12,y:26},"Not the fastest golden age,"),e.writeAt({x:15,y:28},"but good nonetheless.");var o=25,i=35;e.writeAt({x:o,y:i},"Press (esc) to "),e.writeAt({x:o+15,y:i},"@_,",d.b.Yellow),e.writeAt({x:o+19,y:i},"again!")}(n),V.currentGameState===A.GAME_LOSS&&function(e){e.clear();var t=20,a=15;e.writeAt({x:t,y:a},"Mal",d.b.Yellow),e.writeAt({x:t+4,y:a},"has"),e.writeAt({x:t+8,y:a},"Died!",d.b.Red);var r=24,n=10;e.writeAt({x:r+$.dX,y:n},"@_,",d.b.Red);var o=25,i=35;e.writeAt({x:o,y:i},"Press (esc) to "),e.writeAt({x:o+15,y:i},"@_,",d.b.Yellow),e.writeAt({x:o+19,y:i},"again!")}(n),V.help&&function(e){d.d.box(e,{origin:{x:2,y:2},width:65,height:45,title:"Help"});var t=5,a=6;e.writeAt({x:t,y:a},"Help"),e.writeAt({x:t+5,y:a},"Mal the Snail",d.b.Yellow),e.writeAt({x:t+19,y:a},"travel through the garden,"),e.writeAt({x:t,y:a+2},"and retrieve the "),e.writeAt({x:t+17,y:a+2},"Mystic Shell",d.b.MediumPurple),e.writeAt({x:t+29,y:a+2},".");var r=5,n=12;e.writeAt({x:r,y:n},"-- Controls --",d.b.Cyan),e.writeAt({x:r,y:n+2},"- Use \u2191 \u2193 \u2190 \u2192 to move."),e.writeAt({x:r,y:n+4},"- Use (Space) to skip a turn."),e.writeAt({x:r,y:n+6},"- Move into an enemy to attack them."),e.writeAt({x:r,y:n+8},"- Hover over objects to see a description.");var o=47,i=45;e.writeAt({x:o,y:i},"Press (esc) to "),e.writeAt({x:o+15,y:i},"@_,",d.b.Yellow)}(r),r.render()}}]),e}();function Q(e,t,a,r,n){for(var o=Math.floor(a*r),i=0;i<a;i++){var s=i<=o?n:n.blend(d.b.Black);e.drawCharCode({x:t.x+i,y:t.y},d.a.blackSquare,s,s)}}var Z,$={faceRight:!0,dX:0};setInterval((function(){if(V.currentGameState!==A.GAME_WIN)return $.faceRight=!0,void($.dX=0);$.faceRight?$.dX<25?$.dX++:$.faceRight=!1:$.dX>0?$.dX--:$.faceRight=!0}),150),function(e){e[e.NONE=0]="NONE",e[e.UP=1]="UP",e[e.DOWN=2]="DOWN",e[e.LEFT=3]="LEFT",e[e.RIGHT=4]="RIGHT",e[e.SPACE=5]="SPACE",e[e.ESC=6]="ESC",e[e.HELP=7]="HELP"}(Z||(Z={}));var ee,te=function(){function e(){var t=this;Object(f.a)(this,e),this.currentPlayerInput=Z.NONE;var a=new d.g.KeyboardHandler,r=(new d.g.KeyboardContext).onDown(d.g.KeyCode.DownArrow,(function(){return t.currentPlayerInput=Z.DOWN})).onDown(d.g.KeyCode.LeftArrow,(function(){return t.currentPlayerInput=Z.LEFT})).onDown(d.g.KeyCode.RightArrow,(function(){return t.currentPlayerInput=Z.RIGHT})).onDown(d.g.KeyCode.UpArrow,(function(){return t.currentPlayerInput=Z.UP})).onDown(d.g.KeyCode.Space,(function(){return t.currentPlayerInput=Z.SPACE})).onDown(d.g.KeyCode.Escape,(function(){return t.currentPlayerInput=Z.ESC})).onDown(d.g.KeyCode.H,(function(){return t.currentPlayerInput=Z.HELP}));a.setContext(r)}return Object(v.a)(e,[{key:"loop",value:function(e){if(this.currentPlayerInput===Z.NONE)return!1;var t=e.entites.find((function(e){return e.player})),a=!1;return this.currentPlayerInput===Z.HELP&&(V.help=!0,a=!1),this.currentPlayerInput===Z.ESC?(V.help&&(V.help=!1),V.currentGameState!==A.GAME_WIN&&V.currentGameState!==A.GAME_LOSS||X(),a=!1):this.currentPlayerInput===Z.SPACE?a=!0:this.currentPlayerInput===Z.UP?(t.wantsToMove=k.UP,a=!0):this.currentPlayerInput===Z.DOWN?(t.wantsToMove=k.DOWN,a=!0):this.currentPlayerInput===Z.RIGHT?(t.wantsToMove=k.RIGHT,a=!0):this.currentPlayerInput===Z.LEFT&&(t.wantsToMove=k.LEFT,a=!0),this.currentPlayerInput=Z.NONE,a}}]),e}();var ae,re,ne=(ee={},Object(b.a)(ee,k.UP,{x:0,y:-1}),Object(b.a)(ee,k.DOWN,{x:0,y:1}),Object(b.a)(ee,k.LEFT,{x:-1,y:0}),Object(b.a)(ee,k.RIGHT,{x:1,y:0}),ee),oe=function(){function e(){Object(f.a)(this,e)}return Object(v.a)(e,[{key:"loop",value:function(e){var t,a=Object(p.a)(e.entites);try{for(a.s();!(t=a.n()).done;){var r=t.value;if(r.wantsToMove){var n=ne[r.wantsToMove];r.wantsToMove=void 0;var o={x:r.position.x+n.x,y:r.position.y+n.y},i=V.posCache.get("".concat(o.x,":").concat(o.y))||[];if(i.some((function(e){return e.collision}))){this.checkCombat(r,i);continue}var s=e.map.get(o);if(!!s&&w[s])continue;r.position.x+=n.x,r.position.y+=n.y,r.vision&&r.viewShed&&(r.viewShed.dirty=!0)}}}catch(l){a.e(l)}finally{a.f()}}},{key:"checkCombat",value:function(e,t){var a=t.find((function(t){return t.enemy!==e.enemy&&t.stats}));a&&a.stats&&function(e,t){var a;a=function(e){var t,a=0;return e.stats&&(a+=null===(t=e.stats)||void 0===t?void 0:t.armor),a}(t);var r=0;(r=function(e){var t=0;return e.stats&&(t=e.stats.attack),t}(e)-a)<0&&(r=1),function(e,t,a){var r;a.incomingDamage||(a.incomingDamage=[]),null===(r=a.incomingDamage)||void 0===r||r.push({source:e,damage:t})}(e.name,r,t)}(e,a)}}]),e}(),ie=function(){function e(){Object(f.a)(this,e),this.rng=new d.i.AleaRNG}return Object(v.a)(e,[{key:"getRandDirection",value:function(){return this.rng.nextItem([k.UP,k.DOWN,k.LEFT,k.RIGHT,void 0])}},{key:"loop",value:function(e){var t,a=Object(p.a)(e.entites);try{for(a.s();!(t=a.n()).done;){var r=t.value;"chase"===r.ai?this.chaseAI(r):"wander"===r.ai?this.wanderAI(r):"guard"===r.ai&&this.guardAI(r)}}catch(n){a.e(n)}finally{a.f()}}},{key:"guardAI",value:function(e){var t=V.playerCache,a=this.getDirectionFromVectors(e.position,t.position);a&&(e.wantsToMove=a)}},{key:"chaseAI",value:function(e){if(!e.viewShed)throw new Error("".concat(e.name," does not have a viewshed!"));var t=V.playerCache.position;if(e.viewShed.area.has("".concat(t.x,":").concat(t.y))){var a=new d.h.AStar({topology:"four",isBlockedCallback:function(e){if(e.x===t.x&&e.y===t.y)return!1;var a=V.stage.map.get(e);return!(!a||!w[a])}}).compute(e.position,t);if(a&&a.length>=2){var r=this.getDirectionFromVectors(a[0],a[1]);r?e.wantsToMove=r:console.warn("No direction found for",a[0],a[1])}}else this.wanderAI(e)}},{key:"getDirectionFromVectors",value:function(e,t){var a=t.x-e.x,r=t.y-e.y;return 1===a&&0===r?k.RIGHT:-1===a&&0===r?k.LEFT:0===a&&1===r?k.DOWN:0===a&&-1===r?k.UP:void 0}},{key:"wanderAI",value:function(e){var t=this.getRandDirection();t&&(e.wantsToMove=t)}}]),e}(),se=function(){function e(){Object(f.a)(this,e)}return Object(v.a)(e,[{key:"loop",value:function(e){var t,a=e.entites.find((function(e){return e.player})),r=e.entites.filter((function(e){return e.stairs})),n=Object(p.a)(r);try{for(n.s();!(t=n.n()).done;){var o=t.value;if(o.position.x===(null===a||void 0===a?void 0:a.position.x)&&o.position.y===a.position.y)if(o.restart)X();else{P.addEntryMid("Descending the stairs"),V.stageCount++;var i=F(V.stageCount);i.addEntity(a),V.stage=i,a.position.x=i.startPos.x,a.position.y=i.startPos.y}}}catch(s){n.e(s)}finally{n.f()}}}]),e}(),le=function(){function e(){Object(f.a)(this,e)}return Object(v.a)(e,[{key:"loop",value:function(){V.posCache.clear();var e,t=Object(p.a)(V.stage.entites);try{for(t.s();!(e=t.n()).done;){var a,r=e.value,n="".concat(r.position.x,":").concat(r.position.y);if(V.posCache.has(n))null===(a=V.posCache.get(n))||void 0===a||a.push(r);else V.posCache.set(n,[r]);r.player&&(V.playerCache=r)}}catch(o){t.e(o)}finally{t.f()}}}]),e}(),ce=function(){function e(){Object(f.a)(this,e)}return Object(v.a)(e,[{key:"makeCorpse",value:function(e){var t,a;("Mal"===e.name&&(P.addEntryWarning("You have died."),V.currentGameState=A.GAME_LOSS),P.addEntryMid(e.name+" has died horribly."),V.playerCache&&V.playerCache.stats&&e.stats)&&(V.playerCache.stats.exp=(null===(t=V.playerCache.stats)||void 0===t?void 0:t.exp)+(null===(a=e.stats)||void 0===a?void 0:a.exp));return e.renderPriority=3,e.enemy=!1,e.collision=!1,e.stats=void 0,e.ai=void 0,e.name+=" (corpse)",e.glyph=new d.f("x",d.b.White),e}},{key:"checkAlive",value:function(e){if(e.stats)return e.stats.hp>0||(this.makeCorpse(e),!1)}},{key:"applyDamage",value:function(e,t){e&&e.stats&&(e.stats.hp=e.stats.hp-t.damage)}},{key:"loop",value:function(e){var t,a=Object(p.a)(e.entites);try{for(a.s();!(t=a.n()).done;)for(var r=t.value;r.incomingDamage&&r.incomingDamage.length>0;){var n=r.incomingDamage.pop();this.applyDamage(r,n),P.addEntryLow(r.name+" was hit for "+n.damage+" by "+n.source),this.checkAlive(r)}}catch(o){a.e(o)}finally{a.f()}}}]),e}(),ue=function(){function e(){Object(f.a)(this,e),this.fov=new d.c.PreciseShadowcasting({topology:"eight",cartesianRange:!0,lightPasses:function(e){var t=V.stage.map.get(e);return!t||!1===S[t]}})}return Object(v.a)(e,[{key:"loop",value:function(e){var t,a=Object(p.a)(e.entites);try{for(a.s();!(t=a.n()).done;){var r=t.value;if(r.vision&&((!r.viewShed||!1!==r.viewShed.dirty)&&r.vision&&(!r.viewShed||r.viewShed.dirty))){var n,o=this.fov.calculateArray(r.position,r.vision),i=new Map,s=Object(p.a)(o);try{for(s.s();!(n=s.n()).done;){var l=n.value;i.set("".concat(l.pos.x,":").concat(l.pos.y),l.pos)}}catch(d){s.e(d)}finally{s.f()}if(r.viewShed={area:i,dirty:!1},r.player){var c,u=Object(p.a)(o);try{for(u.s();!(c=u.n()).done;){var h=c.value;e.fowVisited.isInBounds(h.pos)&&e.fowVisited.set(h.pos,!0)}}catch(d){u.e(d)}finally{u.f()}}}}}catch(d){a.e(d)}finally{a.f()}}}]),e}(),he=function(){function e(){Object(f.a)(this,e)}return Object(v.a)(e,[{key:"loop",value:function(e){var t,a=V.playerCache,r=V.posCache.get("".concat(a.position.x,":").concat(a.position.y))||[],n=Object(p.a)(r);try{for(n.s();!(t=n.n()).done;){var o=t.value;if(o.consumable&&o.position.x===a.position.x&&o.position.y===a.position.y){var i=!1;o.consumable.hp&&a.stats.hp<a.stats.maxHp&&(a.stats.hp=Math.min(a.stats.maxHp,a.stats.hp+o.consumable.hp),P.addEntryMid("You ate a ".concat(o.name," and regained ").concat(o.consumable.hp," hp!")),i=!0),o.consumable.exp&&(P.addEntryMid("You read a ".concat(o.name," and gained ").concat(o.consumable.exp," exp!")),a.stats.exp+=o.consumable.exp,i=!0),o.consumable.winCondition&&(V.currentGameState=A.GAME_WIN,i=!0),i&&V.stage.removeEntity(o)}}}catch(s){n.e(s)}finally{n.f()}}}]),e}(),de=new J,pe=new te,ye=new oe,me=new ie,fe=new se,ve=new le,be=new ue,ge=new ce,we=new K,xe=new he;var Ce=a(8);var Se=function(){var e=c.a.useRef(NaN);return Object(l.useEffect)((function(){var t=document.getElementById("malwoden"),a=new d.j.RetroTerminal({width:70,height:50,imageURL:"./font_16.png",charWidth:16,charHeight:16,mountNode:t});re=(ae=a).port({x:17,y:1},O,E),P.addEntryHigh("Game Start!"),de.loop({stage:V.stage,mapTerminal:re,terminal:ae});return e.current=window.requestAnimationFrame((function t(){!function(){if(ve.loop(),V.currentGameState===A.GAME_WIN||V.currentGameState===A.GAME_LOSS)return pe.loop(V.stage),void de.loop({stage:V.stage,mapTerminal:re,terminal:ae});V.currentGameState===A.AWAITING_INPUT&&pe.loop(V.stage)&&(V.currentGameState=A.PLAYER_TURN),ye.loop(V.stage),xe.loop(V.stage),fe.loop(V.stage),be.loop(V.stage),ge.loop(V.stage),we.loop(V.stage),V.currentGameState===A.ENEMY_TURN&&me.loop(V.stage),V.currentGameState===A.GAME_START?V.currentGameState=A.AWAITING_INPUT:V.currentGameState===A.PLAYER_TURN?V.currentGameState=A.ENEMY_TURN:V.currentGameState===A.ENEMY_TURN&&(V.currentGameState=A.AWAITING_INPUT),de.loop({stage:V.stage,mapTerminal:re,terminal:ae})}(),e.current=window.requestAnimationFrame(t)})),function(){return window.cancelAnimationFrame(e.current)}}),[]),Object(Ce.jsx)("div",{id:"malwoden",style:{display:"flex",justifyContent:"center",paddingTop:"50px"}})},Ae=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,19)).then((function(t){var a=t.getCLS,r=t.getFID,n=t.getFCP,o=t.getLCP,i=t.getTTFB;a(e),r(e),n(e),o(e),i(e)}))};h.a.render(Object(Ce.jsx)(c.a.StrictMode,{children:Object(Ce.jsx)(Se,{})}),document.getElementById("root")),Ae()}},[[18,1,2]]]);
//# sourceMappingURL=main.41701ca2.chunk.js.map