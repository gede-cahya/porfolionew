import { Canvas } from '@react-three/fiber';
import { Float, PerspectiveCamera, OrbitControls, ContactShadows, Environment, Sphere, Torus, Cone } from '@react-three/drei';
import { Suspense } from 'react';

const GeometricShape = ({ position, color, rotation, type = "box", scale = 1 }) => {
    return (
        <Float speed={2} rotationIntensity={1.5} floatIntensity={2} floatingRange={[-0.5, 0.5]}>
            <mesh position={position} rotation={rotation} scale={scale}>
                {type === "box" && <boxGeometry args={[1, 1, 1]} />}
                {type === "sphere" && <sphereGeometry args={[0.7, 32, 32]} />}
                {type === "torus" && <torusGeometry args={[0.6, 0.2, 16, 32]} />}
                {type === "cone" && <coneGeometry args={[0.7, 1.5, 32]} />}

                <meshStandardMaterial
                    color={color}
                    roughness={0.2}
                    metalness={0.8}
                    emissive={color}
                    emissiveIntensity={0.6}
                />
            </mesh>
        </Float>
    );
};

const Scene = () => {
    return (
        <>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1.5} color="#fff" />
            <pointLight position={[-10, -5, -10]} intensity={2} color="#a855f7" />

            {/* Center Cluster */}
            <GeometricShape position={[0, 0, 0]} color="#8b5cf6" rotation={[0.5, 0.5, 0]} scale={1.8} type="box" />

            {/* Satellites */}
            <GeometricShape position={[-2.5, 1.5, -1]} color="#06b6d4" rotation={[1, 0, 1]} scale={0.8} type="sphere" />
            <GeometricShape position={[2.5, -1.2, 1]} color="#ec4899" rotation={[0, 1, 0.5]} scale={0.9} type="cone" />
            <GeometricShape position={[-1.5, -2.5, 1]} color="#6366f1" rotation={[0.5, 0, 0]} scale={0.7} type="box" />
            <GeometricShape position={[2, 2.5, -1.5]} color="#a855f7" rotation={[0, 0.5, 1]} scale={1.2} type="torus" />

            {/* Tiny particles */}
            <GeometricShape position={[1, -1, 2]} color="#fff" rotation={[0, 0, 0]} scale={0.2} type="box" />
            <GeometricShape position={[-1.5, 2, 2]} color="#fff" rotation={[0, 0, 0]} scale={0.15} type="sphere" />

            <ContactShadows position={[0, -4, 0]} opacity={0.4} scale={15} blur={3} far={4.5} color="#581c87" />
        </>
    );
};

const Hero3D = () => {
    return (
        <div className="w-full h-[500px] md:h-[600px] cursor-grab active:cursor-grabbing">
            <Canvas>
                <Suspense fallback={null}>
                    <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />
                    <OrbitControls
                        enableZoom={false}
                        autoRotate
                        autoRotateSpeed={1.5}
                        minPolarAngle={Math.PI / 4}
                        maxPolarAngle={Math.PI / 1.5}
                    />
                    <Scene />
                </Suspense>
            </Canvas>
        </div>
    );
};

export default Hero3D;
