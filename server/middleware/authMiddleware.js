let usersOnly = (request,response,next) => {
    if(!request.session.user) {
        response.status(401).json("Please log in")
    } else {
        next()
    }
}
let isAdmin = (request,response,next) => {
    if(!request.session.user.isAdmin) {
        response.status(403).json("you are not an admin")
    } else {
        next()
    }
}
module.exports = {
    usersOnly,
    isAdmin
}
