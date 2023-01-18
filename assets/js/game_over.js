var Game_Over = {

    preload : function() {

    },

    create : function() {

        this.add.button(300, 200, "GAME OVER", this.startGame, this);
        game.add.text(300, 200, "GAME OVER", { font: "bold 72px sans-serif", fill: "#A6BB8D", align: "center"});
 
        game.add.text(390, 355, "LAST SCORE", { font: "bold 44px sans-serif", fill: "#46c0f9", align: "center"});
        game.add.text(510, 435, score.toString(), { font: "bold 42px sans-serif", fill: "#fff", align: "center" });

    },

    startGame: function () {

        this.state.start('Game');

    }

};