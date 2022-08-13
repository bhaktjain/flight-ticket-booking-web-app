const Sequelize = require('sequelize')
const db = new Sequelize('brjflightbooking','brjuser','brjpass',{
    host: 'localhost',
    dialect:'mysql'
})

const Op = Sequelize.Op;
/* const db = new Sequelize('intmfdb','intmfuser','intmfpass',{
    
    storage: __dirname +'/mfdb1.db',
    dialect:'sqlite'
   
}) */
const Model = Sequelize.Model

db.authenticate()
.then(()=>{
    console.log('authenticated')
})
.catch((err)=>{
    console.log(err)
})

module.exports ={db,Model,Op}