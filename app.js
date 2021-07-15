const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
const _ = require('lodash');

const homeStartingContent = ["Hello guys this is my first blog website. I found help from appbrewery and completed this project. This blog website may contain stuffs that nobody cares and also useless contents. There is a secret url if you find that you can create blogs here. Clue for that secret url is ","Music"];
const aboutContent = ["This website was developed as a part of an online learning program and this is my","https://github.com/Tilotham","account.","You can sign up for my newletter here","https://guarded-escarpment-76950.herokuapp.com/","This is my personal site, go there to know more about me","https://tilotham.github.io/my-personal-site/"];
const contactContent = ["If you like my effort and wanted to encourage me then you can reach me via.","https://www.instagram.com/tilo_tham/","https://twitter.com/iam_SDT","https://www.linkedin.com/in/tilotham-s-d-00ba32144/"];

const app = express();

mongoose.connect("mongodb+srv://admin-tilotham:4test@cluster0.lx88j.mongodb.net/blogPostDB?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.set('view engine', 'ejs');

const blogPostsSchema = {
  title: String,
  content: String,
};

const BlogPost = mongoose.model("BlogPost",blogPostsSchema);

app.get("/",function(req,res) {
  BlogPost.find({},function(err, posts) {
    res.render('home', {startingContent: homeStartingContent, posts: posts})
  })
})

app.get("/posts/:postId",function(req,res) {
  BlogPost.findOne({_id: req.params.postId},function(err, post) {
    res.render('post', {title: post.title, content: post.content})
  });
});

app.get("/about",function(req,res) {
  res.render('about', {about: aboutContent})
})

app.get("/contact",function(req,res) {
  res.render('contact', {contact: contactContent})
})

app.get("/compose",function(req,res) {
  res.render('compose')
})

app.post("/compose",function(req,res) {
  const post = new BlogPost({
    title: req.body.newPostTitle,
    content: req.body.newPostBody,
  });
  post.save();
  res.redirect("/");
})

app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});
