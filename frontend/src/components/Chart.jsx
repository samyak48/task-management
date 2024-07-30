import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStatus } from '../slices/statusslice';

ChartJS.register(ArcElement, Tooltip, Legend);

const BarChart = () => {
    const dispatch = useDispatch();
    const status = useSelector(state => state.status.tasks);

    const [chartData, setChartData] = useState({
        labels: ['Tasks Completed Today', 'Overdue Tasks', 'Pending Tasks', 'Completed Tasks'],
        datasets: [
            {
                label: '# of Tasks',
                data: [0, 0, 0, 0],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(54, 162, 235, 1)',
                ],
                borderWidth: 1,

            },
        ],
    });

    useEffect(() => {
        dispatch(fetchStatus());
    }, [dispatch]);

    useEffect(() => {
        if (status) {
            setChartData(prevChartData => ({
                ...prevChartData,
                datasets: [{
                    ...prevChartData.datasets[0],
                    data: [
                        status.todayCompletedTasksCount,
                        status.overdueTasksCount,
                        status.pendingTasksCount,
                        status.completedTasksCount
                    ]
                }]
            }));
        }
    }, [status]);

    return (
        <div style={{ width: '30%', height: '30%', }}>
            <Pie data={chartData} />
        </div>
    );
};

export default BarChart;
