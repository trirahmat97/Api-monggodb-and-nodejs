const express = require('express');
const Task = require('../models/task');
const router = express.Router();
const auth = require('../midleware/auth');

//Task

//update 
router.delete('/tasks/:id',auth, async (req, res)=>{
    try{
        const task = await Task.findOneAndDelete({_id: req.params.id, owner: req.user._id});
        if(!task){
            res.status(404).send();
        }
        res.send(task);
    }catch (e) {
        res.status(400).send(e);
    }
})

router.put('/tasks/:id', auth, async (req, res)=>{
    const updates = Object.keys(req.body);
    const allowedUpdates = ['description', 'complated'];
    const isValidOperation = updates.every((update)=> allowedUpdates.includes(update));

    if(!isValidOperation){
        res.status(400).send({error : 'update invalid!'});
    }
    try{
            const task = await Task.findOne({_id: req.params.id, owner: req.user._id});
            updates.forEach((update)=> task[update] = req.body[update]);
            await task.save();
        if(!task){
            res.status(404).send();
        }

        res.send(task);
    }catch (e) {
        res.status(400).send(e);
    }
})

router.post('/tasks', auth, async (req, res)=>{
    const task = new Task({
        ...req.body,
        owner: req.user._id
    })
    try{
        await task.save();
        res.status(201).send(task);
    }catch (e){
        res.status(400).send();
    }
})

//GET /tasks?complated=true
//GET /tasks?limit=10&skip=20
//GET /tasks?sortBy=createdAt:desc
router.get('/tasks', auth, async (req, res)=>{
    const match = {}
    const sort = {}
    
    if(req.query.complated){
        match.complated = req.query.complated === 'true'
    }
    
    if(req.query.sortBy){
        const parts = req.query.sortBy.split(':');
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
    }

    try{
        // await req.user.populate('tasks').execPopulate();
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        }).execPopulate();
        res.send(req.user.tasks);
    }catch (e){
        res.status(500).send();
    }
})

router.get('/tasks/:id', auth, async (req, res)=>{
    const _id = req.params.id;
    try{
        const task = await Task.findOne({_id, owner: req.user._id})
        if(!task){
            return res.status(404).send();
        }
        res.send(task); 
    }catch (e){
        res.status(500).send();
    }
})

module.exports = router;