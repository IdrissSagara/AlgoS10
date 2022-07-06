
Step 1:

    npm init
    npm install

Step 2:
    node main.js

Result

{
  minCost: 1090,
  maxCost: 256,
  minArrivalFlight: undefined,
  maxArrivalFlight: undefined,
  minDepartureFlight: {
    price: 1090,
    stops: 1,
    origin: 'TXL',
    destination: 'LHR',
    departure_time: '2010-07-26T08:40:00',
    arrival_time: '2010-07-26T16:50:00',
    airline: 'LOT Polish Air'
  },
  maxDepartureFlight: {
    price: 256,
    stops: 1,
    origin: 'TXL',
    destination: 'LHR',
    departure_time: '2010-07-26T08:35:00',
    arrival_time: '2010-07-26T14:15:00',
    airline: 'Lufthansa'
  }
}