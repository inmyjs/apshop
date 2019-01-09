/**
 * blog Model
 * @param app
 * @returns {*}
 */
module.exports = app => {
    const subjectGoods = app.model.import('../domain/subject_goods');
    return subjectGoods;
};
