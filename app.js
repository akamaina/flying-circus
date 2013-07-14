var hoopDetector = require('./lib/hoop_detector'),
    waitForHoopFound = 10000,
    checkHoopFoundInterval = 1000,
    lastHoopFound = (new Date()).getTime(),
    possibleDirections = ['up', 'down', 'left', 'right'],
    speed = 0.5,
    client = require('ar-drone').createClient(),
    pngStream = client.getPngStream(),
    fs = require('fs');

// When no hoop is found, stop and rotate
function noHoopFound() {
    console.log('No hoop was found  hovering');
    client.stop();
    client.clockwise(speed);
}

// If no hoop is found for a certain time, land
setInterval(function() {
    if ((new Date()).getTime() - lastHoopFound < waitForHoopFound) return;
    console.log('No hoop was found for sometime, landing ...');
    client.stop();
    client.land();
}, checkHoopFoundInterval);

// When we capture a new png image, try to detect hoop
function newImage(pngImagePath) {
    hoopDetector.detectHoop(pngImagePath, function(err, direction) {
        if (err) console.warn(err);
        if (possibleDirections.indexOf(direction) === -1) return noHoopFound();
        console.log('Hoop found, moving ' + direction);
        client[direction](speed);
    });
}

pngStream
    .on('error', console.log)
    .on('data', function(pngBuffer) {
        var pngImagePath = './tmp/' + (new Date()).getTime() + '.png';
        fs.write(pngImagePath, pngBuffer, function(err) {
            if (err) console.warn(err);
            newImage(pngImagePath);
        });
    });
