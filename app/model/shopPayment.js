/**
 * shopPayment Model
 * @param app
 * @returns {*}
 */
module.exports = app => {
    const shopPayment = app.model.import('../domain/shop_payment');
    return shopPayment;
};