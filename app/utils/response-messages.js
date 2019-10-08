const productResponseMessages = {
    productCreated: "Product successfully created!",
    productUpdated: "Product successfully updated!",
    productDeleted: "Product successfully deleted!",
    productDeleteFailed: "Failed to delete product!",
    noPhotoUploaded: "Please upload at least one photo to continue"
}

const merchantResponseMessages = {
    merchantCreated: "Merchant successfully created. Follow the link sent to your email to verify your account!",
    merchantExists: "Sorry, a Merchant with this email or phone number already exists!"
}

const categoryResponseMessages = {
    categoryCreated: "Category successfully created!",
    categoryDeleted: "Record successfully deleted!",
    categoryDeleteFailed: "Failed to delete category!",
    subCategoryCreated: "Sub category successfully created!",
    subCategoryDeleted: "Record successfully deleted!",
    subCategoryDeleteFailed: "Failed to delete sub-category!",
}

const authResponseMessages = {
    sessionCreated: "Session successfully created!",
    sessionDeleted: "Session successfully deleted!",
    sessionCreateFailed: "You entered a wrong email or password!",
    passwordReset: "Your password has been reset. Follow the instructions in your email to change your password!",
    passwordChanged: "Your password has been successfully changed!",
    authorisationFailed: "Access Denied! Please login to continue.",
    invalidAuthorisationToken: "Invalid token."
}

module.exports.productResponseMessages = productResponseMessages;
module.exports.merchantResponseMessages = merchantResponseMessages;
module.exports.categoryResponseMessages = categoryResponseMessages;
module.exports.authResponseMessages = authResponseMessages;