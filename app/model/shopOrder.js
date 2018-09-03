/**
 * Model
 * @param app
 * @returns {*}
 */
module.exports = app => {
    const ShopOrder = app.model.import('../domain/shop_order');
    return ShopOrder;
};