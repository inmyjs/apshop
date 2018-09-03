/**
 * Model
 * @param app
 * @returns {*}
 */
module.exports = app => {
    const ReportDay = app.model.import('../domain/report_day');
    return ReportDay;
};