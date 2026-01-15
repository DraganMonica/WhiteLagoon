$(document).ready(function () {
    loadCustomerBookingPieChart();
});

function loadCustomerBookingPieChart() {
    console.log("customer booking JS loaded");
    $(".chart-spinner").show();

    $.ajax({
        url: "/Dashboard/GetBookingPieChartData",
        type: 'GET',
        datatype: 'json',
        success: function (data) {
            console.log("SERIES:", data.series);
            console.log("LABELS:", data.labels);

            loadPieChart("customerBookingsPieChart", data);

            $(".chart-spinner").hide();
        }
    });
}

function loadPieChart(id, data) {
    var chartColors = getChartColorsArray(id);
    var options = {
        // date fictive pentru ca eu am bookings in pending
        //series: [35, 65],
        series: data.series,
        labels: data.labels,
        colors: chartColors,
        chart: {
            type: 'pie',
            width: 380,
            height: 350 
        },
        stroke: {
            show:false
        },
        legend: {
            position: 'bottom',
            horizontalAlign: 'center',
            labels: {
                colors: "#fff",
                useSeriesColors:true
            },
        },
    };
    console.log("Chart element:", document.querySelector("#" + id));

    var chart = new ApexCharts(document.querySelector("#" + id), options);
    chart.render();
}

