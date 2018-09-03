/**
 * Model
 * @param app
 * @returns {*}
 */
module.exports = app => {
    const ShopGoods = app.model.import('../domain/shop_goods');
    return ShopGoods;
};