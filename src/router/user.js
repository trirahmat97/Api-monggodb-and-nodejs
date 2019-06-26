const express = require('express');
const User = require('../models/user');
const router = express.Router();
const auth = require('../midleware/auth');
const multer = require('multer');
const sharp = require('sharp'); 
const {sendWelcomeEmail, sendCancelationEmail} = require('../emails/account');

//logout
router.post('/users/logout', auth, async(req, res)=>{
    try{
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !== req.token
        })
        await req.save()
        res.send()
    }catch (e){
        res.status(500).send();
    }
});

router.post('/users/logoutAll', auth, async (req, res)=>{
    try{
        req.user.tokens = []
        await req.user.save();
        res.send()
    }catch (e){
        res.status(500).send(e);
    }
});

router.get('/users/me', auth, async(req, res)=>{
    res.send(req.user);
});

router.post('/users/login', async(req, res)=>{
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.send({user, token});
    }catch (e) {
        res.status(400).send(e);
    }
});

router.post('/users', async (req, res)=>{
    const user = new User(req.body);
    try{
        await user.save();
        sendWelcomeEmail(user.email, user.name);
        const token = await user.generateAuthToken();
        res.status(201).send({user, token});
    } catch (e) {
        res.status(400).send(e);
    }
});

router.get('/users', auth, async (req, res)=>{
    try{
        const user = await User.find({})
        res.send(user)
    } catch (e) {
        res.status(400).send(e);
    }
})

//update
router.patch('/users/me', auth, async (req, res)=>{
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    const isValidOperation = updates.every((update)=> allowedUpdates.includes(update))
    
    if(!isValidOperation){
        res.status(400).send({error: 'Invalid Updates!'});
    }
    try{
        updates.forEach((update)=>req.user[update] = req.body[update]);
        await req.user.save();
        res.send(req.user);
    }catch (e) {
        res.send(e);
    }
});

//delete
router.delete('/users/me', auth, async (req, res)=>{
    try{
        await req.user.remove()
        sendCancelationEmail(req.user.email, req.user.name)
        res.send(req.user)
    } catch (e) {
        res.status(500).send()
    }
});

//upload avatar
const upload = multer({
    // dest: 'avatars',
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error('Pleas upload a image'));
        }
        cb(undefined, true);
    }
});

router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) =>{
    const buffer = await sharp(req.file.buffer).resize({width: 250, height: 250}).png().toBuffer();
    req.user.avatar = buffer;
    await req.user.save();
    res.send();
}, (error, req, res, next)=>{
    res.status(400).send({
        error: error.message
    })
});

router.delete('/users/me/avatar', auth, async (req, res) =>{
    req.user.avatar = undefined;
    await req.user.save();
    res.send();
});

router.get('/users/:id/avatar', async(req, res)=>{
    try{
        const user = await User.findById(req.params.id);
        if(!user || !user.avatar){
            throw new Error();
        }
        res.set('Content-Type', 'image/png');
        res.send(user.avatar);
    }catch (e){
        res.status(404).send();
    }
});
module.exports = router;
















// router.get('/users/:id', async (req, res)=>{
//     const _id = req.params.id;
//     try {
//         const user = await User.findById(_id);

//         if(!user){
//             return res.status(404).send();
//         }

//         res.send(user);
//     }catch(e) {
//         res.status(500).send(e);
//     }
// });
