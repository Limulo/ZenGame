game.text = (function(){
    var grammar;
    var t_fadeIn = 2000,
        t_fadeOut=4000,
        t_read=5000;
    var b_ready = true;
    var b_busy = false;

    /*
    var data = {
      "start":["#[myPlace:#path#]line#"],
      "line":["#mood.capitalize# and #mood#, the #myPlace# was #mood# with #substance#", "#nearby.capitalize# #myPlace.a# #move.ed# through the #path#, filling me with #substance#"],
      "nearby":["beyond the #path#", "far away", "ahead", "behind me"],
      "substance":["light", "reflections", "mist", "shadow", "darkness", "brightness", "gaiety", "merriment"],
      "mood":["overcast", "alight", "clear", "darkened", "blue", "shadowed", "illuminated", "silver", "cool", "warm", "summer-warmed"],
      "path":["stream", "brook", "path", "ravine", "forest", "fence", "stone wall"],
      "move":["spiral", "twirl", "curl", "dance", "twine", "weave", "meander", "wander", "flow"]

    };
  */
    var data2 = {
      "start":["#koan#"],
      "koan":["Like this #object# your #element# is #status# #negative#. <br/><br/>If you don't #action#, no #positive# will come."],
      "object":["teacup is full of liquid", "glass of water", "lake can rise and overflow"],
      "element":["heart", "mind", "universe", "life", "creativity", "being"],
      "status":["full of", "indulging in", "focusing on", "relating to"],
      "negative":["selfishness", "power", "fear", "anger", "confusion"],
      "action":["relax", "calm", "take a break", "stop"],
      "positive":["happiness", "joy", "brilliant idea", "relief"]
    };
    var timer;
    function setup(){
        grammar = tracery.createGrammar(data2);
    }

    function createText(){
        let txt = grammar.flatten("#start#");
        t_read = txt.length * 50;
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
        console.log("t read : " + t_read);
    }

    function refresh(){
        b_ready=false;
        $("#koan").fadeOut(t_fadeOut, "swing", function(){b_ready = true;  b_busy=false;});
    }

    function check_ready(){
        return b_ready;
    }
    return{
        setup:setup,
        createText:createText,
        check_ready:check_ready
    };
})();
