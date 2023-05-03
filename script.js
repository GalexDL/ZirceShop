
var menuButton = document.getElementById("menuButton");
var mainMenu = document.getElementById("mainMenu");

menuButton.addEventListener("click", function() {
  mainMenu.classList.toggle("open");
});

var composer = new THREE.EffectComposer(renderer);

var renderPass = new THREE.RenderPass(scene, camera);
composer.addPass(renderPass);

var edgeDetectionPass = new THREE.ShaderPass(THREE.EdgeShader2);
edgeDetectionPass.uniforms.uNormals.value = 1;
composer.addPass(edgeDetectionPass);

var outlinePass = new THREE.ShaderPass(THREE.OutlineShader);
outlinePass.uniforms.uEdgeThickness.value = 0.1;
outlinePass.uniforms.uEdgeColor.value.set(0xff0000);
outlinePass.renderToScreen = true;
composer.addPass(outlinePass);
