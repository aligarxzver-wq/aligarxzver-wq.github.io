for(let i=1;i<=7;i++)rows.innerHTML+=`<div class='row'><input type='time' id='s${i}'><input type='time' id='e${i}'><input id='t${i}' placeholder='Sabab ${i}'></div>`;
function get(k,d=[]){return JSON.parse(localStorage[k]||JSON.stringify(d))}
function set(k,v){localStorage[k]=JSON.stringify(v)}
function save(){let cur=JSON.parse(localStorage.current);let arr=[];for(let i=1;i<=7;i++){if(document.getElementById('t'+i).value)arr.push({start:s'+i,end:e'+i,text:t'+i});}
let reps=get('reports');reps.push({user:cur.name||cur.login,date:d.value,rows:[1]});set('reports',reps);alert('Saqlandi');}
