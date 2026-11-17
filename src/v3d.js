import {
  WebGLRenderer, Scene, PerspectiveCamera, Shape, ExtrudeGeometry,
  MeshStandardMaterial, Mesh, Group, AmbientLight, DirectionalLight
} from 'three';

const PURPLE = 0xbf00ff;
const DEPTH = 0.42;

// Two bars of the offset "V". Ends are cut horizontally (parallel to the ground).
// Coordinates: x right, y up. Right bar sits slightly lower and to the right.
const LEFT_BAR = [[2.25, -0.80], [2.75, -0.80], [3.87, -2.60], [3.37, -2.60]];
const RIGHT_BAR = [[3.92, -2.82], [4.42, -2.82], [5.54, -1.02], [5.04, -1.02]];
const CX = 3.895, CY = -1.81;

function barMesh(points, material) {
  const s = new Shape();
  points.forEach(([x, y], i) => (i ? s.lineTo(x - CX, y - CY) : s.moveTo(x - CX, y - CY)));
  s.closePath();
  const g = new ExtrudeGeometry(s, { depth: DEPTH, bevelEnabled: false });
  g.translate(0, 0, -DEPTH / 2);
  return new Mesh(g, material);
}

function fallback(canvas) {
  const img = document.createElement('img');
  img.src = new URL('./v.svg', import.meta.url).href;
  img.alt = 'Virtucon Ventures';
  img.className = 'v-fallback';
  canvas.replaceWith(img);
}

export function mountV(canvas) {
  let renderer;
  try {
    renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true });
  } catch (e) {
    fallback(canvas);
    return;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

  const scene = new Scene();
  const camera = new PerspectiveCamera(30, 1, 0.1, 100);
  camera.position.set(0, 6.5, 26.5);
  camera.lookAt(0, 0, 0);

  const material = new MeshStandardMaterial({ color: PURPLE, roughness: 0.42, metalness: 0.05 });
  const v = new Group();
  v.add(barMesh(LEFT_BAR, material));
  v.add(barMesh(RIGHT_BAR, material));
  scene.add(v);

  scene.add(new AmbientLight(0xffffff, 0.55));
  const key = new DirectionalLight(0xffffff, 2.4);
  key.position.set(4, 6, 8);
  scene.add(key);
  const fill = new DirectionalLight(0xffffff, 0.7);
  fill.position.set(-6, -2, 4);
  scene.add(fill);

  function resize() {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    // Keep the V a similar size on narrow (portrait) screens.
    camera.position.z = w / h < 0.8 ? 26.5 * (0.8 / (w / h)) * 0.75 : 26.5;
    camera.updateProjectionMatrix();
  }
  window.addEventListener('resize', resize);
  resize();

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const still = location.hash === '#still';
  const speed = still ? 0 : reduced ? 0.12 : 0.55; // radians per second
  let last = performance.now();
  function frame(now) {
    const dt = Math.min((now - last) / 1000, 0.1);
    last = now;
    v.rotation.y += speed * dt;
    renderer.render(scene, camera);
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

const c = document.getElementById('v');
if (c) mountV(c);
