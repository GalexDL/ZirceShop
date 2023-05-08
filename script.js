if (screen.orientation) {
  screen.orientation.lock('landscape');
}

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

const viewer = document.querySelector('model-viewer');

viewer.addEventListener('model-visibility', () => {
  const mesh = viewer.shadowTarget;
  const { vertexShader, fragmentShader } = document.getElementById('outline-vertex-shader').text;
  mesh.material.onBeforeRender = (renderer, scene, camera, geometry, material, group) => {
    material.uniforms = {
      ...material.uniforms,
      edgeColor: { value: new THREE.Color('#000000') },
      thickness: { value: 20.02 }
    };
    material.vertexShader = vertexShader;
    material.fragmentShader = fragmentShader;
    material.needsUpdate = true;
  };
});

