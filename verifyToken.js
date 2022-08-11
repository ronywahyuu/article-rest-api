import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next)=>{
    const token = req.cookies.access_token 
    // const verify = jwt.verify(token, process.env.JWT_SECRET)
    if(!token) return res.json({success: false, msg: "Login First!"});

    jwt.verify(token, process.env.JWT_SECRET, (err, user)=>{
        if(err) return res.json({msg: 'Failed to verify token'})

        // const verifiedId = decoded.id
        req.verifiedId = user
        // console.log(verifiedId)
        next()
    })
}

export default verifyToken