var hoopDetector = require('../lib/hoop_detector'), fs = require('fs');

var dir =  './photos/';

var RANGE1 = [10, 25, 20]; //B, G, R
var RANGE2 = [150, 90, 190]; //B, G, R

var threshMax = 100;
var threshStart = 50;
var threshIncr = 50;

var colour_max = 256;
var colour_step = 16; 

fs.readdir(dir, function(err, files) {
    if (err) throw new Error(err);

    files.forEach(function(file) {
        // skip output images
        if (file.indexOf('out.png') > -1) return;
        console.log('Testing image: ' + file);

        for( var r1_b = 0; r1_b <= colour_max; r1_b += colour_step )
        {
            for( var r1_g = 0; r1_g <= colour_max; r1_g += colour_step)
            {
                for( var r1_r = 0; r1_r <=colour_max; r1_r += colour_step)
                {
                    var range1 = [r1_b, r1_g, r1_r];

                    for( var r2_b = 0; r2_b <= colour_max; r2_b += colour_step)
                    {
                        for( var r2_g = 0; r2_g <= colour_max; r2_g  += colour_step)
                        {
                            for( var r2_r = 0; r2_r <=colour_max; r2_r += colour_step )
                            {   

                                var range2 = [r2_b, r2_g, r2_r];

                                console.log('Testing ranges ' + range1 + ' ' + range2);
                                for (var lowThresh = threshStart; lowThresh <= threshMax; lowThresh+= threshIncr) {
                                    for( var highThresh = lowThresh + threshIncr; highThresh <= threshMax; highThresh+= threshIncr )
                                    {
                                        console.log( 'low = ' + lowThresh + ' + high = ' + highThresh );
                                        // Each image name holds the direction to which the hoop is at
                                        hoopDetector.detectHoop(dir + file, function(err, direction) {
                                            if (err) throw new Error(err);
                                            var expectedDirection = file.split('.')[0];

                                            //if (expectedDirection !== direction) throw new Error('Expected: ' + expectedDirection + ", Found :" + direction);
                                        }, lowThresh, highThresh, range1, range2)
                                    };
                                };

                            }
                        }
                    }
                }
            }
        }

    });
});
