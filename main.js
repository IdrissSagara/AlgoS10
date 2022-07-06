
const { all } = require('express/lib/application');
const airports = require('./jsonDocs/airports.json'); 
const data = require('./jsonDocs/data.json'); 

const origins = ['TXL', 'CDG', 'MRS', 'LYS', 'MAN', 'BIO', 'JFK', 'TUN', 'MXP'];
const arrivalTime = new Date('2010-07-30T17:00:00');
const minArrivalTime = new Date('2010-07-01T00:00:00');



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
//console.log(generateRandomSolution(data));

function randomData(data) {
    var random = [];
    for(var i = 0; i < data.length; i++) {
        random.push(data[Math.floor(Math.random() * data.length)]);
    }
    return random;
}

//console.log(randomData(generateSolution(flights(data))));

function generateRandomSolution2(data) {
    var random = randomData(data);
    var solution = [];
    for(var i = 0; i < 9; i++) {
        var origin = random[i].origin;
        var destination = random[i].destination;
        var time = random[i].arrival_time;
        var price = random[i].price;
        solution.push({origin, destination, time, price});
    }
    return solution;
}

//console.log(generateRandomSolution2(data));

//console.log(getRandomDepartureFlightSolution('TXL', 'MRS', data));

function getRandomDepartureFlight(destination, minArrivalTime, maxArrivalTime, data) {
    var random = randomData(data);
    var flight = flights(random);
    var departureFlight = flight[destination].find(e => new Date(e.arrival_time) >= minArrivalTime && new Date(e.arrival_time) <= maxArrivalTime);
    return departureFlight;
}

function getRandomArrivalFlight(origin, data) {
    var random = randomData(generateSolution(flights(data)));
    var flight = flights(random);
    var arrivalFlight = flight[origin].find(e => new Date(e.arrival_time) >= arrivalTime);
    return arrivalFlight;
}
function computeArrivalDepartureMinMaxCost(origin, destination, data) {
    var minCost = Number.MAX_VALUE;
    var maxCost = 0;
    var minArrivalTime = new Date('2010-07-01T00:00:00');
    var maxArrivalTime = new Date('2010-07-30T17:00:00');
    var minDepartureTime = new Date('2010-07-01T00:00:00');
    var maxDepartureTime = new Date('2010-07-30T17:00:00');
    var minArrivalFlight = getRandomArrivalFlight(origin, data);
    var maxArrivalFlight = getRandomArrivalFlight(origin, data);
    var minDepartureFlight = getRandomDepartureFlight(destination, minArrivalTime, maxArrivalTime, data);
    var maxDepartureFlight = getRandomDepartureFlight(destination, minArrivalTime, maxArrivalTime, data);
    if(minArrivalFlight) {
        minCost = minArrivalFlight.price;
        minArrivalTime = new Date(minArrivalFlight.arrival_time);
    }
    if(maxArrivalFlight) {
        maxCost = maxArrivalFlight.price;
        maxArrivalTime = new Date(maxArrivalFlight.arrival_time);
    }
    if(minDepartureFlight) {
        minCost = minDepartureFlight.price;
        minDepartureTime = new Date(minDepartureFlight.arrival_time);
    }
    if(maxDepartureFlight) {
        maxCost = maxDepartureFlight.price;
        maxDepartureTime = new Date(maxDepartureFlight.arrival_time);
    }
    return {minCost, maxCost, minArrivalFlight, maxArrivalFlight, minDepartureFlight, maxDepartureFlight};
}
console.log(computeArrivalDepartureMinMaxCost('JFK', 'TXL', data));
