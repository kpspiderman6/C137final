video = "";
objects = [];
status="";
function setup(){
    canvas = createCanvas(400,350);
    canvas.position(500,250);
}
function preload(){
    video = createVideo("video.mp4");
    video.hide();
}
function start(){
    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status = Object Detecting";
}
function modelLoaded(){
    console.log("cocossd initialised");
    status = true;
    video.speed(1);
    video.loop();
    video.volume(0);
}
function draw(){
    image(video,0,0,400,350);
    if(status!=""){
        objectDetector.detect(video,gotResult);
        for(i = 0;i<objects.length;i++){
            document.getElementById("status").innerHTML = "Status = Object detected";
            document.getElementById("no").innerHTML = "Number of objects detected = "+objects.length;

            fill('#3224fc');
            percent = floor(objects[i].confidence *100);
            text(objects[i].label+" "+percent+"%",objects[i].x,objects[i].y);
            noFill();
            stroke('#3224fc')
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }
}
function gotResult(error,results){
    if(error){
        console.log(error); 
    }
    else{
        console.log(results);
        objects = results;
    }
}