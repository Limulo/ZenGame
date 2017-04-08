define(["libs/tracery"],function(t){
  //console.log("grammar.js: loading TRACERY");

  var text;
  var t_fadeIn = 2000,
      t_fadeOut=4000,
      t_read=5000;
  var b_ready = true;
  var b_busy = false;

  var koans = [];

  function createText(){
      var index = Math.floor(Math.random()*koans.length);
      text = tracery.createGrammar( koans[index]);
      let txt = text.flatten("#start#");
      t_read = txt.length * 60;
      let element= $("#koan");
      element.html("<p>" + txt + "</p>");
      if(b_busy){
          clearTimeout(timer);
          timer = setTimeout(refresh, t_read);
      } else {
          b_ready=false;
          element.fadeIn(t_fadeIn, "swing", function(){b_ready=true;  b_busy = true;});
          timer = setTimeout(refresh, (t_fadeIn + t_read));
      }
      //console.log("t read : " + t_read);
  }

  function refresh(){
      b_ready=false;
      $("#koan").fadeOut(t_fadeOut, "swing", function(){b_ready = true;  b_busy=false;});
  }

  function check_ready(){
      return b_ready;
  }
  koans[0] = {
        "start":["#koan#"],
        "koan":["Like this #object# your #element# is #status# #negative#. <br/><br/>If you don't #action#, no #positive# will come."],
        "object":["teacup is full of liquid", "glass of water", "lake can rise and overflow"],
        "element":["heart", "mind", "universe", "life", "creativity", "being"],
        "status":["full of", "indulging in", "focusing on", "relating to"],
        "negative":["selfishness", "power", "fear", "anger", "confusion"],
        "action":["relax", "calm", "take a break", "stop"],
        "positive":["happiness", "joy", "brilliant idea", "relief"]
      };

  koans[1] = {
      "start": ["#koan#"],
      "koan": ["Devote your #resource# to #activity# and in this way attain true #goal#."],
      "resource": ["time", "attention", "concentration", "self"],
      "activity": ["meditation", "exploration", "expansion of your conscience"],
      "goal": ["realization", "fullfillment"]
  };


  koans[2] = {
    "hero" : ["Yamaoka Tesshu", "Ryonen", "Shingen", "Shunkai"],
    "master":["Dokuon of Shokoku", "Gasan", "Joshu", "Gukei"],
    "heroAdj": ["a young student of Zen", "a hopeful sorcerer", "a wannabe Zen master", "a common farmer"],
    "habit":["visited one Zen master after another", "was talking to anyone about Zen teachings", "kept on looking for the REAL master"],
    "accident":["called upon #master#", "accidentaly met #master#", "eventually reached #master#'s house"],
    "talk": ["The mind, Buddha, and sentient beings, after all, do not exist", "The true nature of phenomena is emptiness, nothing exists", "There is no relaization, no delusion, no sage, no mediocrity, nothing exists", "Nothing exists. There is no giving and nothing to be received."],
    "masterAction": ["who was smoking quitely", "who was looking at fishes in the pond", "who was admiring the cranes flying in the sky", "who was tired of the stupid young man"],
    "masterReaction": ["Suddenly he whacked #hero# with his #object#"],
    "object": ["bamboo pipe", "wooden cane", "bamboo cane", "bamboo flute"],
    "reply": ["If nothing exists, where did this anger come from?"],
    "start": ["#[hero:#hero#][master:#master#]koan#"],
    "koan": ["#hero#, #heroAdj#, #habit#. One day he #accident#.<br/>Desiring to show his attainment, he said \"#talk#\".<br/>#master#, #masterAction#, said nothing.<br/>#masterReaction#. This made the youth quite angry.<br/>#master# asked: \"#reply#\""]
  };
  return{
    name: "tracery",
    createText:createText,
    check_ready:check_ready,
    $:$
  }
});
