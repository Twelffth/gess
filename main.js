// https://teachablemachine.withgoogle.com/models/l1yH9QR7U///

prediction1 = ""
prediction2 = ""

Webcam.set({
    width: 350,
    height: 300,
    image_format: "png",
    png_quality: 90

});

camera = document.getElementById("camera");
Webcam.attach('#camera');

function takesnap() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = "<img id='capture_image' src='" + data_uri + "' > ";

    });

}

console.log("ml5version=", ml5.version);
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/l1yH9QR7U/model.json", modelLoaded)

function modelLoaded() {
    console.log("modelLoaded")

}

function speak() {
    var snyth = window.speechSynthesis;
    speak1 = "The first prediction is" + prediction1;
    speak2 = "The second prediction is" + prediction2;
    var utter = new SpeechSynthesisUtterance(speak1 + speak2);
    snyth.speak(utter);

}

function check() {
    img = document.getElementById("capture_image");
    classifier.classify(img, gotresult);

}

function gotresult(error, results) {
    if (error) {
        console.log(error);
    } else {
        console.log(results);
        document.getElementById("result_gesture_name").innerHTML = results[0].label;
        document.getElementById("result_gesture_name2").innerHTML = results[1].label;
        prediction1 = results[0].label;
        prediction2 = results[1].label;
        speak();
        if (results[0].label == "Thumbs Up") {
            document.getElementById("update_emoji").innerHTML = "&#128077";

        }
        if (results[0].label == "Ok") {
            document.getElementById("update_emoji").innerHTML = "&#128076";

        }
        if (results[0].label == "Peace") {
            document.getElementById("update_emoji").innerHTML = "&#9996";

        }
        if (results[1].label == "Thumbs Up") {
            document.getElementById("update_emoji2").innerHTML = "&#128077";

        }
        if (results[1].label == "Ok") {
            document.getElementById("update_emoji2").innerHTML = "&#128076";

        }
        if (results[1].label == "Peace") {
            document.getElementById("update_emoji2").innerHTML = "&#9996";

        }
    }

}