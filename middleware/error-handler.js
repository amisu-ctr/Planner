const errorHandleMiddlwware = (err, req, res, next) => {
    console.log(err)
    return res.status(500).json({msg:"somethingwentwrong"}) //This is custom
    // return res.status(500).json({msg:err}) //This returns the error from the controller
    // just with the above post response with the hardcode messge but getsingletask didnt
    // Some kind of message can be hardcoded into the msg:"Something went wrong"
}

module.exports = errorHandleMiddlwware