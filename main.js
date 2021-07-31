songs = [];
song_name=["Diamond Heart","E-girls are ruining my life","No roots","For you to stay","Spectre"];
song_count = 0;
leftWristY = 0;
leftWristX = 0;
leftWristScore = 0;
manual_change = false;
playing= false;

function preload() {
    songs[0] = loadSound("diamond_heart.mp3");
    songs[1] = loadSound("egirl_life.mp3");
    songs[2] = loadSound("No_Roots.mp3");
    songs[3] = loadSound("foryou_tostay.mp3");
    songs[4] = loadSound("Spectre.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotResults);
}

function draw() {
    image(video, 0, 0, 600, 500);
    fill("#753422");
    stroke("#753422");
    if(playing == true){
    if (manual_change == false) {
        if (leftWristScore > 0.2) {
            if (leftWristY >= 0 && leftWristY <= 100) {
                if(song_count != 0){
                    for(i=0;i<5;i++)
                    songs[i].stop();

                song_count = 0;
                songs[song_count].play();
            }
            } else if (leftWristY >= 101 && leftWristY <= 200) {
                if(song_count != 1){
                    for(i=0;i<5;i++)
                    songs[i].stop();

                song_count = 1;
                songs[song_count].play();}
            }
            else if (leftWristY >= 201 && leftWristY <= 300) {
                if(song_count != 2){
                       for(i=0;i<5;i++)
                    songs[i].stop();
                    
                song_count = 2;
                 songs[song_count].play();}
            }
            else if (leftWristY >= 301 && leftWristY <= 400) {
                if(song_count != 3){
                    for(i=0;i<5;i++)
                    songs[i].stop();
                    
                song_count = 3;
             songs[song_count].play();}
            }
            else if (leftWristY >= 401 && leftWristY <= 500) {
                if(song_count != 4){
                    for(i=0;i<5;i++)
                    songs[i].stop();
                    
                song_count = 4;
                songs[song_count].play();
            }}
            document.getElementById("song_hold").innerHTML= "Current Song:"+song_name[song_count];
            circle(leftWristX, leftWristY, 20);
        }
    }}
}

function play() {
    playing=true;
}

function changeSong() {
    songs[song_count].stop();
    song_count += 1;
    if (song_count > 4) {
        song_count = 0;
    }
    songs[song_count].play();
document.getElementById("song_hold").innerHTML= "Current Song:"+song_name[song_count];
}

function Stop() {
    songs[song_count].stop();
    playing= false;
}

function modelLoaded() {
    console.log("model loaded :D");
}

function gotResults(results) {
    if (results.length > 0) {
        console.log(results);
        leftWristScore = results[0].pose.keypoints[9].score;
        leftWristY = results[0].pose.leftWrist.y;
        leftWristX = results[0].pose.leftWrist.x;
    }
}

function changeControl() {
 if(manual_change==false){
     manual_change=true;
     document.getElementById("change_button").style.visibility="visible";
     document.getElementById("control_button").innerHTML="Control without buttons";
 }
 else{
     manual_change=false;
     document.getElementById("change_button").style.visibility="hidden";
     document.getElementById("control_button").innerHTML="Control with buttons";
 }
}

function changeSong() {
    songs[song_count].stop();
    song_count += 1;
    if (song_count > 4) {
        song_count = 0;
    }
    songs[song_count].play();
    document.getElementById("song_hold").innerHTML= "Current Song:"+song_name[song_count];
}
