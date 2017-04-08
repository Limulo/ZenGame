define(["libs/Tone"],function(Tone){
  console.log("instruments.js: loading TONE");

  //var portamento = 0.1;
  var flute_synth = new Tone.MonoSynth();
  flute_synth.oscillator.type = "sine";
  //flute_synth.portamento = 0.1;
  flute_synth.filter.type = "allpass";
  flute_synth.envelope.attack = 0.05;
  flute_synth.volume.value = -18;

  function setPortamento(p){
      flute_synth.portamento = p;
  }

  var flute_delay = new Tone.FeedbackDelay("4n");
  flute_delay.feedback = 0.7;
  flute_delay.wet = 1.0;

  var flute_tremolo = new Tone.Tremolo({
    "frequency":3,
    "type":"sine",
    "depth":0.5,
    "spread":90
  });

  flute_delay.toMaster();
  flute_synth.chain(flute_tremolo, flute_delay);
  flute_tremolo.start();

  var sampler = new Array();
  sampler.push( new Tone.Player("./sounds/bell_1.ogg") );
  sampler.push( new Tone.Player("./sounds/bell_2.ogg") );
  sampler.push( new Tone.Player("./sounds/bell_3.ogg") );
  sampler.push( new Tone.Player("./sounds/chimes_1.ogg") );
  sampler.push( new Tone.Player("./sounds/chimes_2.ogg") );
  for( let s of sampler )
  {
    s.connect(flute_delay);
    s.volume.value = -6;
  }

  var prayerbowl = new Tone.Player("./sounds/prayerbowl_medium.ogg");
  prayerbowl.volume.value = -6;
  prayerbowl.toMaster();

  return{
    Tone: Tone,
    name: "instruments",
    flute_synth:flute_synth, // called by score.js
    setPortamento:setPortamento, //called by score.js
    sampler:sampler, //called bu score.js
    prayerbowl:prayerbowl //called by main.js
  }
});
