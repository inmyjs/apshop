/**
 * shopOrder Model
 * @param app
 * @returns {*}
 */
module.exports = app => {
    const shopOrder = app.model.import('../domain/shop_order');
    return shopOrder;
};