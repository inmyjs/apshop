/**
 * blog Model
 * @param app
 * @returns {*}
 */
module.exports = app => {
    const shop = app.model.import('../domain/shop');
    return shop;
};
