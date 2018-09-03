/**
 * Model
 * @param app
 * @returns {*}
 */
module.exports = app => {
    const ShopHotGoods = app.model.import('../domain/shop_hot_goods');
    return ShopHotGoods;
};