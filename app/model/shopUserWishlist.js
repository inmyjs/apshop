/**
 * shopUserWishlist Model
 * @param app
 * @returns {*}
 */
module.exports = app => {
    const shopUserWishlist = app.model.import('../domain/shop_user_wishlist');
    return shopUserWishlist;
};