var hoopDetector = require('../lib/hoop_detector'), fs = require('fs');

var dir =  './photos/';
fs.readdir(dir, function(err, files) {
    if (err) throw new Error(err);

    files.forEach(function(file) {
        // skip output images
        if (file.indexOf('out.png') > -1) return;
        console.log('Testing image: ' + file);

        // Each image name holds the direction to which the hoop is at
        hoopDetector.detectHoop(dir + file, function(err, direction) {
            if (err) throw new Error(err);
            var expectedDirection = file.split('.')[0];

            //if (expectedDirection !== direction) throw new Error('Expected: ' + expectedDirection + ", Found :" + direction);
        })

    });
});
