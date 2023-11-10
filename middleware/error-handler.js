const {CustomAPIError} = require('../errors/custom-error')

const errorHandleMiddlwware = (err, req, res, next) => {
    if(err instanceof CustomAPIError) {
        return res.status(err.statusCode).json({msg:err.message})
    }
    console.log(err)
    return res.status(500).json({msg: 'Something went wrong, please try again'})
}

module.exports = errorHandleMiddlwware

// console.log(err) is currently displayed in the console after calling 
//the endpoint in postman so we now have access to custom errors in the middlware
//after creating and passing it to next() in the controller of each endpoint for their
//unique error text