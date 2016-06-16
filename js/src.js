var escena,camaras = {}, models ={},renderer, camaraActiva = null, bounds = {}, ultiTiempo;
var appW = window.innerWidth, appH = window.innerHeight;
var TECLA = { ARRIBA:false, ABAJO:false, IZQUIERDA:false, DERECHA:false, A:false,W:false,S:false,D:false};
var prevTime = performance.now();
jump_s = new Sound(['musica/jump.wav'],1,1);
coin_b = new Sound(['musica/coin.wav'],1,1);
tubo = new Sound(['musica/tubo.wav'],1,1);
muerte = new Sound(['musica/Explosion.wav'],1,1);
power = new Sound(['musica/Powerup.wav'],1,1);
llavesound = new Sound(['musica/llave.mp3'],1,1);
pasos = new Sound(['musica/pasos2.mp3'],1,1);
ambientacion = new Sound(['musica/ambientacion2.mp3'],1,1);
puertabloqueada = new Sound(['musica/puerta-bloqueada.mp3'],1,1);
opendoor = new Sound(['musica/puerta-opened.mp3'],1,1);
asensorsound = new Sound(['musica/asensor.mp3'],1,1);
var animation;
var model;
var clock = new THREE.Clock();
var jsonLoader = new THREE.JSONLoader();
var change = false;
var borrar = false;
var change;
var llave = false;
// custom global variables
var android;
var spotLight;
var plano;
var f;
// the following code is from
//    http://catchvar.com/threejs-animating-blender-models
var animOffset       = 0,   // starting frame of animation
	walking         = false,
	duration        = 1000, // milliseconds to complete animation
	keyframes       = 25,   // total number of animation frames
	interpolation   = duration / keyframes, // milliseconds per frame
	lastKeyframe    = 0,    // previous keyframe
	currentKeyframe = 0;
//console.log(jump_s);
var der = -1.6;
var izq = 1.6;
var up = 0;
var down = -3.2;
var collidableMeshList = [];
var level = 1;
//fisicas
var vy = 0, vx = 0, gravity = 0.3;
var jumping = false, inAir = true, falling = false;

var cargador = {
	loadState: false,
	objsToLoad: 0,
	objsLoaded: 0,
	sceneIsReady: false,
	objReady: function(){
		this.objsToLoad--;
		this.objsLoaded++;
		var total = this.objsToLoad+this.objsLoaded;
		var porcentaje = (this.objsLoaded/total)*100;
		$("#loadingBar").html(porcentaje+"%");
		if(this.objsToLoad == 0){
			this.loadState = true;
			$('#loadingBar').fadeToggle(4000);
			$("#loadingBar").html("");
		}
	},
	addObj: function(){
		this.objsToLoad++;
	}
};

function webGLStart(){
	iniciarEscena();
	$( window ).resize(onWindowResize);
	ultiTiempo = Date.now();
	document.onkeydown = teclaPulsada;
	document.onkeyup = teclaSoltada;
	animarEscena();
}
animate();


