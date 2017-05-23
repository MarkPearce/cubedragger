/**
 * Created by Mark on 5/21/2017.
 */
/**
 * Created by Mark on 5/20/2017.
 */


window.onload = function () {

    var cubeRotation;
    var scene;
    var camera;
    var renderer;
    var containerDiv = document.getElementById('container');

   var WIDTH  = window.innerWidth;
   var HEIGHT = window.innerHeight;

    function initThreeD() {
        scene = new THREE.Scene();
        scene.fog = new THREE.Fog(0x000000, 1.24, 8);
        initCube();
        initGround();
        initLight();
        initCamera();
        initRenderer();

        containerDiv.style.position = "absolute";
        containerDiv.style.left = "0px";
        containerDiv.style.top = "0px";
        containerDiv.style.width = WIDTH.toString() +"px"
        containerDiv.style.height = HEIGHT.toString() +"px"
        document.body.appendChild(containerDiv);
        containerDiv.appendChild(renderer.domElement);
    }

    function initCube() {
        cubeRotation = 0;
        cube = new THREE.Mesh(new THREE.CubeGeometry(1, 1, 1), new THREE.MeshPhongMaterial({color: 0x10a7a7}));
        cube.position.set( 0, .5, 0 );
        cube.rotation.y = THREE.Math.degToRad(0);
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
        renderer.shadowMapEnabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    }

    function render() {
        requestAnimationFrame(render);
        renderer.render(scene, camera);
        cube.rotation.y = THREE.Math.degToRad(cubeRotation);
    }

    initThreeD();
    render();

    ///////////////////////////////// Dragger/////////////////////////////////
    var initialRotation;

    function initDragger (){

        getDOM();

        Draggable.create(sliderDragger, {
            type:'x',
            dragResistance:.65,
            onDragStart:startDrag,
            onDrag:updateRotation,
            onThrowUpdate:updateRotation,
            onThrowComplete:resetDragger,
            throwProps:true
        })
    }

    function resetDragger(){
        TweenMax.set(sliderDragger, {
            x:"0"
        });
    }

    function startDrag(){
        initialRotation = cubeRotation;

    }

    function updateRotation(){
        posX = sliderDragger._gsTransform.x;
        cubeRotation = initialRotation + posX;
    }

    function getDOM(){
        body = document.body;
        sliderDragger = document.getElementById('sliderDragger');
        sliderDragger.style.left = "0px";
        sliderDragger.style.top = "0px";
        sliderDragger.style.width = WIDTH.toString() +"px"
        sliderDragger.style.height = HEIGHT.toString() +"px"
    }

    initDragger();
};
