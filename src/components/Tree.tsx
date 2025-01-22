import { useFBX, useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { Mesh } from 'three';

export default function Tree() {
	const fbx = useFBX('/models/tree-poplar-dead-a.fbx');
	const colorMap = useTexture('/textures/atlas-universal-albedo-a.png');
	const treeRef = useRef<Mesh>(null!);
	useFrame(() => {
		if (!treeRef.current) return;
		treeRef.current.rotation.y += 0.01;
	})

	return (
		<mesh ref={treeRef} position={[0, 0, 0]}>
			<primitive object={fbx} />
			<meshStandardMaterial map={colorMap} />
		</mesh>
	)
}