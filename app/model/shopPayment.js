/**
 * Model
 * @param app
 * @returns {*}
 */
module.exports = app => {
    const ShopPayment = app.model.import('../domain/shop_payment');
    return ShopPayment;
};