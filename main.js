
const { all } = require('express/lib/application');
const airports = require('./jsonDocs/airports.json'); 
const data = require('./jsonDocs/data.json'); 

const origins = ['BER', 'CDG', 'MRS', 'LYS', 'MAN', 'BIO', 'JFK', 'TUN', 'MXP'];
const arrivalTime = new Date('2010-07-30T17:00:00');
const minArrivalTime = new Date('2010-07-01T00:00:00');

//var flights = [];
/*
data.forEach(e => {
    const time = new Date(e.arrival_time);
    if (origins.includes(e.origin) && time <= arrivalTime && time >= minArrivalTime) {
        if(flights.includes())
        flights[e.origin] = flights[e.origin] || [];
    }
});*/

function flights(data) {
    return data.reduce((all,curr) => ({...all, [curr.origin]: all[curr.origin] ? [...all[curr.origin], curr]: [curr]}), {});
}


function generateSolution(flights) {
    var solution = [];
    for(var key in flights) {
        var flight = flights[key];
        var origin = key;
        var destination = flight[0].destination;
        var time = flight[0].arrival_time;
        var price = flight[0].price;
        solution.push({origin, destination, time, price});
    }
    return solution;
}
console.log(generateRandomSolution(data));

function randomData(data) {
    var random = [];
    for(var i = 0; i < data.length; i++) {
        random.push(data[Math.floor(Math.random() * data.length)]);
    }
    return random;
}

function generateRandomSolution(data) {
    var random = randomData(data);
    return generateSolution(flights(random));
}


function getRandomDepartureFlight( destination,  minArrivalTime,  arrivalTime, data) {
    var random = randomData(data);
    var flight = flights(random);
    var departureFlight = flight[destination].find(e => new Date(e.arrival_time) >= minArrivalTime && new Date(e.arrival_time) <= arrivalTime);
    return departureFlight;
}

function getRandomArrivalFlight(origin, data) {
    var random = randomData(data);
    var flight = flights(random);
    var arrivalFlight = flight[origin].find(e => new Date(e.arrival_time) >= arrivalTime);
    return arrivalFlight;
}


function computeCost(solution) {
    return solution.reduce((all,curr) => all + curr.price, 0);
}
console.log(computeCost(generateRandomSolution(data)));

console.log(getRandomArrivalFlight('SXF', data));

//console.log(getRandomDepartureFlight('MRS', new Date('2010-07-01T00:00:00'), new Date('2010-07-30T17:00:00'), data));