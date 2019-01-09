/**
 * payMsg Model
 * @param app
 * @returns {*}
 */
module.exports = app => {
    const payMsg = app.model.import('../domain/pay_msg');
    return payMsg;
};