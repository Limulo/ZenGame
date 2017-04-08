define(["require","./instruments"],function(require){
  //console.log("score.js: loading instruments.js");
  var instruments = require("./instruments");
  var Tone = instruments.Tone;
  var prayerbowl = instruments.prayerbowl;
  var startTransport = function(){
    Tone.Transport.start();
  }


  var e;
  var bDebug = false;
  var phraseLength = 0.0; // time (seconds)
  var restLength = 0.0;
  // How many musical phrases before a bell or chimes sound
  var nPhrasesBeforeBell = 10;
  var nPhrases = 0;
  var root = 60; // C4
  var prevIndex = 0;
  // score logic ************************************************************/
  var Scale = {
    major : [0, 2, 4, 5, 7, 9, 10],
    minor : [0, 2, 3, 5, 7, 9, 10],
    major_pentatonic : [0, 2, 4, 7, 9, 12, 14, 16, 19, 21],
    minor_pentatonic : [0, 2, 5, 7, 9]
  }
  function selectDegree()
  {
    let degree;
    let index;
    let scale = Scale.major_pentatonic;
    let jump;

    do {
      let rnd = Math.random()*100;
      if( rnd < 10 )
        jump = -3;
      else if( rnd < 20 )
        jump = +3;
      else if( rnd < 35 )
        jump = -2;
      else if( rnd < 50 )
        jump = +2;
      else if( rnd < 75 )
        jump = -1;
      else
        jump = +1;
      index = prevIndex + jump;
    } while( index < 0 || index > scale.length-1);
    degree = scale[ index ];
    //if(bDebug) console.log("idx: "+prevIndex+"; jmp: "+jump+"; new idx: "+index+"; degree: "+degree+";" );
    prevIndex = index;

    /*
    do {
      degree = scale[ Math.floor( Math.random() * scale.length ) ];
    } while( degree == prevDegree );
    prevDegree = degree;
    */

    return degree;
  }

  // this function decides if we are going to
  // take a rest on the basis of the phrase length returned so far
  // It returns:
  // - TRUE: if we are planning to play a new note;
  // - FALSE: if we want a rest.
  function shouldRest()
  {
    restLength = 0.0;
    let th = phraseLength / 15.0;
    if( Math.random()<th )
    {
      //restLength = 15.0 * Math.pow(th, 3);
      restLength = 1.0 + th*4.0;
      if(bDebug) console.log("\tphrase lenght "+phraseLength+"s; REST length "+restLength+"s;");
      phraseLength = 0.0;
      return true;
    }
    return false;
  }

  // note duration
  function howLong()
  {
    let noteDur;
    let rnd = Math.random()*100;
    if( rnd < 15)
      noteDur = "16n";
    else if( rnd < 30)
      noteDur = "1m";
    else if( rnd < 50)
      noteDur = "8n";
    else if( rnd < 70)
      noteDur = "2n";
    else
      noteDur = "4n";
    return noteDur;
  }

  var fluteCallback = function(time, value)
  {
    // play the current note
    let dur       = value;
    let midiNote  = selectDegree()+root;
    //let freq      = mtof( midiNote );
    let freq      = Tone.Frequency.prototype.midiToFrequency( midiNote );
    if(bDebug) console.log("["+midiNote+", "+dur+"] -> freq:"+Math.floor(freq)+";");

    if( phraseLength == 0.0 ) {
      //if(bDebug) console.log("trigger attack");
      instruments.setPortamento(0);
      instruments.flute_synth.triggerAttack( freq, time );
    } else {
      //if(bDebug) console.log("setNote");
      instruments.setPortamento(0.1);
      instruments.flute_synth.setNote(freq);
    }

    phraseLength += Tone.Time(dur).toSeconds();

    if ( shouldRest() ) {
      //if(bDebug) console.log("triggerRelease");
      instruments.flute_synth.triggerRelease( time+Tone.Time(dur).toSeconds() );
      nPhrases ++;
      if( nPhrases >= nPhrasesBeforeBell )
      {
        let i = Math.floor( Math.random() * instruments.sampler.length );
        if(instruments.sampler[i].buffer.loaded)
          instruments.sampler[i].start( time+Tone.Time(dur).toSeconds() );
        nPhrases = 0;
      }
    }

    // schedule the next note with its duration
    //let nextDur = Math.floor( Math.random()*2.75 + 0.25 );
    //let nextDur = howLong();
    e = new Tone.Event( fluteCallback, howLong() );
    e.start( time+Tone.Time(dur).toSeconds()+restLength );
  }

  // music variables ********************************************************/
  e = new Tone.Event( fluteCallback, howLong() );
  e.start("1m"); // start

  return{
    name: "score",
    startTransport:startTransport,
    prayerbowl:prayerbowl
  }
});
