const jwt = require('jsonwebtoken');
const User = require('../model/userModel');

const requireAuth = async (req, res, next)=>{
    const {authorization} = req.headers;
    if(!authorization){
        return res.status(401).json({error: 'Authorization token required'})
    }

    const token = authorization.split(' ')[1];
    try{
        const { _id } = jwt.verify(token, process.env.SECRET_STRING)
        req.user = await User.findOne({_id}).select('_id')
        next();
    }
    catch(err){
        res.status(401).json({error: 'unauthorized request, unauthorized request. I repeat unauthorized request '})
    }

}

module.exports = requireAuth;