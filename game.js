// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 5, 7); // Set the camera position
camera.rotation.set(-Math.PI / 4, 0, 0); // Set the camera rotation;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// Create directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(0, 5, 7);
scene.add(directionalLight);

//create plane
const brownGeometry = new THREE.PlaneGeometry(100, 100, 1, 1);
const brownMaterial = new THREE.MeshStandardMaterial({ color: 0x8b4513 });
const brownPlane = new THREE.Mesh(brownGeometry, brownMaterial);
brownPlane.position.y = -1;
brownPlane.rotation.x = -Math.PI / 2;
scene.add(brownPlane);

// Create the player sphere
const playerSphere = new THREE.Mesh(
  new THREE.SphereGeometry(1, 15, 15),
  new THREE.MeshBasicMaterial({ color: 0x00bfff })
);
playerSphere.position.set(-5, 0, 0);

scene.add(playerSphere);

// Create the AI sphere
const aiSphere = new THREE.Mesh(
  new THREE.SphereGeometry(1, 15, 15),
  new THREE.MeshBasicMaterial({ color: 0xff0000, transparent: true, opacity: 0 })
);
aiSphere.position.set(5, 0, 0);
scene.add(aiSphere);


// Create the plane
const planeGeometry = new THREE.PlaneGeometry(10, 10, 1, 1);
const planeMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2; // Rotate the plane to be horizontal
scene.add(plane);

// Add event listener to start the game when the button is clicked
const startButton = document.getElementById("start-button");
startButton.addEventListener("click", startGame);

// Add a countdown timer to the top center of the screen
const countdownElement = document.getElementById("countdown");
countdownElement.style.display = "none";

let countdownInterval;

function startGame() {
  // Hide the overlay and show the countdown timer
  const overlayElement = document.getElementById("overlay");
  overlayElement.style.display = "none";
  countdownElement.style.display = "block";


  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);


  // Set up the countdown timer
  let countdown = 5;
  countdownElement.textContent = countdown;

  // Start the countdown timer
  countdownInterval = setInterval(() => {
    countdown--;
    countdownElement.textContent = countdown;

    // Start the game when the countdown reaches 0
    if (countdown === 0) {
      clearInterval(countdownInterval);
      countdownElement.style.display = "none";
      startMovement();
    }
  }, 1000);
}
function startMovement() {
  // Add event listener to move the player sphere with the mouse
  document.addEventListener("mousemove", movePlayer);
  renderer.setAnimationLoop(updateAI);
}

function movePlayer(event) {
  // Map the mouse position to the screen coordinates
  const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
  //const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
  const mouseZ = -(event.clientY / window.innerHeight) * 2 + 1;




  // Set the player sphere's position based on the mouse position
  const playerPosition = new THREE.Vector3(mouseX * 10, 0, -mouseZ * 10);
  playerSphere.position.copy(playerPosition);
}

function updateAI() {
  // Calculate the AI sphere's direction towards the player sphere
  const direction = new THREE.Vector3();
  direction.subVectors(playerSphere.position, aiSphere.position);
  direction.normalize();

  const aiSphereSpeed = 0.05;

  // Move the AI sphere towards the player sphere
  aiSphere.position.add(direction.multiplyScalar(aiSphereSpeed));
  // Check for collision between the spheres
  const distance = playerSphere.position.distanceTo(aiSphere.position);
  if (distance < 2) {
    // Reset the positions of the spheres
    playerSphere.position.set(-5, 0, 0);
    aiSphere.position.set(5, 0, 0);
  }

  // Fade the AI sphere in and out every second
  const opacity = Math.abs(Math.sin(Date.now() / 1000));
  aiSphere.material.opacity = opacity;

  // Render the scene
  renderer.render(scene, camera);
}

// Resize the canvas when the window is resized
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

window.addEventListener("wheel", (event) => {
  const delta = event.deltaY;
  const zoomSpeed = 0.1;
  camera.position.z += delta * zoomSpeed;
});