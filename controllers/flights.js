const { Flights,Bookings } = require('../db/model')

async function addFlight(flightNo,date,time){
    try{
        const flight = await Flights.create({
            flightid:flightNo,
            date:date,
            time:time
        })
        return flight
    }
    catch(err){
        console.log(err)
        return err
    }
    
}

async function removeFlight(flightNo){
    try{
        const flight = await Flights.destroy({
            where:{
                flightid:flightNo
            }
        })
        return true
    }
    catch(err){
        console.log(err)
        return err
    }
    
}

async function newBooking(flightNo,email,pnr){
    try{
        const newBooking = await Bookings.create({
            pnr:pnr,
            email: email,
            flightid:flightNo
        })
        return newBooking
    }
    catch(err){
        console.log(err)
        return err
    }
}

async function updateFlight(flightNo){
    try{
        const theflight = await Flights.findOne({
            where:{
                flightid:flightNo
            }
        })
        let count = theflight.availableCount
        const updatedFlight = await Flights.update(
            {
                availableCount : count-1
        },
        {where:{flightid:flightNo}})

        if (count===0){
            return false
        }else{
            return theflight
        }
        
    }
    catch(err){
        console.log(err)
        return err;
    }
}

async function getAllFlights(){
    const flights = await Flights.findAll()
    return flights
}

async function searchFlights(date){
    const flight = await Flights.findAll({
        where:{
            date:date
        }
    })
    if (flight){
        return flight
    }
    else{
        return false
    }
}

async function getUserBookings(email){
    try{
        const flights = await Bookings.findAll({
            where:{
                email:email
            }
        })

        if(flights){
            return flights
        }
        else{
            return false
        }
    }
    catch(err){
        console.log(err)
        return err
    }
   
}

async function getFlight(flightid){
    const flight = await Flights.findOne({
        where:{
            flightid:flightid
        }
    })
    return flight
}
module.exports = {addFlight,removeFlight,newBooking,updateFlight,getAllFlights,searchFlights,getUserBookings,getFlight}