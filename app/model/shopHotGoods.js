/**
 * shopHotGoods Model
 * @param app
 * @returns {*}
 */
module.exports = app => {
    const shopHotGoods = app.model.import('../domain/shop_hot_goods');
    return shopHotGoods;
};