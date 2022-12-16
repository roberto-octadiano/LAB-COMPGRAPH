import * as THREE from "./three.js/build/three.module.js"
import {OrbitControls} from "./three.js/examples/jsm/controls/OrbitControls.js"

var scene, renderer, control, mouse
var currentCam, fixedCam, freeCam

// 5.a. Ground Object
function createGround(){
    let groundGeo = new THREE.PlaneGeometry(1000, 1000)
    let groundMat = new THREE.MeshStandardMaterial({
        color: "#8c3b0c"
    })
    let groundMesh = new THREE.Mesh(groundGeo, groundMat)
    groundMesh.position.set(0, -5, 0)
    groundMesh.setRotationFromEuler(-Math.PI/2, 0, 0)
    groundMesh.receiveShadow = true
    scene.add(groundMesh)
}

// 5.b. Hot Air Balloon
function createBalloon(){
    // load model
    // cast and recieve shadow
}

// 4.a. Ambient Light
function createAmbientLight(){
    let light = new THREE.AmbientLight("#404040")
    scene.add(light)
}

// 4.b.c.d. SpotLight
function createSpotLight(intensity, x, y, z, angle){
    let light = new THREE.SpotLight("#FFFFFF", intensity, 300, angle)
    light.position.set(x, y, z)
    light.castShadow = true
    scene.add(light)
}

function init() {
    // 2. Scene
    scene = new THREE.Scene()

    // 3.a. Fixed Camera
    fixedCam = new THREE.PerspectiveCamera(50, window.innerWidth/window.innerHeight, 1, 5000)
    fixedCam.position.set(-180, 30, 0)
    fixedCam.lookAt(0, 30, 0)

    // 3.b. Free Camera
    freeCam = new THREE.PerspectiveCamera(50, window.innerWidth/window.innerHeight, 1, 5000)
    freeCam.position.set(-200, 50, 0)
    freeCam.lookAt(0, 0, 0)
    
    renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.shadowMap.enabled = true
    document.body.appendChild(renderer.domElement)

    control = new OrbitControls(freeCam, renderer.domElement)
    currentCam = fixedCam

    createAmbientLight()
    createSpotLight(1, -100, 0, 100)
    createSpotLight(1, -100, 0, -100)
    createSpotLight(0.5, 0, 200, 0, Math.PI/4 + Math.PI/6)
    createGround()
    createBalloon()
}

function keyboardListener(event){
    if(event.keyCode == 32){
        if(currentCam == fixedCam) currentCam = freeCam;
        else currentCam = fixedCam;
    }
}

function mouseClick(){
    const raycaster = new THREE.Raycaster()
    raycaster.setFromCamera(mouse, camera)
    // const intersects = raycaster.intersectObjects(scene.children)
}

function addListener(){
    document.addEventListener("keydown", keyboardListener)
    // document.addEventListener("click", mouseClick)
}

function render(){
    control.update()
    requestAnimationFrame(render)
    renderer.render(scene, currentCam)
}

window.onload = function () {
    init()
    addListener()
    render()
}