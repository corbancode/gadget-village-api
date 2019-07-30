const productResponseMessages = {
    productCreated: "Product successfully created!",
    productUpdated: "Product successfully updated!",
    productDeleted: "Product successfully deleted!",
    productDeleteFailed: "Failed to delete product!"
}

const merchantResponseMessages = {
    merchantCreated: "Merchant successfully created. Follow the link sent to your email to verify your account!",
    merchantExists: "Sorry, a Merchant with this email or phone number already exists!"
}

module.exports.productResponseMessages = productResponseMessages;
module.exports.merchantResponseMessages = merchantResponseMessages;