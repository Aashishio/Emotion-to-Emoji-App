predection1 = "";
predepredection1 = "";
Webcam.set({
    width: 350,
    height: 325,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');


function captureImage() {
    Webcam.snap(function (pic) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="' + pic + '"></>'
    }
    )
}


classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/5mxzZHkpx/model.json', modelLoaded);

function modelLoaded() {

    console.log("modelLoaded");
}
function speak() {

    var synth = window.speechSynthesis;
    var speak_data1 = "The first prediction is" + predection1;
    var speak_data2 = "And the second prediction is" + predection2;
    var speak = new SpeechSynthesisUtterance(speak_data1 + speak_data2);
    synth.speak(speak);
}
function predictImage() {
    img = document.getElementById('captured_image');

    classifier.classify(img, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        predection1 = results[0].label;
        predection2 = results[1].label;
        speak();
        if (results[0].label == "happy"){
            document.getElementById("update_emoji").innerHTML = "&#128522;";
            document.getElementById("result_emotion_name").innerHTML = "Happy";
        }
        if (results[0].label == "sad"){
            document.getElementById("update_emoji").innerHTML = "&#128532;";
            document.getElementById("result_emotion_name").innerHTML = "Sad";
        }
        if (results[0].label == "angry"){
            document.getElementById("update_emoji").innerHTML = "&#128545;";
            document.getElementById("result_emotion_name").innerHTML = "Angry"
        }

        if (results[1].label == "happy"){
            document.getElementById("update_emoji2").innerHTML = "&#128522;";
            document.getElementById("result_emotion_name2").innerHTML = "Happy";
        }
        if (results[1].label == "sad"){
            document.getElementById("update_emoji2").innerHTML = "&#128532;";
            document.getElementById("result_emotion_name2").innerHTML = "Sad";
        }
        if (results[1].label == "angry"){
            document.getElementById("update_emoji2").innerHTML = "&#128545;";
            document.getElementById("result_emotion_name2").innerHTML = "Angry"
        }
    }
}