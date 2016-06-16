function limpiarNivel(){

console.log(escena.children.length+" i");

	for (var i = 0 ; i < escena.children.length; i++) {
		var obj = escena.children[i];
         if(obj.name!="permanente"){
         console.log(i);
       	 escena.remove(obj);
       }
    
       

	};
 console.log(escena.children.length+" f");

	collidableMeshList = [];
	
    
   
}

function nivel1(){
	limpiarNivel();
if(borrar == false){
limpiarNivel();
camaraActiva = camaras.fixed;
ambientacion.play();
$("#loadingBar").html("Cargando");
$('#loadingBar').fadeIn(0);
carga('hospital','models/hospital/hospital.js');
//carga('cuarto','models/cuarto/cuarto.js');
   //derecha abajo
    collidableMeshList.push(plano);
    change = 0;
	var pared = new THREE.Mesh(
	new THREE.BoxGeometry(150,1,50));
	pared.position.set(-220,1,-545);
	pared.material.visible=false;
	pared.name="pared1";
	escena.add(pared);
	collidableMeshList.push(pared);

	var pared = new THREE.Mesh(
	new THREE.BoxGeometry(150,1,50));
	pared.position.set(-220,1,-595);
	pared.material.visible=false;
	pared.name="pared0";
	escena.add(pared);
	collidableMeshList.push(pared);
    
    //inicial
    var pared = new THREE.Mesh(
    new THREE.BoxGeometry(200,1,50));
	pared.position.set(170,1,-720);
	pared.material.visible=false;
	pared.name="paredini";
	escena.add(pared);
	collidableMeshList.push(pared);

	//derecha arriba
	var pared = new THREE.Mesh(
    new THREE.BoxGeometry(180,1,50));
	pared.position.set(-220,1,150);
	pared.material.visible=false;
	pared.name="pared2";
	escena.add(pared);
	collidableMeshList.push(pared);

	  var pared = new THREE.Mesh(
    new THREE.BoxGeometry(180,1,50));
	pared.position.set(-220,1,100);
	pared.material.visible=false;
	pared.name="pared2_0";
	escena.add(pared);
	collidableMeshList.push(pared);

	//izquierda abajo
	  var pared = new THREE.Mesh(
    new THREE.BoxGeometry(180,1,50));
	pared.position.set(540,1,-545);
	pared.material.visible=false;
	pared.name="pared3";
	escena.add(pared);
	collidableMeshList.push(pared);

	  var pared = new THREE.Mesh(
    new THREE.BoxGeometry(180,1,50));
	pared.position.set(540,1,-595);
	pared.material.visible=false;
	pared.name="pared3_0";
	escena.add(pared);
	collidableMeshList.push(pared);


//ascensor
	  var pared = new THREE.Mesh(
    new THREE.BoxGeometry(20,1,350));
	pared.position.set(460,1,100);
	pared.material.visible=false;
	pared.name="pared4_0";
	escena.add(pared);
	collidableMeshList.push(pared);

	 var pared = new THREE.Mesh(
    new THREE.BoxGeometry(20,1,350));
	pared.position.set(440,1,100);
	pared.material.visible=false;
	pared.name="pared4";
	escena.add(pared);
	collidableMeshList.push(pared);
    
    var pared = new THREE.Mesh(
    new THREE.BoxGeometry(60,1,120));
	pared.position.set(300,1,40);
	pared.material.visible=false;
	pared.name="ascensor";
	escena.add(pared);
	collidableMeshList.push(pared);

     //pared central mitad abajo
     var pared = new THREE.Mesh(
    new THREE.BoxGeometry(600,10,240));
	pared.position.set(140,10,-445);
	pared.material.visible=false;
	pared.name="pared5";
	escena.add(pared);
	collidableMeshList.push(pared);

   //pared central arriba
	var pared = new THREE.Mesh(
    new THREE.BoxGeometry(400,10,170));
	pared.position.set(75,10,30);
	pared.material.visible=false;
		pared.name="pared5";
	escena.add(pared);
	collidableMeshList.push(pared);

	   //pared central 
	var pared = new THREE.Mesh(
    new THREE.BoxGeometry(570,10,270));
	pared.position.set(160,10,-190);
	pared.material.visible=false;
		pared.name="pared5";
	escena.add(pared);
	collidableMeshList.push(pared);

//afuera izq
	var pared = new THREE.Mesh(
    new THREE.BoxGeometry(10,10,1600));
	pared.position.set(625,10,50);
	pared.material.visible=false;
		pared.name="pared5";
	escena.add(pared);
	collidableMeshList.push(pared);

//derecha
	var pared = new THREE.Mesh(
    new THREE.BoxGeometry(10,10,860));
	pared.position.set(-310,10,-310);
	pared.material.visible=false;
		pared.name="pared5";
	escena.add(pared);
	collidableMeshList.push(pared);


//arriba
	var pared = new THREE.Mesh(
    new THREE.BoxGeometry(1100,10,10));
	pared.position.set(-100,10,300);
	pared.material.visible=false;
		pared.name="pared5";
	escena.add(pared);
	collidableMeshList.push(pared);

    
    var pared = new THREE.Mesh(
    new THREE.BoxGeometry(10,10,250));
	pared.position.set(-650,10,250);
    pared.material.visible=false;
    	pared.name="pared5";
	escena.add(pared);
	collidableMeshList.push(pared);

	var pared = new THREE.Mesh(
    new THREE.BoxGeometry(10,10,550));
	pared.position.set(440,10,600);
	pared.material.visible=false;
		pared.name="pared5";
	escena.add(pared);
	collidableMeshList.push(pared);

    var pared = new THREE.Mesh(
    new THREE.BoxGeometry(280,10,10));
	pared.position.set(500,10,680);
	pared.material.visible=false;
		pared.name="pared5";
	escena.add(pared);
	collidableMeshList.push(pared);

	var pared = new THREE.Mesh(
    new THREE.BoxGeometry(350,10,10));
	pared.position.set(-480,10,110);
	pared.material.visible=false;
		pared.name="pared5";
	escena.add(pared);
	collidableMeshList.push(pared);


//abajo inicio jill
	var pared = new THREE.Mesh(
    new THREE.BoxGeometry(390,10,130));
	pared.position.set(-110,10,-810);
	pared.material.visible=false;
	escena.add(pared);
	collidableMeshList.push(pared);

	var pared = new THREE.Mesh(
    new THREE.BoxGeometry(350,10,130));
	pared.position.set(450,10,-810);
	pared.material.visible=false;
	escena.add(pared);
	collidableMeshList.push(pared);

	var pared = new THREE.Mesh(
    new THREE.BoxGeometry(250,10,10));
	pared.position.set(150,10,-870);
	pared.material.visible=false;
	escena.add(pared);
	collidableMeshList.push(pared);



var pared = new THREE.Mesh(
    new THREE.BoxGeometry(60,1,40));
	pared.position.set(390,1,270);
	pared.material.visible=false;
	pared.name="door";
	escena.add(pared);
	collidableMeshList.push(pared);
	borrar = true;
};
}


