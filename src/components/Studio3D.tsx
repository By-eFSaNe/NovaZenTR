import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Layers, Ruler, Building, ShieldCheck, ArrowRight, Grid, Sliders, Box, Mountain, Landmark, Sparkles, CheckCircle2 } from 'lucide-react';
import { CONTACT_INFO } from '../data/engineeringData';
import { AnimatedTabs } from './ui/animated-tabs';

export type StudioModelType = 'building' | 'terrain' | 'heritage';

interface FloorDetail {
  floor: number;
  name: string;
  type: string;
  colorHex: string;
  colorThree: number;
  units: string[];
  grossArea: string;
  netArea: string;
  elevation: string;
  status: string;
}

const FLOOR_DETAILS: FloorDetail[] = [
  {
    floor: 0,
    name: 'Zemin Kat (Dükkan & Giriş)',
    type: 'Ticari / Bağımsız Bölüm',
    colorHex: '#f59e0b',
    colorThree: 0xf59e0b,
    units: ['BB 1: Cadde Mağazası (220 m²)', 'BB 2: Eczane / Ofis (170 m²)'],
    grossArea: '450.00 m²',
    netArea: '390.00 m²',
    elevation: '±0.00 m',
    status: 'TKGM 3B-SYM Tescile Uygun',
  },
  {
    floor: 1,
    name: '1. Normal Kat',
    type: 'Konut / 3 Bağımsız Bölüm',
    colorHex: '#0ea5e9',
    colorThree: 0x0ea5e9,
    units: ['BB 3: 3+1 Daire (145 m²)', 'BB 4: 2+1 Daire (115 m²)', 'BB 5: 2+1 Daire (120 m²)'],
    grossArea: '450.00 m²',
    netArea: '380.00 m²',
    elevation: '+3.20 m',
    status: 'Kat İrtifakı Tescilli',
  },
  {
    floor: 2,
    name: '2. Normal Kat',
    type: 'Konut / 3 Bağımsız Bölüm',
    colorHex: '#06b6d4',
    colorThree: 0x06b6d4,
    units: ['BB 6: 3+1 Daire (145 m²)', 'BB 7: 2+1 Daire (115 m²)', 'BB 8: 2+1 Daire (120 m²)'],
    grossArea: '450.00 m²',
    netArea: '380.00 m²',
    elevation: '+6.40 m',
    status: 'Kat İrtifakı Tescilli',
  },
  {
    floor: 3,
    name: '3. Normal Kat',
    type: 'Konut / 3 Bağımsız Bölüm',
    colorHex: '#3b82f6',
    colorThree: 0x3b82f6,
    units: ['BB 9: 3+1 Daire (145 m²)', 'BB 10: 2+1 Daire (115 m²)', 'BB 11: 2+1 Daire (120 m²)'],
    grossArea: '450.00 m²',
    netArea: '380.00 m²',
    elevation: '+9.60 m',
    status: 'Kat İrtifakı Tescilli',
  },
  {
    floor: 4,
    name: '4. Normal Kat',
    type: 'Konut / 3 Bağımsız Bölüm',
    colorHex: '#6366f1',
    colorThree: 0x6366f1,
    units: ['BB 12: 3+1 Daire (145 m²)', 'BB 13: 2+1 Daire (115 m²)', 'BB 14: 2+1 Daire (120 m²)'],
    grossArea: '450.00 m²',
    netArea: '380.00 m²',
    elevation: '+12.80 m',
    status: 'Kat İrtifakı Tescilli',
  },
  {
    floor: 5,
    name: '5. Kat / Çatı Dubleks',
    type: 'Lüks Konut / 2 Çatı Dubleksi',
    colorHex: '#8b5cf6',
    colorThree: 0x8b5cf6,
    units: ['BB 15: 4+1 Çatı Dubleksi (215 m²)', 'BB 16: 4+1 Çatı Dubleksi (205 m²)'],
    grossArea: '450.00 m²',
    netArea: '420.00 m²',
    elevation: '+16.00 m',
    status: 'TKGM 3B-SYM Tescile Uygun',
  },
  {
    floor: 6,
    name: 'Çatı Terası & Makine Dairesi',
    type: 'Ortak Alan (Müşterek Tesisat)',
    colorHex: '#10b981',
    colorThree: 0x10b981,
    units: ['Asansör Kule Odası', 'Güneş Paneli & Havalandırma Şaftı'],
    grossArea: '120.00 m²',
    netArea: '95.00 m²',
    elevation: '+18.70 m',
    status: 'Ortak Mülkiyet Alanı',
  },
];

