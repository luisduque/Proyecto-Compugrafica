function textTure(ts,fw,fs,ff,c,t,x,y){

    var canvas = document.createElement('canvas');
    canvas.width = ts; canvas.height = ts;
    var context = canvas.getContext('2d');
    context.font = fw+" "+fs+" "+ff;
    context.fillStyle = "rgba("+c+")";
    context.fillText(t, x, y);
    
    // canvas contents will be used for a texture
    var texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;

    return texture;

}
function actluz(){

 spotLight.position.set(p1.position.x-150,100,p1.position.z+50);
}


function addModelToScene( geometry, materials ) 
{
    // for preparing animation
    for (var i = 0; i < materials.length; i++)
        materials[i].morphTargets = true;
        
    var material = new THREE.MeshFaceMaterial( materials );
    android = new THREE.Mesh( geometry, material );
    android.scale.set(100,100,100);
    android.position.set(150,0,-850);
    android.rotation.y = 3.14;
    p1=android;
    escena.add( android );
}



function render() 
{
    if ( android && walking ) // exists / is loaded 
    {
        // Alternate morph targets
        time = new Date().getTime() % duration;
        keyframe = Math.floor( time / interpolation ) + animOffset;
        if ( keyframe != currentKeyframe ) 
        {
            android.morphTargetInfluences[ lastKeyframe ] = 0;
            android.morphTargetInfluences[ currentKeyframe ] = 1;
            android.morphTargetInfluences[ keyframe ] = 0;
            lastKeyframe = currentKeyframe;
            currentKeyframe = keyframe;
        }
        android.morphTargetInfluences[ keyframe ] = 
            ( time % interpolation ) / interpolation;
        android.morphTargetInfluences[ lastKeyframe ] = 
            1 - android.morphTargetInfluences[ keyframe ];
    }
    
    //renderer.render( escena, camaraActiva );
}

function twoPointsDistance(a,b){//d = b-a
    return new THREE.Vector3(b.x-a.x,b.y-a.y,b.z-a.z);
}
function modulo(a){
    return Math.sqrt( (a.x*a.x) + (a.y*a.y) + (a.z*a.z) );
}
function unitario(a){
    var m = modulo(a);
    return new THREE.Vector3((a.x/m) , (a.y/m) , (a.z/m));
}
function randomHexColor(){
    return '#'+Math.floor(Math.random()*16777215).toString(16);
}
function parsePromtParams(string,flag){
    value = string.split(flag);
    for (var i = 0; i < value.length; i++) {
        if(i != value.length-1) value[i] = parseFloat(value[i]);
    };
    return value;
}

function animate(skinnedMesh) {
    var materials = skinnedMesh.material.materials;
   console.log(skinnedMesh.material.materials);
    for (var k in materials) {
        
        materials[k].skinning = true;
    }
 
    THREE.AnimationHandler.add(skinnedMesh.geometry.animation);
    animation = new THREE.Animation(skinnedMesh, "ArmatureAction", THREE.AnimationHandler.CATMULLROM);
    animation.play();
}




function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}


function onWindowResize(){
    camara.aspect = window.innerWidth / window.innerHeight;
    camara.updateProjectionMatrix();
    renderer.setSize(window.innerWidth,window.innerHeight);
}



function carga(objName,ruta){
    cargador.addObj();
    models[objName] = {obj:null,added:false};
    //console.log(models);
    // texture
    var manager = new THREE.LoadingManager();
    manager.onProgress = function ( item, loaded, total ) {

        console.log( item, loaded, total );

    };

    var onProgress = function ( xhr ) {
        if ( xhr.lengthComputable ) {
            var percentComplete = xhr.loaded / xhr.total * 100;
            console.log( Math.round(percentComplete, 2) + '% downloaded' );
        }
    };

    var onError = function ( xhr ) {
    };

    // model
var jsonLoaders = new THREE.JSONLoader();

   jsonLoaders.load(
    // resource URL
    ruta,
    // Function when resource is loaded
    function ( geometry, materials ) {
        var material = new THREE.MeshFaceMaterial( materials );
        var object = new THREE.Mesh( geometry, material );
        object.position.set(0,0,0);
        object.scale.set(90,90,90);

         if(objName=="corredor"){
        console.log(objName);
        object.position.set(0,80,0);
        object.scale.set(400,400,400);
    };
        escena.add( object );
        models[objName]["obj"] = object; 
        cargador.objReady();
    }, onProgress, onError ); 
}

