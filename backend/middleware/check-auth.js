const jwt = require("jsonwebtoken");
module.exports = (req,res,next)=>{
    try{
        const token = req.headers.authorization.split(" ")[1];
        // Split it since it will retrun like this "Bearer jsfagasgsgaagasgsdfg"

        jwt.verify(token, "abc@1234_will_add_longer-later")
        next()
    }
    catch(error){
        res.status(401).json({
            message:"Auth Failed!"
        });
    }
}