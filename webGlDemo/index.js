var gl; // WebGL的全局变量

function start() {
    var canvas = document.getElementById("glcanvas");

    // 初始化 WebGL 上下文
    gl = initWebGL(canvas);
    // 只有在 WebGL 可用的时候才继续
    if (gl) {
        gl.viewport(0, 0, canvas.width, canvas.height);
        // 设置清除颜色为黑色，不透明
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        // 开启“深度测试”, Z-缓存
        gl.enable(gl.DEPTH_TEST);
        // 设置深度测试，近的物体遮挡远的物体
        gl.depthFunc(gl.LEQUAL);
        // 清除颜色和深度缓存
        gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
    }
}
function initWebGL(canvas) {
    return canvas.getContext('webgl');
}