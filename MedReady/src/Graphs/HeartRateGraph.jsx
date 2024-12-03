import { useState, useEffect, useRef } from 'react';
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
import storedVars from "../assets/vars.json";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const HeartRateGraph = () => {
  const [displayData, setDisplayData] = useState(storedVars.storedDisplayDataHeart); // State for heart rate data
  const dataRef = useRef(displayData); // Ref to hold the current data
  const hasAFib = useRef(storedVars.storedHasAfib);

  // Synchronize ref with state
  useEffect(() => {
    dataRef.current = displayData;
    storedVars.storedDisplayDataHeart = displayData;
  }, [displayData]);

  useEffect(() => {
    const interval = setInterval(() => {
      let beat;
      if (hasAFib.current) {
        beat = 80 + 70 * Math.random(); // Sim heart rate with atrial fibrillation
      } else {
        beat = 60 + 5 * Math.random(); // Simulate random resting heart rate
      }

      // Update state manually without functional form
      let currentDisplay = [...dataRef.current];
      if (currentDisplay < 60){
        for(let i=0; i < 60-currentDisplay.length; i++){
          currentDisplay.push(60 + 5 * Math.random());
        }
      }
      currentDisplay.push(beat);
      currentDisplay.shift(); // Remove the oldest data point

      setDisplayData(currentDisplay); // Update state
    }, 1000);

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, []);

  // Graph data and options
  const data = {
    labels: Array(displayData.length).fill(''), // Generate empty labels matching data length
    datasets: [
      {
        label: 'Heart Rate (bpm)',
        data: displayData,
        borderColor: 'rgb(255, 50, 110)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4,
        pointRadius: 2,
      },
    ],
  };

  const handleKeyDown = (event) => {
    if (event.key === 'a'){
      setTimeout(() => {
        hasAFib.current = !hasAFib.current;
        storedVars.storedHasAfib = hasAFib;
      }, 500)
    }
  }
  window.addEventListener('keydown', handleKeyDown);

  const options = { 
    responsive: true,
    animation: {
      duration: 1500, 
      easing: 'easeInOutCubic', 
    },
    scales: {
      x: {
        ticks: {
          color: 'white',
          maxTicksLimit: 60, // Limit x-axis ticks
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.2)', // Customize gridline color
        },
      },
      y: {
        ticks: {
          color: 'white', // Customize tick color
        },
        min: 0,
        max: 200, // Set y-axis range
        grid: {
          color: 'rgba(255, 255, 255, 0.2)', // Customize gridline color
        },
      },
    },
    plugins: {
      legend: {
        display: false, // Hide legend
      },
    },
  };

  return (
    <div className="bg-gray-800 p-6 rounded-md shadow-md">
      <div className="w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-md font-bold text-gray-200">Heart Rate (BPM)</h2>
        </div>
        <Line data={data} options={options} />
        <h2 className="text-md font-bold text-gray-200 text-center mt-3">
          Time: Measured at 1 Second Intervals
        </h2>
      </div>
    </div>
  );
};

export default HeartRateGraph;
