/**
 * Model
 * @param app
 * @returns {*}
 */
module.exports = app => {
    const ShopUserWishList = app.model.import('../domain/shop_user_wishlist');
    return ShopUserWishList;
};