function cargaf(objName,ruta){
    cargador.addObj();
    models[objName] = {obj:null,added:false};
    //console.log(models);
    // texture
    var manager = new THREE.LoadingManager();
    manager.onProgress = function ( item, loaded, total ) {

        console.log( item, loaded, total );

    };

    var onProgress = function ( xhr ) {
        if ( xhr.lengthComputable ) {
            var percentComplete = xhr.loaded / xhr.total * 100;
            console.log( Math.round(percentComplete, 2) + '% downloaded' );
        }
    };

    var onError = function ( xhr ) {
    };

    // model
var jsonLoaders = new THREE.JSONLoader();

   jsonLoaders.load(
    // resource URL
    ruta,
    // Function when resource is loaded
    function ( geometry, materials ) {
        var material = new THREE.MeshFaceMaterial( materials );
        var object = new THREE.Mesh( geometry, material );
        if(objName=="cuarto"){
        object.position.set(40,0,230);
        object.scale.set(90,90,90);
    };
     if(objName=="pasillo"){
        console.log(objName);
        object.position.set(0,0,0);
            object.scale.set(35,35,35);
    };

       if(objName=="corredorFisicas"){
        console.log(objName);
        object.position.set(0,80,0);
            object.scale.set(400,400,400);
    };

        collidableMeshList.push(object);
        if(objName != "pasillo"){
        for (var i = object.material.materials.length-1; i >=0 ; i--) {
            object.material.materials[i].visible = false;
        };
        };
        escena.add(object);
      
        models[objName]["obj"] = object; 
        cargador.objReady();
    }, onProgress, onError ); 

}



function cargapj(objName,ruta){
    cargador.addObj();
    models[objName] = {obj:null,added:false};
    //console.log(models);
    // texture
    var manager = new THREE.LoadingManager();
    manager.onProgress = function ( item, loaded, total ) {

        console.log( item, loaded, total );

    };

    var onProgress = function ( xhr ) {
        if ( xhr.lengthComputable ) {
            var percentComplete = xhr.loaded / xhr.total * 100;
            console.log( Math.round(percentComplete, 2) + '% downloaded' );
        }
    };

    var onError = function ( xhr ) {
    };

    // model
var jsonLoaders = new THREE.JSONLoader();

   jsonLoaders.load(
    // resource URL
    ruta,
    // Function when resource is loaded
    function ( geometry, materials ) {
       for (var i = 0; i < materials.length; i++)
        materials[i].morphTargets = true;
        
    var material = new THREE.MeshFaceMaterial( materials );
    android = new THREE.Mesh( geometry, material );
    android.scale.set(100,100,100);
    android.position.set(150,0,-850);
    android.rotation.y = 3.14;
    android.name = "permanente";
    p1=android;
    p1.name = "permanente";
    escena.add( android );
          models[objName]["obj"] = android; 
        cargador.objReady();
    }, onProgress, onError ); 
} 


function loadObjMtl(objName,objModel,objMtl,position,scale){
    cargador.addObj();
    models[objName] = {obj:null,added:false};
    // model

    var onProgress = function ( xhr ) {
        if ( xhr.lengthComputable ) {
            var percentComplete = xhr.loaded / xhr.total * 100;
            console.log( Math.round(percentComplete, 2) + '% downloaded' );
        }
    };

    var onError = function ( xhr ) {
        alert("error al cargar: "+xhr);
    };


    THREE.Loader.Handlers.add( /\.dds$/i, new THREE.DDSLoader() );

    var loader = new THREE.OBJMTLLoader();
    loader.load( objModel, objMtl, function ( object ) {

        object.scale.copy(scale);
        object.position.copy(position);
        console.log(object);
        escena.add(object);
        models[objName]["obj"] = object;
        cargador.objReady();

    }, onProgress, onError );

}

/*
jsonLoader.load(
    // resource URL
    'models/hospital/hospital.js',
    // Function when resource is loaded
    function ( geometry, materials ) {
        var material = new THREE.MeshFaceMaterial( materials );
        var object = new THREE.Mesh( geometry, material );
        object.position.set(0,0,0);
        object.scale.set(90,90,90);
        escena.add( object );
    }
    );
*/