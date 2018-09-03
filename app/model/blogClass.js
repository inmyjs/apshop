/**
 * Model
 * @param app
 * @returns {*}
 */
module.exports = app => {
    const BlogClass = app.model.import('../domain/blog_class');
    return BlogClass;
};