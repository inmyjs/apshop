/**
 * Model
 * @param app
 * @returns {*}
 */
module.exports = app => {
    const Document = app.model.import('../domain/document');
    return Document;
};