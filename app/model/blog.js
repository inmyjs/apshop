/**
 * blog Model
 * @param app
 * @returns {*}
 */
module.exports = app => {
    const blog = app.model.import('../domain/blog');
    return blog;
};