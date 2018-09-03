/**
 * Model
 * @param app
 * @returns {*}
 */
module.exports = app => {
    const UserLoginL = app.model.import('../domain/userlogin_l');
    return UserLoginL;
};