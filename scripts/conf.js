requirejs.config({
    baseUrl: 'scripts',
    paths: {
        libs: '../libs'
    }
});

requirejs(["libs/jquery","main"],
function   ($, main) {
    //console.log("MAIN loaded");
});
