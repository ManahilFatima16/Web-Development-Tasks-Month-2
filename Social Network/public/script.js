const socket = io();
let userId = localStorage.getItem("userId");

// REGISTER
function register(){
 fetch('/register',{
  method:'POST',
  headers:{'Content-Type':'application/json'},
  body:JSON.stringify({
    name:document.getElementById('name').value,
    email:document.getElementById('email').value,
    password:document.getElementById('password').value
  })
 }).then(()=>{
   alert("Registered successfully");
   window.location.href = "login.html";
 });
}

// LOGIN
function login(){
 fetch('/login',{
  method:'POST',
  headers:{'Content-Type':'application/json'},
  body:JSON.stringify({
    email:document.getElementById('loginEmail').value,
    password:document.getElementById('loginPassword').value
  })
 })
 .then(res=>res.json())
 .then(data=>{
   if(data.id){
     localStorage.setItem("userId", data.id);
     window.location.href = "home.html";
   } else {
     alert("Invalid Login");
   }
 });
}

// POST
function postData(){
 fetch('/post',{
  method:'POST',
  headers:{'Content-Type':'application/json'},
  body:JSON.stringify({
    user_id:localStorage.getItem("userId"),
    content:document.getElementById('post').value
  })
 });
}

function loadPosts(){
 fetch('/posts')
 .then(res=>res.json())
 .then(data=>{
   let html="";
   data.reverse().forEach(p=>{
     html+=`
      <div class="post">
        <p>${p.content}</p>

        <button onclick="likePost(${p.id})">❤️ Like</button>
        <span id="like-${p.id}">0</span> Likes

        <div>
          <input id="c-${p.id}" placeholder="Write comment...">
          <button onclick="addComment(${p.id})">💬 Comment</button>
        </div>

        <div id="comments-${p.id}"></div>
      </div>
     `;
     loadLikes(p.id);
     loadComments(p.id);
   });

   document.getElementById('posts').innerHTML = html;
 });
}

if(document.getElementById("posts")){
  loadPosts();
}
function likePost(postId){
 fetch('/like',{
  method:'POST',
  headers:{'Content-Type':'application/json'},
  body:JSON.stringify({
    post_id: postId,
    user_id: localStorage.getItem("userId")
  })
 }).then(()=>loadLikes(postId));
}

function loadLikes(postId){
 fetch('/likes/'+postId)
 .then(res=>res.json())
 .then(data=>{
   document.getElementById("like-"+postId).innerText = data.total;
 });
}

function addComment(postId){
 const text = document.getElementById("c-"+postId).value;

 fetch('/comment',{
  method:'POST',
  headers:{'Content-Type':'application/json'},
  body:JSON.stringify({
    post_id: postId,
    user_id: localStorage.getItem("userId"),
    comment: text
  })
 }).then(()=>{
   document.getElementById("c-"+postId).value="";
   loadComments(postId);
 });
}

function loadComments(postId){
 fetch('/comments/'+postId)
 .then(res=>res.json())
 .then(data=>{
   let html="";
   data.forEach(c=>{
     html += `<p>💬 ${c.comment}</p>`;
   });
   document.getElementById("comments-"+postId).innerHTML = html;
 });
}

// SOCKET
if(socket){
 socket.on("new_post",()=>{
   loadPosts();
 });
}