const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');

const asyncHandler = require('express-async-handler');

const router = express.Router();

const User = require("../models/users")

const BAD_REQUEST = 400;

router.post("/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = generateTokenReponse(user);
    res.send({ user: user.getPublicProfile(), token });
  } catch (e) {
    // console.log(e.message)
    res.status(400).send({
      msg: e.message,
    });
  }
});
  // router.post('/signup', async (req,res)=>{
    
  //   console.log(req.body)
  //   res.send({"hello":"helllo"})
  // })

  router.post("/signup",
    async (req,res)=>{
      console.log(req.body)
      const{firstName, lastName, email, password} = req.body;
      const newUser = req.body
      console.log(newUser)
      const user = await User.findOne({email});

      if(user){
        res.status(BAD_REQUEST)
        .send('User already exists.');
        return;
      }

      const encryptedPassword = await bcrypt.hash(password,10);

     const user1 = new User(newUser)

      const dbUser = await User.create(newUser);
      console.log(dbUser)
      const token = generateTokenReponse(dbUser);
    
      res.status(200).send({dbUser,token})
    }
  )

  const generateTokenReponse = (user) => {
    const token = jwt.sign({
    id:user._id
    },"RandomText",{
      expiresIn:"30d"
    });
  
    
    return token;
  }


module.exports = router