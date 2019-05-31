const dragonTreasure = async (request,response) => {
    const db = request.app.get("db")
    let result = await db.get_dragon_treasure(1)
    response.json(result)
}
const getUserTreasure = async (request,response) => {
    const db = request.app.get("db")
    let result = await db.get_user_treasure(request.session.user.id)
    response.json(result)
}
const addUserTreasure = async (request,response) => {
    const {image_url} = request.body
    const {id} = request.session.user
    const db = request.app.get("db")
    let result = await db.add_user_treasure([image_url,id]).catch(error => console.log(error))
    response.json(result)
}
const getAllTreasure = async (request, response) => {
    const db = request.app.get("db");
    let result = await db.get_all_treasure().catch(error => console.log(error))
    response.json(result);
}


module.exports = {
dragonTreasure,
getUserTreasure,
addUserTreasure,
getAllTreasure
}