/**
 * Model
 * @param app
 * @returns {*}
 */
module.exports = app => {
    const ShopOrderGoods = app.model.import('../domain/shop_order_goods');
    return ShopOrderGoods;
};