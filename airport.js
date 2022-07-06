
const { all } = require('express/lib/application');
const airports = require('./jsonDocs/airports.json'); //(with path)
const data = require('./jsonDocs/data.json'); //(with path)

const origins = ['BER', 'CDG', 'MRS', 'LYS', 'MAN', 'BIO', 'JFK', 'TUN', 'MXP'];
const arrivalTime = new Date('2010-07-27T17:00:00');
const minArrivalTime = new Date('2010-07-27T00:00:00');

data.forEach(e => {
    const time = new Date(e.arrival_time);
    if (origins.includes(e.origin) && time <= arrivalTime && time >= minArrivalTime) {
        if(flights.includes())
        flights[e.origin] = flights[e.origin] || [];
    }
});

const flights = data.reduce((all,curr) => ({...all, [curr.origin]: all[curr.origin] ? [...all[curr.origin], curr]: [curr]}), {});