function iniciarEscena(){
	renderer = new THREE.WebGLRenderer();
	renderer.setClearColor(0x6a6a6a, 1);
	renderer.setSize(appW, appH);
	renderer.shadowMapEnabled = true;
	document.body.appendChild(renderer.domElement);


	var camara = new THREE.PerspectiveCamera(45, appW / appH, 1, 10000);
	camara.position.set(1600,1600,-1600);
	camara.lookAt(new THREE.Vector3(0,0,0));

	var tracking = new THREE.PerspectiveCamera(45, appW / appH, 1, 10000);
	tracking.position.set(1600,1600,-1600);
	tracking.lookAt(new THREE.Vector3(0,0,0));

	var fixed = new THREE.PerspectiveCamera(45, appW / appH, 1, 10000);
	fixed.position.set(170,200,-595);
	fixed.lookAt(new THREE.Vector3(170,150,-680));

	var tpersona = new THREE.PerspectiveCamera(45, appW / appH, 1, 10000);
	tpersona.position.set(1600,1600,-1600);
	tpersona.lookAt(new THREE.Vector3(0,0,0));

	var observer = new THREE.PerspectiveCamera(45, appW / appH, 1, 10000);
	observer.position.set(1600,1600,-1600);
	observer.lookAt(new THREE.Vector3(0,0,0));

	var intro = new THREE.PerspectiveCamera(45, appW / appH, 1, 10000);
	intro.position.set(300,2000,-450);
	intro.lookAt(new THREE.Vector3(0,2000,-1850));

	camaras.interactive = camara;
	camaras.tracking = tracking;
	camaras.fixed = fixed;
	camaras.tpersona = tpersona;
	camaras.observer = observer;
    camaras.video = intro;

	escena = new THREE.Scene();

	//Iniciar controles de la camara
	controlCamara = new THREE.OrbitControls( camaras.interactive , renderer.domElement );

	//estadisticas
	stats = new Stats();
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.top = '10px';
	stats.domElement.style.left = '10px';
	stats.domElement.style.zIndex = '100';
	document.body.appendChild(stats.domElement);

	//Luz hemisferica
var light = new THREE.HemisphereLight( 0xeeeeff, 0x777788, 0.75 );
	light.position.set( 0.5, 1, 0.75 );
	escena.add( light );
	 light.name = "permanente";
/*pj
	var light = new THREE.HemisphereLight( 0xeeeeff, 0x777788, 0.75 );
	light.position.set( 0.5, 1, 0.75 );
	escena.add( light );
	//Luz AMbiente
	var lambiente = new THREE.AmbientLight(0x3d3c3c);
	escena.add(lambiente);

	//Luz Spotlight
	var spotLight = new THREE.SpotLight( 0xffffff,1,4000,30,0.1 );
	spotLight.position.set( 0, 1000, 0 );
	spotLight.castShadow = true;
	escena.add( spotLight );

	var spotLight = new THREE.SpotLight( 0xffffff,1,4000,30,0.1 );
	spotLight.position.set( 0, 1000, 0 );
	spotLight.castShadow = true;
	escena.add( spotLight );
*/
 spotLight = new THREE.SpotLight( 0xffffff,1,500,30,0.1 );
	spotLight.position.set(150,100,-800);
	spotLight.castShadow = true;
		spotLight.name = "permanente";
	escena.add( spotLight );

	//Suelo
	plano = new THREE.Mesh(
		new THREE.BoxGeometry(4000,1,4000),
		new THREE.MeshLambertMaterial( {color:0xbdbcBc,map:THREE.ImageUtils.loadTexture("textures/street.png")})
	);
	plano.position.set(0,-1,0);
	plano.castShadow = false;
	plano.receiveShadow = true;
	
	plano.material.map.wrapS = THREE.RepeatWrapping;
	plano.material.map.wrapT = THREE.MirroredRepeatWrapping;
	plano.material.map.repeat.set(2,2);
    plano.name = "plano";
	escena.add(plano);
	plano.name = "permanente";
//	collidableMeshList.push(plano);


	//Creación de los rayos para el calculo de colisiones
	ray = new THREE.Raycaster();
	ray.ray.direction.set( 0, -1, 0 );

	rayUp = new THREE.Raycaster();
	rayUp.ray.direction.set( 0, 1, 0 );

	rayL = new THREE.Raycaster();
	rayL.ray.direction.set(-1,0,0);

    rayD = new THREE.Raycaster();
	rayD.ray.direction.set(1,0,0);

	rayA = new THREE.Raycaster();
	rayA.ray.direction.set(0,0,1);

	rayAB = new THREE.Raycaster();
	rayAB.ray.direction.set(0,0,-1);




	//PLAYER
	p1 = new THREE.Mesh(
		new THREE.SphereGeometry(10,10,10),
		new THREE.MeshPhongMaterial({color:0xffffff,map:THREE.ImageUtils.loadTexture("textures/adidas.jpg")})
		);
	p1.castShadow = true;
	p1.receiveShadow = true;
	p1.position.set(600,5,-490);

	//jsonLoader.load( "models/jill.js", addModelToScene );
    cargapj('jill','models/jill.js');
    
 //   nivel1();

        camaraActiva = camaras.video;

       // ambientacion.play();

	}


