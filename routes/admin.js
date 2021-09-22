var express = require('express');
var router = express.Router();
var userHelper = require('../helpers/userHelper')
/* GET users listing. */
router.get('/',(req,res)=>{
    res.render('adminlogin')
});
router.get('/adminpage',(req,res)=>{
    userHelper.getAllUsers().then((users)=>{
      res.render('adminpage',{users})
    })
    
})
router.get('/addusers',(req,res)=>{
    res.render('addusers')
})
router.post('/addusers',(req,res)=>{
    console.log(req.body)
    
    userHelper.addUsers(req.body).then((response)=>{
      res.redirect('adminpage')
    })
})
router.get('/delete/:id',(req,res)=>{
  let proId = req.params.id;
  console.log(proId)
  userHelper.deleteProduct(proId).then((response)=>{
    res.redirect('/admin/adminpage')
  })
})
router.get('/edit-users/:id',async(req,res)=>{
  
  let user =await userHelper.getUserDetails(req.params.id)
  console.log(user)
  res.render('edit-users',{user})
})
router.post('/edit-users/:id',(req,res)=>{
  userHelper.updateUser(req.params.id,req.body)
  res.redirect('/admin/adminpage')
})
module.exports = router;
