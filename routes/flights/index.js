const route = require('express').Router();
const { isAdmin } = require('../../controllers/newUser')
const { addFlight, removeFlight,getAllFlights } = require('../../controllers/flights')

route.post('/', async (req, res) => {
    theEmail = req.user.email
    console.log("theEmail", theEmail)
    const theAdmin = await isAdmin(theEmail)

    if (theAdmin) {

        const no = Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000
        const flightNo = 'AP' + no
        var { date, time } = req.body
        const strToDate = new Date(date);
        const newFlight = await addFlight(flightNo, strToDate, time)
        console.log(newFlight)
        res.status(201).send(
            {
                mess: "Flight added"
            }
        )
    }
    else {
        
        res.status(401).send({ message: 'only admin can add a flight' })
    }
})

route.delete('/:flightid', async (req, res) => {

    theEmail = req.user.email
    const theAdmin = await isAdmin(theEmail)

    if (theAdmin) {
        const deleteFlight = await removeFlight(req.params.flightid)
        res.status(200).send({
            mess: "Flight deleted"
        })
    }
    else {
        res.status(401).send({ message: 'only admin can delete a flight' })
    }
})

route.get('/',async (req, res) => {
    const flights = await getAllFlights()
    console.log(flights)
    res.status(200).send(flights)
})




module.exports = route