function nivel2(){
	limpiarNivel();
if(borrar == false){
limpiarNivel();
ambientacion.play();
$("#loadingBar").html("Cargando");
$('#loadingBar').fadeIn(0);
p1.position.x = 400;
p1.position.z = -200;
p1.rotation.y = izq;

carga('cuarto','models/cuarto/cuarto.js');
cargaf('cuarto','models/cuarto/fisicasCuarto.js');


change = 1;

    collidableMeshList.push(plano);
		//Suelo
	var cuarto = new THREE.Mesh(
	new THREE.BoxGeometry(170,1,25));
	cuarto.material.visible=false;
	cuarto.position.set(380,1,280);
	cuarto.name="cuarto1"
    
	
	escena.add(cuarto);
	collidableMeshList.push(cuarto);

	var cuarto = new THREE.Mesh(
	new THREE.BoxGeometry(170,1,25));
	cuarto.position.set(380,1,255);
	cuarto.material.visible=false;
	cuarto.name="cuarto1_0"
	escena.add(cuarto);
	collidableMeshList.push(cuarto);

    var cuarto = new THREE.Mesh(
	new THREE.BoxGeometry(50,1,100));
	cuarto.position.set(400,1,-180);
	cuarto.material.visible=false;
	cuarto.name="cuarto_salida"
	escena.add(cuarto);
	collidableMeshList.push(cuarto);
  
  var cuarto = new THREE.Mesh(
	new THREE.BoxGeometry(50,1,50));
	cuarto.position.set(380,1, 320);
	cuarto.material.visible=true;
	cuarto.name="llave"
	escena.add(cuarto);
	collidableMeshList.push(cuarto);

   // -350,200,250 400,10,-200
	camaras.fixed.position.set(-350,200,-100);
	camaraActiva = camaras.fixed;
	camaras.fixed.lookAt(new THREE.Vector3(400,10,-200));
    borrar = true;	
};

}

