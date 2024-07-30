import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMyStatus } from '../slices/statusslice';
import { useEffect } from 'react'
import ReactApexChart from 'react-apexcharts'

function UserChart() {
    const dispatch = useDispatch();
    const status = useSelector(state => state.status.tasks);
    const [chartData, setChartData] = useState({
        series: [0, 0, 0, 0],
        options: {
            chart: {
                type: 'pie',
                height: 500,
                width: '100%',
            },
            labels: ['Overdue Tasks', 'Today Completed Tasks', 'Pending Tasks', 'Completed Tasks'],
            colors: ['#FF4560', '#775DD0', '#FEB019', '#00E396'],
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 300,
                        height: 300
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }],
            legend: {
                position: 'bottom'
            }
        }
    });

    useEffect(() => {
        dispatch(fetchMyStatus());
    }, [dispatch]);

    useEffect(() => {
        if (status) {
            setChartData(prevData => ({
                ...prevData,
                series: [
                    status.overdueTasksCount,
                    status.todayCompletedTasksCount,
                    status.pendingTasksCount,
                    status.completedTasksCount
                ]
            }));
        }
    }, [status]);

    return (
        <div>
            <div id="chart">
                <ReactApexChart options={chartData.options} series={chartData.series} type="pie" height={500} />
            </div>
        </div>
    );
}

export default UserChart;