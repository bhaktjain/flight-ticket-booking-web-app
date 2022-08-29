const route = require('express').Router();

route.put('/', async (req, res) => {
    if(req.session.authorization!==null){
        req.session.authorization = null
    res.send({ msg: 'You have been Logged Out' });
    }
    else{
        res.send({ msg: 'You must login to logout' });
    }
    
})





module.exports = route