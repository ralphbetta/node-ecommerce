const { token } = require('morgan');
const { generateToken } = require('../middleware/jwtToken');
const generateRefreshToken = require('../middleware/refreshTokken');
const validateMongoDbId = require('../utils/validateMongoDBId');
const User = require('./../model/userModel');
const sendMail = require('./emailController');
// const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');


const createUser = async (req, res) => {
    const email = req.body.email;

    User.findOne({ email: email }).then((result) => {

        User.create(req.body).then((response) => {
            console.log(response);
            return res.status(201).json({
                message: 'User created successfully',
                body: response
            });

        }).catch((error) => {
            return res.status(409).json({
                message: 'User Already Exit',
                success: false
            });
        });

    }).catch((error) => {
        return res.status(500).json({ message: 'Server Error' });
    });

};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    User.findOne({ email: email }).then((user) => {

        if (user) {
            bcrypt.compare(req.body.password, user.password).then((match) => {
                const userData = { email: user.email, name: user.name, id: user._id, role: user.role };
                if (match) {

                    //---------- For Refresh Token---------------------
                    const refreshedToken = generateRefreshToken(userData);
                    User.findByIdAndUpdate(user._id, { refreshToken: refreshedToken }, { new: true }).then((updates) => { });
                    res.cookie("refreshToken", refreshedToken, {
                        httpOnly: true,
                        maxAge: 72 * 60 * 60 * 1000,
                    })
                    //--------------------------------------------------
                    return res.status(200).json({ sucess: true, data: user, token: generateToken(userData) });
                } else {
                    return res.status(401).json({ "message": "Authentication failed. Invalid user or password." })
                }

            });
        } else {
            return res.status(401).json({
                message: 'User does not exist',
                data: user,
            });
        }

    }).catch((error) => {
        res.json({ message: 'Server error' })
    })

}

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    if (cookies.refreshToken) {
        const refreshedToken = cookies.refreshToken;
        User.findOne({ refreshToken: refreshedToken }).then((user) => {
            const userData = { email: user.email, name: user.name, id: user._id, role: user.role };
            jwt.verify(refreshedToken, process.env.JWT_SECRETE, (err, decoded) => {
                if (err || user._id.toString() !== decoded.userdata.id) {
                    console.log(decoded);
                    console.log(userData.id);
                    res.status(404).json("There's something wrong with the refresh token");
                } else {
                    const accessToken = generateToken(userData);
                    res.status(200).json({ accessToken });
                }
            });
        }).catch((err) => {
            res.status(404).json("No user with this refresh token");
        });
    } else {
        throw new Error("No refresh token in cookies");
    }
}


const getAllUsers = (req, res) => {
    User.find().then((users) => {
        res.send(users);
    }).catch((err) => {
        console.error(err);
        res.status(500).send(err);
    });
};


const getUser = (req, res) => {

    const id = req.params.id;

    User.findById(id).then((user) => {
        if (user) {
            return res.json({ data: user, success: true });
        } else {
            return res.json({ data: user, success: false });
        }
    }).catch((error) => {
        res.status(405).send({ message: "User not found" });
        console.log(error);
    })
}


const deleteUser = (req, res) => {
    const id = req.params.id;

    User.findByIdAndDelete(id).then((user) => {
        res.status(200).send({ data: user, message: "deleted" });
    }).catch((error) => {
        res.status(405).send({ message: "unable to delete user" });
        console.log(error);
    })
}

const updateUser = (req, res) => {
    const id = req.params.id;
    User.findByIdAndUpdate(id, req.body, { new: true }).then((user) => {
        if (user) {
            return res.json({ data: user, success: true });
        } else {
            return res.json({ data: user, success: false });
        }
    }).catch((err) => {
        console.error(err);
        return res.status(404).send('User not found');
    });
};



