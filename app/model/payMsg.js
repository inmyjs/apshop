/**
 * Model
 * @param app
 * @returns {*}
 */
module.exports = app => {
    const PayMsg = app.model.import('../domain/pay_msg');
    return PayMsg;
};