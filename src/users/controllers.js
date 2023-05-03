const User = require("./model");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
    try {
        const user = await User.create(req.body)
        res.status(201).json({
            message: "success",
            user: {username: req.body.username, email: req.body.email}
        })
    } catch (error) {
        res.status(501).json({errorMessage: error.message, error: error})
    }
};

const retrieveUser = async (req, res) => {
    try {

        const user = await User.findAll()
        res.status(200).json({
            message: "success",
            user: user
        })
    } catch (error) {
        res.status(501).json({errorMessage: error.message, error: error})
    }
};

const updateUser = async (req, res) => {
    try {
        const updateUser = await User.update (
            {password: req.body.password},
            {where: {username:req.body.username}},
            { new: true }
        );
        res.status(201).json({
            message: "success",
            updateResult: updateUser
        })
    } catch (error) {
        res.status(501).json({errorMessage: error.message, error: error})
    }
};

const deleteUser = async (req, res) => {
    try {

        const user = await User.destroy(
            { where: { id: req.params.id } }
        )
        res.status(201).json({
            message: "success",
            user: {username: req.body.username, email: req.body.email}
        })
    } catch (error) {
        res.status(501).json({errorMessage: error.message, error: error})
    }
};


const login = async (req, res) => {
    try {
        if (req.authUser) {
            res.status(200).json({
                message:"success",
                user: {
                    username: req.authUser.username,
                    email: req.authUser.email
                }
            })
            return
        };
        
        const token = await jwt.sign({id: req.user.id}, process.env.SECRET);
        res.status(200).json({
            message: "success",
            user: {
                username: req.body.username,
                email: req.body.email,
                token: token
            }
        })
    } catch (error) {
        res.status(501).json({ errorMessage: error.message, error: error })
    }
};


module.exports = {
    registerUser,
    retrieveUser,
    updateUser,
    deleteUser,
    login,
};