function animate() 
{
    requestAnimationFrame( animate );
	render();		
	update();
}

function update()
{
	// delta = change in time since last call (seconds)
	delta = clock.getDelta(); 
	var moveDistance = 100 * delta;
	walking = false;

	 }
	function animarEscena(){
		requestAnimationFrame( animarEscena );

		if(!cargador.loadState && cargador.objsToLoad > 0){
		console.log("Obj Loaded : "+cargador.objsLoaded+" / "+(cargador.objsToLoad+cargador.objsLoaded));
		}else{
			if(!cargador.sceneIsReady){
				cargarModelos();
				cargador.sceneIsReady = true;
				//p1 = models.jillsMtl.obj;
			}
			renderEscena();
			actualizarEscena();
		}
	}

	function renderEscena(){
			if ( video.readyState === video.HAVE_ENOUGH_DATA ) 
	{
		videoImageContext.drawImage( video, 0, 0 );
		if ( videoTexture ) 
			videoTexture.needsUpdate = true;
	}
		renderer.render( escena, camaraActiva );
	}

	function cargarModelos(){
		for (var i = 0; i < Object.keys(models).length; i++) {
			var modelo = models[Object.keys(models)[i]];
			if("added" in modelo){
				if(!modelo.added && modelo.obj instanceof THREE.Object3D){
					escena.add(modelo.obj);
					modelo.added = true;
				}
			}
		};
	}

	function actualizarEscena(){
	delta = clock.getDelta(); 
	var moveDistance = 10 * delta;
    walking = false;
	//console.log(animation.update());
		vy+=gravity;
		if (inAir){	
			if (vy>10){
				vy=10;
			}
		}
		
		/*******
			Agregar sonido de salto
		*********/
		if(TECLA.ESPACIO && jumping==false){ jump_s.play();
			jump(p1); }

		if (TECLA.IZQUIERDA) {
		    walking = true;
		    pasos.play();
		    p1.rotation.y = izq;
			p1.position.x+=vx;	
			//actluz();
		}
		if (TECLA.DERECHA) {
			 walking = true;
			 pasos.play();
			 p1.rotation.y = der;
			p1.position.x+=vx;
			//actluz();
		}

		if (TECLA.ARRIBA) {
			 walking = true;
			 pasos.play();
            p1.rotation.y = up;
			vx = -2;
			p1.position.z+=vx;	
			//actluz();
		}
		if (TECLA.ABAJO) {
			walking = true;
			pasos.play();
			p1.rotation.y = down;
			vx = 2;
			p1.position.z+=vx;	
			//actluz();
		}	

		//Rotación de la esfera
		if ( TECLA.IZQUIERDA){
			vx = -2;
	        
		
		}
		if ( TECLA.DERECHA ){
			vx = 2;
	        
		}

		

		/*******
			ACTIVIDAD 1: Rotar la esfera conforme al movimiento, observe el ejemplo superior
		********/

	


		//Colisiones					
		var originPoint = p1.position.clone(); //Punto de origen de la colisión
		ray.ray.origin.copy( originPoint ); 
		rayUp.ray.origin.copy( originPoint );
        rayL.ray.origin.copy(originPoint);
        rayD.ray.origin.copy(originPoint);
        rayA.ray.origin.copy(originPoint);
        rayAB.ray.origin.copy(originPoint);



		var intersecciones = rayUp.intersectObjects( collidableMeshList ); //Obtenemos las intersecciones por colisiones en y+ entre los objetos de la lista de colisiones y nuestro personaje.

		if ( intersecciones.length > 0 ) { //Si existen colisiones
			var distance = intersecciones[ 0 ].distance; //distancia entre las intersecciones
			if ( falling == false && distance > 0 && distance <= 6 ) {//Si el jugador no está cayendo y la distancia de la intersección es mayor a 0 y menor o igual a 10 (para que no genere colisiones exageradas se limita a las unidades que en este caso son el tamaño del jugador)
				vy = 0; //Para los que aún no lo notan vy es la velocidad en y que se gana al saltar y se pierde al caer
				falling = true;
				if(intersecciones[0].object.name == "coins"){
					var id_ob = intersecciones[0].object.id;

					box.position.y+=10;
				    coin_b.play();
				    setTimeout ("box.position.y-=10;", 125); 
				    //
			};
			}
		}

		var intersections = ray.intersectObjects( collidableMeshList ); //Obtenemos las intersecciones por colisiones en y- entre los objetos de la lista de colisiones y nuestro personaje.

		if ( intersections.length > 0 ) {
			var distance = intersections[ 0 ].distance;
			if ( distance > 0 && distance > 11 ) {
				console.log(intersections[ 0 ].object.name);
				p1.position.y -= vy;
				inAir = true;
			}else{

				/**
					Colisión evaluada solo si cae sobre el elemento!
					(colisión para plataforma);
				**/
				if(intersections[0].object.name=="tubo"){
				 tubo.play();
                p1.position.set(300,60,-150);
                 setTimeout ("p1.position.y+=20", 125); 
				};
				/*******
					Agregar sonido de Muerte
				*********/
				if(intersections[ 0 ].object.name == "muerte"){
					 muerte.play();
					p1.position.set(0,5,0);
					p1.material.color = new THREE.Color(0xffffff);
				}

				//win
					if(intersections[ 0 ].object.name == "win" ){
					  win.play();	
				
					  setTimeout ("p1.position.set(0,5,0);",5150);
					  setTimeout ("confirm('gano');",5200)
				}
				/*******
					Agregar sonido de powerUp 
				*********/
				if(intersections[ 0 ].object.name == "powerUp"){
					 power.play();
					p1.material.color = new THREE.Color(0x00ff00);
				}

				if(intersections[ 0 ].object.name == "pared1"){
					
					 camaras.fixed.position.set(-210,200,400);
					 camaraActiva = camaras.fixed;
					 camaras.fixed.lookAt(new THREE.Vector3(-220,1,-550));
			
	          
				}

					if(intersections[ 0 ].object.name == "pared0"){
					 camaras.fixed.position.set(-330,100,-640);
					 camaraActiva = camaras.fixed;
					 camaras.fixed.lookAt(new THREE.Vector3(110,20,-640));
				}

                if(intersections[ 0 ].object.name == "pared3"){
					 camaras.fixed.position.set(530,180,-690);
					 camaraActiva = camaras.fixed;
					 camaras.fixed.lookAt(new THREE.Vector3(540,1,500));
				}

				if(intersections[ 0 ].object.name == "pared3_0"){
					 camaras.fixed.position.set(-330,100,-640);
					 camaraActiva = camaras.fixed;
					 camaras.fixed.lookAt(new THREE.Vector3(110,20,-640));
				}

					if(intersections[ 0 ].object.name == "paredini"){
					 camaras.fixed.position.set(-330,100,-640);
					 camaraActiva = camaras.fixed;
					 camaras.fixed.lookAt(new THREE.Vector3(110,20,-640));
				}
                 
                 	if(intersections[ 0 ].object.name == "cuarto1"){
					 camaras.fixed.position.set(380,200,150);
					 camaraActiva = camaras.fixed;
					 camaras.fixed.lookAt(new THREE.Vector3(380,100,350));
				}

					if(intersections[ 0 ].object.name == "cuarto1_0"){
					 camaras.fixed.position.set(-350,200,-100);
					 camaraActiva = camaras.fixed;
					 camaras.fixed.lookAt(new THREE.Vector3(400,10,-200));
				}
                
                	if(intersections[ 0 ].object.name == "cuarto_salida"){
					 if(TECLA.A){
					 opendoor.play();
					 borrar = false;
					   TECLA.A = false;
					   limpiarNivel();
			         nivel1();
			         camaras.fixed.position.set(660,200,150);
					 camaraActiva = camaras.fixed;
					 p1.position.x =  380;
					 p1.position.z = 260;
					 p1.rotation.y = up;
					 camaras.fixed.lookAt(new THREE.Vector3(460,150,150));
			         }
			     }
		             
			

                if(intersections[ 0 ].object.name == "door"){
                     if(TECLA.A){
                      opendoor.play();
                     	 limpiarNivel();
                     TECLA.A = false;
                	 borrar = false;
			         nivel2();
			   
			           }
				}

				if(intersections[ 0 ].object.name == "llave"){
					console.log("encima llave");
                     if(TECLA.A){
                     if(llave == false){
                     console.log("cojio llave");
                     llavesound.play();
			         llave=true;
			         TECLA.A = false;
			     }
			         }
				}
               

                if(intersections[ 0 ].object.name == "ascensor"){
                     if(TECLA.A){
                     	if(llave){
                     	console.log("C3");
                     	asensorsound.play();
                     	 limpiarNivel();
                	 borrar = false;
			         nivel3();
			         TECLA.A = false;
			           }
			           else{
			           	console.log("C1");
			           	puertabloqueada.play();
			           	  TECLA.A = false;
			           }
			       }
				}

				if(intersections[ 0 ].object.name == "pared2"){
					 camaras.fixed.position.set(400,100,150);
					 camaraActiva = camaras.fixed;
					 camaras.fixed.lookAt(new THREE.Vector3(-300,20,150));
				}

					if(intersections[ 0 ].object.name == "pared2_0"){
					 camaras.fixed.position.set(-210,200,400);
					 camaraActiva = camaras.fixed;
					 camaras.fixed.lookAt(new THREE.Vector3(-220,1,-550));
				}
                
                if(intersections[ 0 ].object.name == "pared4"){
					 camaras.fixed.position.set(660,200,150);
					 camaraActiva = camaras.fixed;
					 camaras.fixed.lookAt(new THREE.Vector3(460,150,150));
				}
				if(intersections[ 0 ].object.name == "pared4_0"){
					 camaras.fixed.position.set(530,180,-690);
					 camaraActiva = camaras.fixed;
					 camaras.fixed.lookAt(new THREE.Vector3(540,1,500));
				}

				if(intersections[ 0 ].object.name == "cam3_1"){
					
					camaras.fixed.position.set(1000,175,-625);
					camaraActiva = camaras.fixed;
					camaras.fixed.lookAt(new THREE.Vector3(200,0,-400));
					 
	          
				}
				if(intersections[ 0 ].object.name == "cam3_2"){
					
					camaras.fixed.position.set(-1000,175,-725);
					camaraActiva = camaras.fixed;
					camaras.fixed.lookAt(new THREE.Vector3(-1100,1,200));
					 
	          
				}
				if(intersections[ 0 ].object.name == "cam3_3"){
					
				camaras.fixed.position.set(-1515,175,-100);
				camaraActiva = camaras.fixed;
				camaras.fixed.lookAt(new THREE.Vector3(-700,1,0));
					 
	          
				}
				if(intersections[ 0 ].object.name == "cam3_4"){
					
				camaras.fixed.position.set(-775,175,-125);
				camaraActiva = camaras.fixed;
				camaras.fixed.lookAt(new THREE.Vector3(-800,1,250));
					 
	          
				}
				if(intersections[ 0 ].object.name == "cam3_5"){
					
				camaras.fixed.position.set(-675,175,300);
				camaraActiva = camaras.fixed;
				camaras.fixed.lookAt(new THREE.Vector3(-1300,1,300));
					 
	          
				}
				if(intersections[ 0 ].object.name == "cam3_6"){
					
				camaras.fixed.position.set(-1400,175,250);
				camaraActiva = camaras.fixed;
				camaras.fixed.lookAt(new THREE.Vector3(-1100,1,625));
					 
	          
				}
				if(intersections[ 0 ].object.name == "cam3_7"){
					
				camaras.fixed.position.set(-1450,175,650);
				camaraActiva = camaras.fixed;
				camaras.fixed.lookAt(new THREE.Vector3(-800,1,625));
					 
	          
				}
				if(intersections[ 0 ].object.name == "cam3_8"){
					
				camaras.fixed.position.set(100,175,-625);
				camaraActiva = camaras.fixed;
				camaras.fixed.lookAt(new THREE.Vector3(-950,1,-600));
					 
	          
				}


				if(intersections[ 0 ].object.name == "llegada"){
					
				 //codigo de video de muerte
				 
				 limpiarNivel();
				 borrar = false;
				 limpiarNivel();
                 nivel4();
					 
	          
				}

				if(intersections[ 0 ].object.name == "cam4_1"){
					
				camaras.fixed.position.set(450,175,-850);
				camaraActiva = camaras.fixed;
				camaras.fixed.lookAt(new THREE.Vector3(450,50,0));
			
	          
				}

				if(intersections[ 0 ].object.name == "cam4_2"){
					
				camaras.fixed.position.set(525,175,0);
				camaraActiva = camaras.fixed;
				camaras.fixed.lookAt(new THREE.Vector3(525,0,525));
			
	          
				}
				if(intersections[ 0 ].object.name == "cam4_3"){
					console.log("dd");
				camaras.fixed.position.set(525,175,525);
				camaraActiva = camaras.fixed;
				camaras.fixed.lookAt(new THREE.Vector3(525,0,1000));
			
	          
				}

				if(intersections[ 0 ].object.name == "pasar"){
					if(TECLA.A){
                    opendoor.play();
				  limpiarNivel();
				 borrar = false;
				  limpiarNivel();
				   limpiarNivel();
				 limpiarNivel();
				 camaraActiva = camaras.interactive;
				 TECLA.A = false;
			      }
	          
				}

				if(intersections[ 0 ].object.name == "lava"){
					
                  //codigo de video de muerte
                  console.log("murio");
					 
	          
				}
				//como estoy sobre una plataforma entonces
				//reinicio los estados
				falling = false;
				inAir = false;
				vy=0;
				jumping = false;
			}
		}

		if (inAir == false && distance < 10){ //Corregimos el parkinson del jugador
			p1.position.y+=1;
		}
        

        var intersectionsL =  rayL.intersectObjects( collidableMeshList );
        	if ( intersectionsL.length > 0 ) {
			var distance = intersectionsL[ 0 ].distance;
			if (distance>0 && distance<32) {
					p1.position.x += 2;		
					
				}

		};

		   var intersectionsD =  rayD.intersectObjects( collidableMeshList );
        	if ( intersectionsD.length > 0 ) {	
			var distance = intersectionsD[ 0 ].distance;
			if (distance>0 && distance<32) {
				p1.position.x += -2;
				
			}

		};

		  var intersectionsA =  rayA.intersectObjects( collidableMeshList );
        	if ( intersectionsA.length > 0 ) {

			var distance = intersectionsA[ 0 ].distance;
		
			if (distance>0 && distance<32) {

					p1.position.z += -2;
						
				}

		};

		   var intersectionsAB =  rayAB.intersectObjects( collidableMeshList );
        	if ( intersectionsAB.length > 0 ) {	
			var distance = intersectionsAB[ 0 ].distance;
			if (distance>0 && distance<32) {
				p1.position.z += +2;
				console.log("choco3");	
			}

		};
       stats.update();
	   controlCamara.update();

		/*******
			ACTIVIDAD 2: Mover las plataformas de manera constante entre +/- 50 unidades en Z
		********/
         
//camaras.fixed.lookAt(new THREE.Vector3(p1.position.x,0,p1.position.z));

	}

