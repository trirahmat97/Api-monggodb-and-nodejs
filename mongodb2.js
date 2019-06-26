// const id = new ObjectID();
// console.log(id);
// console.log(id.id.length);
// console.log(id.toHexString().length);


const {MongoClient, ObjectID} = require('mongodb');

const connectionUrl = "mongodb://127.0.0.1:27017";
const databaseName = 'task-manage';

MongoClient.connect(connectionUrl, {"useNewUrlParser" : true}, (error, client)=>{
    if(error){
        return console.log('unable connect to database');
    }
    const db = client.db(databaseName);

    db.collection('taks').deleteMany({
        complated: true
    }).then((result)=>{
        console.log(result.deletedCount);
    }).catch((error)=>{
        console.log(error);
    })

    // //delete many
    // db.collection('users').deleteMany({
    //     age: 23
    // }).then((result)=>{
    //     console.log(result.deletedCount);
    // }).catch((error)=>{
    //     console.log(error);
    // })
    
    //update many
    // db.collection('taks').updateMany({
    //     complated: false
    // }, {
    //     $set: {
    //         complated: true
    //     }
    // }).then((result)=>{
    //     console.log(result.modifiedCount);
    // }).catch((error)=>{
    //     console.log(error);
    // });

    // //update promise
    // db.collection('users').updateOne({
    //     _id: new ObjectID('5d046cfe662c740580aaf913')
    // },{
    //     $inc:{
    //         age: 1
    //     }
    //     // $set:{
    //     //     name: 'Tri Rahmat'
    //     // }
    // }).then((result)=>{
    //     console.log(result);
    // }).catch((error)=>{
    //     console.log(error);
    // });

    // updatePromise.then((result)=>{
    //     console.log(result);
    // }).catch((error)=>{
    //     console.log(error);
    // })

    //update callback 
    // db.collection('users').updateOne({
    //     _id: new ObjectID('5d046cfe662c740580aaf913')
    // },{
    //     $set: {
    //         name: 'bb'
    //     }
    // }, (error, result)=>{
    //     if(error){
    //        return console.log('error');
    //     }

    //     console.log(result.ops);
    // })

    //find count and array
    // db.collection('users').find({age: 22}).toArray((error, result)=>{
    //     console.log(result);
    // })

    // db.collection('users').find({age: 22}).count((error, result)=>{
    //     console.log(result);
    // })

    //findOne
    // db.collection('users').findOne({name: 'Mr.x'}, (error, result)=>{
    //     if(error){
    //         return console.log('error');
    //     }
    //     console.log(result);
    // })

    //create one
    // db.collection('users').insertOne({
    //     name: "haha",
    //     age: 28
    // }, (error, result)=>{
    //     if(error){
    //         return console.log('error insert data');
    //     }

    //     console.log(result.ops);
    // });

    //create many
    // db.collection('users').insertMany([
    //     {
    //         name: 'gilda',
    //         age: 22
    //     },
    //     {
    //         name : 'andini',
    //         age: 22
    //     }
    // ], (error, result)=>{
    //     if(error){
    //         return console.log('error insert data');
    //     }
    //     console.log(result.ops);
    // })

    // db.collection('users').findOne({_id: new ObjectID('5d046f77c3948f1ec4721db7')}, (error, user)=>{
    //     if(error){
    //         return console.log('unable to fetch');
    //     }
    //     console.log(user);
    // })

    // db.collection('users').find({age: 22}).count((error, user)=>{
    //   console.log(user);
    // })

    // db.collection('users').find({age: 22}).toArray((error, user)=>{
    //     console.log(user);
    // });

    // pencarian
    // db.collection('taks').findOne({_id: new ObjectID('5d0473c646517a05bc026009')}, (error, taks)=>{
    //     console.log(taks);
    // })

    // db.collection('taks').find({complated: true}).toArray((error, data)=>{
    //     console.log(data);
    // })


    // db.collection('users').insertOne({
    //     _id: id,
    //     name: "Riska Rahma",
    //     age: 26
    // },(error, result) =>{
    //     if(error){
    //         return console.log('unable to insert user');
    //     }
    //     console.log(result.ops);
    // });

    // db.collection('users').insertMany([
    //     {
    //         name : 'aa',
    //         age: 23
    //     },
    //     {
    //         name: 'gg',
    //         age: 23
    //     }
    // ], (error, result) =>{
    //     if(error){
    //         return console.log('unable to insert data');
    //     }
    //     console.log(result.ops);
    // })

    // db.collection('taks').insertMany([
    //     {
    //         description: 'clean to house',
    //         complated: true
    //     },
    //     {
    //         description: 'learn to angular',
    //         complated: false
    //     }
    // ], (error, result) => {
    //     if(error){
    //         return console.log('unable to insert data');
    //     }
    //     console.log(result.ops);
    // })
});