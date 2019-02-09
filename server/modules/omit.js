const omit = (user) => {
    const{_id, firstName, lastName, email} = user;

    const newUser = {
        _id,
        firstName,
        lastName,
        email
    }
    return newUser;
}
module.exports = omit;