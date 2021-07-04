video = "";
objects = [];

function preload(){
    video = createVideo('video.mp4');
    video.hide();
}
function setup(){
    canvas = createCanvas(480, 380);
    canvas.center();
}
function draw(){
    image(video, 0, 0, 480, 380);
    if(status != "")
    {
        objectDetecter.detect(video, gotResult);
        for(i = 0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "status : objects Detected";
            document.getElementById("number_of_objects").innerHTML = "number of objects detected are :" + objects.length;

            fill("green");
            percent = floor(objects[i].confidence*100);
            text(objects[i].label + "" + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("green");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }

}
function gotResult(error, results){
    if(error)
    {
        console.log(error);
    }
    console.log(results);
    objects = results;
}
function start(){
    objectDetecter = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}
function modelLoaded(){
    console.log("Model Loaded!");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}