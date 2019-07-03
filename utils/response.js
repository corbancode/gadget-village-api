const errorResponseMsg = (res, status, message, data) => res.status(status).json({
    status: "error",
    message,
    data,
});

const successResponseMsg = (res, message, data) => res.status(200).json({
    status: "success",
    message,
    data,
});

module.exports.errorResponseMsg = errorResponseMsg;
module.exports.successResponseMsg = successResponseMsg;