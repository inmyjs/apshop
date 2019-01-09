/**
 * emailValid Model
 * @param app
 * @returns {*}
 */
module.exports = app => {
    const emailValid = app.model.import('../domain/email_valid');
    return emailValid;
};