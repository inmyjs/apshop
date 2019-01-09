/**
 * document Model
 * @param app
 * @returns {*}
 */
module.exports = app => {
    const document = app.model.import('../domain/document');
    return document;
};