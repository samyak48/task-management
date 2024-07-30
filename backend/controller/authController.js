const User = require('../db/model/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { promisify } = require('util')
exports.signup = async function (req, res, next) {
    try {

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const newUser = await User.query().insert({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            role: req.body.role,
        })
        const token = jwt.sign({ id: newUser.id }, process.env.SECRET_KEY, { expiresIn: process.env.JET_EXPIRE_IN })
        // console.log(token)

        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 1000 * 60 * 60 * 24,
            // credentials: true,
        });
        res.status(200).json({
            status: 200,
            token,
            data: { user: newUser }
        })
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            message: error.message
        });
    }
}
exports.login = async function (req, res, next) {
    try {
        const email = req.body.email
        const password = req.body.password
        if (!email || !password) {
            return res.status(400).json({
                status: 400,
                message: "Please provide email and password"
            })
        }
        const user = await User.query().findOne({ email: email });
        if (!user) {
            return res.status(400).json({
                status: 400,
                message: "Invalid email or password"
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                status: 400,
                message: "Invalid email or password"
            });
        }
        const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, { expiresIn: process.env.JET_EXPIRE_IN })
        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'strict',
            // credentials: true,
            maxAge: 1000 * 60 * 60 * 24, // 1 day
        });
        res.status(200).json({
            status: 200,
            token,
            data: { user: user }
        });
        next();
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            status: 500,
            message: error.message
        });
    }
}

exports.protect = async (req, res, next) => {
    try {
        let token
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1]
        }
        // console.log(req.cookies)
        // if (req.cookies.token) {                  //use if you want to varify with cookie
        //     token = req.cookies.token;
        // }
        // console.log(token)
        if (!token) {
            return res.status(401).json({
                status: 401,
                message: "You are not logged in"
            })
        }
        const decod = await promisify(jwt.verify)(token, process.env.SECRET_KEY)

        const currentuser = await User.query().findOne({ id: decod.id });
        // console.log(currentuser)
        if (!currentuser) {
            return res.status(401).json({
                status: 401,
                message: "You are not logged in",
            })
        }
        req.user = currentuser

        next()
    } catch (err) {
        return res.status(401).json({
            status: 401,
            message: err.message
        })
    }
}


