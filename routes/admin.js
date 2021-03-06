var express = require('express');
var router = express.Router();
var userHelper = require('../helpers/userHelper')
var user = 'Abijith';
var password = 221122;
/* GET users listing. */
router.get('/',(req,res)=>{
  if(req.session.loggedIn&& req.session.admin){
    res.redirect('/admin/adminpage')
  }else{
    
    res.render('adminlogin',{'loginErr':req.session.loginErr});
    req.session.loginErr = false
  }
});

router.post('/',(req,res)=>{
  if(req.body.name == user && req.body.password == password){
    req.session.admin = user
    req.session.loggedIn = true
   
    res.redirect('/admin/adminpage')
  }else{
    req.session.loginErr = true;
    res.redirect('/admin')
  }

})
// router.post('/',(res,req)=>{
//   console.log(req.body);
//   if(req.body.name === username && req.body.password === password){
//     console.log("hii")
//     res.redirect('/adminpage')
//   }
// })
router.get('/adminpage',(req,res)=>{
  
    userHelper.getAllUsers().then((users)=>{
     if(req.session.admin){
      res.render('adminpage',{users})
     }else{
       res.redirect('/admin')
     }
      
    })
    
})
router.get('/addusers',(req,res)=>{
  if(req.session.admin){
    res.render('addusers')
  }else{
    res.redirect('/admin')
  }
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
  if(req.session.admin){
  let user =await userHelper.getUserDetails(req.params.id)
  console.log(user)
  res.render('edit-users',{user})
}else{
  res.redirect('/admin')
}
})
router.post('/edit-users/:id',(req,res)=>{
  userHelper.updateUser(req.params.id,req.body)
  res.redirect('/admin/adminpage')
})
router.get('/signout',(req,res)=>{
 
  delete req.session.admin
  res.redirect('/admin')
})


module.exports = router;
