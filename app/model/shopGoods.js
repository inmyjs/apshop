/**
 * shopGoods Model
 * @param app
 * @returns {*}
 */
module.exports = app => {
    const shopGoods = app.model.import('../domain/shop_goods');
    return shopGoods;
};