/**
 * Created by Mark on 5/20/2017.
 */
window.onload = function () {

    var scene;
    var camera;
    var renderer;
    // var hereCube;


    var WIDTH  = window.innerWidth;
    var HEIGHT = window.innerHeight;

    function init() {
        scene = new THREE.Scene();
        //loadScene();
        initScene();
        initCamera();
        // getCamera();
        initRenderer();
        document.body.appendChild(renderer.domElement);
        // initCube();

    }

    function initScene(){
        initCube();
        //loadObjCube();
        initGround();
        initLight();
        scene.fog = new THREE.Fog(0x000000, 1.24, 8);
        //scene.fog.color.setHSL( 0, 0, 0 );
    }

    function initLight(){
        var spotLight = new THREE.SpotLight( 0xffffff, 1 );
        spotLight.position.set( -1.74, 6.19, 6.65 );
        spotLight.intensity = 1.56;
        spotLight.castShadow = true;
        spotLight.angle = .394;
        spotLight.penumbra = 0.54;
        spotLight.decay = 1;
        spotLight.distance = 0;
        spotLight.shadow.mapSize.width = 1024;
        spotLight.shadow.mapSize.height = 1024;
        spotLight.shadow.camera.near = 1;
        spotLight.shadow.camera.far = 200;
        scene.add(spotLight);

        var ambientLight = new THREE.AmbientLight( 0x12595f );
        ambientLight.intensity = 2.5;
        scene.add(ambientLight)
    }

    function initCamera() {
        camera = new THREE.PerspectiveCamera(50, WIDTH / HEIGHT, 1, 1000);
        camera.position.set(2.5, 1.9, 2.8);
        camera.lookAt(new THREE.Vector3(0,.8,0));
    }

    function initRenderer() {
        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(WIDTH, HEIGHT);
    }

    function render() {
        requestAnimationFrame(render);
        renderer.shadowMapEnabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.render(scene, camera);
        rotateCube();
    }

    function rotateCube() {
        // scene.Scene.rotation.y -= .01;
       // cube.rotation.y -= .01;
    }


    function initCube() {
        cube = new THREE.Mesh(new THREE.CubeGeometry(1, 1, 1), new THREE.MeshPhongMaterial({color: 0x10a7a7}));

        cube.position.set( 0, .5, 0 );
        cube.castShadow = true;
        scene.add(cube);
    }

    function initGround() {
        var geometry = new THREE.PlaneBufferGeometry( 20000, 20000 );
        var material = new THREE.MeshStandardMaterial( );
        material.color.set( 0x3e414a );
        material.roughness =.56;
        material.metalness = .62;
        var ground = new THREE.Mesh( geometry, material );
        ground.position.set( 0, 0, 0 );
        ground.rotation.x = THREE.Math.degToRad(-90);
        ground.rotation.z = THREE.Math.degToRad(0);
        ground.rotation.y = THREE.Math.degToRad(0);
        ground.receiveShadow = true;
        scene.add( ground );
    }

   /* function loadObjCube(){
        // instantiate the loader
        var loader = new THREE.OBJLoader2();

        // function called on successful load
        var intergrateIntoScene = function ( object ) {
            object.material = new THREE.MeshPhongMaterial({color: 0x10a7a7}));
            scene.add( object );
            console.log("worked?")
        };

        // load a resource from provided URL
        loader.load( 'hereCube.obj', intergrateIntoScene );
    }*/

    function loadScene(){
        var loader = new THREE.ObjectLoader();
        loader.load(
            'hereCube.json',
            function (geometry) {
                scene.add(geometry);
            }
        );
    }

    init();
    render();
}
