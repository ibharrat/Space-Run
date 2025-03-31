const path = require("path");

//page listeners
var router = function(app){
    app.get('/', function(req, res){
        res.status(200).sendFile(path.join(__dirname + "/../client/html/index.html"));
    });

    app.get('/index', function(req, res){
        res.status(200).sendFile(path.join(__dirname + "/../client/html/index.html"));
    });

    app.get('/client/html/game.html', function(req, res) {
        res.sendFile(path.join(__dirname, 'client', 'html', 'game.html'));
    });
    
    app.get('/client/js/phaser.js', function(req, res) {
        res.header("Content-Type", "application/javascript");
        res.sendFile(path.join(__dirname, 'client', 'js', 'phaser.js'));
    });
    
    app.get('/client/js/game.js', function(req, res) {
        res.header("Content-Type", "application/javascript");
        res.sendFile(path.join(__dirname, 'client', 'js', 'game.js'));
    });

    
}

module.exports = router;