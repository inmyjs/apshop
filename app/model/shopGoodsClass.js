/**
 * shopGoodsClass Model
 * @param app
 * @returns {*}
 */
module.exports = app => {
    const shopGoodsClass = app.model.import('../domain/shop_goodsClass');
    return shopGoodsClass;
};