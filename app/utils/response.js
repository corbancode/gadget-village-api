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

const sessionSuccessResponseMsg = (res, message, token, data) => res.status(200).json({
    status: "success",
    token,
    message,
    data,
});

module.exports.errorResponseMsg = errorResponseMsg;
module.exports.successResponseMsg = successResponseMsg;
module.exports.sessionSuccessResponseMsg = sessionSuccessResponseMsg;