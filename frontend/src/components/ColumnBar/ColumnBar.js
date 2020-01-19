import React from 'react';
import Chart from 'react-apexcharts'
import {Title} from "../Title/Title";
import styledPaper from "../StyledPaper/StyledPaper";

/**
 * Column graph for total projects statistic in each module.
 * Columns - additions and deletions of line of code
 * Line - commits
 * From apex-charts
 * Documentation: https://apexcharts.com/react-chart-demos/mixed-charts/line-column/
 */

class BarChart extends React.Component {
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
                    height: 0.90 * window.innerHeight - 34, // 34 = h2 (24px + 10px paper padding)
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
                    width: 4
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
                        style: {
                            colors: '#ffffff',
                            fontSize: '16px',
                            fontFamily: 'Roboto sans-serif',
                        },

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
                            text: "Changes of code's lines",
                            style: {
                                colors: '#ffffff',
                                fontSize: '16px',
                                fontFamily: 'Roboto sans-serif',
                            },
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
                            text: "Commits",
                            style: {
                                colors: '#ffffff',
                                fontSize: '16px',
                                fontFamily: 'Roboto sans-serif',
                            },
                        },

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
                        right: -80,
                    }
                }
            }
        }
    }

    render() {
        return (<React.Fragment>
                <Title title={this.props.title}/>
                <div id="chart">
                    <Chart options={this.state.options} series={this.state.series} type="bar"
                           height={this.state.options.chart.height}/>
                </div>
            </React.Fragment>
        )
    }
}

export const StyledColumnBar = styledPaper(BarChart);