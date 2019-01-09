/**
 * reportDay Model
 * @param app
 * @returns {*}
 */
module.exports = app => {
    const reportDay = app.model.import('../domain/report_day');
    return reportDay;
};