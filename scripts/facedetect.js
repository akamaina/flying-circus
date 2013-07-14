/**
 * Created with JetBrains WebStorm.
 * User: cdaley
 * Date: 7/4/13
 * Time: 8:37 PM
 * To change this template use File | Settings | File Templates.
 */
var cv = require('opencv');

var camera = new cv.VideoCapture(0);
var COLOR = [0, 255, 0]; //default red
var x = 2;

setInterval(function () {
    camera.read(function (err, im) {
        console.log(x);
        im.detectObject('xml/haarcascade_frontalface_alt2.xml', {}, function(err, faces) {

            for(var k = 0; k < faces.length; k++) {

                face = faces[k];
                im.rectangle([face.x, face.y], [face.x + face.width, face.y + face.height], COLOR, 2);
            }

            im.save('image/output' + x++ +'.png');

        });

    });

}, 1000);