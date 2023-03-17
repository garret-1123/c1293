prev_2 = ""
prev_1 = ""


Webcam.set({
width:350,
height:350,
imageFormat: 'png',
pngQuality: 90

})


Camera = document.getElementById('camera');
Webcam.attach('#camera');
function takeSnapshot() { 
Webcam.snap(function(data_uri) {
document.getElementById('result').innerHTML = '<img id=captured_image src='+data_uri+'></img>'




});
}
console.log('Versão do ml5', ml5.version)


classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/J2Ip11PDF/model.json',modelLoaded);
function modelLoaded() {
    console.log('Modelo carregado')
}
function speak() {
    speakData1 = 'A primeira previsão é '+prev_1
    speakData2 = 'A segunda previsão é '+prev_2
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(speakData1 + speakData2))
}
function check() { 
img = document.getElementById('captured_image')
classifier.classify(img,gotResult)

}
function gotResult(error,results) {
    if (error) {
        console.error(error)
    } else {
        console.log(results)
        document.getElementById("prev1_text").innerHTML = results[0].label
        document.getElementById("prev2_text").innerHTML = results[1].label
        pre_v1 = results[0].label
        pred_v2= results[1].label
        speak()
        if (results[0].label == "feliz") {
            document.getElementById("prev1_emoji").innerHTML = "😁"
        } else if (results[0].label == "triste") {
            document.getElementById("prev1_emoji").innerHTML = "😭"
        }
        else {
            document.getElementById("prev1_emoji").innerHTML = "😡"
        }
        if (results[1].label == "feliz") {
            document.getElementById("prev2_emoji").innerHTML = "😁"
        } else if (results[1].label == "triste") {
            document.getElementById("prev2_emoji").innerHTML = "😭"
        }
        else {
            document.getElementById("prev2_emoji").innerHTML = "😡"
        }



    }
} 