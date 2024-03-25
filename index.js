import * as THREE from 'three';


const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild( renderer.domElement );

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 500 );
camera.position.set( 0, 0, 100 );
camera.lookAt( 0, 0, 0 );

const points = [];
points.push( new THREE.Vector3( -10, 0, 0 ) );
points.push( new THREE.Vector3( 0, 10, 0 ) );
points.push( new THREE.Vector3( 10, 0, 0 ) );

const geometry = new THREE.BufferGeometry().setFromPoints( points );

//create a blue LineBasicMaterial
const material = new THREE.LineBasicMaterial( { color: 0x5F8611 } );
const line = new THREE.Line( geometry, material );

scene.add( line );


//agrego la piramide
const conoGeom = new THREE.ConeGeometry(9,20,4);
const mat = new THREE.MeshStandardMaterial({color: 0x47087A});
const cono = new THREE.Mesh(conoGeom,mat);
cono.castShadow = true;
cono.receiveShadow = false;

cono.position.z=15
cono.position.y=20
cono.position.x=24

scene.add(cono)

//agrego el cubo
const BoxGeometry = new THREE.BoxGeometry( 15, 15, 15 ); 
const materi = new THREE.MeshStandardMaterial({color: 0xF80D0D});
const cube = new THREE.Mesh( BoxGeometry, materi );
cube.castShadow = true;
cube.receiveShadow = false;

cube.position.z=20
cube.position.y=-17
cube.position.x=-19

scene.add(cube)

//esfera
const SphereGeometry = new THREE.SphereGeometry( 10, 200, 100 ); 
const materials = new THREE.MeshStandardMaterial( { color: 0x0F08D5 } ); 
const sphere = new THREE.Mesh( SphereGeometry, materials );
sphere.castShadow = true;
sphere.receiveShadow = false; 

sphere.position.z=10
sphere.position.y=0

scene.add( sphere );


//pared
const plano = new THREE.PlaneGeometry( 100, 100 );
const maters = new THREE.MeshStandardMaterial( {color: 0x8D03FD} );
const plane = new THREE.Mesh( plano, maters );
plane.receiveShadow =true;


plane.position.z=0
plane.position.y=0
plane.position.x=0

scene.add( plane );



//suelo
const length = 12, width = 8;

const shape = new THREE.Shape();
shape.moveTo( 0,0 );
shape.lineTo( 200, width );
shape.lineTo( length, width );
shape.lineTo( length, -0 );
shape.lineTo( -10, -1000 );

const extrudeSettings = {
	steps: 2,
	depth: 16,
	bevelEnabled: true,
	bevelThickness: 1,
	bevelSize: 1,
	bevelOffset: 0,
	bevelSegments: 1
};

const geometrys = new THREE.ExtrudeGeometry( shape, extrudeSettings );
const materia = new THREE.MeshStandardMaterial( { color: 0x5BFC0A } );
const mesh = new THREE.Mesh( geometrys, materia ) ;
mesh.receiveShadow = true 

mesh.position.z=-40
mesh.position.y=-10
mesh.position.x=-40

mesh.rotation.y=0.0
mesh.rotation.z=-0.1
mesh.rotation.x=-1

scene.add( mesh );




//movimiento de letras
function animate() {

	requestAnimationFrame( animate );

	sphere.rotation.x += 0.01 ;
	sphere.rotation.y += 0.01 ;


	cono.rotation.y += 0.01 ;
	cono.rotation.z += 0.01 ;


	cube.rotation.x += 0.01 ;
    cube.rotation.y += 0.01 ;

	renderer.render( scene, camera );
 
}

animate();



//luz
//Create a SpotLight and turn on shadows for the light
const light = new THREE.SpotLight( 0xffffff );
light.castShadow = true; // default false
scene.add( light );

light.position.x=0
light.position.z=0
light.position.y=5

//Set up shadow properties for the light
light.shadow.mapSize.width = 512; 
light.shadow.mapSize.height = 512;
light.shadow.camera.near = 0.5;
light.shadow.camera.far = 500;
light.shadow.focus = 1;

scene.add( light )

const helper = new THREE.CameraHelper( light.shadow.camera );
scene.add( helper );


const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
scene.add( directionalLight );

directionalLight.position.z=5
directionalLight.position.y=5


const light2 = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add( light2 );


