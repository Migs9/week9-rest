const { Router } = require("express");
const userRouter = Router();

const { registerUser, retrieveUser, updateUser, deleteUser, login } = require("./controllers");
const { hashPass, comparePass, tokenCheck } = require("../middleware");

userRouter.post("/users/register", hashPass, registerUser);

userRouter.get("/users/retrieve", tokenCheck, retrieveUser);

userRouter.put("/users/update", updateUser);

userRouter.delete("/users/delete/:id", deleteUser);

// login

userRouter.post("/users/login", comparePass, login);

// GET Authcheck

userRouter.get("/users/authCheck", tokenCheck, login);

module.exports = userRouter