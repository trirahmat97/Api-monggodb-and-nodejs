const express = require('express');
require('./db/mongoose');
const app = express();
const userRouter = require('./router/user');
const taskRouter = require('./router/task');
const auth = require('../src/midleware/auth');

const port = process.env.PORT;

const multer = require('multer');
const upload = multer({
    dest: 'images',
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if(!file.originalname.match(/\.(doc|docx)$/)){
            return cb(new Error('Pleas upload a word document'));
        }
        cb(undefined, true);
    }
});

// const errorMidleware = (req, res, next) =>{
//     throw new Error('from my midleware');
// }

app.post('/upload', upload.single('upload'), (req, res) =>{
    res.send();
}, (error, req, res, next)=>{
    res.status(400).send({
        error: error.message
    })
});

app.use(express.json());
app.use(userRouter, taskRouter);
app.listen(port, ()=>{
    console.log('server is running in port '+ port);
});

// const Task = require('./models/task');
// const User = require('./models/user');


// const main = async () =>{
//     // const task = await Task.findById('5d0e3f48efee5627acd82987');
//     // await task.populate('owner').execPopulate();
//     // console.log(task.owner);
//     const user = await User.findById('5d0ddb5d55fca705c05e12f8');
//     await user.populate('tasks').execPopulate();
//     console.log(user.tasks);
// }

// main();

// const pet = {
//     name : "tra"
// }

// pet.toJSON = function (){
//     // console.log(this);
//     // return this;
//     return {};
// }

// console.log(JSON.stringify(pet));
// // app.use((req, res, next)=>{

// })

//token
// const jwt = require('jsonwebtoken');
// const myFunction = async (req, res) =>{
//     const token = jwt.sign({_id: "abc123"}, 'thisismycourse', {expiresIn: '7 days'});
//     console.log(token);

//     const data = jwt.verify(token, 'thisismycourse');
//     console.log(data);
// }

// myFunction();


//bcrypt
// const bcrypt = require('bcryptjs');

// const myFunction = async () => {
//     const password = 'tra123';
//     const hashedPassword = await bcrypt.hash(password, 8);

//     console.log(password);
//     console.log(hashedPassword);

//     const isMatch = await bcrypt.compare(password, hashedPassword);
//     console.log(isMatch);
// }

// myFunction();