import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import dataByMode from '../assets/heartbeats_dataset.json';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const HeartRateGraph = () => {
  const [viewMode, setViewMode] = useState('day'); // Default mode: Day
  const [xAxisLabel, setXAxisLabel] = useState('Day: 15-min Intervals')

  useEffect(()=> {
    const labels = {
      day: "By Day: 15-min Intervals",
      week: "By Week: 1 Hour Intervals",
      month: "By Month: 1 Day Intervals",
      year: "By Year: 1 Week Intervals",
    }
    setXAxisLabel(labels[viewMode])
  }, [viewMode]);

  // Data for different modes
  const selectedData = dataByMode[viewMode];

  // Graph data and options
  const data = {
    labels: selectedData.labels,
    datasets: [
      {
        label: 'Heart Rate (bpm)',
        data: selectedData.data,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4,
        pointRadius: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        ticks: {
          color: 'white',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.2)',
        },
      },
      y: {
        ticks: {
          color: 'white',
        },
        min: 0,
        max: 200,
        grid: {
          color: 'rgba(255, 255, 255, 0.2)',
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };


  return (
    <div className="bg-gray-800 p-6 rounded-md shadow-md">
      <div className="w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-md font-bold text-gray-200">Heart Rate</h2>
          <select
            className="bg-gray-700 text-gray-200 rounded-md px-4 py-2"
            value={viewMode}
            onChange={(e) => setViewMode(e.target.value)}
          >
            <option value="day">Throughout the Day (10-min Intervals)</option>
            <option value="week">Throughout the Week (Hourly Averages)</option>
            <option value="month">Throughout the Month (Daily Averages)</option>
            <option value="year">Throughout the Year (Weekly Averages)</option>
          </select>
        </div>
        
        <Line data={data} options={options} />
        <h2 className="text-md font-bold text-gray-200 text-center mt-5">{`Time (${xAxisLabel})`}</h2>
      </div>
    </div>
  );
};

export default HeartRateGraph;
