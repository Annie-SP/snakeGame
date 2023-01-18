let snake, snakeTail, apple, squareSize, score, scoreMax, speed,
    updateDelay, direction, new_direction,
    addNew, cursors, scoreTextValue, speedTextValue, textStyle_Key, textStyle_Value;

let Game = {

    preload : function() {
      
        game.load.image('bg', './assets/images/bg.png');
        game.load.image('snakeTail', './assets/images/snake.png');
        game.load.image('apple', './assets/images/apple.png');
        game.load.image('snake', './assets/images/snakeHead.png');

        if(localStorage.getItem('scores') !== null){
            scoreMax = JSON.parse(localStorage.getItem('scores'));
        } else {
            scoreMax = 0;
        }

    },

    create : function() {
        snake = [];  
        snakeTail = [];                  
        apple = {};                     
        squareSize = 40;              
        score = [];            
        speed = 0;   
        scoreMax =  JSON.parse(localStorage.getItem('scores'));                     
        updateDelay = 0;                
        direction = 'right';           
        new_direction = null;          
        addNew = false;               

        cursors = game.input.keyboard.createCursorKeys();

        game.add.sprite(0, 0, 'bg');

        for(let i = 0; i < 1; i++){
            snake[i] = game.add.sprite(400+i*squareSize, 400, 'snake'); 
            //snake[i] = game.add.sprite(400+i*squareSize, 400, 'snakeTail');  
        }
        
        

        this.generateApple();

        textStyle_Key = { font: "bold 14px sans-serif", fill: "#EAE7B1", align: "center" };
        textStyle_Value = { font: "bold 18px sans-serif", fill: "#fff", align: "center" };

        game.add.text(100, 20, "SCORE", textStyle_Key);
        scoreTextValue = game.add.text(170, 18, score.toString(), textStyle_Value);
        localStorage.setItem('score', score);

        game.add.text(450, 20, "SPEED", textStyle_Key);
        speedTextValue = game.add.text(520, 18, speed.toString(), textStyle_Value);

        game.add.text(850, 20, "MAX SCORE", textStyle_Key);
        scoreMaxTextValue = game.add.text(950, 18, scoreMax, textStyle_Value);

    },

    update: function() {

        if (cursors.right.isDown && direction!='left')
        {
            new_direction = 'right';
        }
        else if (cursors.left.isDown && direction!='right')
        {
            new_direction = 'left';
        }
        else if (cursors.up.isDown && direction!='down')
        {
            new_direction = 'up';
        }
        else if (cursors.down.isDown && direction!='up')
        {
            new_direction = 'down';
        }

        speed = Math.min(10, Math.floor(score/5));

        speedTextValue.text = '' + speed;

      
        updateDelay++;

        if (updateDelay % (10 - speed) == 0) {


            let firstCell = snake[snake.length - 1],
                lastCell = snake.shift(),
                oldLastCellx = lastCell.x,
                oldLastCelly = lastCell.y;

          
            if(new_direction){
                direction = new_direction;
                new_direction = null;
            }


            if(direction == 'right'){
                lastCell.x = firstCell.x + squareSize;
                lastCell.y = firstCell.y;
            }
            else if(direction == 'left'){
                lastCell.x = firstCell.x - squareSize;
                lastCell.y = firstCell.y;
            }
            else if(direction == 'up'){
                lastCell.x = firstCell.x;
                lastCell.y = firstCell.y - squareSize;
            }
            else if(direction == 'down'){
                lastCell.x = firstCell.x;
                lastCell.y = firstCell.y + squareSize;
            }


            snake.push(lastCell);
            firstCell = lastCell;

            if(addNew){
                snake.unshift(game.add.sprite(oldLastCellx, oldLastCelly, 'snakeTail'));
                addNew = false;
            }

            this.appleCollision();

            this.selfCollision(firstCell);

            this.wallCollision(firstCell);
        }


    },

    generateApple: function(){


        // X is between 0 and 585 (39*15) 1200 (30*40) 1040 = 26
        // Y is between 0 and 435 (29*15)  800 (20*40) 640 = 16

        let randomX = Math.floor(Math.random() * 26 ) * squareSize,
            randomY = Math.floor(Math.random() * 16 ) * squareSize;

        apple = game.add.sprite(randomX, randomY, 'apple');
    },

    appleCollision: function() {


        for(let i = 0; i < snake.length; i++){
            if(snake[i].x == apple.x && snake[i].y == apple.y){

                addNew = true;

                apple.destroy();

                this.generateApple();

                score++;

                scoreTextValue.text = score.toString();
                localStorage.setItem('scores', scoreTextValue.text);

            }
        }

    },

    selfCollision: function(head) {

        for(let i = 0; i < snake.length - 1; i++){
            if(head.x == snake[i].x && head.y == snake[i].y){

                game.state.start('Game_Over');
            }
        }

    },

    wallCollision: function(head) {

        if(head.x >= 1040 ){
            head.x = 0;
        } else if(head.x < 0) {
            head.x = 1040;
        } else if (head.y >= 640){
            head.y = 0;
        } else if(head.y < 0){
            head.y = 640;
        }
   }

};