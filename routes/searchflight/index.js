const route = require('express').Router();
const {searchFlights} = require('../../controllers/flights')

route.get('/',async (req,res)=>{
    const {date} = req.body
    const flights = await searchFlights(date)
    if (flights){
        res.status(200).send(flights)
    }
    else{
        res.status(404).send({message:"flights not available"})
    }

})

module.exports = route