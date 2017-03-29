game.text = (function(){
    var grammar;
    var data = {
      "start":["#[myPlace:#path#]line#"],
      "line":["#mood.capitalize# and #mood#, the #myPlace# was #mood# with #substance#", "#nearby.capitalize# #myPlace.a# #move.ed# through the #path#, filling me with #substance#"],
      "nearby":["beyond the #path#", "far away", "ahead", "behind me"],
      "substance":["light", "reflections", "mist", "shadow", "darkness", "brightness", "gaiety", "merriment"],
      "mood":["overcast", "alight", "clear", "darkened", "blue", "shadowed", "illuminated", "silver", "cool", "warm", "summer-warmed"],
      "path":["stream", "brook", "path", "ravine", "forest", "fence", "stone wall"],
      "move":["spiral", "twirl", "curl", "dance", "twine", "weave", "meander", "wander", "flow"]

    };


    var data2 = {
      "start":["#koan#"],
      "koan":["Like this #object# your #element# is #status# #negative#. \nIf you don't #action#, no #positive# will come."],
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
      var txt = grammar.flatten("#start#");
      var prev_div=document.getElementById("g_text");
      if(prev_div===null){
        console.log("Non c'è: lo creo");
        var text_div = document.createElement("div");
        text_div.setAttribute("id", "g_text");
        text_div.innerHTML=txt;
        var button = document.getElementById("create");
        document.body.insertBefore(text_div, button);
      }else{
        console.log("C'è già: lo uso");
        prev_div.innerHTML=txt;
        clearTimeout(timer);
      }
      timer = setTimeout(refresh, 7000);
    }

    function refresh(){
      var element = document.getElementById("g_text");
      element.parentNode.removeChild(element);
    }

    return{
        setup:setup,
        createText:createText
    };
})();
