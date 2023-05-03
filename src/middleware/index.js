const User = require("../users/model");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const saltRounds = process.env.SALT_ROUNDS;

const hashPass = async (req, res, next) => {
    try {
        req.body.password = await bcrypt.hash(
            req.body.password,
            parseInt(saltRounds)
        );
        console.log()
        next()

    } catch (error) {
        res.status(501).json({errorMessage: error.message, error: error})
    }
};

const comparePass = async (req, res, next) => {
    try {
        req.user = await User.findOne({where: {username:req.body.username}});

        if (req.user === null) {
            throw new Error ("password or username doesnt match")
        }
            const comparePassword = await bcrypt.compare(req.body.password, req.user.password)

            if(!comparePassword){
                throw new Error ("password or username doesn't match") 
            }


            next()
    } catch (error) {
        res.status(401).json({errorMessage: error.message, error: error})
    }
};

const tokenCheck = async (req, res, next) => {
    try {
        if (!req.header("Authorization")) {
            throw new Error("No header or token passed in request")
        }
        const token = req.header("Authorization").replace("Bearer ", "");
        const decodedToken = await jwt.verify(token, process.env.SECRET)

        const user = await User.findOne({ where: {id: decodedToken.id}});
        if(!user){
            throw new Error("User is not authorised")
        };
        req.authUser = user

        next();
    } catch (error) {
        res.status(401).json({errorMessage: error.message, error: error})
    }
}


module.exports = {
    hashPass,
    comparePass,
    tokenCheck,
};