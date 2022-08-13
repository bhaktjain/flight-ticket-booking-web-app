const route = require('express').Router();
const {getUser} = require('../../controllers/newUser')
const {newBooking,updateFlight} = require('../../controllers/flights')
const {generatePnr} = require('../../utils/generatepnr')

route.post('/:flightid',async (req,res)=>{
    const theEmail = req.user.email
    const theUser = await getUser(theEmail)
    const {flightid} = req.params
    const pnr = await generatePnr()
    console.log(flightid,theEmail)


    const theBooking = await newBooking(flightid,theEmail,pnr)
    const updatedBooking = await updateFlight(flightid)
    console.log(updatedBooking)
    if (updatedBooking!==false){
        res.status(201).send({
            message: `Congratulations ${theUser.firstname} ${theUser.lastname} Booking done successfully`,
            date:updatedBooking.date,
            time:updatedBooking.time,
            flightNo:updatedBooking.flightId
        })
    }
    else{
        res.status(403).send({
            message: "Sorry Flight Fully Booked"
        })
    }
    

})

module.exports = route;