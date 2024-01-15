import React from 'react';
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
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ProfitsGraph = () => {
  const [allAcceptedRequests, setAllAcceptedRequests] = React.useState([]);
  const [profitsThisMonth, setProfitsThisMonth] = React.useState([]);

  React.useEffect(() => {
    fetch('http://localhost:5005/bookings', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(data => data.json())
      .then(data => {
        if (data.error) {
          alert(data.error);
        } else {
          setAllAcceptedRequests(data.bookings.filter(request => request.owner !== localStorage.getItem('userEmail') && request.status === 'accepted'));
        }
      })
  }, [])

  React.useEffect(() => {
    let currDate = Date.now();
    let daysAgo = 0;
    const tempProfitsThisMonth = [];
    while (daysAgo <= 30) {
      // get all the bookings on a particular day
      const tempAcceptedRequestsToday = [];
      for (const request of allAcceptedRequests) {
        if (Date.parse(request.dateRange[0]) <= currDate && Date.parse(request.dateRange[1]) >= currDate) {
          tempAcceptedRequestsToday.push(request);
        }
      }
      // add up the profits on a particular day
      let tempProfitToday = 0;
      for (const request of tempAcceptedRequestsToday) {
        const profit = request.totalPrice / (Math.floor((Date.parse(request.dateRange[1]) - Date.parse(request.dateRange[0])) / 86400000));
        tempProfitToday += profit;
      }
      tempProfitsThisMonth.push(tempProfitToday);
      // decrement by a day to get data for the day before
      currDate -= 86400000;
      daysAgo += 1;
    }
    setProfitsThisMonth(tempProfitsThisMonth);
  }, [allAcceptedRequests])

  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'number of days ago'
        }
      },
      y: {
        title: {
          display: true,
          text: '$'
        },
      }
    },
    maintainAspectRatio: false,
    responsive: true,
  }
  const labels = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
  const data = {
    labels,
    datasets: [{
      label: 'total earnings',
      data: profitsThisMonth,
      borderColor: '#2E4374',
      backgroundColor: '2E4374',
    }]
  }

  return (
    <Line options={options} data={data} />
  )
}

export default ProfitsGraph;
