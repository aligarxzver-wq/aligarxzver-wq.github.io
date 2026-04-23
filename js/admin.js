function get(k,d=[]){return JSON.parse(localStorage[k]||JSON.stringify(d))}
function set(k,v){localStorage[k]=JSON.stringify(v)}
function addUser(){let users=get('users');users.push({name:n.value,login:l.value,pass:p.value,role:'worker'});set('users',users);load();setInterval(load,2000);}
function load(){let users=get('users'); let reps=get('reports'); let today=new Date().toISOString().slice(0,10); let submitted=reps.filter(r=>r.date===today).map(r=>r.user); document.getElementById('users').innerHTML='<tr><th>Ism</th><th>Login</th><th>Status</th></tr>'+users.filter(x=>x.role==='worker').map(x=>`<tr><td>${x.name}</td><td>${x.login}</td><td>${submitted.includes(x.name)?'✅':'❌'}</td></tr>`).join('');
let reps=get('reports');document.getElementById('reports').innerHTML='<tr><th>User</th><th>Sana</th><th>Topshirildi</th></tr>'+reps.map(r=>`<tr><td>${r.user}</td><td>${r.date}</td><td>${r.rows.length}</td></tr>`).join('');
document.getElementById('stats').innerText='Userlar: '+(users.length-1)+' | Hisobotlar: '+reps.length+' | Bugun topshirgan: '+submitted.length;}
load();
