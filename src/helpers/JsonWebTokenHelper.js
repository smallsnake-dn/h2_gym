const jwt = require("jsonwebtoken")

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "access"
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || "refresh"
const ACCESS_TOKEN_TTL = process.env.ACCESS_TOKEN_TTL || 1 * 60
const REFRESH_TOKEN_TTL = process.env.REFRESH_TOKEN_TTL || 30 * 60

module.exports = {
    genAccessToken: function (data) {
        console.log({ACCESS_TOKEN_SECRET})
        return new Promise((resolve, reject) => {
            jwt.sign({ data }, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_TTL }, (err, token) => {
                if (err) {
                    reject(err)
                }
                resolve(token)
            })
        })
    },
    verifyAccessToken: function (token) {
        console.log({token})
        return new Promise((resolve, reject) => {
            jwt.verify(token, ACCESS_TOKEN_SECRET, (err, data) => {
                if (err) {
                    reject(err)
                }
                resolve(data)
            })
        })
    },
    genRefreshToken: function (data) {
        return new Promise((resolve, reject) => {
            jwt.sign({ data }, REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_TOKEN_TTL }, (err, token) => {
                if (err) {
                    reject(err)
                }
                resolve(token)
            })
        })
    },
    verifyRefreshToken: function (token) {
        return new Promise((resolve, reject) => {
            jwt.verify(token, REFRESH_TOKEN_SECRET, (err, data) => {
                if (err) {
                    reject(err)
                }
                resolve(data)
            })
        })
    }
}