export const Studio3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [modelType, setModelType] = useState<StudioModelType>('building');
  const [explodedView, setExplodedView] = useState(false);
  const [showDimensions, setShowDimensions] = useState(true);
  const [showColumns, setShowColumns] = useState(true);
  const [showParcel, setShowParcel] = useState(true);
  const [symMode, setSymMode] = useState(true);
  const [selectedFloor, setSelectedFloor] = useState<number>(0);
  const [floorSlicer, setFloorSlicer] = useState(6);

  const rootGroupRef = useRef<THREE.Group | null>(null);
  const buildingGroupRef = useRef<THREE.Group | null>(null);
  const terrainGroupRef = useRef<THREE.Group | null>(null);
  const heritageGroupRef = useRef<THREE.Group | null>(null);
  const floorGroupsRef = useRef<THREE.Group[]>([]);
  const floorGlassMeshesRef = useRef<THREE.Mesh[]>([]);
  const dimLinesRef = useRef<THREE.Group | null>(null);
  const columnsGroupRef = useRef<THREE.Group | null>(null);
  const parcelLineRef = useRef<THREE.LineSegments | null>(null);
  const pillarsGroupRef = useRef<THREE.Group | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const container = mountRef.current;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x070b14);

    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.set(15, 12, 16);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.appendChild(renderer.domElement);

    const ambLight = new THREE.AmbientLight(0x2d3748, 2.2);
    scene.add(ambLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 2.5);
    dirLight1.position.set(16, 24, 12);
    dirLight1.castShadow = true;
    scene.add(dirLight1);

    const blueLight = new THREE.PointLight(0x0066ff, 6, 35);
    blueLight.position.set(-12, 10, -12);
    scene.add(blueLight);

    const cyanLight = new THREE.PointLight(0x00d2ff, 5, 30);
    cyanLight.position.set(12, 14, 12);
    scene.add(cyanLight);

    const rootGroup = new THREE.Group();
    scene.add(rootGroup);
    rootGroupRef.current = rootGroup;

    // Coordinate grid floor
    const gridHelper = new THREE.GridHelper(26, 26, 0x0066ff, 0x1e293b);
    gridHelper.position.y = -0.01;
    rootGroup.add(gridHelper);

    // Cadastral Parcel boundary polygon
    const parcelGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-6.5, 0.05, -6.5),
      new THREE.Vector3(6.5, 0.05, -6.5),
      new THREE.Vector3(6.5, 0.05, 6.5),
      new THREE.Vector3(-6.5, 0.05, 6.5),
      new THREE.Vector3(-6.5, 0.05, -6.5),
    ]);
    const parcelMat = new THREE.LineBasicMaterial({ color: 0x00d2ff, linewidth: 2 });
    const parcelLine = new THREE.LineSegments(parcelGeo, parcelMat);
    rootGroup.add(parcelLine);
    parcelLineRef.current = parcelLine;

    // Cadastral Corner Benchmark Pillars (P1, P2, P3, P4)
    const pillarsGroup = new THREE.Group();
    rootGroup.add(pillarsGroup);
    pillarsGroupRef.current = pillarsGroup;

    const cornerCoords = [
      [-6.5, -6.5],
      [6.5, -6.5],
      [6.5, 6.5],
      [-6.5, 6.5],
    ];

    cornerCoords.forEach(([px, pz]) => {
      const pillarGeo = new THREE.CylinderGeometry(0.12, 0.16, 0.45, 16);
      const pillarMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, metalness: 0.9, roughness: 0.2 });
      const pillar = new THREE.Mesh(pillarGeo, pillarMat);
      pillar.position.set(px, 0.22, pz);
      pillarsGroup.add(pillar);

      const topPointGeo = new THREE.SphereGeometry(0.1, 16, 16);
      const topPointMat = new THREE.MeshBasicMaterial({ color: 0x00d2ff });
      const topPoint = new THREE.Mesh(topPointGeo, topPointMat);
      topPoint.position.set(px, 0.48, pz);
      pillarsGroup.add(topPoint);
    });

    // Building Group
    const buildingGroup = new THREE.Group();
    rootGroup.add(buildingGroup);
    buildingGroupRef.current = buildingGroup;

    const floorsCount = 6;
    const floorHeight = 1.35;
    const bWidth = 6.8;
    const bDepth = 5.4;
    const floorGroups: THREE.Group[] = [];
    const floorGlassMeshes: THREE.Mesh[] = [];

    const columnsGroup = new THREE.Group();
    buildingGroup.add(columnsGroup);
    columnsGroupRef.current = columnsGroup;

    for (let i = 0; i < floorsCount; i++) {
      const fg = new THREE.Group();
      fg.position.y = i * floorHeight;

      // Concrete Floor Slab
      const slabGeo = new THREE.BoxGeometry(bWidth, 0.22, bDepth);
      const slabMat = new THREE.MeshStandardMaterial({
        color: i === 0 ? 0x1e293b : 0x0e1726,
        roughness: 0.3,
        metalness: 0.8,
      });
      const slab = new THREE.Mesh(slabGeo, slabMat);
      slab.position.y = 0.11;
      slab.castShadow = true;
      slab.receiveShadow = true;
      fg.add(slab);

      // Glass / Unit Volume
      const glassGeo = new THREE.BoxGeometry(bWidth - 0.25, floorHeight - 0.28, bDepth - 0.25);
      const initialColor = FLOOR_DETAILS[i].colorThree;
      const glassMat = new THREE.MeshStandardMaterial({
        color: initialColor,
        transparent: true,
        opacity: 0.65,
        roughness: 0.15,
        metalness: 0.85,
      });
      const glass = new THREE.Mesh(glassGeo, glassMat);
      glass.position.y = floorHeight / 2;
      fg.add(glass);
      floorGlassMeshes.push(glass);

      // Wireframe Edges
      const edgeGeo = new THREE.EdgesGeometry(glassGeo);
      const edgeMat = new THREE.LineBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.85 });
      const edges = new THREE.LineSegments(edgeGeo, edgeMat);
      edges.position.y = floorHeight / 2;
      fg.add(edges);

      // Structural Concrete Columns
      const colGeo = new THREE.BoxGeometry(0.35, floorHeight, 0.35);
      const colMat = new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.8, roughness: 0.2 });
      const colOffsets = [
        [-bWidth / 2 + 0.45, -bDepth / 2 + 0.45],
        [bWidth / 2 - 0.45, -bDepth / 2 + 0.45],
        [-bWidth / 2 + 0.45, bDepth / 2 - 0.45],
        [bWidth / 2 - 0.45, bDepth / 2 - 0.45],
        [0, 0],
      ];
      colOffsets.forEach(([cx, cz]) => {
        const col = new THREE.Mesh(colGeo, colMat);
        col.position.set(cx, floorHeight / 2, cz);
        col.castShadow = true;
        columnsGroup.add(col);
      });

      buildingGroup.add(fg);
      floorGroups.push(fg);
    }
    floorGroupsRef.current = floorGroups;
    floorGlassMeshesRef.current = floorGlassMeshes;

    // Roof & Elevator Core Group
    const roofGroup = new THREE.Group();
    roofGroup.position.y = floorsCount * floorHeight;
    const roofCoreGeo = new THREE.BoxGeometry(3.0, 1.1, 2.4);
    const roofCoreMat = new THREE.MeshStandardMaterial({ color: 0x0052cc, metalness: 0.9, roughness: 0.2 });
    const roofCore = new THREE.Mesh(roofCoreGeo, roofCoreMat);
    roofCore.position.y = 0.55;
    roofGroup.add(roofCore);
    buildingGroup.add(roofGroup);
    floorGroups.push(roofGroup);

    // Dimension Lines
    const dimGroup = new THREE.Group();
    const lineXGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-bWidth / 2, 0.15, bDepth / 2 + 1.2),
      new THREE.Vector3(bWidth / 2, 0.15, bDepth / 2 + 1.2),
    ]);
    const dimMat = new THREE.LineBasicMaterial({ color: 0x00d2ff });
    const lineX = new THREE.Line(lineXGeo, dimMat);
    dimGroup.add(lineX);

    const lineZGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(bWidth / 2 + 1.2, 0.15, -bDepth / 2),
      new THREE.Vector3(bWidth / 2 + 1.2, 0.15, bDepth / 2),
    ]);
    const lineZ = new THREE.Line(lineZGeo, dimMat);
    dimGroup.add(lineZ);

    buildingGroup.add(dimGroup);
    dimLinesRef.current = dimGroup;

    // Terrain Group (DEM)
    const terrainGroup = new THREE.Group();
    terrainGroup.visible = false;
    rootGroup.add(terrainGroup);
    terrainGroupRef.current = terrainGroup;

    const tGeo = new THREE.PlaneGeometry(16, 16, 36, 36);
    tGeo.rotateX(-Math.PI / 2);
    const tPos = tGeo.attributes.position;
    for (let i = 0; i < tPos.count; i++) {
      const tx = tPos.getX(i);
      const tz = tPos.getZ(i);
      const h = Math.sin(tx * 0.4) * Math.cos(tz * 0.4) * 2.5 + Math.sin(tx * 0.8) * 0.8;
      tPos.setY(i, h);
    }
    tGeo.computeVertexNormals();

    const tMat = new THREE.MeshStandardMaterial({
      color: 0x0e244d,
      roughness: 0.6,
      metalness: 0.4,
      flatShading: true,
    });
    const tMesh = new THREE.Mesh(tGeo, tMat);
    terrainGroup.add(tMesh);

    const tWireMat = new THREE.MeshBasicMaterial({ color: 0x00d2ff, wireframe: true, transparent: true, opacity: 0.4 });
    const tWire = new THREE.Mesh(tGeo, tWireMat);
    tWire.position.y = 0.02;
    terrainGroup.add(tWire);

    // Heritage Point Cloud
    const heritageGroup = new THREE.Group();
    heritageGroup.visible = false;
    rootGroup.add(heritageGroup);
    heritageGroupRef.current = heritageGroup;

    const hCount = 3500;
    const hPositions = new Float32Array(hCount * 3);
    const hColors = new Float32Array(hCount * 3);

    for (let i = 0; i < hCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = Math.cbrt(Math.random()) * 3.5;

      const hx = r * Math.sin(phi) * Math.cos(theta);
      const hy = Math.abs(r * Math.cos(phi)) * 1.8 + 0.2;
      const hz = r * Math.sin(phi) * Math.sin(theta);

      hPositions[i * 3] = hx;
      hPositions[i * 3 + 1] = hy;
      hPositions[i * 3 + 2] = hz;

      const c = new THREE.Color(0x00d2ff).lerp(new THREE.Color(0xffaa00), hy / 6);
      hColors[i * 3] = c.r;
      hColors[i * 3 + 1] = c.g;
      hColors[i * 3 + 2] = c.b;
    }

    const hGeo = new THREE.BufferGeometry();
    hGeo.setAttribute('position', new THREE.BufferAttribute(hPositions, 3));
    hGeo.setAttribute('color', new THREE.BufferAttribute(hColors, 3));
    const hMat = new THREE.PointsMaterial({ size: 0.16, vertexColors: true, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending });
    const hPoints = new THREE.Points(hGeo, hMat);
    heritageGroup.add(hPoints);

    let isDragging = false;
    let prevX = 0;
    let prevY = 0;
    let rotY = 0.5;
    let rotX = 0.25;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevX = e.clientX;
      prevY = e.clientY;
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - prevX;
      const dy = e.clientY - prevY;
      rotY += dx * 0.008;
      rotX += dy * 0.006;
      rotX = Math.max(-0.2, Math.min(0.9, rotX));
      prevX = e.clientX;
      prevY = e.clientY;
    };
    const onMouseUp = () => {
      isDragging = false;
    };

    container.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        prevX = e.touches[0].clientX;
        prevY = e.touches[0].clientY;
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1) return;
      const dx = e.touches[0].clientX - prevX;
      const dy = e.touches[0].clientY - prevY;
      rotY += dx * 0.008;
      rotX += dy * 0.006;
      rotX = Math.max(-0.2, Math.min(0.9, rotX));
      prevX = e.touches[0].clientX;
      prevY = e.touches[0].clientY;
    };
    const onTouchEnd = () => {
      isDragging = false;
    };

    container.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    const onResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', onResize);

    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      if (!isDragging) {
        rotY += 0.002;
      }

      rootGroup.rotation.y += (rotY - rootGroup.rotation.y) * 0.08;
      rootGroup.rotation.x += (rotX - rootGroup.rotation.x) * 0.08;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('resize', onResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Update visibility on modelType change
  useEffect(() => {
    if (buildingGroupRef.current) buildingGroupRef.current.visible = modelType === 'building';
    if (terrainGroupRef.current) terrainGroupRef.current.visible = modelType === 'terrain';
    if (heritageGroupRef.current) heritageGroupRef.current.visible = modelType === 'heritage';
    if (pillarsGroupRef.current) pillarsGroupRef.current.visible = modelType === 'building';
  }, [modelType]);

  // Update exploded view and floor slicing
  useEffect(() => {
    const floorHeight = 1.35;
    floorGroupsRef.current.forEach((group, idx) => {
      group.visible = idx <= floorSlicer;
      const targetY = explodedView ? idx * (floorHeight + 0.95) : idx * floorHeight;
      group.position.y = targetY;
    });
  }, [explodedView, floorSlicer]);

  // Update materials when symMode or selectedFloor changes
  useEffect(() => {
    floorGlassMeshesRef.current.forEach((mesh, idx) => {
      const mat = mesh.material as THREE.MeshStandardMaterial;
      if (!mat) return;

      if (symMode) {
        const floorColor = FLOOR_DETAILS[idx]?.colorThree || 0x0066ff;
        mat.color.setHex(floorColor);
        if (selectedFloor === idx) {
          mat.opacity = 0.92;
          mat.roughness = 0.05;
        } else {
          mat.opacity = 0.65;
          mat.roughness = 0.15;
        }
      } else {
        // Standard single architectural cyan/blue
        mat.color.setHex(0x0066ff);
        mat.opacity = selectedFloor === idx ? 0.9 : 0.55;
      }
    });
  }, [symMode, selectedFloor]);

  // Update layer visibility
  useEffect(() => {
    if (parcelLineRef.current) parcelLineRef.current.visible = showParcel;
    if (pillarsGroupRef.current) pillarsGroupRef.current.visible = showParcel;
    if (dimLinesRef.current) dimLinesRef.current.visible = showDimensions;
    if (columnsGroupRef.current) columnsGroupRef.current.visible = showColumns;
  }, [showParcel, showDimensions, showColumns]);

  const activeFloorDetail = FLOOR_DETAILS[selectedFloor] || FLOOR_DETAILS[0];

  return (
    <div id="studyo" className="w-full bg-[#080d1a] border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
      {/* Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-8 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-nova-900/60 border border-nova-500/40 text-xs font-mono text-cyan-400 mb-3">
            <Building className="w-3.5 h-3.5" />
            <span>21ST.DEV İNTERAKTİF 3B MÜHENDİSLİK STÜDYOSU</span>
          </div>
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            Canlı 3B CAD / BIM ve Sayısal Harita İnceleyici
          </h3>
          <p className="text-sm text-slate-400 mt-2">
            TKGM standartlarında 3B Sayısal Yapı Modeli (3B-SYM), kat patlatma (explode view) ve taşıyıcı kolon aplikasyonunu canlı test edin.
          </p>
        </div>

        {/* 3D Model Selector Tabs */}
        <AnimatedTabs
          activeTab={modelType}
          onChange={(id) => setModelType(id as StudioModelType)}
          tabs={[
            { id: 'building', label: 'BIM / 3B-SYM Yapı Modeli', icon: <Box className="w-4 h-4 text-cyan-400" /> },
            { id: 'terrain', label: 'Sayısal Arazi (DEM)', icon: <Mountain className="w-4 h-4 text-emerald-400" /> },
            { id: 'heritage', label: 'Lazer Nokta Bulutu', icon: <Landmark className="w-4 h-4 text-amber-400" /> },
          ]}
        />
      </div>

      {/* Studio Viewport & Toolbars */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
        {/* Left 3D Viewport (8 Cols) */}
        <div className="lg:col-span-8 relative h-[500px] sm:h-[600px] rounded-2xl overflow-hidden border border-slate-700/80 bg-slate-950 shadow-2xl">
          <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

          {/* Floating Controls Bar */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
            {modelType === 'building' && (
              <>
                <button
                  type="button"
                  onClick={() => setSymMode(!symMode)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-medium backdrop-blur-xl transition-all ${
                    symMode
                      ? 'bg-gradient-to-r from-amber-500 to-cyan-500 text-slate-950 font-bold shadow-lg shadow-cyan-500/30'
                      : 'bg-slate-900/90 text-slate-300 border border-slate-700 hover:bg-slate-800'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{symMode ? 'TKGM 3B-SYM Renkleri Açık' : '3B-SYM Renklendirme'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setExplodedView(!explodedView)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-medium backdrop-blur-xl transition-all ${
                    explodedView
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow-lg shadow-cyan-500/30'
                      : 'bg-slate-900/90 text-cyan-300 border border-slate-700 hover:bg-slate-800'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>{explodedView ? 'Katları Birleştir' : 'Katları Patlat (Explode)'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowColumns(!showColumns)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-medium backdrop-blur-xl transition-all ${
                    showColumns
                      ? 'bg-nova-600 text-white shadow-md'
                      : 'bg-slate-900/90 text-slate-400 border border-slate-700 hover:bg-slate-800'
                  }`}
                >
                  <Grid className="w-3.5 h-3.5" />
                  <span>{showColumns ? 'Taşıyıcı Kolonlar' : 'Kolonları Gizle'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowDimensions(!showDimensions)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-medium backdrop-blur-xl transition-all ${
                    showDimensions
                      ? 'bg-nova-600 text-white shadow-md'
                      : 'bg-slate-900/90 text-slate-400 border border-slate-700 hover:bg-slate-800'
                  }`}
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span>{showDimensions ? 'Aks Ölçüleri' : 'Ölçüleri Göster'}</span>
                </button>
              </>
            )}

            <button
              type="button"
              onClick={() => setShowParcel(!showParcel)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-medium backdrop-blur-xl transition-all ${
                showParcel
                  ? 'bg-nova-600 text-white shadow-md'
                  : 'bg-slate-900/90 text-slate-400 border border-slate-700 hover:bg-slate-800'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{showParcel ? 'Parsel Sınırı & Pilyeler Açık' : 'Parsel Sınırı'}</span>
            </button>
          </div>

          {/* Floor Selection Strip (Building Mode Only) */}
          {modelType === 'building' && (
            <div className="absolute top-16 right-4 flex flex-col gap-1.5 z-10 bg-slate-950/85 backdrop-blur-xl p-2 rounded-2xl border border-slate-800 shadow-xl hidden md:flex">
              <span className="text-[10px] font-mono text-slate-400 px-2 py-0.5">Kat Seçimi</span>
              {FLOOR_DETAILS.slice(0, 6).reverse().map((f) => (
                <button
                  key={f.floor}
                  type="button"
                  onClick={() => setSelectedFloor(f.floor)}
                  className={`px-2.5 py-1 rounded-xl text-[11px] font-mono flex items-center justify-between gap-2 transition-all ${
                    selectedFloor === f.floor
                      ? 'bg-cyan-500 text-slate-950 font-bold shadow-md'
                      : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: f.colorHex }} />
                  <span>{f.floor === 0 ? 'Zemin Kat' : `${f.floor}. Kat`}</span>
                </button>
              ))}
            </div>
          )}

          {/* Floor Slicer Control (Building Mode Only) */}
          {modelType === 'building' && (
            <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:w-80 bg-slate-950/90 border border-slate-800 backdrop-blur-xl p-3.5 rounded-2xl z-10 space-y-2">
              <div className="flex justify-between items-center text-xs font-mono text-slate-300">
                <span className="flex items-center gap-1 text-cyan-400 font-semibold">
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Kat Kesit Slayderı:</span>
                </span>
                <span className="font-bold text-white">{floorSlicer === 6 ? 'Tüm Katlar (6+Teras)' : `${floorSlicer}. Kata Kadar`}</span>
              </div>
              <input
                type="range"
                min="0"
                max="6"
                step="1"
                value={floorSlicer}
                onChange={(e) => setFloorSlicer(Number(e.target.value))}
                className="w-full accent-cyan-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
              />
            </div>
          )}

          <div className="absolute bottom-4 right-4 text-[11px] font-mono text-slate-400 bg-slate-950/90 px-3 py-1 rounded-lg border border-slate-800 pointer-events-none hidden sm:block">
            360° Döndürmek İçin Sürükleyin
          </div>
        </div>

        {/* Right Info & Metadata Panel (4 Cols) */}
        <div className="lg:col-span-4 flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            {/* Interactive Inspector Card */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  {modelType === 'building' && 'TKGM 3B-SYM Bağımsız Bölüm Bilgisi'}
                  {modelType === 'terrain' && 'Sayısal Arazi Modeli (DEM) Verisi'}
                  {modelType === 'heritage' && 'Lazer Tarama Nokta Bulutu'}
                </h4>
                {modelType === 'building' && (
                  <span
                    className="text-[10px] font-mono px-2 py-0.5 rounded-full font-bold"
                    style={{ backgroundColor: `${activeFloorDetail.colorHex}22`, color: activeFloorDetail.colorHex, border: `1px solid ${activeFloorDetail.colorHex}55` }}
                  >
                    {activeFloorDetail.name}
                  </span>
                )}
              </div>

              <div className="space-y-2.5 font-mono text-xs text-slate-300">
                {modelType === 'building' && (
                  <>
                    <div className="flex justify-between py-1 border-b border-slate-800/80">
                      <span className="text-slate-400">Fonksiyon:</span>
                      <strong className="text-white">{activeFloorDetail.type}</strong>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-800/80">
                      <span className="text-slate-400">Kat Kotu:</span>
                      <strong className="text-cyan-300 font-bold">{activeFloorDetail.elevation}</strong>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-800/80">
                      <span className="text-slate-400">Brüt / Net Alan:</span>
                      <strong className="text-emerald-400 font-bold">{activeFloorDetail.grossArea} / {activeFloorDetail.netArea}</strong>
                    </div>
                    <div className="py-1 border-b border-slate-800/80">
                      <span className="text-slate-400 block mb-1">Bağımsız Bölümler:</span>
                      <div className="space-y-1">
                        {activeFloorDetail.units.map((u, i) => (
                          <div key={i} className="text-[11px] text-slate-200 bg-slate-950/60 px-2 py-1 rounded-lg border border-slate-800 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: activeFloorDetail.colorHex }} />
                            <span>{u}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-between py-1 items-center">
                      <span className="text-slate-400">Mevzuat Durumu:</span>
                      <span className="inline-flex items-center gap-1 text-[11px] text-emerald-300 bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-800/50">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        <span>{activeFloorDetail.status}</span>
                      </span>
                    </div>
                  </>
                )}

                {modelType === 'terrain' && (
                  <>
                    <div className="flex justify-between py-1 border-b border-slate-800/80">
                      <span className="text-slate-400">Yüzey Tipi:</span>
                      <strong className="text-white">Üçgen Düzensiz Ağ (TIN)</strong>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-800/80">
                      <span className="text-slate-400">Kot Aralığı:</span>
                      <strong className="text-cyan-300">+820.00m ~ +848.50m</strong>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-800/80">
                      <span className="text-slate-400">Eğri Aralığı:</span>
                      <strong className="text-white">0.5 m Eş Yükselti</strong>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-slate-400">Doğruluk:</span>
                      <strong className="text-emerald-400">GSD: 1.5 cm RTK</strong>
                    </div>
                  </>
                )}

                {modelType === 'heritage' && (
                  <>
                    <div className="flex justify-between py-1 border-b border-slate-800/80">
                      <span className="text-slate-400">Nokta Sayısı:</span>
                      <strong className="text-cyan-300">3.500.000 Nokta</strong>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-800/80">
                      <span className="text-slate-400">Tarama Sensörü:</span>
                      <strong className="text-white">Karasal 3D Lidar</strong>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-800/80">
                      <span className="text-slate-400">Renk Formatı:</span>
                      <strong className="text-amber-400">Gerçek RGB & Yoğunluk</strong>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-slate-400">Format:</span>
                      <strong className="text-emerald-400">E57 / LAS / DWG</strong>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Geodetic Cadastral Card */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h4 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider mb-2.5 flex items-center justify-between">
                <span>Kadastro & Jeodezik Veriler</span>
                <span className="text-[10px] text-cyan-400">Pilye: P1-P4 Aktif</span>
              </h4>
              <div className="space-y-1.5 text-xs font-mono text-slate-400">
                <p><span className="text-slate-500">Ada / Parsel:</span> <strong className="text-slate-200">108 Ada / 14 Parsel</strong></p>
                <p><span className="text-slate-500">Projeksiyon:</span> <strong className="text-slate-200">ITRF96 TM 30° (EPSG:5256)</strong></p>
                <p><span className="text-slate-500">Standart:</span> <strong className="text-cyan-300">CityGML LOD2 / IFC 4.3</strong></p>
                <p><span className="text-slate-500">Tescil Yetkisi:</span> <strong className="text-emerald-400">Mustafa Kale (Harita Müh.)</strong></p>
              </div>
            </div>
          </div>

          <a
            href={CONTACT_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-nova-600 via-nova-500 to-cyan-500 hover:from-nova-500 hover:to-cyan-400 text-white font-bold text-sm shadow-xl shadow-blue-600/30 transition-all transform hover:-translate-y-0.5"
          >
            <span>3B-SYM / BIM Proje Teklifi Al</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Studio3D;
