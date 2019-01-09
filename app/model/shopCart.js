/**
 * shopCart Model
 * @param app
 * @returns {*}
 */
module.exports = app => {
    const shopCart = app.model.import('../domain/shop_cart');
    return shopCart;
};