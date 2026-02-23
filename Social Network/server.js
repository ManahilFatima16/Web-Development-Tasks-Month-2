const express = require('express');
const app = express();
const db = require('./db');
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.json());
app.use(express.static('public'));

// Register user
app.post('/register',(req,res)=>{
  const {name,email,password} = req.body;
  db.query("INSERT INTO users SET ?",{name,email,password},()=>{
    res.send("User Registered");
  });
});

// Login user
app.post('/login',(req,res)=>{
  const {email,password} = req.body;
  db.query(
    "SELECT * FROM users WHERE email=? AND password=?",
    [email,password],
    (err,result)=>{
      if(result.length > 0){
        res.json(result[0]);
      } else {
        res.send("Invalid Login");
      }
    }
  );
});

// Add post
app.post('/post',(req,res)=>{
  const {user_id,content} = req.body;
  db.query("INSERT INTO posts SET ?",{user_id,content},()=>{
    io.emit("new_post",content);
    res.send("Post Added");
  });
});

// Get posts
app.get('/posts',(req,res)=>{
  db.query("SELECT * FROM posts",(err,result)=>{
    res.json(result);
  });
});

// Like a post
app.post('/like', (req,res)=>{
  const {post_id, user_id} = req.body;
  db.query("INSERT INTO likes SET ?", {post_id, user_id}, ()=>{
    res.send("Liked");
  });
});

// Get likes count
app.get('/likes/:post_id', (req,res)=>{
  db.query("SELECT COUNT(*) as total FROM likes WHERE post_id=?", 
  [req.params.post_id], (err,result)=>{
    res.json(result[0]);
  });
});

// Add comment
app.post('/comment', (req,res)=>{
  const {post_id, user_id, comment} = req.body;
  db.query("INSERT INTO comments SET ?", {post_id, user_id, comment}, ()=>{
    res.send("Comment Added");
  });
});

// Get comments
app.get('/comments/:post_id', (req,res)=>{
  db.query("SELECT * FROM comments WHERE post_id=?", 
  [req.params.post_id], (err,result)=>{
    res.json(result);
  });
});

http.listen(3000,()=>{
  console.log("Server running on http://localhost:3000");
});
