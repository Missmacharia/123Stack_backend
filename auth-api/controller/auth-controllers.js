const mssql = require("mssql");
const sqlConfig = require("../config/index");
const { v4 } = require("uuid");
const bcrypt = require("bcrypt");
const signinSchema = require("../schemas/signinSchema");
const { user } = require("../config/index");
const loginSchema = require("../schemas/loginSchema");
const jwt = require("jsonwebtoken");

const getUsers = async (req, res) => {
  try {
    const pool = await mssql.connect(sqlConfig);
    const response = await pool.request().execute("getUsers");
    const users = await response.recordset;
    if (user.length) {
      return res.status(200).json({
        users,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const signUpController = async (req, res) => {
  try {
    //get the body from the schemas
    //if they haven't followed an appropriate order
    console.log(req.body);
    const { error } = signinSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: "re-enter credentials",
      });
    }

    const { userName, email } = req.body;

    //creates a connection to the database
    const pool = await mssql.connect(sqlConfig);
    const id = v4();
    //generates a salt
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);
    // const password = await bcrypt.hash(req.body.password, 10)
    let signinResult = await (
      await pool
        .request()
        .input("id", mssql.VarChar, id)
        .input("userName", mssql.VarChar, userName)
        .input("email", mssql.VarChar, email)
        .input("password", mssql.VarChar, password)
        .execute("signInuser")
    ).rowsAffected;
    console.log(signinResult);

    res.status(200).json({
      message: "sign in successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      message: "sign in failed",
    });
  }
};

const loginUserController = async (req, res) => {
  try {
    //get the body from the schema to verify the data

    const { error } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: "re-enter credientials",
      });
    }

    const { email, password } = req.body;
    const pool = await mssql.connect(sqlConfig);
    let result = await (
      await pool
        .request()
        .input("email", mssql.VarChar, email)
        .execute("loginUser")
    ).recordset[0];

    //compares the saved and login passwords
    const validPassword = await bcrypt.compare(password, result.password);

    if (!validPassword) {
      return res.status(400).json({
        message: "wrong credentials",
      });
    }

    const { id, username } = result;
    //creating a token for the user
    const token = await jwt.sign({ id, email }, "SECRET", {
      expiresIn: "18hrs",
    });

    res.status(201).send({
      user: { id, username, email },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      message: "login failed",
    });
  }
};

const userById = async (req, res) => {
  try {
    let { id } = req.user;
    console.log(id);
    const pool = await mssql.connect(sqlConfig);
    let user = await (
      await pool.request().input("id", mssql.VarChar, id).execute("userById")
    ).recordset[0];
    if (user.length <= 0) {
      return res.status(404).send({ message: "failed to identity user" });
    }
    res.status(200).send({
      user: { id: user.id, user: user.username, email: user.email },
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "failed to process request please try again" });
  }
};

module.exports = {
  signUpController,
  loginUserController,
  userById,
  getUsers,
};
