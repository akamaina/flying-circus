/**
 * Created with JetBrains WebStorm.
 * User: cdaley
 * Date: 7/8/13
 * Time: 9:08 PM
 * To change this template use File | Settings | File Templates.
 */
var cv = require('opencv');

cv.readImage("image/Hoop.jpg", function (err, image) {

    console.log("Starting.");
    image.erode(4);
    image.save("image/HoopErode.jpg");
    image.inRange([40, 20, 90], [70, 90, 160]);
    image.save("image/HoopOut.jpg");

    console.log("Hoop Ouput");

    var cannyImage = image.copy();
    //cannyImage.erode(1);

    cannyImage.canny(100, 200);
    cannyImage.gaussianBlur([11,11]);
    //cannyImage.dilate(3);
    var contours = cannyImage.findContours();

    console.log("Found contours: " + contours.size());

    var output = new cv.Matrix(image.height(), image.width());

    for (x = 0; x < contours.size(); x++) {

        if (contours.area(x) > 10000) {
            console.log("Area: " + contours.area(x) + "; Length:" + contours.arcLength(x, true));
            output.drawContour(contours, x, [0, 0, 255]);
        }

    }

    console.log("Contours Drawn");

    output.save("image/HoopContour.png");

});