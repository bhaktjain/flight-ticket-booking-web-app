const route = require('express').Router();
const {getUser} = require('../../controllers/newUser')
const {newBooking,updateFlight,getUserBookings, getFlight} = require('../../controllers/flights')
const {generatePnr} = require('../../utils/generatepnr')



route.post('/:flightid',async (req,res)=>{
    const theEmail = req.user.email
    const theUser = await getUser(theEmail)
    const {flightid} = req.params
    const pnr = await generatePnr()
    console.log(flightid,theEmail)



    const theFlight = await getFlight(flightid) 
    var todayDate = new Date().toISOString().slice(0, 10);
    var d1= Date.parse(todayDate);
    var d2 = Date.parse(theFlight.date);
    if(d1>d2){
        res.status(403).send({message:"cannot book past date"})
    }
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

route.get('/', async (req, res)=>{
    const theEmail = req.user.email
    const theFlights = await getUserBookings(theEmail)

    if(theFlights){
        res.status(200).send(theFlights)
    }
    else{
        res.status(404).send({message:"no booking found"})
    }

})

module.exports = route;