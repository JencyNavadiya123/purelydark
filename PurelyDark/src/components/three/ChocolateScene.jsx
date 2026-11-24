import { Suspense, useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Environment, ContactShadows } from "@react-three/drei";

/* ------------------------------------------------------------
   3D floating dark-chocolate composition.
   • Rotating chocolate bar (segmented box)
   • Floating chocolate cubes
   • Slow-rotating cocoa beans (ellipsoids)
   • Mouse-responsive parallax + premium lighting/reflections
   Rendered on a transparent canvas so it layers over video/bg.
   ------------------------------------------------------------ */

const CHOCO = "#2a160f";
const CHOCO_HI = "#3a221a";
const GOLD = "#c69a52";

function ChocolateBar() {
  const group = useRef();
  useFrame((state, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.25;
      group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.08;
    }
  });
  // 4x2 grid of raised squares = chocolate bar
  const squares = useMemo(() => {
    const arr = [];
    for (let x = 0; x < 4; x++)
      for (let z = 0; z < 2; z++)
        arr.push([x * 0.52 - 0.78, 0.12, z * 0.52 - 0.26]);
    return arr;
  }, []);
  return (
    <Float speed={1.4} rotationIntensity={0.3} floatIntensity={0.6}>
      <group ref={group} scale={1.15}>
        {/* base slab */}
        <mesh castShadow receiveShadow position={[0, 0, 0]}>
          <boxGeometry args={[2.25, 0.18, 1.3]} />
          <meshStandardMaterial color={CHOCO} roughness={0.35} metalness={0.15} />
        </mesh>
        {/* raised squares */}
        {squares.map((p, i) => (
          <mesh key={i} castShadow position={p}>
            <boxGeometry args={[0.42, 0.14, 0.42]} />
            <meshStandardMaterial color={CHOCO_HI} roughness={0.3} metalness={0.2} />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

function FloatingCube({ position, scale = 0.3, speed = 1 }) {
  const ref = useRef();
  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * 0.4 * speed;
      ref.current.rotation.y += delta * 0.3 * speed;
    }
  });
  return (
    <Float speed={speed * 1.5} rotationIntensity={0.8} floatIntensity={1.4}>
      <mesh ref={ref} position={position} scale={scale} castShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={CHOCO_HI} roughness={0.25} metalness={0.25} />
      </mesh>
    </Float>
  );
}

function CocoaBean({ position, scale = 0.22 }) {
  const ref = useRef();
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.z += delta * 0.5;
  });
  return (
    <Float speed={1.2} rotationIntensity={1} floatIntensity={1.6}>
      <mesh ref={ref} position={position} scale={[scale, scale * 1.6, scale]} castShadow>
        <sphereGeometry args={[1, 24, 24]} />
        <meshStandardMaterial color="#1c0f0a" roughness={0.5} metalness={0.1} />
      </mesh>
    </Float>
  );
}

function ParallaxRig({ children }) {
  const group = useRef();
  const { pointer } = useThree();
  useFrame(() => {
    if (group.current) {
      group.current.rotation.y += (pointer.x * 0.35 - group.current.rotation.y) * 0.05;
      group.current.rotation.x += (-pointer.y * 0.2 - group.current.rotation.x) * 0.05;
    }
  });
  return <group ref={group}>{children}</group>;
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <spotLight position={[5, 8, 5]} angle={0.4} penumbra={0.8} intensity={2.4} castShadow color="#fff3dd" />
      <pointLight position={[-5, -2, -3]} intensity={1.2} color={GOLD} />
      <ParallaxRig>
        <ChocolateBar />
        <FloatingCube position={[2.4, 1.1, -0.5]} scale={0.34} speed={1.1} />
        <FloatingCube position={[-2.6, -0.8, 0.3]} scale={0.26} speed={0.9} />
        <FloatingCube position={[2.1, -1.3, 0.6]} scale={0.22} speed={1.3} />
        <CocoaBean position={[-2.2, 1.4, 0.2]} />
        <CocoaBean position={[1.6, 1.8, -0.8]} scale={0.18} />
        <CocoaBean position={[-1.4, -1.6, 0.5]} scale={0.2} />
      </ParallaxRig>
      <ContactShadows position={[0, -1.8, 0]} opacity={0.4} scale={10} blur={2.6} far={4} color="#000000" />
      <Environment preset="sunset" />
    </>
  );
}

export default function ChocolateScene({ className = "" }) {
  return (
    <div className={className}>
      <Canvas
        shadows
        dpr={[1, 1.8]}
        camera={{ position: [0, 0, 6], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
