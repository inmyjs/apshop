/**
 * wordbook Model
 * @param app
 * @returns {*}
 */
module.exports = app => {
    const wordbook = app.model.import('../domain/wordbook');
    return wordbook;
};