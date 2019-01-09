/**
 * shopUserGoods Model
 * @param app
 * @returns {*}
 */
module.exports = app => {
    const shopUserGoods = app.model.import('../domain/shop_user_goods');
    return shopUserGoods;
};