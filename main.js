objectDetector = "";
obj_input = "";
objects = "";
colour = "";
detected = "";

function setup() {
    canvas = createCanvas(480, 380);
    canvas.position(650, 500);

    video = createCapture(VIDEO);
    video.hide();


}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    objectDetector.detect(video, gotResult);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    document.getElementById("status").style.background = "linear-gradient(#ff5454 0%, #ff8754 50%, #fcff54 100%)";
    obj_input = document.getElementById("obj_input").value;
    console.log(obj_input);
}

function modelLoaded() {
    console.log("Model Loaded!1!1");
    detected = true;

}

function draw() {
    image(video, 0, 0, 480, 380);
    if (detected == true) {
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {
            if (objects[i].label == obj_input) {
                document.getElementById("status").innerHTML = "Status : " + obj_input + " Found";
                document.getElementById("status").style.background = "linear-gradient(#5479ff 0%, #6054ff 50%, #7f54ff 100%)";
                video.stop();
            } else {
                fill(colour);
                percent = floor(objects[i].confidence * 100);
                text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
                noFill();
                stroke(colour);
                rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
                if (percent <= 50) {
                    colour = "#ff3030";
                } else if (percent > 50 && percent <= 70) {
                    colour = "#ff8a30";
                } else if (percent > 70 && percent <= 90) {
                    colour = "#ffe730";
                } else if (percent > 90 && percent <= 100) {
                    colour = "#56ff30";
                }
                document.getElementById("status").innerHTML = "Status : Finding Object...";
                document.getElementById("status").style.background = "linear-gradient(#ff5454 0%, #ff8754 50%, #fcff54 100%)";
            }

        }
    }
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    }
    console.log(results)
    objects = results;
}