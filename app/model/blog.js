/**
 * Model
 * @param app
 * @returns {*}
 */
module.exports = app => {
    const Blog = app.model.import('../domain/blog');
    return Blog;
};