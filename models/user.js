const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');//кеширование
const config = require('../config/db'); //подключение данных о бд
const multer = require('multer');

//обращение к библиотеке монго и создание схемы
const UserSchema =  mongoose.Schema({

    name:{
        type:String,
    },
    fam:{
        type:String,
        require:true
    },
    login:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    passwordRemove:{
        type:String,
        require:true
    },
    group:{
        type:Number,
        require:true//для вывода пользователей по группам
    }
});

 const User = module.exports = mongoose.model('User',UserSchema);//создаем объект и экспортируем, он на основе схемы



//получение пользователя по логину

//callback - это функция которая срабатывает после обработки
module.exports.getUserByLogin = (login,callback) => {
    const query = {login:login};
    User.findOne(query,callback);
};

//поиск по id
module.exports.getUserById = (id, callback) => {
    User.findById(id, callback);
};
//проверка пароля
module.exports.comparePass = function (passFromUser,UserDBPass, callback) {
    bcrypt.compare(passFromUser,UserDBPass,(err, isMatch)=>{
if(err) throw err;
callback(null,isMatch);
    });
};




//===Кеширование пароля====//

module.exports.addUser = function (newUser, callback) {
    
    bcrypt.genSalt(15, (err, salt)=>{
        
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err;
            newUser.password = hash;//хеширование пароля
            newUser.save(callback);//сохранение записи в базу данных
        });
    

    });


    
};