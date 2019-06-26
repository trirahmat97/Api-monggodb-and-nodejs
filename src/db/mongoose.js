const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',{
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
});

// const validator  = require('validator');
// const User = mongoose.model('Users', {
//     name: {
//         type: String,
//         require: true,
//         trim: true
//     }, email:{
//         type: String,
//         require: true,
//         trim: true,
//         lowercase: true,
//         validate(value){
//             if(!validator.isEmail(value)){
//                 throw new Error('email is inVailid!');
//             }
//         }
//     }, password:{
//         type: String,
//         require: true,
//         trim: true,
//         minlength: 7,
//         validate(value){
//             if(value.toLowerCase().includes('password')){
//                 throw new Error('Password cannot contain "Password"');
//             }
//         }
//     }, age: {
//         type: String,
//         default: 0,
//         validate(value) {
//             if(value < 0){
//                 throw new Error('age mush be a positive number');
//             }
//         }
//     }
// });

// const me = new User({
//     name: '   Tri Rahmat Aribowo        ',
//     email: 'TRA@GMAIL.COM',
//     password: 'phonrd123    '
// });

// me.save().then(()=>{
//     console.log(me);
// }).catch((error)=>{
//     console.log('Error!', error);
// })





// const Task = mongoose.model('Task', {
//     description :{
//         type: String,
//         trim: true,
//         require: true
//     }, complated: {
//         type: Boolean,
//         default: false
//     }
// });

// const aa = new Task({
//     description: "learn react.js",
// });

// aa.save().then(()=>{
//     console.log(aa);
// }).catch((error)=>{
//     console.log('error', error);
// })

// const User = mongoose.model('User', {
//     name: {
//         type: String
//     }, age: {
//         type: Number
//     }
// });

// const me = new User({
//     name: 'Tra',
//     age: 22
// });

// me.save().then(()=>{
//     console.log(me);
// }).catch((error)=>{
//     console.log('error', error);
// })