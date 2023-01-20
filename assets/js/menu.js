let Menu = {

    preload : function() {
        game.load.image('menu', './assets/images/strelka.png');
    },

    create: function () {
        game.stage.backgroundColor = '#3C6255';

        this.add.button(240, 400, "menu", this.startGame, this);
        
        game.add.text(270, 210, "START GAME", { font: "bold 76px sans-serif", fill: "#EAE7B1", align: "center"});
        game.add.text(430, 398, "click to start", { font: "bold 30px sans-serif", fill: "#A6BB8D", align: "center"});
    },

    startGame: function () {

        this.state.start('Game');

    }

};