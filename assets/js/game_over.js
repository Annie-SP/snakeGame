let Game_Over = {

    preload : function() {
        game.load.image('menu', './assets/images/strelka.png');

    },

    create : function() {
        game.stage.backgroundColor = '#3C6255';

        this.add.button(230, 550, "menu", this.startGame, this);
        game.add.text(420, 548, "click to start", { font: "bold 30px sans-serif", fill: "#A6BB8D", align: "center"});

        game.add.text(270, 160, "GAME OVER", { font: "bold 78px sans-serif", fill: "#EAE7B1", align: "center"});
 
        game.add.text(390, 355, "LAST SCORE", { font: "bold 40px sans-serif", fill: "#A6BB8D", align: "center"});
        game.add.text(500, 415, score.toString(), { font: "bold 32px sans-serif", fill: "#EAE7B1", align: "center" });

    },

    startGame: function () {

        this.state.start('Game');

    }

};