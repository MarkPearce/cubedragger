/**
 * Created by Mark on 5/20/2017.
 */
window.onload = function () {

    var scene;
    var camera;
    var renderer;
    var hereCube;


    var WIDTH  = window.innerWidth;
    var HEIGHT = window.innerHeight;

    function init() {
        scene = new THREE.Scene();
        loadScene();
        initScene();
        initCamera();
        // getCamera();
        initRenderer();
        document.body.appendChild(renderer.domElement);
        // initCube();

    }

    function initScene(){
        scene.fog = new THREE.Fog(0x000000, 2, 10);
        scene.fog.color.setHSL( 0, 0, 0 );
        // var temp =  scene.getObjectByName("Scene");
        // console.log(scene)
        // debugger;
    }

    function initCamera() {
        camera = new THREE.PerspectiveCamera(50, WIDTH / HEIGHT, 1, 1000);
        camera.position.set(2.5, 1.9, 2.8);
        //camera.lookAt(scene.position);
        camera.lookAt(new THREE.Vector3(0,.8,0));
        //  var fog= new THREE.Fog( #000000, 1, 1000 )
    }
    /*
     function getCamera() {
     var cameraObj = scene.getObjectByName( "hereCamera" );
     console.log(cameraObj)
     debugger;
     }
     */
    function initRenderer() {
        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(WIDTH, HEIGHT);
    }

    function render() {
        requestAnimationFrame(render);
        renderer.shadowMapEnabled = true;
        //light.shadowDarkness = 0.5;
        renderer.render(scene, camera);
        rotateCube();
        //hereCube.
    }

    function rotateCube() {
        // scene.Scene.rotation.y -= .01;
    }

    /*
     function initCube() {
     cube = new THREE.Mesh(new THREE.CubeGeometry(2, 2, 2), new THREE.MeshNormalMaterial());
     scene.add(cube);
     }
     */

    /*    function loadScene(){
     var loader = new THREE.ObjectLoader();
     loader.load(
     'hereCube.json',
     function (geometry) {
     scene.add(geometry);
     }
     );
     }*/
    function loadScene(){
        var loader = new THREE.ObjectLoader
        loader.load(
            'hereCube.json',
            function ( loadedScene ) {
                scene = loadedScene;
                // If the loaded file contains a perspective camera, use it with adjusted aspect ratio...
               /* scene.traverse(function (sceneChild) {
                    if (sceneChild.type === 'PerspectiveCamera') {
                        camera = sceneChild;
                        camera.aspect = WIDTH / HEIGHT;
                        camera.updateProjectionMatrix();
                    }
                });*/
            }
        );
        console.log(scene.children);

    };



        init();
        render();
    }
