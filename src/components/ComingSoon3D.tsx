import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { 
  Phone, 
  MessageSquare, 
  Download, 
  ArrowRight, 
  Clock 
} from 'lucide-react';
import { CONTACT_INFO } from '../data/engineeringData';
import { BorderBeam } from './ui/border-beam';
import { Spotlight } from './ui/spotlight';

export const ComingSoon3D: React.FC<{ onShowFullSite?: () => void }> = ({ onShowFullSite }) => {
  const canvasContainerRef = useRef<HTMLDivElement>(null);

  // Download digital vCard
  const downloadVCard = () => {
    const element = document.createElement('a');
    const file = new Blob([CONTACT_INFO.vCard], { type: 'text/vcard;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = 'Mustafa_Kale_NovaZen_HaritaMuhendisi.vcf';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Three.js interactive 3D background
  useEffect(() => {
    if (!canvasContainerRef.current) return;
    const container = canvasContainerRef.current;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x06080e, 0.028);

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(12, 8, 14);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.appendChild(renderer.domElement);

    const worldGroup = new THREE.Group();
    scene.add(worldGroup);

    // Lights
    const ambientLight = new THREE.AmbientLight(0x1e293b, 2.2);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 2.5);
    dirLight.position.set(16, 24, 14);
    scene.add(dirLight);

    const blueLight = new THREE.PointLight(0x0066ff, 6, 35);
    blueLight.position.set(-10, 12, -10);
    scene.add(blueLight);

    const cyanLight = new THREE.PointLight(0x00d2ff, 5, 30);
    cyanLight.position.set(10, 8, 10);
    scene.add(cyanLight);

    // Terrain wireframe ground
    const groundGeo = new THREE.PlaneGeometry(32, 32, 28, 28);
    groundGeo.rotateX(-Math.PI / 2);
    const gPos = groundGeo.attributes.position;
    for (let i = 0; i < gPos.count; i++) {
      const vx = gPos.getX(i);
      const vz = gPos.getZ(i);
      const dist = Math.sqrt(vx * vx + vz * vz);
      const elev = Math.sin(vx * 0.3) * Math.cos(vz * 0.3) * 0.7 - Math.min(dist * 0.05, 0.8);
      gPos.setY(i, elev - 0.2);
    }
    groundGeo.computeVertexNormals();

    const groundMat = new THREE.MeshBasicMaterial({
      color: 0x0066ff,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const groundMesh = new THREE.Mesh(groundGeo, groundMat);
    worldGroup.add(groundMesh);

    // 3D Geometric Architectural Towers (Nova Zen Emblem Style)
    const towerGroup = new THREE.Group();
    worldGroup.add(towerGroup);

    const buildings = [
      { x: 0, z: 0, w: 2.8, d: 2.8, h: 9.5, color: 0x0a192f },
      { x: 0, z: 0, w: 2.0, d: 2.0, h: 11.8, color: 0x0052cc },
      { x: 0, z: 0, w: 1.2, d: 1.2, h: 13.5, color: 0x00d2ff },
      { x: -3.8, z: -1.2, w: 2.2, d: 2.4, h: 6.8, color: 0x0e1c36 },
      { x: 3.6, z: -2.0, w: 2.5, d: 2.0, h: 7.4, color: 0x0b172a },
      { x: -2.4, z: 3.2, w: 2.0, d: 2.6, h: 5.2, color: 0x091424 },
      { x: 3.2, z: 2.8, w: 2.2, d: 2.2, h: 6.0, color: 0x0a192f },
    ];

    buildings.forEach((b) => {
      const geo = new THREE.BoxGeometry(b.w, b.h, b.d);
      geo.translate(0, b.h / 2, 0);

      const mat = new THREE.MeshStandardMaterial({
        color: b.color,
        roughness: 0.2,
        metalness: 0.9,
        transparent: true,
        opacity: 0.85,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(b.x, 0, b.z);
      towerGroup.add(mesh);

      const edgeGeo = new THREE.EdgesGeometry(geo);
      const edgeMat = new THREE.LineBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.75,
      });
      const wire = new THREE.LineSegments(edgeGeo, edgeMat);
      wire.position.set(b.x, 0, b.z);
      towerGroup.add(wire);
    });

    // Laser scanning horizontal plane
    const scanPlaneGeo = new THREE.PlaneGeometry(16, 16);
    scanPlaneGeo.rotateX(-Math.PI / 2);
    const scanPlaneMat = new THREE.MeshBasicMaterial({
      color: 0x00d2ff,
      transparent: true,
      opacity: 0.22,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
    });
    const scanPlane = new THREE.Mesh(scanPlaneGeo, scanPlaneMat);
    scanPlane.position.y = 3;
    worldGroup.add(scanPlane);

    // Floating LiDAR Point Cloud
    const pcCount = 1200;
    const pcPositions = new Float32Array(pcCount * 3);
    const pcColors = new Float32Array(pcCount * 3);

    for (let i = 0; i < pcCount; i++) {
      const px = (Math.random() - 0.5) * 20;
      const py = Math.random() * 12;
      const pz = (Math.random() - 0.5) * 20;

      pcPositions[i * 3] = px;
      pcPositions[i * 3 + 1] = py;
      pcPositions[i * 3 + 2] = pz;

      const ratio = py / 12;
      const c = new THREE.Color(0x0066ff).lerp(new THREE.Color(0x00d2ff), ratio);
      pcColors[i * 3] = c.r;
      pcColors[i * 3 + 1] = c.g;
      pcColors[i * 3 + 2] = c.b;
    }

    const pcGeo = new THREE.BufferGeometry();
    pcGeo.setAttribute('position', new THREE.BufferAttribute(pcPositions, 3));
    pcGeo.setAttribute('color', new THREE.BufferAttribute(pcColors, 3));

    const pcMat = new THREE.PointsMaterial({
      size: 0.12,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });
    const pointCloud = new THREE.Points(pcGeo, pcMat);
    worldGroup.add(pointCloud);

    // Mouse parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetRotationY = 0;
    let targetRotationX = 0;

    const onPointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const normY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      mouseX = normX * 0.35;
      mouseY = normY * 0.25;
    };

    window.addEventListener('mousemove', onPointerMove);

    const onResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', onResize);

    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      targetRotationY += 0.0025;

      worldGroup.rotation.y += (targetRotationY + mouseX - worldGroup.rotation.y) * 0.05;
      worldGroup.rotation.x += (targetRotationX + mouseY * 0.2 - worldGroup.rotation.x) * 0.05;

      // Scanning plane movement
      scanPlane.position.y = Math.sin(elapsed * 1.4) * 5.5 + 6.0;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('resize', onResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="h-screen w-screen max-h-screen overflow-y-auto sm:overflow-hidden bg-[#06080e] text-slate-100 flex flex-col justify-between relative selection:bg-nova-600 selection:text-white">
      {/* 3D Background Canvas */}
      <div 
        ref={canvasContainerRef} 
        className="fixed inset-0 pointer-events-none z-0 opacity-45 sm:opacity-60"
      />

      {/* Cyber Grid Texture Overlay */}
      <div className="fixed inset-0 bg-grid-pattern opacity-30 pointer-events-none z-0" />

      {/* Spotlight Illumination */}
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="rgba(0, 102, 255, 0.3)" />

      {/* Top Floating Navigation / Brand Header */}
      <header className="relative z-20 pt-4 sm:pt-6 px-4 sm:px-8 max-w-7xl mx-auto w-full flex items-center justify-between shrink-0">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-700/90 p-1.5 flex items-center justify-center overflow-hidden shadow-xl">
            <img
              src="/assets/logo.png"
              alt="Nova Zen Mühendislik Logo"
              className="w-full h-full object-contain filter drop-shadow"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-nova-600/20 to-transparent pointer-events-none" />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-display font-extrabold text-lg sm:text-xl tracking-wider text-white">
                NOVA<span className="text-cyan-400">ZEN</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-nova-900/90 text-cyan-300 border border-nova-500/40">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                MÜHENDİSLİK
              </span>
            </div>
            <span className="text-[10px] font-mono text-slate-400 tracking-widest uppercase">
              Harita & 3B Sayısal Yapı Modelleme
            </span>
          </div>
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-2.5">
          <a
            href={`tel:${CONTACT_INFO.phone}`}
            className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-850 border border-slate-700 text-xs font-mono text-slate-200 transition-all hover:border-cyan-400 shadow-md"
          >
            <Phone className="w-3.5 h-3.5 text-cyan-400" />
            <span>{CONTACT_INFO.phoneFormatted}</span>
          </a>

          <a
            href={CONTACT_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white font-bold text-xs shadow-lg shadow-emerald-950/40 hover:brightness-110 transition-all"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>WhatsApp İletişim</span>
          </a>
        </div>
      </header>

      {/* Main Content Hero (Strictly Centered within remaining viewport height) */}
      <main className="flex-1 relative z-10 flex flex-col justify-center items-center px-4 sm:px-6 max-w-4xl mx-auto w-full py-4 sm:py-6">
        {/* Status Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-950/90 border border-nova-500/50 text-[11px] sm:text-xs font-mono text-cyan-300 shadow-2xl backdrop-blur-xl mb-4 sm:mb-5">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span className="font-bold tracking-wider">SİSTEM GÜNCELLEMESİ • ÇOK YAKINDA</span>
          <span className="text-slate-600 hidden sm:inline">|</span>
          <span className="text-slate-300 hidden sm:inline">TKGM 3B-SYM ALTYAPISI</span>
        </div>

        {/* Main Headline */}
        <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4">
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.18]">
            Harita Mühendisliği & 3B Modellemede <br />
            <span className="metallic-blue-text">Yeni Yüzümüzle</span>{' '}
            <span className="metallic-text">Çok Yakında Hizmetinizdeyiz.</span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl mx-auto">
            <strong>Nova Zen Mühendislik</strong> olarak; <strong>TKGM 3 Boyutlu Sayısal Yapı Modeli (3B-SYM)</strong>, 
            <strong> BIM seviyesinde bina çizimi</strong>, <strong>İHA fotogrametrisi</strong> ve <strong>karasal lazer tarama (LIDAR)</strong> teknolojilerimizle 
            dijital platformumuzu yeniliyoruz.
          </p>
        </div>

        {/* Active Engineering Services Notification Card */}
        <div className="w-full max-w-2xl mt-5 sm:mt-6 p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-slate-950/90 border border-nova-500/40 backdrop-blur-2xl shadow-2xl relative overflow-hidden text-left">
          <BorderBeam colorFrom="#00d2ff" colorTo="#0066ff" />
          
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 shrink-0 hidden sm:block">
              <Clock className="w-5 h-5 animate-pulse" />
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
                  Mühendislik & Saha Faaliyetlerimiz Kesintisiz Devam Etmektedir
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Yapı ruhsatı ve kat irtifakı için <strong>3B Sayısal Yapı Modeli (3B-SYM / CityGML / IFC)</strong>, 
                halihazır harita, kübaj hesapları ve kadastral resmi tescil projeleriniz için 
                doğrudan <strong>Harita Mühendisi Mustafa Kale</strong> ile iletişime geçebilirsiniz.
              </p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="mt-4 pt-4 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            <a
              href={CONTACT_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2.5 px-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-lg transition-all text-center"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp'tan Yazın</span>
              <ArrowRight className="w-3 h-3" />
            </a>

            <a
              href={`tel:${CONTACT_INFO.phone}`}
              className="flex items-center justify-center gap-2 py-2.5 px-3.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-400 text-slate-200 text-xs font-mono font-semibold transition-colors text-center"
            >
              <Phone className="w-3.5 h-3.5 text-cyan-400" />
              <span>{CONTACT_INFO.phoneFormatted}</span>
            </a>

            <button
              type="button"
              onClick={downloadVCard}
              className="flex items-center justify-center gap-2 py-2.5 px-3.5 rounded-xl bg-slate-900 border border-cyan-500/50 hover:bg-cyan-950/40 text-cyan-300 text-xs font-mono font-semibold transition-colors text-center"
            >
              <Download className="w-3.5 h-3.5" />
              <span>vCard Rehbere Kaydet</span>
            </button>
          </div>
        </div>
      </main>

      {/* Footer (Pinned to bottom, zero overflow) */}
      <footer className="relative z-20 py-3 sm:py-4 px-4 border-t border-slate-900 bg-[#03050a]/90 text-center text-[11px] sm:text-xs font-mono text-slate-500 shrink-0">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4">
          <div>
            © {new Date().getFullYear()} Nova Zen Mühendislik • Mustafa Kale. Tüm Hakları Saklıdır.
          </div>
          
          <div className="flex items-center gap-3 sm:gap-4">
            <a href="https://novazentr.com" className="hover:text-slate-300">www.novazentr.com</a>
            {onShowFullSite && (
              <>
                <span>•</span>
                <button
                  type="button"
                  onClick={onShowFullSite}
                  className="text-cyan-500 hover:text-cyan-300 underline text-[11px]"
                >
                  Tam Site Önizlemesi
                </button>
              </>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ComingSoon3D;
