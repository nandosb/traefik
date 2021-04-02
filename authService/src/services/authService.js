const validateAuthToken = (authToken) => {
    authToken = authToken.slice(7);
    if(authToken === 'asdf12345678') {
        return true;
    }
    return false;
}

module.exports = {
    validateAuthToken
}