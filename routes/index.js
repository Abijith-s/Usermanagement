var express = require('express');
var router = express.Router();
var userHelper = require('../helpers/userHelper')
/* GET home page. */
router.get('/', function(req, res, next) {
  if(req.session.loggedIn && req.session.user){
    res.redirect('users')
  }else{

    res.render('login',{'loginErr':req.session.loginErr});
    req.session.loginErr = false
  }
 
});
router.get('/signup',(req,res)=>{
  res.render('signup')
})

router.post('/signup',(req,res)=>{
  // userHelper.checkUsers(req.body.email).then((response)=>{
  //   if(response.email ==req.body.email){
  //     console.log("user exists")
  //     res.render('signup')
  //   }
  // })
  userHelper.addUsers(req.body).then((response)=>{
    console.log(req.body)
    res.redirect('users')
  })
 
})
router.post('/',(req,res)=>{
  userHelper.doLogin(req.body).then((response)=>{
    if(response.status){
      req.session.user = response.user
      req.session.loggedIn = true
      
      res.redirect('/users')
    }else{
      req.session.loginErr = true
      res.redirect('/')
    }
  })
})
router.get('/users', function(req, res, next) {
  let users = req.session.user;
  console.log(users)
  var products = [
    {
      title : "Boxing",
      description :"  I love boxing because of the struggle to be the best. It's the skill and coordination. It's the focus and stamina.",
      image : "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/boxer-exercising-with-punch-bag-royalty-free-image-685043825-1537211838.jpg"
    },
    {
     title : "Tavelling",
     description : "Travel takes us out of our comfort zones and inspires us to see, taste and try new things. It constantly challenges us1",
     image : "https://cdn.lifehack.org/wp-content/uploads/2016/06/21101143/person-984282_1280.jpg"
    },
    {
     title : "Developer",
     description : " The thing that I love about being a web developer, always has been the sole fact that it lets me create new things out of nothing.",
     image : "https://images.unsplash.com/photo-1522252234503-e356532cafd5?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZGV2ZWxvcGVyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80"
   },
   {
    title : "Developer",
    description : " The thing that I love about being a web developer, always has been the sole fact that it lets me create new things out of nothing.",
    image : "https://images.unsplash.com/photo-1522252234503-e356532cafd5?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZGV2ZWxvcGVyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80"
  },
  {
    title : "Developer",
    description : " The thing that I love about being a web developer, always has been the sole fact that it lets me create new things out of nothing.",
    image : "https://images.unsplash.com/photo-1522252234503-e356532cafd5?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZGV2ZWxvcGVyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80"
  },
  {
    title : "Developer",
    description : " The thing that I love about being a web developer, always has been the sole fact that it lets me create new things out of nothing.",
    image : "https://images.unsplash.com/photo-1522252234503-e356532cafd5?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8ZGV2ZWxvcGVyfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80"
  }
  ]
  if(!req.session.user){
    res.render('login')
  }else{
  res.render('users',{products,users});
  }
});
router.get('/logout',(req,res)=>{
  
  delete req.session.user
  
  res.redirect('/')
 
 
})
module.exports = router;


