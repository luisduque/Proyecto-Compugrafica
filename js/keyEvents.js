function teclaPulsada(e)
{
    switch(e.keyCode){
            case 37: //left
                TECLA.IZQUIERDA = true;
                break;
            case 38: //up
                TECLA.ARRIBA = true;
                break;
            case 39: //right
                TECLA.DERECHA = true;
                break;
            case 40: //right
                TECLA.ABAJO = true;
                break;
            case 32: //space
                TECLA.ESPACIO = true;
            break;
            case 65: //A
            TECLA.A = true;
            break;
    };

}
function teclaSoltada(e)
{
    switch(e.keyCode){
            case 37: //left
                TECLA.IZQUIERDA = false;
                break;
            case 39: //right
                TECLA.DERECHA = false;
                break;
            case 38: //up
                TECLA.ARRIBA = false;
                 walking = false;
           
            break;
            case 40: //right
                TECLA.ABAJO = false;
                break;
            case 32: //space
                TECLA.ESPACIO = false;
            break;
            case 65: //A
            TECLA.A = false;
            break;
    };
}

/**
    Variables
**/

var rotSpeed = 0.02;
var rotateAngle = 0.3
var movSpeed = 5;


function move(player,way){
    switch(way){
        case "forward":
            var a = 1;
        break;
        case "backward":
            var a = -1;
        break;
        default:
            var a = 1;
        break;
    }
    player.translateZ(a*movSpeed);
}

function rotate(player,way){
    switch(way){
        case "left":
        var a = 1;
        break;
        case "right":
        var a = -1;
        break;
    }
    player.rotateOnAxis( new THREE.Vector3(0,1,0), a*rotateAngle);

}

function verticalRot(obj,way){
    switch(way){
        case "up":
            var a = 1;
        break;
        case "down":
            var a = -1;
        break;
        default:
            var a = 1;
        break;
    }
    obj.position.y = obj.position.x * a *Math.sin(rotSpeed) + obj.position.y * Math.cos(rotSpeed);
}

function horizontalRot(obj,way){
    switch(way){
        case "left":
            obj.position.x += 1;
            obj.position.z += 1;
        break;
        case "right": 
            obj.position.x += 1;
            obj.position.z += 1;
        break;
    }
}

function jump(player){
    console.log("press2");
    if (jumping == false && inAir == false){   
        console.log("jump arround");
        player.position.y += 10;

        vy = -8;
        jumping = true;
    }
}
