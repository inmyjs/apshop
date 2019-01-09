/**
 * blog Model
 * @param app
 * @returns {*}
 */
module.exports = app => {
    const subject = app.model.import('../domain/subject');
    return subject;
};
