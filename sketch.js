let unicorn;
let uImg;
let tImg;
let bImg;
let bImgx1 = 0;
let bImgx2;
var scrollSpeed = 2;
let trains = [];
let soundClassifier;
let windowX = window.innerWidth/2;
let windowY = window.innerHeight/2;
let gameOver;
let btn;
let song;

function preload(){
  // song = loadSound("rainbow.mp3", touchStarted);
    // song = loadSound("6040156075720704.wav");
    // song.setVolume(0.5);
    // const options = {
    //     probabilityThreshold: 0.95
    //   };
    // soundClassifier = ml5.soundClassifier('SpeechCommands18w', options);
    uImg = loadImage("unicorn.png");
    tImg = loadImage("train.png");
    bImg = loadImage("purple.jpg");
}

function mousePressed(){
    trains.push(new Train());
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  getAudioContext().suspend();
  song = loadSound("6040156075720704.wav",loaded);
  // song.loop();
  song.setVolume(0.5);
  bImgx2 = width;
  unicorn = new Unicorn();
  // soundClassifier.classify(gotCommand);
}

// Errors messages (CTRL SHIFT i) Chrome Developer Tools:
// The AudioContext was not allowed to start. It must be resumed (or created) after a user gesture on the page. https://goo.gl/7K7WLu
// DevTools failed to load SourceMap: Could not load content for https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.1.9/addons/p5.sound.min.js.map: HTTP error: status code 404, net::ERR_HTTP_RESPONSE_CODE_FAILURE
function touchStarted() {
  if (getAudioContext().state !== 'running') {
    console.log(getAudioContext());
    getAudioContext().resume();
  }
}

function loaded() {
   song.loop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function reStart() {
    window.location.reload();
}

// function gotCommand(error, results) {
//     if (error) {
//       console.error(error);
//     }
//     // console.log(results[0].label, results[0].confidence);
//     if (results[0].label == 'up') {
//       unicorn.jump();
//     }
//   }

function touchStarted() {
  userStartAudio();


      unicorn.jump();

  }


function draw() {
    if (random(1) < 0.005) {
        trains.push(new Train());
    }
    image(bImg, bImgx1, 0, width, height);
    image(bImg, bImgx2, 0, width, height);

    bImgx1 -= scrollSpeed;
    bImgx2 -= scrollSpeed;

    if (bImgx1 < -width){
        bImgx1 = width;
    }
    if (bImgx2 < -width){
      bImgx2 = width;
    }
    // background(bImg);

    for (let t of trains) {
        t.move();
        t.show();
        if (unicorn.hits(t)) {
          song.stop();
          gameOver = createDiv("<p>Game Over</p>");
          btn = createButton('Click to restart');
          btn.parent(gameOver);
          gameOver.position(windowX, windowY);
          btn.mousePressed(reStart);
          noLoop();
        }
        if(t.x + t.r < unicorn.x && !t.crossed){
          t.crossed = true;
          unicorn.score ++;
        }
    }

    unicorn.show();
    unicorn.move();
    let printScore = `Score = ${unicorn.score}`;
    fill(50);
    // Text wraps within text box
    text(printScore, 10, 10, 70, 80);
}