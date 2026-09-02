import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Layers, Box, Sparkles, Navigation, RotateCw, Camera } from 'lucide-react';
import { BorderBeam } from './ui/border-beam';

export type RenderMode = 'solid' | 'wireframe' | 'pointcloud';
export type CameraView = 'iso' | 'top' | 'front';

export const Hero3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [renderMode, setRenderMode] = useState<RenderMode>('solid');
  const [cameraView, setCameraView] = useState<CameraView>('iso');
  const [coords, setCoords] = useState({ x: 412580.45, y: 4521400.12, z: 845.30 });
  const [fps, setFps] = useState(60);
  const [autoRotate, setAutoRotate] = useState(true);
  const autoRotateRef = useRef(autoRotate);

  useEffect(() => {
    autoRotateRef.current = autoRotate;
  }, [autoRotate]);

  const solidMeshesRef = useRef<THREE.Mesh[]>([]);
  const wireMeshesRef = useRef<THREE.LineSegments[]>([]);
  const pointCloudRef = useRef<THREE.Points | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const targetCamPos = useRef<THREE.Vector3>(new THREE.Vector3(14, 11, 16));

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x06080e, 0.032);

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(14, 11, 16);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.appendChild(renderer.domElement);

    const worldGroup = new THREE.Group();
    scene.add(worldGroup);

    const ambientLight = new THREE.AmbientLight(0x1e293b, 2.0);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 2.8);
    mainLight.position.set(18, 28, 16);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 1024;
    mainLight.shadow.mapSize.height = 1024;
    scene.add(mainLight);

    const blueLight = new THREE.PointLight(0x0066ff, 6, 35);
    blueLight.position.set(-10, 14, -10);
    scene.add(blueLight);

    const cyanLight = new THREE.PointLight(0x00d2ff, 5, 30);
    cyanLight.position.set(10, 8, 10);
    scene.add(cyanLight);

    const groundSize = 34;
    const groundSegments = 32;
    const groundGeo = new THREE.PlaneGeometry(groundSize, groundSize, groundSegments, groundSegments);
    groundGeo.rotateX(-Math.PI / 2);

    const pos = groundGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const vx = pos.getX(i);
      const vz = pos.getZ(i);
      const dist = Math.sqrt(vx * vx + vz * vz);
      const elevation = Math.sin(vx * 0.28) * Math.cos(vz * 0.28) * 0.8 - Math.min(dist * 0.05, 0.9);
      pos.setY(i, elevation - 0.2);
    }
    groundGeo.computeVertexNormals();

    const groundSolidMat = new THREE.MeshStandardMaterial({
      color: 0x090f1d,
      roughness: 0.85,
      metalness: 0.3,
      flatShading: true,
    });
    const groundWireMat = new THREE.MeshBasicMaterial({
      color: 0x0066ff,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });

    const groundMesh = new THREE.Mesh(groundGeo, groundSolidMat);
    groundMesh.receiveShadow = true;
    worldGroup.add(groundMesh);

    const groundWire = new THREE.Mesh(groundGeo, groundWireMat);
    groundWire.position.y = 0.01;
    worldGroup.add(groundWire);

    const buildingsGroup = new THREE.Group();
    worldGroup.add(buildingsGroup);

    const buildingData = [
      { x: 0, z: 0, w: 3.2, d: 3.2, h: 10.5, floors: 16, color: 0x0a192f },
      { x: 0, z: 0, w: 2.4, d: 2.4, h: 12.8, floors: 20, color: 0x0052cc },
      { x: 0, z: 0, w: 1.4, d: 1.4, h: 14.5, floors: 24, color: 0x00d2ff },
      { x: -4.2, z: -1.5, w: 2.4, d: 2.6, h: 7.2, floors: 11, color: 0x0e1c36 },
      { x: 4.0, z: -2.2, w: 2.8, d: 2.2, h: 8.0, floors: 12, color: 0x0b172a },
      { x: -2.8, z: 3.5, w: 2.2, d: 3.0, h: 5.6, floors: 8, color: 0x091424 },
      { x: 3.6, z: 3.2, w: 2.4, d: 2.4, h: 6.4, floors: 10, color: 0x0a192f },
      { x: -6.5, z: -4.8, w: 2.6, d: 2.4, h: 4.2, floors: 6, color: 0x08101e },
      { x: 6.2, z: -5.2, w: 2.6, d: 2.2, h: 4.0, floors: 6, color: 0x08101e },
      { x: -6.0, z: 5.2, w: 2.4, d: 2.6, h: 3.8, floors: 5, color: 0x08101e },
      { x: 5.8, z: 5.5, w: 2.2, d: 2.2, h: 4.5, floors: 7, color: 0x08101e },
    ];

    const solidMeshes: THREE.Mesh[] = [];
    const wireMeshes: THREE.LineSegments[] = [];
    const windowPointsList: THREE.Vector3[] = [];

    buildingData.forEach((b) => {
      const geo = new THREE.BoxGeometry(b.w, b.h, b.d);
      geo.translate(0, b.h / 2, 0);

      const mat = new THREE.MeshStandardMaterial({
        color: b.color,
        roughness: 0.2,
        metalness: 0.88,
        transparent: true,
        opacity: 0.94,
      });

      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(b.x, 0, b.z);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      buildingsGroup.add(mesh);
      solidMeshes.push(mesh);

      const edges = new THREE.EdgesGeometry(geo);
      const lineMat = new THREE.LineBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.75,
      });
      const wire = new THREE.LineSegments(edges, lineMat);
      wire.position.set(b.x, 0, b.z);
      buildingsGroup.add(wire);
      wireMeshes.push(wire);

      const floors = b.floors;
      for (let f = 1; f < floors; f++) {
        const fy = (b.h / floors) * f;
        const steps = 6;
        for (let s = 0; s <= steps; s++) {
          const fx = -b.w / 2 + (b.w / steps) * s;
          const fz = -b.d / 2 + (b.d / steps) * s;
          windowPointsList.push(new THREE.Vector3(b.x + fx, fy, b.z - b.d / 2));
          windowPointsList.push(new THREE.Vector3(b.x + fx, fy, b.z + b.d / 2));
          windowPointsList.push(new THREE.Vector3(b.x - b.w / 2, fy, b.z + fz));
          windowPointsList.push(new THREE.Vector3(b.x + b.w / 2, fy, b.z + fz));
        }
      }
    });

    solidMeshesRef.current = solidMeshes;
    wireMeshesRef.current = wireMeshes;

    const pcCount = 2200;
    const pcPositions = new Float32Array(pcCount * 3);
    const pcColors = new Float32Array(pcCount * 3);

    for (let i = 0; i < pcCount; i++) {
      let p: THREE.Vector3;
      if (i < windowPointsList.length && Math.random() > 0.25) {
        p = windowPointsList[i % windowPointsList.length].clone();
        p.x += (Math.random() - 0.5) * 0.12;
        p.y += (Math.random() - 0.5) * 0.12;
        p.z += (Math.random() - 0.5) * 0.12;
      } else {
        p = new THREE.Vector3(
          (Math.random() - 0.5) * 24,
          Math.random() * 14,
          (Math.random() - 0.5) * 24
        );
      }

      pcPositions[i * 3] = p.x;
      pcPositions[i * 3 + 1] = p.y;
      pcPositions[i * 3 + 2] = p.z;

      const ratio = Math.min(Math.max(p.y / 14, 0), 1);
      const c1 = new THREE.Color(0x0066ff);
      const c2 = new THREE.Color(0x00d2ff);
      const c = c1.lerp(c2, ratio);

      pcColors[i * 3] = c.r;
      pcColors[i * 3 + 1] = c.g;
      pcColors[i * 3 + 2] = c.b;
    }

    const pcGeometry = new THREE.BufferGeometry();
    pcGeometry.setAttribute('position', new THREE.BufferAttribute(pcPositions, 3));
    pcGeometry.setAttribute('color', new THREE.BufferAttribute(pcColors, 3));

    const pcMaterial = new THREE.PointsMaterial({
      size: 0.14,
      vertexColors: true,
      transparent: true,
      opacity: 0.88,
      blending: THREE.AdditiveBlending,
    });

    const pointCloud = new THREE.Points(pcGeometry, pcMaterial);
    worldGroup.add(pointCloud);
    pointCloudRef.current = pointCloud;

    const scanPlaneGeo = new THREE.PlaneGeometry(18, 18);
    scanPlaneGeo.rotateX(-Math.PI / 2);
    const scanPlaneMat = new THREE.MeshBasicMaterial({
      color: 0x00d2ff,
      transparent: true,
      opacity: 0.2,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
    });
    const scanPlane = new THREE.Mesh(scanPlaneGeo, scanPlaneMat);
    scanPlane.position.y = 2;
    worldGroup.add(scanPlane);

    const satGroup = new THREE.Group();
    worldGroup.add(satGroup);

    const orbitGeo = new THREE.RingGeometry(12.9, 13.0, 64);
    orbitGeo.rotateX(Math.PI / 3);
    const orbitMat = new THREE.MeshBasicMaterial({
      color: 0x0066ff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.3,
    });
    const orbitMesh = new THREE.Mesh(orbitGeo, orbitMat);
    orbitMesh.position.y = 7;
    satGroup.add(orbitMesh);

    const satNodes: THREE.Mesh[] = [];
    for (let s = 0; s < 4; s++) {
      const nodeGeo = new THREE.SphereGeometry(0.24, 16, 16);
      const nodeMat = new THREE.MeshBasicMaterial({ color: 0x00d2ff });
      const node = new THREE.Mesh(nodeGeo, nodeMat);
      satGroup.add(node);
      satNodes.push(node);
    }

    const lineGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 14.8, 0),
      new THREE.Vector3(8, 12, 4),
    ]);
    const beamMat = new THREE.LineBasicMaterial({
      color: 0x00d2ff,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });
    const satBeam = new THREE.Line(lineGeo, beamMat);
    satGroup.add(satBeam);

    let mouseX = 0;
    let mouseY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;
    let isDragging = false;
    let previousMouseX = 0;
    let previousMouseY = 0;

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      previousMouseX = clientX;
      previousMouseY = clientY;
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      const rect = container.getBoundingClientRect();
      const normX = ((clientX - rect.left) / rect.width) * 2 - 1;
      const normY = -(((clientY - rect.top) / rect.height) * 2 - 1);

      setCoords({
        x: 412580.45 + normX * 142.3,
        y: 4521400.12 + normY * 115.8,
        z: 845.30 + Math.abs(normX * normY) * 18.5,
      });

      if (isDragging) {
        const deltaX = clientX - previousMouseX;
        const deltaY = clientY - previousMouseY;
        targetRotationY += deltaX * 0.008;
        targetRotationX += deltaY * 0.005;
        targetRotationX = Math.max(-0.4, Math.min(0.8, targetRotationX));
        previousMouseX = clientX;
        previousMouseY = clientY;
      } else {
        mouseX = normX * 0.25;
        mouseY = normY * 0.18;
      }
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    container.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);
    container.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    let animationFrameId: number;
    let clock = new THREE.Clock();
    let frameCount = 0;
    let lastTime = performance.now();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      frameCount++;
      const now = performance.now();
      if (now - lastTime >= 1000) {
        setFps(Math.round((frameCount * 1000) / (now - lastTime)));
        frameCount = 0;
        lastTime = now;
      }

      camera.position.lerp(targetCamPos.current, 0.05);
      camera.lookAt(0, 4, 0);

      if (autoRotateRef.current && !isDragging) {
        targetRotationY += 0.003;
      }

      worldGroup.rotation.y += (targetRotationY + mouseX - worldGroup.rotation.y) * 0.05;
      worldGroup.rotation.x += (targetRotationX + mouseY * 0.2 - worldGroup.rotation.x) * 0.05;

      const scanY = Math.sin(elapsedTime * 1.5) * 6.5 + 7.0;
      scanPlane.position.y = scanY;
      scanPlane.rotation.z = Math.sin(elapsedTime * 0.8) * 0.05;

      if (pointCloud.material instanceof THREE.PointsMaterial) {
        pointCloud.material.size = 0.13 + Math.sin(elapsedTime * 3) * 0.03;
      }

      satNodes.forEach((node, idx) => {
        const angle = elapsedTime * 0.6 + (idx * Math.PI) / 2;
        const radius = 11;
        node.position.set(
          Math.cos(angle) * radius,
          7 + Math.sin(angle * 1.5) * 2,
          Math.sin(angle) * radius
        );
      });

      if (satNodes[0]) {
        const p1 = new THREE.Vector3(0, 14.8, 0);
        const p2 = satNodes[0].position.clone();
        satBeam.geometry.setFromPoints([p1, p2]);
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      container.removeEventListener('touchstart', onPointerDown);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);
      window.removeEventListener('resize', handleResize);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  useEffect(() => {
    solidMeshesRef.current.forEach((m) => {
      m.visible = renderMode === 'solid';
    });
    wireMeshesRef.current.forEach((w) => {
      w.visible = renderMode === 'solid' || renderMode === 'wireframe';
    });
    if (pointCloudRef.current) {
      pointCloudRef.current.visible = renderMode === 'solid' || renderMode === 'pointcloud';
    }
  }, [renderMode]);

  useEffect(() => {
    switch (cameraView) {
      case 'iso':
        targetCamPos.current.set(14, 11, 16);
        break;
      case 'top':
        targetCamPos.current.set(0.1, 24, 0.1);
        break;
      case 'front':
        targetCamPos.current.set(0, 6, 20);
        break;
    }
  }, [cameraView]);

  return (
    <div className="relative w-full h-[650px] lg:h-[780px] overflow-hidden rounded-[32px] border border-slate-800/90 bg-[#06080e]/95 shadow-2xl shadow-blue-950/40">
      <BorderBeam colorFrom="#00d2ff" colorTo="#0066ff" />

      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex flex-col gap-2 pointer-events-none z-20">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-950/90 border border-nova-500/40 text-xs font-mono text-cyan-300 backdrop-blur-xl shadow-xl">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span className="font-bold tracking-wider">NOVA ZEN 3D GEOSPATIAL ENGINE</span>
        </div>
        <div className="hidden sm:flex items-center gap-3 text-[11px] font-mono text-slate-300 bg-slate-950/80 px-3.5 py-1.5 rounded-xl border border-slate-800/80 backdrop-blur-md">
          <span>FPS: <strong className="text-emerald-400">{fps}</strong></span>
          <span>•</span>
          <span>Ölçek: <strong>1:100 BIM</strong></span>
          <span>•</span>
          <span>Sensör: <strong>Lidar & RTK</strong></span>
        </div>
      </div>

      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 pointer-events-none z-20">
        <div className="bg-slate-950/90 border border-nova-500/30 rounded-2xl p-3.5 sm:p-4 backdrop-blur-xl text-right shadow-2xl">
          <div className="text-[10px] font-mono uppercase tracking-widest text-nova-400 mb-1 flex items-center justify-end gap-1.5">
            <Navigation className="w-3 h-3 text-cyan-400 animate-spin" style={{ animationDuration: '8s' }} />
            <span>ITRF96 TM 30° (EPSG:5256)</span>
          </div>
          <div className="font-mono text-xs sm:text-sm text-slate-200 space-y-0.5">
            <div><span className="text-slate-500 mr-2">Y (Doğu):</span><span className="text-cyan-300 font-bold">{coords.x.toFixed(2)}</span> m</div>
            <div><span className="text-slate-500 mr-2">X (Kuzey):</span><span className="text-nova-300 font-bold">{coords.y.toFixed(2)}</span> m</div>
            <div><span className="text-slate-500 mr-2">Z (Kot):</span><span className="text-emerald-400 font-bold">+{coords.z.toFixed(2)}</span> m</div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2.5 z-20 w-full px-4 max-w-xl">
        <div className="flex items-center justify-center gap-1.5 p-1.5 rounded-2xl bg-slate-950/90 border border-slate-800 backdrop-blur-2xl shadow-2xl overflow-x-auto max-w-full">
          <button
            type="button"
            onClick={() => setRenderMode('solid')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
              renderMode === 'solid'
                ? 'bg-gradient-to-r from-nova-600 to-cyan-600 text-white shadow-lg shadow-blue-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Box className="w-3.5 h-3.5" />
            <span>BIM Katı Model</span>
          </button>

          <button
            type="button"
            onClick={() => setRenderMode('wireframe')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
              renderMode === 'wireframe'
                ? 'bg-gradient-to-r from-nova-600 to-cyan-600 text-white shadow-lg shadow-blue-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>CAD Tel Kafes</span>
          </button>

          <button
            type="button"
            onClick={() => setRenderMode('pointcloud')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
              renderMode === 'pointcloud'
                ? 'bg-gradient-to-r from-nova-600 to-cyan-600 text-white shadow-lg shadow-blue-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Lazer Nokta Bulutu</span>
          </button>
        </div>

        <div className="flex items-center gap-2 p-1 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] font-mono backdrop-blur-md">
          <span className="text-slate-500 pl-2 flex items-center gap-1">
            <Camera className="w-3 h-3 text-cyan-400" />
            <span>Açı:</span>
          </span>
          {[
            { id: 'iso', label: 'İzometrik' },
            { id: 'top', label: 'Plan/Üst' },
            { id: 'front', label: 'Ön Cephe' },
          ].map((v) => (
            <button
              key={v.id}
              type="button"
              onClick={() => setCameraView(v.id as CameraView)}
              className={`px-2.5 py-1 rounded-lg transition-colors ${
                cameraView === v.id ? 'bg-nova-600/40 text-cyan-300 font-bold border border-cyan-500/40' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {v.label}
            </button>
          ))}

          <span className="text-slate-700">|</span>

          <button
            type="button"
            onClick={() => setAutoRotate(!autoRotate)}
            className={`px-2 py-1 rounded-lg flex items-center gap-1 transition-colors ${
              autoRotate ? 'text-cyan-400' : 'text-slate-500'
            }`}
          >
            <RotateCw className={`w-3 h-3 ${autoRotate ? 'animate-spin' : ''}`} style={{ animationDuration: '6s' }} />
            <span>{autoRotate ? 'Dönüş Açık' : 'Durduruldu'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
