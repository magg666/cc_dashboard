import React from 'react';
import Chart from 'react-apexcharts'

/**
 * Column graph for total projects statistic in each module.
 * Columns - additions and deletions of line of code
 * Line - commits
 * From apex-charts
 * Documentation: https://apexcharts.com/react-chart-demos/mixed-charts/line-column/
 */

export default class BarChart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            series: [
                {
                    name: 'Deletions',
                    type: 'column',
                    data: this.props['deletions']
                },
                {
                    name: "Additions",
                    type: 'column',
                    data: this.props['additions']
                },
                {
                    name: "Commits",
                    type: 'line',
                    data: this.props['commits']
                },
            ],

            options: {
                chart: {
                    height: 0.95*window.innerHeight -24,
                    width: "100%",
                    type: "line",
                    stacked: false,
                    background: "#000"
                },
                dataLabels: {
                    enabled: true,
                    enabledOnSeries: [2],

                    style: {
                        fontSize: '16px',
                        fontFamily: 'Helvetica, Arial, sans-serif',
                        colors: ['#fff']
                    },
                    textAnchor: 'middle',
                    offsetX: 0,
                    offsetY: -20,
                },
                colors: ['#c21bb3', '#edba4d', '#3ce6f4'],

                stroke: {
                    width: [4, 4, 4]
                },

                markers: {
                    size: 6,
                    opacity: 0.9,
                    colors: ["#FFA41B"],
                    strokeColor: "#fff",
                    strokeWidth: 2,

                    hover: {
                        size: 7,
                    }
                },

                plotOptions: {
                    bar: {
                        columnWidth: "30%"
                    }
                },
                xaxis: {
                    categories: this.props['projectsTitles'],
                    labels: {
                        trim: true,
                        hideOverlappingLabels: false,
                        rotate: 0,
                        rotateAlways: false,

                    }
                },
                yaxis: [
                    {
                        seriesName: 'Deletions',
                        axisTicks: {
                            show: true
                        },
                        axisBorder: {
                            show: true,
                        },
                        title: {
                            text: "Changes of code's lines"
                        }
                    },
                    {
                        seriesName: 'Additions',
                        show: false
                    }, {
                        opposite: true,
                        seriesName: 'Commits',
                        axisTicks: {
                            show: true
                        },
                        axisBorder: {
                            show: true,
                        },
                        title: {
                            text: "Commits"
                        }
                    }
                ],
                tooltip: {
                    shared: false,
                    intersect: true,
                    x: {
                        show: false
                    }
                },
                legend: {
                    horizontalAlign: "left",
                    offsetX: 40
                },
                grid: {
                    padding: {
                        left: -80,
                        right: 80
                    }
                }
            }
        }
    }

    render() {
        return (
                <div id="chart">
                    <Chart options={this.state.options} series={this.state.series} type="bar"
                           height={this.state.options.chart.height}/>
                </div>
        )
    }
}