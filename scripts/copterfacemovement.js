/**
 * Created with JetBrains WebStorm.
 * User: cdaley
 * Date: 7/5/13
 * Time: 4:44 PM
 * To change this template use File | Settings | File Templates.
 */

var cv = require('opencv');
var arDrone = require('ar-drone');
var drone = arDrone.createClient();

var imageStream = new cv.ImageStream();
var processing = false;

imageStream.on('data', function (buffer) {

    if (!processing) {
        processing = true;

        cv.readImage(buffer, function (error, image) {
            image.detectObject('xml/haarcascade_frontalface_alt2.xml', {}, function (err, faces) {

                var faceWidth = 0, faceHeight = 0, faceNum = null, found = false;

                //track the largest face, react to it as it will be the closest
                for (var k = 0; k < faces.length; k++) {
                    found = true;
                    if ((faces[k].width * faces[k].height) > (faceWidth * faceHeight)) {
                        faceNum = k;
                    }
                }

                if(!found){
                    console.log("No faces found");
                    return;
                }

                var advance = ((image.width * image.height) / 4) > (faces[faceNum].width * faces[faceNum].height);

                if (found && advance) {
                    console.log("Advance!");
                    drone
                        .front(0.1)
                        .after(100, function () {
                            this.stop();
                        }
                    );
                } else if (found && !advance) {
                    console.log("Retreat!");
                    drone
                        .back(0.1)
                        .after(100, function () {
                            this.stop;
                        }
                    )
                }

                processing = false;
            });
        });
    }
});

drone.getPngStream().pipe(imageStream);