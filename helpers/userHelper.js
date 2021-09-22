var db = require('../config/connection')
const bcrypt = require('bcrypt')
var objectId = require('mongodb').ObjectId
module.exports = {
    addUsers:(users)=>{
        console.log(users)
        return new Promise(async(resolve,reject)=>{
            users.password =await bcrypt.hash(users.password,10)
            db.get().collection('product').insertOne(users).then((data)=>{
               resolve(data)
            })
        })
      
    },
    getAllUsers:()=>{
        return new Promise(async(resolve,reject)=>{
            let users = await db.get().collection('product').find().toArray()
            resolve(users)
        })
    },
    doLogin:(userData)=>{
        return new Promise(async(resolve,reject)=>{
            let loginStatus = false;
            let response = {}
            let user =await  db.get().collection('product').findOne({email:userData.email})
            if(user){
                bcrypt.compare(userData.password,user.password).then((status)=>{
                    if(status){
                        console.log('login success')
                        response.user = user 
                        response.status = true
                        resolve(response)
                    }
                    else {
                        console.log("login failed");
                        resolve({status:false})
                    }
                })
            }else{
                console.log("login failed");
                resolve({status:false})
            }
        })
    },
    deleteProduct:(proId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection('product').remove({_id:objectId(proId)}).then((response)=>{
                console.log(response)
                resolve(response)
            })
        })
    },
    getUserDetails:(proId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection('product').findOne({_id:objectId(proId)}).then((user)=>{
                resolve(user)
            })
        })
    },
    updateUser:(userId,userDetails)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection('product').updateOne({_id:objectId(userId)},{$set:{
                name:userDetails.name,
                email:userDetails.email,
                phone:userDetails.phone
            }})
        })
    }
}