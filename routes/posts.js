const express = require('express');
const router = express.Router();

// Эту модель мы сейчас создадим, 
// она будет служить в качестве новой таблицы в БД
const Post = require('../models/post');
const config = require('../config/db');

router.post('/create', (req, res) => {
	let newPost = new Post({
		title: req.body.title,
		anons: req.body.anons,
		text: req.body.text
	});

	Post.addPost(newPost, (err, user) => {
		if(err)
			res.json({success: false, msg: "Статья не была добавлена"});
		else
			res.json({success: true, msg: "Статья была добавлена!"});
	});
});

router.get('/all', (req,res)=>{
	Post.getAllPosts((err,posts)=>{
		if(err) throw err;
		return res.json({posts:posts});
	});
});

router.get('/one/:id', (req,res)=>{
	Post.getOnePost( req.params.id, (err, post)=>{
		if(err) throw err;
		return res.json({post:post});
	});
});
module.exports = router;