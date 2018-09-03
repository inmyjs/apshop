/**
 * Model
 * @param app
 * @returns {*}
 */
module.exports = app => {
    const GuestMessage = app.model.import('../domain/guest_message');
    return GuestMessage;
};