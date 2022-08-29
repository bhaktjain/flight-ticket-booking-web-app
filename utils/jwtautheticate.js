const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

function generateAccessToken(param){
    return jwt.sign(param, process.env.TOKEN_SECRET, { expiresIn: '1800s'});
}

const authenticateToken = (req, res, next) => {
    /* const authHeader = req.headers.authorization; */
    const authHeader = req.session.authorization
    console.log(authHeader);

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        //secret matching, checking expiry of token and storing data to payload
        jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
            if (err) {
                console.log(err)
                return res.sendStatus(403);
            }

            req.user = user;
            console.log(user)
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

module.exports = {generateAccessToken,authenticateToken}