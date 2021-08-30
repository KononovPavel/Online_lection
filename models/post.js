const mongoose = require('mongoose');
const config = require('../config/db');

const PostSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  anons: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  }
});

const Post = module.exports = mongoose.model('Post', PostSchema);

module.exports.addPost = function(newPost, callback) {
    newPost.save(callback);
};
module.exports.getAllPosts = function(callback){
  Post.find(callback);
};
module.exports.getOnePost = function(id,callback){
  Post.findById(id,callback);
};