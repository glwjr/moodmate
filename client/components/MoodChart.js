/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect } from 'react';
import {
  Chart as ChartJS, ArcElement, Tooltip, Legend,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../store/data';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function MoodChart() {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchData());
  }, []);

  const labels = data.map((mood) => mood.mood);
  const counts = data.map((mood) => mood.count);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Number of Entries',
        data: counts,
        backgroundColor: [
          'rgba(255, 105, 97, 0.2)',
          'rgba(255, 180, 128, 0.2)',
          'rgba(248, 243, 141, 0.2)',
          'rgba(66, 214, 164, 0.2)',
          'rgba(8, 202, 209, 0.2)',
          'rgba(89, 173, 246, 0.2)',
          'rgba(157, 148, 255, 0.2)',
          'rgba(199, 128, 232, 0.2)',
        ],
        borderColor: [
          'rgba(255, 105, 97, 1)',
          'rgba(255, 180, 128, 1)',
          'rgba(248, 243, 141, 1)',
          'rgba(66, 214, 164, 1)',
          'rgba(8, 202, 209, 1)',
          'rgba(89, 173, 246, 1)',
          'rgba(157, 148, 255, 1)',
          'rgba(199, 128, 232, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    maintainAspectRatio: true,
    responsive: true,
  };

  return <Pie data={chartData} options={options} />;
}
