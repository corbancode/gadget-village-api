const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const allowedFileExtensions = ['.jpg', '.png', '.jpeg'];

function uploadProductAvatars(avatars) {
    const uploadedAvatars = avatars.map((avatar) => {
        return processAvatar(avatar);
    });
    return uploadedAvatars;
} 

function processAvatar(currentAvatar) {
    const tempPath = path.join(appRoot, `./${currentAvatar.path}`);
    const randomString = crypto.randomBytes(20).toString('hex');
    const fileName = randomString + path.extname(currentAvatar.originalname);
    const targetPath = path.join(appRoot, `./uploads/${fileName}`);
    if (allowedFileExtensions.indexOf(path.extname(currentAvatar.originalname).toLowerCase()) != -1) {
        let fileError;
            fs.rename(tempPath, targetPath, err => {
            fileError = err;
        });
        if (!fileError) {
            return fileName;
        }
        else {
            console.log(fileError);
            return false;
        }
    }
    else {
        fs.unlink(tempPath, err => {
            return false;
        });
    }
}

async function deleteProductAvatars(avatars) {
    avatars.forEach((avatar) => {
        fs.unlinkSync(path.join(appRoot, `./uploads/${avatar}`));
    })
}

async function clearUploadedFiles(files) {
    if (files) {
        files.forEach((avatar) => {
            fs.unlinkSync(avatar.path);
        });
    }
}

module.exports.uploadProductAvatars = uploadProductAvatars;
module.exports.deleteProductAvatars = deleteProductAvatars;
module.exports.clearUploadedFiles = clearUploadedFiles;