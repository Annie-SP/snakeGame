var Menu = {

    preload : function() {
        // Load all the needed resources for the menu.
        //game.load.image('menu', './assets/images/menu.png');
    },

    create: function () {

        this.add.button(300, 200, "GAME OVER", this.startGame, this);
        game.add.text(300, 200, "START GAME", { font: "bold 72px sans-serif", fill: "#A6BB8D", align: "center"});
    },

    startGame: function () {

        this.state.start('Game');

    }

};