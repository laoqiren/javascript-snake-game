window.onload = function(){
    //创建草坪
    var grass = document.getElementById("grass");
    var score = 0;
    for(var i = 0;i<40;i++){
        for(var j = 0;j<21;j++){
            var block = document.createElement("div");
            block.className = "block";
            grass.appendChild(block);
        }
    }
    //创建蛇身
    var snakeBody = new Array();
    for(var i = 3;i > 0;i--){
        var block = document.createElement("div");
        block.className = "snakeBody";
        block.style.left = 20 * i +"px";
        grass.appendChild(block);
        snakeBody.push(block);
    }
    var snakeHead = snakeBody[0];
    snakeHead.style.backgroundImage = "url('./images/head.jpg')";
    snakeHead.style.backgroundPosition = "%50 %50";
    //创建食物
    var food = createFood();
    //蛇身移动
    var v = 300;
    var start = document.getElementById("start");
    var timer = null;
    var direction = "right";
    start.addEventListener("click",function(){
        clearInterval(timer);
        timer = setInterval(function(){
            move(direction);
        },v);

    //蛇转方向
    document.onkeydown = function(event){
        event = event || window.event;
        var keyCode = event.keyCode;
        switch(keyCode){
            case 37:
                if(direction != "right"){
                    direction = "left";
                    move(direction);
                }
                break;
            case 38:
                if(direction != "down"){
                    direction = "up";
                    move(direction);
                }
                break;
            case 39:
                if(direction != "left"){
                    direction = "right";
                    move(direction);
                }
                break;
            case 40:
                if(direction != "up"){
                    direction = "down";
                    move(direction);
                }
        }
    };
    //蛇暂停移动
    var pause = document.getElementById("pause");
    pause.addEventListener("click",function(event){
        clearInterval(timer);
        document.onkeydown=null;
    });
    var faster = document.getElementById("faster");
    if(v>100){
        faster.addEventListener("click",function(event){
            v -= 100;
        });
    }
    //蛇移动
    function move(direction){
        for(var i = snakeBody.length-1;i>0;i--){
            snakeBody[i].style.left = snakeBody[i-1].offsetLeft + "px";
            snakeBody[i].style.top = snakeBody[i-1].offsetTop + "px";
        }
        switch(direction){
            case "left":
                snakeHead.style.left = snakeHead.offsetLeft - 20 + "px";
                break;
            case "up":
                snakeHead.style.top = snakeHead.offsetTop - 20 +"px";
                break;
            case "down":
                snakeHead.style.top = snakeHead.offsetTop + 20 + "px";
                break;
            case "right":
                snakeHead.style.left = snakeHead.offsetLeft + 20 + "px";
                break;
        }
        //蛇是否吃到自己的身体或者撞到墙
        if(snakeHead.offsetLeft == -20 || snakeHead.offsetTop == -20 || snakeHead.offsetTop == 420 || snakeHead.offsetLeft == 800){
            alert("亲爱的，你撞墙了\n\n你的分数:"+score);
            clearInterval(timer);
            location.reload();
        }
        for(var i = 1;i<snakeBody.length;i++){
            if(snakeHead.offsetLeft == snakeBody[i].offsetLeft && snakeHead.offsetTop == snakeBody[i].offsetTop){
                alert("哈哈，你咬到自己了\n\n你的分数:"+score);
                clearInterval(timer);
                location.reload();
            }
        }
        //蛇吃食物
        var span = document.getElementById("score");
        if((snakeHead.offsetTop == food.offsetTop) && (snakeHead.offsetLeft == food.offsetLeft)){
            score +=1;
            var textScore = document.createTextNode("分数:"+score);
            span.replaceChild(textScore,span.lastChild);
            food.className = "snake-block";
            var x = snakeBody.length;
            if(direction == "right"){
                food.style.left = snakeBody[x-1].offsetLeft - 20 + "px";
            }
            else if(direction == "left"){
                food.style.left = snakeBody[x-1].offsetLeft + 20 + "px";
            }
            else if(direction == "top"){
                food.style.top = snakeBody[x-1].offsetTop + 20 + "px";
            }
            else if(direction == "down"){
                food.style.top = snakeBody[x-1].offsetTop - 20 + "px";
            }
            snakeBody.push(food);//蛇吃到食物
            food = createFood();//重新生成食物
        }

    }},false);
    //随机生成食物
    function createFood(){
        var oFood = document.createElement("div");
        oFood.className = "block food-block";
        var fleft = ftop = 0;
        do{
            var found = true;
            fleft = Math.floor(Math.random()*800);
            fleft = fleft - fleft % 20 ;
            ftop = Math.floor(Math.random()*420);
            ftop = ftop - ftop %20;
            for(var i = 0;i < snakeBody.length;i++){
                if(fleft === snakeBody[i].offsetLeft && ftop == snakeBody[i].offsetTop){
                    found = false;
                    break;
                }
            }
            oFood.style.left = fleft + "px";
            oFood.style.top = ftop + "px";
            grass.appendChild(oFood);
        }while(!found)
        return oFood;
    }
}
