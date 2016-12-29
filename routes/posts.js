var express = require('express');
var router = express.Router();
var PostModel = require('../models/PostModel');
var CommentModel = require('../models/CommentModel');

router.get( '/' , function(req, res){
    PostModel.find( { } , function(err , posts){
        res.render( 'posts/list' , { posts : posts } );
    });
});

router.get( '/detail/:id' , function(req, res){
    PostModel.findOne( { id : req.params.id } , function(err, post){
        CommentModel.find( { post_id : req.params.id }, function(err,comments){
            res.render('posts/detail', { post : post , comments : comments });
        });
    });
});


router.get('/edit/:id' , function(req,res){
    PostModel.findOne( { id : req.params.id }, function(err, post){
        res.render('posts/edit', { post : post });
    });
});

router.post('/edit/:id' , function(req,res){
    var query = {
        title : req.body.title,
        content : req.body.content
    };
    PostModel.update( { id : req.params.id }, { $set : query },
    function(err){
        res.redirect('/posts/detail/' + req.params.id);
    });

});

router.get( '/write', function(req, res){
    var post = {};
    res.render( 'posts/edit' , { post : post });
});

router.post( '/write', function(req, res){
    var Post = new PostModel({
        title : req.body.title,
        content : req.body.content
    });
    Post.save(function(err){
        res.redirect('/posts');
    });
});

router.get('/delete/:id', function(req, res){
    PostModel.remove( { id : req.params.id }, function(err){
        res.redirect('/posts');
    });
});

router.post('/ajax_comment/insert' , function(req, res){

    var Comment = new CommentModel({
        content : req.body.content,
        post_id : parseInt(req.body.post_id)
    });
    Comment.save(function(err, comment){
        res.json({ 
            message : "success" , 
            id : comment.id , 
            content : comment.content 
        });
    });

});
































module.exports = router;
















