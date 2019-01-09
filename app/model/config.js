/**
 * config Model
 * @param app
 * @returns {*}
 */
module.exports = app => {
    const config = app.model.import('../domain/config');
    return config;
};