/**
 * blogClass Model
 * @param app
 * @returns {*}
 */
module.exports = app => {
    const blogClass = app.model.import('../domain/blog_class');
    return blogClass;
};