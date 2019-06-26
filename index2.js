const express = require('express');
require('./db/mongoose');

const app = express();
const User = require('./models/user');
const Task = require('./models/task');

const port = process.env.port || 3000;
app.use(express.json());

//users
app.post('/users', (req, res)=>{
    const user = new User(req.body);

    // user.save().then(()=>{
    //     res.status(201).send(user);
    // }).catch((e)=>{
    //     res.status(400).send(e);
    // })
});

app.get('/users', (req, res)=>{
    User.find({}).then((users)=>{
        res.status(200).send(users);
    }).catch((e)=>{
        res.status(500).send(e);
    })
})

app.get('/user/:id', (req, res)=>{
    const _id = req.params.id;
    User.findById(_id).then((user)=>{
        if(!user){
            res.status(404).send();
        }

        res.status(200).send(user);
    }).catch((e)=>{
        res.status(500).send(e);
    })
})


//Task
app.post('/task', (req, res)=>{
    const task = new Task(req.body);
    task.save().then(()=>{
        res.send(task);
    }).catch((e)=>{
        res.status(400).send(e);
    })
})

app.get('/tasks', (req, res)=>{
    Task.find({}).then((task)=>{
        res.status(200).send(task);
    }).catch((e)=>{
        res.status(400).send(e);
    })
})

app.get('/task/:id', (req, res)=>{
    const _id = req.params.id;
    Task.findById(_id).then((task)=>{
        if(!task){
            res.status(404).send();
        }
        res.status(200).send(task);
    }).catch((e)=>{
        res.status(500).send(e);
    })
})

app.listen(port, ()=>{
    console.log('server is running in port '+ port);
})