/**
 * userLoginL Model
 * @param app
 * @returns {*}
 */
module.exports = app => {
    const userLoginL = app.model.import('../domain/userLogin_L');
    return userLoginL;
};