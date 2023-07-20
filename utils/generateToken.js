import jwt from "jsonwebtoken";

const generateToken = (res, dataId) => {
        const token = jwt.sign({
            dataId
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '30d'
        }
    )

    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV != 'development',
        // secure: false, // i need to set this to false due to lacking of domain and thats an expense, i hope you understand
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 1000
    })
}

export default generateToken;