/**
 * Created by Mark on 5/20/2017.
 */

window.onload = function (){
    var initialRotation;

    function initDragger (){

        getDOM();

        Draggable.create(sliderDragger, {
            type:'x',
            onDragStart:startDrag,
            onDrag:updateNullPosition,
            onThrowUpdate:updateNullPosition,
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
        initialRotation = dialContainer._gsTransform.rotation;
    }

    function updateNullPosition(){
        posX = sliderDragger._gsTransform.x;
        TweenMax.set(dialContainer, {
            rotation: initialRotation +posX
        });
    }

    function getDOM(){
        body = document.body;
         container = document.getElementById('container');
         dialContainer = document.getElementById('dialContainer');
         sliderDragger = document.getElementById('sliderDragger');

        TweenMax.set(dialContainer, {
            y:120
        });

    }

    initDragger();

};