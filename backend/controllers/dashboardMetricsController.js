const DashboardMetrics = require("../models/dashboardmetrics");

const getDashboardMetrics = async (req, res) => {
    try {
        const dashboardMetrics = await DashboardMetrics.getAllMetrics();

        if (dashboardMetrics) {
            res.status(200).json(dashboardMetrics);
        } else {
            res.status(404).send("No metrics data found");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("ControllerError: Error retrieving dashboard metrics");
    }
}

module.exports = {
    getDashboardMetrics
}
