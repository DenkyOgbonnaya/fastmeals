const omit = (user) => {
    const{_id, userName, contact, email,isAdmin, isBanned} = user;

    const newUser = {
        _id,
        userName,
        contact,
        email,
        isAdmin,
        isBanned
    }
    return newUser;
}
module.exports = omit;