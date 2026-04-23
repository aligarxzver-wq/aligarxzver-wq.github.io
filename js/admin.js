function get(k,d=[]){return JSON.parse(localStorage.getItem(k) || JSON.stringify(d));}
function set(k,v){localStorage.setItem(k,JSON.stringify(v));}

function addUser(){
 const name=document.getElementById('n').value.trim();
 const login=document.getElementById('l').value.trim();
 const pass=document.getElementById('p').value.trim();
 if(!name||!login||!pass) return alert('Ma\'lumotlarni to\'ldiring');
 let users=get('users');
 if(users.find(x=>x.login===login)) return alert('Login band');
 users.push({name,login,pass,role:'worker'});
 set('users',users);
 document.getElementById('n').value='';
 document.getElementById('l').value='';
 document.getElementById('p').value='';
 load();
}

function deleteUser(login){
 let users=get('users').filter(x=>x.login!==login);
 set('users',users);
 load();
}

function load(){
 let users=get('users');
 let reps=get('reports');
 let today=new Date().toISOString().slice(0,10);
 let submitted=reps.filter(r=>r.date===today).map(r=>r.user);
 let workers=users.filter(x=>x.role==='worker');

 document.getElementById('users').innerHTML=
 '<tr><th>Ism</th><th>Login</th><th>Status</th><th>Action</th></tr>'+
 workers.map(x=>`<tr><td>${x.name}</td><td>${x.login}</td><td>${submitted.includes(x.name)?'✅ Topshirgan':'❌ Topshirmagan'}</td><td><button onclick="deleteUser('${x.login}')">O\'chirish</button></td></tr>`).join('');

 document.getElementById('reports').innerHTML=
 '<tr><th>User</th><th>Sana</th><th>Ishlar soni</th></tr>'+
 reps.map(r=>`<tr><td>${r.user}</td><td>${r.date}</td><td>${r.rows.length}</td></tr>`).join('');

 document.getElementById('stats').innerText=
 'Userlar: '+workers.length+' | Hisobotlar: '+reps.length+' | Bugun topshirgan: '+submitted.length+' | Topshirmagan: '+(workers.length-submitted.length);
}

load();
setInterval(load,2000);
