const express = require('express');
const router = express.Router();

const User = require('../models/user');///в юзере большой объект
//доп библиотеки для авторизации
const passport = require('passport');
const jwt = require("jsonwebtoken");
const config = require('../config/db');
const user = require('../models/user');



  //страница с регистрацией
  router.post('/registration', (req, res) => {
   let newUser = new User({//обработка страницы регистрации из формы
       name:req.body.name,//мы их получаем в данный обхект и через модель ее используем
       fam:req.body.fam,
       login:req.body.login, //получение наших данных от пользователя
       password:req.body.password,
       group:req.body.group
   });
    
   User.addUser(newUser,(err, user)=>{
       if(err){
        res.json({success:false, message:"Пользователь не добавлен"});
       }
       else{
        res.json({success:true, message:"Пользователь добавлен"});
       }

   });
     
});
   

   
//страница авторизации
  router.post('/authorization', (req, res) => {
    const login = req.body.login;
    const password = req.body.password;
    //реализация функции callback
    User.getUserByLogin(login,(err, user)=>{

        if(err) throw err;
        if(!user)
           return  res.json({success:false,message:"Такой пользователь был не найдет"});
        //проверка паролей
           User.comparePass(password, user.password,(err,isMatch)=>{
            if(err) throw err;
            if(isMatch){
                
                 const token =jwt.sign(user.toJSON(), config.secret,{
                    /* время сессии*/expiresIn: 3600*24    
                 });   
                 res.json({
                     success:true,
                     token:'JWT' + token,
                     user:{
                         id:user.__id,
                         name:user.name,
                         login:user.login,
                         fam:user.fam
                     }
                 });
            } 
            else{
                res.json({success:false, message:"Пароли не совпадают"});

            }
           });
    });
  });






  router.get('/dashboard',/*запрет перехода  на другие ссылки если не авторизован*/passport.authenticate('jwt',{session:false}), (req, res) => {
    res.send('Страница пользователя');
  });
  router.get('/dashboard/:id',(req, res)=>{
    User.getUserByLogin(req.params.login,(err,user)=>{
      if(err) throw err;
      return res.json({user:user});
    });
  });

  module.exports = router;

