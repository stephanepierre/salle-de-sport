const uid2 = require('uid2');
const SHA256 = require ('crypto-js/sha256');
const encBase64 = require('crypto-js/enc-base64')

function encryptPassword(password) {
    //on crée un token aléatoire de 16 caractères
    const token = uid2(16)

    //on encrypte et retourne le MDP mélangé
    const salt = uid2(16)
    const hash = SHA256(salt + password).toString(encBase64);

    return {
        token,
        salt,
        hash
    };

}

module.exports = encryptPassword;