function nivel3(){

	limpiarNivel();
if(borrar == false){
limpiarNivel();
ambientacion.play();
$("#loadingBar").html("Cargando");
$('#loadingBar').fadeIn(0);
p1.position.x = 1200;
p1.position.z = -600;
p1.rotation.y = izq;

cargaf('pasillo','models/huntinghallway/pasillo.js');

change = 1;

    collidableMeshList.push(plano);



/////////CAMBIOS DE CAMARA//////////
   var cam3_1 = new THREE.Mesh(
		new THREE.BoxGeometry(125,1,125));
	cam3_1.position.set(1000,1,-600);
	cam3_1.name="cam3_1";
	escena.add( cam3_1 );
	collidableMeshList.push(cam3_1);

	var cam3_2 = new THREE.Mesh(
	new THREE.BoxGeometry(80,1,100));
	cam3_2.position.set(-950,1,-600);
	cam3_2.name="cam3_2";
	escena.add( cam3_2 );
	collidableMeshList.push(cam3_2);


   var cam3_3 = new THREE.Mesh(
		new THREE.BoxGeometry(150,1,100));
	cam3_3.position.set(-1100,1,-200);
	cam3_3.name="cam3_3";
	escena.add( cam3_3 );
	collidableMeshList.push(cam3_3);


	var cam3_4 = new THREE.Mesh(
	new THREE.BoxGeometry(125,1,125));
	cam3_4.position.set(-775,1,0);
	cam3_4.name="cam3_4";
	escena.add( cam3_4 );
	collidableMeshList.push(cam3_4);


	var cam3_5 = new THREE.Mesh(
	new THREE.BoxGeometry(125,1,125));
	cam3_5.position.set(-800,1,250);
	cam3_5.name="cam3_5";
	escena.add( cam3_5 );
	collidableMeshList.push(cam3_5);


	var cam3_6 = new THREE.Mesh(
	new THREE.BoxGeometry(125,1,125));
	cam3_6.position.set(-1300,1,300);
	cam3_6.name="cam3_6";
	escena.add( cam3_6 );
	collidableMeshList.push(cam3_6);


	var cam3_7 = new THREE.Mesh(
	new THREE.BoxGeometry(125,1,125));
	cam3_7.position.set(-1300,1,625);
	cam3_7.name="cam3_7";
	escena.add( cam3_7 );
	collidableMeshList.push(cam3_7);


	var cam3_8 = new THREE.Mesh(
	new THREE.BoxGeometry(125,1,125));
	cam3_8.position.set(0,1,-600);
	cam3_8.name="cam3_8";
	escena.add( cam3_8 );
	collidableMeshList.push(cam3_8);
    



	//CAmbio de Nivel//
	var llegada = new THREE.Mesh(
	new THREE.BoxGeometry(125,1,125));
	llegada.position.set(-700,1,625);
	llegada.name="llegada";
	escena.add( llegada );
	collidableMeshList.push(llegada);




	/////////Lavas/////////
	var lava = new THREE.Mesh(
		new THREE.BoxGeometry(50,1,100),
		new THREE.MeshLambertMaterial( {color:0xbdbcBc,map:THREE.ImageUtils.loadTexture("textures/lava.jpg")})
	);
	lava.position.set(500,1,-600);
	lava.castShadow = false;
	lava.receiveShadow = true;
	
	lava.material.map.wrapS = THREE.RepeatWrapping;
	lava.material.map.wrapT = THREE.MirroredRepeatWrapping;
	lava.material.map.repeat.set(2,2);
    lava.name = "lava";
	escena.add(lava);
	collidableMeshList.push(lava);

	lava = new THREE.Mesh(
		new THREE.BoxGeometry(50,1,100),
		new THREE.MeshLambertMaterial( {color:0xbdbcBc,map:THREE.ImageUtils.loadTexture("textures/lava.jpg")})
	);
	lava.position.set(500,1,-600);
	lava.castShadow = false;
	lava.receiveShadow = true;
	
	lava.material.map.wrapS = THREE.RepeatWrapping;
	lava.material.map.wrapT = THREE.MirroredRepeatWrapping;
	lava.material.map.repeat.set(2,2);
    lava.name = "lava";
	escena.add(lava);
	collidableMeshList.push(lava);


    lava = new THREE.Mesh(
		new THREE.BoxGeometry(50,1,100),
		new THREE.MeshLambertMaterial( {color:0xbdbcBc,map:THREE.ImageUtils.loadTexture("textures/lava.jpg")})
	);
	lava.position.set(350,1,-600);
	lava.castShadow = false;
	lava.receiveShadow = true;
	
	lava.material.map.wrapS = THREE.RepeatWrapping;
	lava.material.map.wrapT = THREE.MirroredRepeatWrapping;
	lava.material.map.repeat.set(2,2);
    lava.name = "lava";
	escena.add(lava);
	collidableMeshList.push(lava);

    lava = new THREE.Mesh(
		new THREE.BoxGeometry(50,1,100),
		new THREE.MeshLambertMaterial( {color:0xbdbcBc,map:THREE.ImageUtils.loadTexture("textures/lava.jpg")})
	);
	lava.position.set(100,1,-600);
	lava.castShadow = false;
	lava.receiveShadow = true;
	
	lava.material.map.wrapS = THREE.RepeatWrapping;
	lava.material.map.wrapT = THREE.MirroredRepeatWrapping;
	lava.material.map.repeat.set(2,2);
    lava.name = "lava";
	escena.add(lava);
	collidableMeshList.push(lava);


	lava = new THREE.Mesh(
		new THREE.BoxGeometry(50,1,100),
		new THREE.MeshLambertMaterial( {color:0xbdbcBc,map:THREE.ImageUtils.loadTexture("textures/lava.jpg")})
	);
	lava.position.set(-150,1,-600);
	lava.castShadow = false;
	lava.receiveShadow = true;
	
	lava.material.map.wrapS = THREE.RepeatWrapping;
	lava.material.map.wrapT = THREE.MirroredRepeatWrapping;
	lava.material.map.repeat.set(2,2);
    lava.name = "lava";
	escena.add(lava);
	collidableMeshList.push(lava);


	lava = new THREE.Mesh(
		new THREE.BoxGeometry(50,1,100),
		new THREE.MeshLambertMaterial( {color:0xbdbcBc,map:THREE.ImageUtils.loadTexture("textures/lava.jpg")})
	);
	lava.position.set(-300,1,-600);
	lava.castShadow = false;
	lava.receiveShadow = true;
	
	lava.material.map.wrapS = THREE.RepeatWrapping;
	lava.material.map.wrapT = THREE.MirroredRepeatWrapping;
	lava.material.map.repeat.set(2,2);
    lava.name = "lava";
	escena.add(lava);
	collidableMeshList.push(lava);


	lava = new THREE.Mesh(
		new THREE.BoxGeometry(50,1,100),
		new THREE.MeshLambertMaterial( {color:0xbdbcBc,map:THREE.ImageUtils.loadTexture("textures/lava.jpg")})
	);
	lava.position.set(-450,1,-600);
	lava.castShadow = false;
	lava.receiveShadow = true;
	
	lava.material.map.wrapS = THREE.RepeatWrapping;
	lava.material.map.wrapT = THREE.MirroredRepeatWrapping;
	lava.material.map.repeat.set(2,2);
    lava.name = "lava";
	escena.add(lava);
	collidableMeshList.push(lava);


	lava = new THREE.Mesh(
		new THREE.BoxGeometry(50,1,100),
		new THREE.MeshLambertMaterial( {color:0xbdbcBc,map:THREE.ImageUtils.loadTexture("textures/lava.jpg")})
	);
	lava.position.set(-650,1,-600);
	lava.castShadow = false;
	lava.receiveShadow = true;
	
	lava.material.map.wrapS = THREE.RepeatWrapping;
	lava.material.map.wrapT = THREE.MirroredRepeatWrapping;
	lava.material.map.repeat.set(2,2);
    lava.name = "lava";
	escena.add(lava);
	collidableMeshList.push(lava);

	lava = new THREE.Mesh(
		new THREE.BoxGeometry(50,1,100),
		new THREE.MeshLambertMaterial( {color:0xbdbcBc,map:THREE.ImageUtils.loadTexture("textures/lava.jpg")})
	);
	lava.position.set(-800,1,-600);
	lava.castShadow = false;
	lava.receiveShadow = true;
	
	lava.material.map.wrapS = THREE.RepeatWrapping;
	lava.material.map.wrapT = THREE.MirroredRepeatWrapping;
	lava.material.map.repeat.set(2,2);
    lava.name = "lava";
	escena.add(lava);
	collidableMeshList.push(lava);


	lava = new THREE.Mesh(
		new THREE.BoxGeometry(100,1,50),
		new THREE.MeshLambertMaterial( {color:0xbdbcBc,map:THREE.ImageUtils.loadTexture("textures/lava.jpg")})
	);
	lava.position.set(-1025,1,-375);
	lava.castShadow = false;
	lava.receiveShadow = true;
	
	lava.material.map.wrapS = THREE.RepeatWrapping;
	lava.material.map.wrapT = THREE.MirroredRepeatWrapping;
	lava.material.map.repeat.set(2,2);
    lava.name = "lava";
	escena.add(lava);
	collidableMeshList.push(lava);



	lava = new THREE.Mesh(
		new THREE.BoxGeometry(250,1,50),
		new THREE.MeshLambertMaterial( {color:0xbdbcBc,map:THREE.ImageUtils.loadTexture("textures/lava.jpg")})
	);
	lava.position.set(-1150,1,-125);
	lava.castShadow = false;
	lava.receiveShadow = true;
	
	lava.material.map.wrapS = THREE.RepeatWrapping;
	lava.material.map.wrapT = THREE.MirroredRepeatWrapping;
	lava.material.map.repeat.set(2,2);
    lava.name = "lava";
	escena.add(lava);
	collidableMeshList.push(lava);

/////Camara/////
	

	camaras.fixed.position.set(1270,175,-625);
	camaraActiva = camaras.fixed;
	camaras.fixed.lookAt(new THREE.Vector3(200,0,-400));

	
borrar = true;
};
}
function nivel4(){

		limpiarNivel();

	
		if(borrar == false){
		limpiarNivel();
		ambientacion.play();
		$("#loadingBar").html("Cargando");
		$('#loadingBar').fadeIn(0);
		p1.position.x = 450;
		p1.position.z = -1450;
		p1.rotation.y = down;

		carga('corredor','models/corredor/corredor.js');
		cargaf('corredorFisicas','models/corredor/corredorFisicas.js');

		change = 1;

		collidableMeshList.push(plano);

//camaras

	var cam4_1 = new THREE.Mesh(
	new THREE.BoxGeometry(225,1,25));
	cam4_1.position.set(450,15,-800);
	cam4_1.name="cam4_1";
	cam4_1.material.visible =false;
	escena.add( cam4_1 );
	collidableMeshList.push(cam4_1);


	var cam4_2 = new THREE.Mesh(
	new THREE.BoxGeometry(225,1,25));
	cam4_2.position.set(450,15,225);
	cam4_2.name="cam4_2";
	cam4_2.material.visible =false;
	escena.add( cam4_2 );
	collidableMeshList.push(cam4_2);

	var cam4_3 = new THREE.Mesh(
	new THREE.BoxGeometry(225,1,25));
	cam4_3.position.set(450,15,900);
	cam4_3.name="cam4_3";
	cam4_3.material.visible =false;
	escena.add( cam4_3 );
	collidableMeshList.push(cam4_3);

	var pasar = new THREE.Mesh(
	new THREE.BoxGeometry(225,1,25));
	pasar.position.set(450,15,1650);
	pasar.name="pasar";
	pasar.material.visible =false;
	escena.add( pasar );
	collidableMeshList.push(pasar);

	var pasar = new THREE.Mesh(
	new THREE.BoxGeometry(225,500,25));
	pasar.position.set(450,15,1850);
		pasar.material.color.setHex("0x000000");
	escena.add( pasar );
	collidableMeshList.push(pasar);

		var pasar = new THREE.Mesh(
	new THREE.BoxGeometry(25,500,555));
	pasar.position.set(300,15,1650);
	pasar.material.color.setHex("0x000000");

	escena.add( pasar );
	collidableMeshList.push(pasar);


	camaras.fixed.position.set(450,155,-1500);
	camaraActiva = camaras.fixed;
	camaras.fixed.lookAt(new THREE.Vector3(450,50,-400));

	borrar = true;	

 };
}