const blockUser = (req, res) => {
    const id = req.params.id;
    User.findByIdAndUpdate(id, { isBlocked: true }, { new: true }).then((user) => {
        if (user) {
            return res.json({ data: user, success: true });
        } else {
            return res.json({ data: user, success: false });
        }
    }).catch((err) => {
        console.error(err);
        return res.status(404).send('User not found');
    });
};

const unblockUser = (req, res) => {
    const id = req.params.id;
    validateMongoDbId(id);
    User.findByIdAndUpdate(id, { isBlocked: false }, { new: true }).then((user) => {
        if (user) {
            return res.json({ data: user, success: true });
        } else {
            return res.json({ data: user, success: false });
        }
    }).catch((err) => {
        console.error(err);
        return res.status(404).send('User not found');
    });
};



const getProfile = (req, res) => {
    const id = req.userData.id;
    User.findById(id).then((user) => {
        if (user) {
            return res.json({ data: user, success: true });
        } else {
            return res.json({ data: user, success: false });
        }
    }).catch((error) => {
        res.status(405).send({ message: "User not found" });
        console.log(error);
    })
}


const deleteProfile = (req, res) => {
    const id = req.userData.id;

    User.findByIdAndDelete(id).then((user) => {
        res.status(200).send({ data: user, message: "deleted" });
    }).catch((error) => {
        res.status(405).send({ message: "unable to delete user" });
        console.log(error);
    })
}

const updateProfile = (req, res) => {
    const id = req.userData.id;
    console.log(req.body);
    User.findByIdAndUpdate(id, req.body, { new: true }).then((user) => {
        if (user) {
            return res.json({ data: user, success: true });
        } else {
            return res.json({ data: user, success: false });
        }
    }).catch((err) => {
        console.error(err);
        return res.status(404).send('User not found');
    });
};


const forgetPassword = async (req, res) => {
    const email = req.body.email;

    User.findOne({ email }).then((user) => {

        user.createPasswordResetToken().then((token) => {
            user.save().then((res) => {});
            
            const link = `http://localhost:5000/${token}`;
            const body = `Hi, Please follow this link to reset your password. this link will be valid till 10 minutes <a href='${link}'>Clickhere</a>`;
            const mailOptions = {
                from: 'info@bitminingoptions.com',
                to: 'gxaviprank@gmail.com',  //req.body.email,
                subject: 'Node Test Email',
                html: body,
            };

            res.json(token);

            // sendMail(mailOptions);

        });

    });

}


const changePassword = (req, res) => {

    const id = req.userData.id; // remove this
    const password = req.body.password;
    const token = req.params.token;
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    validateMongoDbId(id);

    User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() }
    }).then((user) => {
        if (!user) {

            return res.status(401).json({ data: "Token Expired! Please try again", success: true });
        }

        user.password = password;
        user.passwordResetToken = undefined,
            user.passwordResetExpires = undefined,
            user.save()

        return res.status(200).json({ message: "password changed unsucesfully", success: true });
    }).catch((err) => {
        console.error(err);
        return res.status(500).send('Server error');
    });
};


const logout = (req, res) => {
    const cookies = req.cookies;

    if (cookies.refreshToken) {
        const refreshedToken = cookies.refreshToken;
        User.findOneAndUpdate(refreshedToken, { refreshToken: "" }).then((user) => {
            res.clearCookie('refreshToken', {
                httpOnly: true,
                secure: true,
            });

            return res.status(204).json(
                {
                    message: "No user with this refresh token",
                    data: user
                });

        }).catch((err) => {
            res.clearCookie('refreshToken', {
                httpOnly: true,
                secure: true,
            });
            res.status(204).json("No user with this refresh token");
        });
    } else {
        throw new Error("No refresh token in cookies");
    }
}

module.exports = { createUser, loginUser, getAllUsers, getUser, deleteUser, updateUser, blockUser, unblockUser, getProfile, deleteProfile, updateProfile, handleRefreshToken, logout, changePassword, forgetPassword };