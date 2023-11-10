const errorHandleMiddlwware = (err, req, res, next) => {
    console.log(err)
    return res.status(err.status).json({msg: err.message}) 
}

module.exports = errorHandleMiddlwware

// console.log(err) is currently displayed in the console after calling 
//the endpoint in postman so we now have access to custom errors in the middlware
//after creating and passing it to next() in the controller of each endpoint for their
//unique error text