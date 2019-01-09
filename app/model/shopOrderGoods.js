/**
 * shopOrderGoods Model
 * @param app
 * @returns {*}
 */
module.exports = app => {
    const shopOrderGoods = app.model.import('../domain/shop_order_goods');
    return shopOrderGoods;
};