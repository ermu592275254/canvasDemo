/*
 场景是一个空间、照相机是一个视角、渲染器是一个屏幕
 初始化*/
var scene = new THREE.Scene(); // 场景
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000); // 照相机
var renderer = new THREE.WebGLRenderer(); // 渲染器
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let cubeArr = [];
for(var i =0; i<10 ;i++ ) {
    cubeArr.push(new THREE.Mesh(new THREE.CubeGeometry(1, 1, 1), new THREE.MeshBasicMaterial({color: 0x0000ff})))
}
cubeArr.forEach((item)=>{
    let arr = ['x','y'];
    item.position[arr[Math.floor(Math.random()*arr.length)]] = (Math.random()>0.5?-1:1)*Math.random()*5;
    item.position[arr[Math.floor(Math.random()*arr.length)]] = (Math.random()>0.5?-1:1)*Math.random()*5;
    scene.add(item);
});
camera.position.z = 5; // 相机定位
function render() {
    requestAnimationFrame(render); // 循环必要
    cubeArr.forEach((item)=>{
        let arr = ['x','y','z'];
        // item.position[arr[Math.floor(Math.random()*arr.length)]] += 0.01;
        // item.rotation[arr[Math.floor(Math.random()*arr.length)]] += 0.01;
    });
    renderer.render(scene, camera);
}
render();
