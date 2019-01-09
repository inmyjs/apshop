/**
 * activity Model
 * @param app
 * @returns {*}
 */
module.exports = app => {
    const region = app.model.import('../domain/region');
    return region;
};
