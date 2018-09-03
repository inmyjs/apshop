/**
 * Model
 * @param app
 * @returns {*}
 */
module.exports = app => {
    const EmailValid = app.model.import('../domain/email_valid');
    return EmailValid;
};