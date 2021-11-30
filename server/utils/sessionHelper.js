const isLoggedIn = (session) => session && session.username && session.userID;

const sessionGuard = (request, response) => {
    if (!isLoggedIn(request.session)) {
        response.status(401).send();
        return false;
    }
    return true;
}

module.exports = {
    isLoggedIn,
    sessionGuard
}