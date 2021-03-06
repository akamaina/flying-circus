var hoopDetector = require('./lib/light_detector'),
    waitForHoopFound = 50000,
    checkHoopFoundInterval = 1000,
    lastHoopFound = (new Date()).getTime(),
    possibleDirections = ['up', 'down', 'left', 'right'],
    waitForTakeOff = 10000,
    speed = 0.1,
    client = require('ar-drone').createClient(),
    pngStream = client.getPngStream(),
    fs = require('fs'),
    stepDuration = 200;

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
        client.after(stepDuration, function() {
            this.stop();
        });
    });
}



client.takeoff();
setTimeout(function() {
//    setInterval(function() {
//        hoopDetector.detectHoop('./tests/images/down.jpg', function(err, direction) {
//            if (err) console.warn(err);
//            if (possibleDirections.indexOf(direction) === -1) return noHoopFound();
//            console.log('Hoop found, moving ' + direction);
//            client[direction](speed);
//        });
//    }, stepDuration);
    pngStream
        .on('error', console.log)
        .on('data', function(pngBuffer) {
            var pngImagePath =  './photos/' + (new Date()).getTime() + '.png';
            console.log('writing image to ' + pngImagePath);
            fs.writeFile(pngImagePath, pngBuffer, function(err) {
                if (err) console.warn(err);
                newImage(pngImagePath);
            });

        });
}, waitForTakeOff);
