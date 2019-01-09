/**
 * shopGoodsImages Model
 * @param app
 * @returns {*}
 */
module.exports = app => {
    const shopGoodsImages = app.model.import('../domain/shop_goodsImages');
    return shopGoodsImages;
};