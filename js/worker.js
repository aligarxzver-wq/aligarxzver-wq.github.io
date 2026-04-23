const rowsDiv=document.getElementById('rows');
for(let i=1;i<=7;i++){
 rowsDiv.innerHTML += `<div class='row'>
 <input type='time' id='s${i}'>
 <input type='time' id='e${i}'>
 <input type='text' id='t${i}' placeholder='${i}-ish bajarildi yoki sabab yozing'>
 </div>`;
}

document.getElementById('d').value=new Date().toISOString().slice(0,10);

function get(k,d=[]){return JSON.parse(localStorage.getItem(k)||JSON.stringify(d));}
function set(k,v){localStorage.setItem(k,JSON.stringify(v));}

function save(){
 const cur=JSON.parse(localStorage.current||'{}');
 const date=document.getElementById('d').value;
 let arr=[];
 for(let i=1;i<=7;i++){
   const start=document.getElementById('s'+i).value;
   const end=document.getElementById('e'+i).value;
   const text=document.getElementById('t'+i).value.trim();
   if(text) arr.push({start,end,text});
 }
 if(arr.length===0) return alert('Kamida bitta ish kiriting');
 let reps=get('reports');
 let idx=reps.findIndex(x=>x.user===(cur.name||cur.login)&&x.date===date);
 if(idx>=0){
   if(Date.now()-reps[idx].created > 172800000){alert('48 soatdan keyin tahrirlab bo\'lmaydi');return;}
   reps[idx]={user:cur.name||cur.login,date,rows:arr,created:reps[idx].created};
 }else{
   reps.push({user:cur.name||cur.login,date,rows:arr,created:Date.now()});
 }
 set('reports',reps);
 document.getElementById('msg').innerHTML='✅ Hisobot muvaffaqiyatli yuborildi';
}
