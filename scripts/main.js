define(function(require){
  console.log("main.js");
  var score = require("./score");
  var grammar = require ("./grammar");
  var prayerbowl = score.prayerbowl;
  score.startTransport();

  function default_callback(){
      grammar.createText();
      if(prayerbowl.buffer.loaded)
          prayerbowl.start();
  }
  var saggio = $("#wiseman");
    saggio.click(function(){
      if(grammar.check_ready()){
          default_callback();
        }
      });
});
