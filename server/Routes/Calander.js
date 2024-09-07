const express = require('express');
const https = require('https');
const router = express.Router();

router.get('/api/available-slots', (req, res) => {
  // Hard-coded event type UUID
  const eventTypeUUID = 'your-event-type-uuid-here'; // Replace with your actual event type UUID

  const options = {
    hostname: 'api.calendly.com',
    path: `/event_types/${eventTypeUUID}/availability`, // Adjust the path as needed
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${process.env.CALENDLY_API_KEY}`,
      'Content-Type': 'application/json',
    },
  };

  const apiRequest = https.request(options, (apiResponse) => {
    let data = '';

    apiResponse.on('data', (chunk) => {
      data += chunk;
    });

    apiResponse.on('end', () => {
      if (apiResponse.statusCode === 200) {
        res.status(200).json(JSON.parse(data));
      } else {
        res.status(apiResponse.statusCode).json({
          message: 'Failed to fetch data',
          data: JSON.parse(data),
        });
      }
    });
  });

  apiRequest.on('error', (error) => {
    console.error('Error fetching data:', error);
    res.status(500).json({ message: 'Server error' });
  });

  apiRequest.end();
});

module.exports = router;
