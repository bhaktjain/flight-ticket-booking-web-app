const route = require('express').Router();
const { createUser,ifUserExist } = require('../../controllers/newUser')
const bcrypt = require('bcrypt');


route.post('/', async (req, res) => {

     let {firstname, lastname,email,password} = req.body  
   //console.log(req.body.firstname);

    const ifExist = await ifUserExist(email)
    if (ifExist==false) {
        let hashedPassword = await bcrypt.hash(password, 10);
    
    
        
        
            
            const theUsers = await createUser( firstname, lastname, email, hashedPassword)
            console.log(theUsers)

            res.status(201).send(
                {
                    /* userDetail: theUsers,
                    id: theUsers.id, */
                    mess: "Successfully registered You can now login"
                }
            )
    }
    else{
        res.status(409).send(
            {
                mess: "User Already Exist"
            }
        )
    }



})


module.exports = route