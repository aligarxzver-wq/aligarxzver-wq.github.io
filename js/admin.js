// smart_admin.js

const users = [
 {username:'admin',password:'12345',role:'admin'},
 {username:'manager',password:'1111',role:'manager'},
 {username:'worker',password:'0000',role:'worker'}
];

function login(username,password){
 const user = users.find(u=>u.username===username && u.password===password);
 if(user){
   localStorage.setItem('currentUser',JSON.stringify(user));
   return user;
 }
 return null;
}

function logout(){
 localStorage.removeItem('currentUser');
 location.reload();
}

function getCurrentUser(){
 return JSON.parse(localStorage.getItem('currentUser'));
}

function calculateStatistics(data){
 return {
   totalUsers:data.users.length,
   totalReports:data.reports.length,
   openReports:data.reports.filter(r=>r.status==='open').length,
   closedReports:data.reports.filter(r=>r.status==='closed').length
 };
}

function manageWorkers(action,workers,payload){
 if(action==='add') workers.push(payload);
 if(action==='remove') return workers.filter(w=>w.id!==payload.id);
 if(action==='update') return workers.map(w=>w.id===payload.id?payload:w);
 return workers;
}

function filterReports(reports,criteria){
 return reports.filter(r=>{
   if(criteria.status && r.status!==criteria.status) return false;
   if(criteria.date && r.date!==criteria.date) return false;
   return true;
 });
}

function loadDashboard(){
 const user=getCurrentUser();
 if(!user){window.location='login.html';return;}
 document.getElementById('usernameView').innerText=user.username;
 document.getElementById('roleView').innerText=user.role;
 if(user.role==='worker'){
   document.getElementById('adminSection').style.display='none';
 }
}

function handleLoginForm(){
 const form=document.getElementById('loginForm');
 if(!form) return;
 form.addEventListener('submit',function(e){
   e.preventDefault();
   const u=document.getElementById('username').value;
   const p=document.getElementById('password').value;
   const result=login(u,p);
   if(result){window.location='dashboard.html';}
   else{document.getElementById('errorMessage').innerText='Login yoki parol xato';}
 });
}

window.onload=function(){
 handleLoginForm();
 if(document.getElementById('usernameView')) loadDashboard();
};



