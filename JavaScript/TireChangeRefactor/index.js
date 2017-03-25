(function () {
    'use strict';
    
    // There are 3 aircraft manufactures, each with different requirements 
    //  for when the tires need to be changed
    //      FooPlane: 120 landings
    //      BarPlane: 75 landings
    //      BazPlane: 200 landings

    // Based on the above information and the data available in the data.js file,
    //  this function is supposed to return an array of aircrafts due for a tire change.
var maxLandings = {
    "FooPlane": 120,
    "BarPlane": 75,
    "BazPlane": 200
};

//For one aircraft with one argument aircraft
//Filter occurs on aircraft.landings with a composible function returning true if position of landings > lasttirechange date position
//After that, the length property of landings is done to compare it with the maxlandings defined above and values returns true if no of landings is more than max


    function needsTireChange(aircraft) {
    var landingsSinceLastTireChange = aircraft.landings.filter(function (landing) {   
        return landing >= aircraft.lastTireChange;
    });
    
    return landingsSinceLastTireChange.length >= maxLandings[aircraft.manufacturer];
}

// Based on the above information and the data available in the data.js file,
//  this function is supposed to return an array of aircrafts due for a tire change.
//Used reduce to solve the problem in a more smaller way. Tried it with map and filter as well, but the test fails!

// function getAircraftsDueForTireChange(allAircraftData) {
    
//     return allAircraftData
//             .map(needsTireChange)
//             .filter(Boolean)
//     ;
// }

function getAircraftsDueForTireChange(allAircraftData) {
	
    
     return allAircraftData.reduce(function(result, x){    
        if (needsTireChange(x)) {
            result.push(x);
        }
        
        return result;
    }, []);
}

    // Test the function 
    //  To keep things simple, we are just going to check the ids and display a pass/fail.
    //  Feel free to use Jasmine or any other test framework if you're more comfortable with that,
    //  but it is NOT required.  This should be a quick exercise.
    var expected = [1, 3, 5];
    var actual = getAircraftsDueForTireChange(window.CAMP.aircraftData).map(function (aircraft) { return aircraft.id; }).sort();
    var passed = (JSON.stringify(expected) === JSON.stringify(actual));

    document.body.innerHTML += passed ? 'PASS' : 'FAIL';
    document.body.innerHTML += '<br />';
    document.body.innerHTML += 'Expected: ' + expected;
    document.body.innerHTML += '<br />';
    document.body.innerHTML += 'Actual: ' + actual;
})();