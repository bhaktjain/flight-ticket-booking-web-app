const route = require('express').Router();
const bcrypt = require('bcrypt');
const {ifUserExist,loginUser} = require('../../controllers/newUser')
const {generateAccessToken} = require('../../utils/jwtautheticate')

route.post('/',async (req, res) => {
    const {email,password} = req.body
    const isExist = await ifUserExist(email)
    if (!isExist) {
        res.status(404).send({message:"user not found please check email and password"})
    }
    else{
        const theUser  = await loginUser(email)
        const validPassword = await bcrypt.compare(password, theUser.password);
        if (!validPassword){
            res.status(401).send({message:"Unauthorized incorrect credentials"})
        }
        else{
            const jsonParam = {
                "email":theUser.email,
                "firstname":theUser.firstname,
                "lastname":theUser.lastname
            }
            const token = generateAccessToken(jsonParam)
            console.log(token)
            req.session.authorization = 'bearer '+token;
            res.status(200).send({message:"successfully loggedin"})
        }
    }
})

module.exports = route;