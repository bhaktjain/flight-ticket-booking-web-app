const express  = require('express')
const app  = express();
const { db } = require('./db/model')
const session = require('express-session')
const {authenticateToken} = require('./utils/jwtautheticate')


const PORT = process.env.PORT || '3000'

app.use(express.json())
app.use(express.urlencoded({ extended: true}))

app.use(session({
  resave:true,
  saveUninitialized:true,
  secret:"secret",
  sameSite:false,
  secure:true,
  name:'userAuthentication'
}))

const signUpRoute = require('./routes/signup/index')
const loginRoute = require('./routes/login/index')
const logoutRoute = require('./routes/logout/index')
const flightsRoute = require('./routes/flights/index')
const bookFlightRoute = require('./routes/bookflight/index')
const searchFlightRoute = require('./routes/searchflight/index')


app.use('/signUp', signUpRoute)
app.use('/login', loginRoute)
app.use('/logout',logoutRoute)
app.use('/flight',authenticateToken,flightsRoute)
app.use('/flights',authenticateToken,flightsRoute)
app.use('/getFlights',authenticateToken,searchFlightRoute)
app.use('/book',authenticateToken,bookFlightRoute)

db.sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`listening on port http://localhost:${PORT}`)
    })
  })
  .catch((err) => {
    console.error(err)
  })
