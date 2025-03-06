const apiKey = (req, res, next) => {
    console.log(req.headers.api_key)
    key= req.headers.api_key
    if(key === process.env.API_KEY){
        return next()
    }else{
        res.status(403)
        return res.send({error: "API_KEY is missing or invalid"})
    }
}
module.exports = { apiKey }
