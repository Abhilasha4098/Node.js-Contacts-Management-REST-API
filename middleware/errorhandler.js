const { constants } = require("../constants");

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500; // Set default status code to 500 if not set
    switch(statusCode){
        case constants.VALIDATION_ERROR:
            res.json({
                title:"Validation Failed" ,
                message : err.message,
                stackTraces : err.stack});
            break;

        case constants.NOT_FOUND:
           res.json({
            title:"Not Found" ,
            message : err.message,
            stackTraces : err.stack});
            break;
        case constants.NOT_FOUND:
           res.json({
            title:"un Authorized" ,
            message : err.message,
            stackTraces : err.stack});
            break;
        case constants.FORBIDDEN:
           res.json({
            title:"Forbidden" ,
            message : err.message,
            stackTraces : err.stack});
            break;
  case constants.SERVER_ERROR:
           res.json({
            title:"Server Error" ,
            message : err.message,
            stackTraces : err.stack});
            break;
        default:
              console.log("No error, all good");
           break;
 }
    


};

module.exports = errorHandler;
// This middleware function is used to handle errors in the application.