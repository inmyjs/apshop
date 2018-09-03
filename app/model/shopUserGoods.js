/**
 * Model
 * @param app
 * @returns {*}
 */
module.exports = app => {
    const ShopUserGoods = app.model.import('../domain/shop_user_goods');
    return ShopUserGoods;
};