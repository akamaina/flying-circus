var cv = require('opencv');


//
// Detects triangles and quadrilaterals
//


var lowThresh = 5;
var highThresh = 10;
var nIters = 2;
var minArea = 2000;

var BLUE = [0, 255, 0]; //B, G, R
var RED   = [0, 0, 255]; //B, G, R
var GREEN = [0, 255, 0]; //B, G, R
var WHITE = [255, 255, 255]; //B, G, R

var file = './tests/images/up.jpg';
var contours;



function HoopDetector() {}

HoopDetector.prototype = {
    detectHoop : function(filePath, cb) {
        // detect in what direction a hoop is at relative to the center of the image
        // and returns results in cb(err, direction)
        // direction is either up, down, left, right or stop in case no hoop is detected

        //file = './node_modules/opencv/examples/shapes.jpg';
        cv.readImage(filePath, function(err, im) {
            if (err) throw new Error(err);

            var out = new cv.Matrix(im.height(), im.width());

            im.convertGrayscale();
            im_canny = im.copy();

            im_canny.canny(lowThresh, highThresh);
            im_canny.dilate(nIters);

            contours = im_canny.findContours();

            for(i = 0; i < contours.size(); i++) {

                if(contours.area(i) < minArea) continue;

                var arcLength = contours.arcLength(i, true);
                contours.approxPolyDP(i, 0.01 * arcLength, true);

                switch(contours.cornerCount(i)) {
                    case 3:
                        out.drawContour(contours, i, GREEN);
                        break;
                    case 4:
                        out.drawContour(contours, i, RED);
                        break;
                    default:
                        out.drawContour(contours, i, WHITE);
                }
            }
            out.save(filePath + '.out.png');
        });



        cb(null, 'down');
    }
}

module.exports = new HoopDetector();

