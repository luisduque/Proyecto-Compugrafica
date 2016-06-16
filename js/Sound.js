var Sound = function( sources, radius, volume, aditionalParams){
	
	var ap = aditionalParams instanceof Object;
	var audio = document.createElement( 'audio' );

	for (var i = 0; i < sources.length; i++) {
		var source = document.createElement('source');
		source.src = sources[i];
		audio.appendChild( source );
	};

	this.position = new THREE.Vector3();

	if(ap){
		if( "wireframe" in aditionalParams ){
			if(aditionalParams.wireframe){
				var malla = new THREE.Mesh(
					new THREE.BoxGeometry(10,10,10),
					new THREE.MeshBasicMaterial( {color:0xFFFFFF, wireframe:true})
				);
				this.mesh = malla;
				if( "scene" in aditionalParams){
					aditionalParams.scene.add(this.mesh);
				}
			}
		}
	}
	
	this.play = function(){
		audio.play();
	}
    
    	this.pause = function(){
		audio.pause();
	}


	this.update = function(element){
		var distance = this.position.distanceTo( element.position );
		if( distance <= radius){
			audio.volume = volume * ( 1 - distance / radius);
			if(ap){
				if("pauseOnBlur" in aditionalParams){
					if(aditionalParams.pauseOnBlur){

						if(audio.paused){
							audio.play();
						}

					}
				}
			}
		} else {
			audio.volume = 0;
			if(ap){
				if("pauseOnBlur" in aditionalParams){
					if(aditionalParams.pauseOnBlur){

						if(!audio.paused){
							audio.pause();
						}		
					}
				}
			}
		}
	}

	this.updatePos = function(element){
		this.position = element.position;
	}

	this.setPos = function(x,y,z){
		this.position.set(x,y,z);
		if("mesh" in this){
			this.mesh.position.set(x,y+6,z);
		}
	}
}