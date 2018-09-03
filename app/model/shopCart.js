/**
 * Model
 * @param app
 * @returns {*}
 */
module.exports = app => {
    const ShopCart = app.model.import('../domain/shop_cart');
    return ShopCart;
};