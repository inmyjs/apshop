/**
 * guestMessage Model
 * @param app
 * @returns {*}
 */
module.exports = app => {
    const guestMessage = app.model.import('../domain/guest_message');
    return guestMessage;
};