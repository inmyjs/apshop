/**
 * wordbookTitle Model
 * @param app
 * @returns {*}
 */
module.exports = app => {
    const wordbookTitle = app.model.import('../domain/wordbookTitle');
    return wordbookTitle;
};