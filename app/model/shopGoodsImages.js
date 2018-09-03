/**
 * Model
 * @param app
 * @returns {*}
 */
module.exports = app => {
    const ShopGoodsImages = app.model.import('../domain/shop_goodsimages');
    return ShopGoodsImages;
};