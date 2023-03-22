// bg music is "Save Point" from Kirby Super Star
let red, blue, green;
let button;
let sounds = new Tone.Players({
	"drip": "sounds/drip.wav",
	"brush": "sounds/brush.wav"
}).toDestination();
let brushLoop = new Tone.Loop((time) => {
	sounds.player("brush").start();
}, "8n");
brushLoop.loop = 1;
brushLoop.loopEnd = '1m';

let synth = new Tone.PolySynth();
let hiPass = new Tone.Filter(600, "highpass").toDestination();
synth.connect(hiPass);

let voice1 = [["E4","F3","A3","C4"], ["E4","F3","A3","C4"],
	["E4","F3","A3","C4"], ["D4","F3","A3","C4"], ["G3","E3","G3","B3"],
	["D4","E3","G3","B3"], ["D4","E3","G3","B3"], ["C4","E3","G3","B3"]];
let melody = new Tone.Sequence((time, note) => {
	synth.triggerAttackRelease(note, '4n', time);
}, voice1);

let voice2 = ["E4", "E4", "E4", ["D4","C4","D4"], "D4", "D4", "D4",
	["C4","D4","E4"]];
let part = new Tone.Part((time, note) => {
	synth.triggerAttackRelease(note, '4n', time);
}, voice2);

let bassPart = new Tone.Part((time, note) => {
	synth.triggerAttackRelease(note, '4n', time);
}, ["F2", "B2", "F3", "F2", "E2", "A2", "F#3", "G3"]);
Tone.Transport.bpm.value = 42;
// start vid @ 24:01

function setup() {
	createCanvas(600, 400);
	background(230);

	red = 0;
	blue = 0;
	green = 0;

	button = createButton("press me for music!");
	button.mousePressed( () => {
		Tone.start();
		melody.start(0);
		part.start('8:0');
		bassPart.start('12:0');
		Tone.Transport.start();
	});
}

function draw() {
	noStroke();
	
	// drawing palette
	fill(255,0,0);		//red
	square(1, 0, 25);

	fill(255,125,0);	//orange
	square(1, 26, 25);
	
	fill(255,255,0);	//yellow
	square(1, 53, 25);
	
	fill(0,255,0);		//green
	square(1, 80, 25);
	
	fill(0,255,255);	//cyan
	square(1, 107, 25);
	
	fill(0,0,255);		//blue
	square(1, 133, 25);
	
	fill(255,0,255);	//magneta
	square(1, 159, 25);
	
	fill(150,75,0);		//brown
	square(1, 185, 25);
	
	fill(255);			//white
	square(1, 211, 25);
	
	fill(0);			//black
	square(1, 237, 25);
}

function mouseDragged() {
	strokeWeight(10);
	stroke(red, green, blue);
	if (mouseX >= 26) {
		line(mouseX, mouseY, pmouseX, pmouseY);
	}
	brushLoop.start();
}

// set color through palette
function mousePressed() {
	if (mouseX <= 26) {
		if (mouseY <= 25) {							//red
			red = 255;
			green = 0;
			blue = 0;
		}
		if (mouseY <= 52 && mouseY >= 26) {			//orange
			red = 255;
			green = 125;
			blue = 0;
		}
		if (mouseY <= 79 && mouseY >= 53) {			//yellow
			red = 255;
			green = 255;
			blue = 0;
		}
		if (mouseY <= 106 && mouseY >= 80) {		//green
			red = 0;
			green = 255;
			blue = 0;
		}
		if (mouseY <= 132 && mouseY >= 107) {		//cyan
			red = 0;
			green = 255;
			blue = 255;
		}
		if (mouseY <= 158 && mouseY >= 133) {		//blue
			red = 0;
			green = 0;
			blue = 255;
		}
		if (mouseY <= 184 && mouseY >= 159) {		//magenta
			red = 255;
			green = 0;
			blue = 255;
		}
		if (mouseY <= 210 && mouseY >= 185) {		//brown
			red = 150;
			green = 75;
			blue = 0;
		}
		if (mouseY <= 236 && mouseY >= 211) {		//white
			red = 255;
			green = 255;
			blue = 255;
		}
		if (mouseY <= 263 && mouseY >= 237) {		//black
			red = 0;
			blue = 0;
			green = 0;
		}
		sounds.player("drip").start();
	}
}