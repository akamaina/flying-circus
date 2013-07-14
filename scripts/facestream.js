/**
 * Created with JetBrains WebStorm.
 * User: cdaley
 * Date: 7/5/13
 * Time: 8:06 AM
 * To change this template use File | Settings | File Templates.
 */

var cv = require('opencv');
var camera = new cv.VideoCapture(0);
var imageStream = new cv.ImageStream();
var videoStream = new cv.VideoStream(camera);
var processing = false;

videoStream.on('data', function (matrix) {

    if (!processing) {

        processing = true;

        cv.readImage(matrix.toBuffer(), function (error, image) {
            image.detectObject('xml/haarcascade_frontalface_alt2.xml', {}, function (err, faces) {

                var found = false;

                for (var k = 0; k < faces.length; k++) {
                    found = true;
                }

                if (found) {
                    console.log("Face Found");
                }

                processing = false;
            });
        });
    }
});

videoStream.read();