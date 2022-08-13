const { User } = require('../db/model')

async function ifUserExist(email){
     const theUser = await User.findOne({
        where:{email: email}
})

     if(theUser){
        return true
     }
     else{
        return false
     }
}

async function createUser(firstname, lastname, email, password) {

    
    
        const newUser = await User.create({
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password,
            
        })
        return newUser
  
    
}

async function loginUser(email){
   const theUser = await User.findOne({
      where:{
         email: email,
      }
   })
   return theUser
}
async function getUser(email){
   const theUser = await User.findOne({
      where:{
         email: email,
      }
   })
   return theUser
}

async function isAdmin(email){
   
      const theUser = await User.findOne({
         where:{
            email: email,
         }
      })
      return theUser.isadmin
   
}

module.exports = {ifUserExist,createUser,loginUser,isAdmin,getUser}