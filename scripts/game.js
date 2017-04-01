var game = (function(){

  var scriptQueue = [],         //  all the scripts
      numResourcesLoaded = 0,   // # of scripts already loaded
      numResources = 0,         // # of script to loaded
      executeRunning = false;   // mutex-like bool

  function init(){
      console.log("##INIT##");
  }

  function load(src, callback){
      var image,
          queueEntry;
      numResources++;
      queueEntry = {
        src: src,
        callback:callback,
        loaded:false
      };
      scriptQueue.push(queueEntry);
      image = new Image();
      image.onload = image.onerror = function(){
          numResourcesLoaded++;
          queueEntry.loaded = true;
          console.log(src + " loaded");

          if(!executeRunning){
              executeScriptQueue();
          }
      };
      image.src = src;
      console.log(src + " start loading");
  }

  function executeScriptQueue(){
      var next = scriptQueue[0];
      var first,
          script;
      if(next && next.loaded){
          executeRunning = true;
          scriptQueue.shift();
          first = document.getElementsByTagName("script")[0];
          script = document.createElement("script");
          script.onload=function(){
              if(next.callback){
                  next.callback();
              }
              executeScriptQueue();
          };
          script.src = next.src;
          first.parentNode.insertBefore(script, first);
      }else{
          executeRunning = false;
      }
  }

  function setup(){
      console.log("##SETUP##");
      Tone.Transport.start();
      game.text.setup();
      var saggio = $("#wiseman");
      saggio.click(function(){
          if(game.text.check_ready()){
              default_callback();
              console.log("CALLBACK");
          }else{
              console.log("NO CALLBACK");
          }
      });

 }

 function default_callback(){
     game.text.createText();
     if(game.instruments.prayerbowl.buffer.loaded)
         game.instruments.prayerbowl.start();
 }

  return {
    init:init,
    load:load,
    setup:setup,
    default_callback:default_callback
  };

})();
