const bcrypt = require("bcryptjs");

const register = async (request,response) => {
    const { username, password, isAdmin } = request.body
    const db = request.app.get("db")
    const result = await db.get_user(username)
        .catch(error => console.log(error))
    const existingUser = result[0]
    if(existingUser) {
        response.status(409).json("Username is already taken")
    } else {
        const hash = await bcrypt.hash(password,12)
            .catch(error => console.log(error))
        let registeredUser = await db.register_user([isAdmin,username,hash])
            .catch(error => console.log(error))
        let user = registeredUser[0]
        request.session.user = {
            isAdmin: user.is_admin,
            username: user.username,
            id: user.id
        }
        response.status(201).json(request.session.user)
    }
}
const login = async (request,response) => {
    const { username,password} = request.body
    const db = request.app.get("db")
    const foundUser = await db.get_user(username)
        .catch(error => console.log(error))
        console.log(foundUser)
    const user = foundUser[0]
    if (!user) {
        response.status(401).json("Register to be part of the club")
    } else {
        const isAuthorized = await bcrypt.compare(password,user.hash)
        if (!isAuthorized) {
            response.status(403).json("WRONG!!!")
        } else {
            request.session.user = {username: user.username, isAdmin: user.is_admin, id: user.id}
            response.json(request.session.user)
        }
    }
}
const logout = (request,response) => {
    request.session.destroy()
    response.json("you are logged out")
}
module.exports = {
    register,
    login,
    logout
}