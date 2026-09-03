import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { 
  Phone, 
  MessageSquare, 
  Download, 
  Building2, 
  Layers, 
  Plane, 
  MapPin, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Clock, 
  Navigation
} from 'lucide-react';
import { CONTACT_INFO } from '../data/engineeringData';
import { Card3D } from './ui/card-3d';
import { BorderBeam } from './ui/border-beam';
import { Spotlight } from './ui/spotlight';

export const ComingSoon3D: React.FC<{ onShowFullSite?: () => void }> = ({ onShowFullSite }) => {
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 412580.45, y: 4521400.12, z: 845.30 });

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
    camera.position.set(12, 9, 14);

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

      setCoords({
        x: 412580.45 + normX * 85.2,
        y: 4521400.12 + normY * 92.4,
        z: 845.30 + Math.abs(normX * normY) * 14.2,
      });
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
    <div className="min-h-screen bg-[#06080e] text-slate-100 flex flex-col relative overflow-x-hidden selection:bg-nova-600 selection:text-white">
      {/* 3D Background Canvas */}
      <div 
        ref={canvasContainerRef} 
        className="fixed inset-0 pointer-events-none z-0 opacity-45 sm:opacity-55"
      />

      {/* Cyber Grid Texture Overlay */}
      <div className="fixed inset-0 bg-grid-pattern opacity-30 pointer-events-none z-0" />

      {/* Spotlight Illumination */}
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="rgba(0, 102, 255, 0.3)" />

      {/* Top Floating Navigation / Brand Header */}
      <header className="relative z-20 pt-6 px-4 sm:px-8 max-w-7xl mx-auto w-full flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3.5">
          <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-700/90 p-1.5 flex items-center justify-center overflow-hidden shadow-xl">
            <img
              src="/assets/logo.png"
              alt="Nova Zen Mühendislik Logo"
              className="w-full h-full object-contain filter drop-shadow"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-nova-600/20 to-transparent pointer-events-none" />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-display font-extrabold text-xl sm:text-2xl tracking-wider text-white">
                NOVA<span className="text-cyan-400">ZEN</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-nova-900/90 text-cyan-300 border border-nova-500/40">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                MÜHENDİSLİK
              </span>
            </div>
            <span className="text-[10px] sm:text-[11px] font-mono text-slate-400 tracking-widest uppercase">
              Harita & 3B Sayısal Yapı Modelleme
            </span>
          </div>
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-3">
          <a
            href={`tel:${CONTACT_INFO.phone}`}
            className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-850 border border-slate-700 text-xs font-mono text-slate-200 transition-all hover:border-cyan-400 shadow-md"
          >
            <Phone className="w-3.5 h-3.5 text-cyan-400" />
            <span>{CONTACT_INFO.phoneFormatted}</span>
          </a>

          <a
            href={CONTACT_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white font-bold text-xs shadow-lg shadow-emerald-950/40 hover:brightness-110 transition-all"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>WhatsApp İletişim</span>
          </a>
        </div>
      </header>

      {/* Main Content Hero */}
      <main className="flex-1 relative z-10 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-12 sm:py-20 max-w-6xl mx-auto w-full">
        {/* Status Pill */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-950/90 border border-nova-500/50 text-xs font-mono text-cyan-300 shadow-2xl backdrop-blur-xl mb-8">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
          <span className="font-bold tracking-wider">SİSTEM GÜNCELLEMESİ • ÇOK YAKINDA</span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-300">TKGM 3B-SYM ALTYAPISI</span>
        </div>

        {/* Main Headline */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
            Harita Mühendisliği & 3B Modellemede <br />
            <span className="metallic-blue-text">Yeni Yüzümüzle</span>{' '}
            <span className="metallic-text">Çok Yakında Hizmetinizdeyiz.</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
            <strong>Nova Zen Mühendislik</strong> olarak; <strong>TKGM 3 Boyutlu Sayısal Yapı Modeli (3B-SYM)</strong>, 
            <strong> BIM seviyesinde bina çizimi</strong>, <strong>İHA fotogrametrisi</strong> ve <strong>karasal lazer tarama (LIDAR)</strong> teknolojilerimizle 
            dijital platformumuzu yeniliyoruz.
          </p>
        </div>

        {/* Active Engineering Services Notification Card */}
        <div className="w-full max-w-3xl mt-10 p-5 sm:p-7 rounded-3xl bg-slate-950/85 border border-nova-500/40 backdrop-blur-2xl shadow-2xl relative overflow-hidden text-left">
          <BorderBeam colorFrom="#00d2ff" colorTo="#0066ff" />
          
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 shrink-0 hidden sm:block">
              <Clock className="w-6 h-6 animate-pulse" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
                  Mühendislik & Saha Faaliyetlerimiz Kesintisiz Devam Etmektedir
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Yapı ruhsatı ve kat irtifakı için <strong>3B Sayısal Yapı Modeli (3B-SYM / CityGML / IFC)</strong>, 
                halihazır harita, kübaj hesapları ve kadastral resmi tescil projeleriniz için 
                doğrudan <strong>Harita Mühendisi Mustafa Kale</strong> ile iletişime geçebilirsiniz.
              </p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="mt-6 pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <a
              href={CONTACT_INFO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-lg transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp'tan Yazın</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>

            <a
              href={`tel:${CONTACT_INFO.phone}`}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-400 text-slate-200 text-xs font-mono font-semibold transition-colors"
            >
              <Phone className="w-4 h-4 text-cyan-400" />
              <span>{CONTACT_INFO.phoneFormatted}</span>
            </a>

            <button
              type="button"
              onClick={downloadVCard}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-900 border border-cyan-500/50 hover:bg-cyan-950/40 text-cyan-300 text-xs font-mono font-semibold transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>vCard Rehbere Kaydet</span>
            </button>
          </div>
        </div>

        {/* 3D Tilt Business Card & Profile Section */}
        <div className="w-full max-w-4xl mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: 3D Interactive Card (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="w-full max-w-sm">
              <Card3D className="border-cyan-500/40 shadow-2xl shadow-blue-950/60">
                <div className="p-1 bg-gradient-to-br from-cyan-500/40 via-nova-600/30 to-slate-800 rounded-[28px]">
                  <div className="rounded-[26px] overflow-hidden bg-slate-950">
                    <img
                      src="/assets/business_card.png"
                      alt="Mustafa Kale Harita Mühendisi Kartvizit"
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </div>
              </Card3D>
            </div>
            <span className="text-[11px] font-mono text-slate-500 mt-2">
              (Kartviziti 3B incelemek için fareyi üzerinde gezdirin)
            </span>
          </div>

          {/* Right: Engineer Credentials & Direct Details (7 Cols) */}
          <div className="lg:col-span-7 space-y-4 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-nova-950 border border-nova-700/40 text-[11px] font-mono text-cyan-300">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>HKMO Tescilli Harita Mühendisi</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Mustafa Kale
            </h2>
            <p className="text-sm font-mono text-cyan-400">
              Harita Mühendisi / 3B Modelleme & Lidar Uzmanı
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 font-mono text-xs">
              <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">TELEFON / WHATSAPP</span>
                <a href={`tel:${CONTACT_INFO.phone}`} className="text-white hover:text-cyan-400 font-bold mt-0.5 block">
                  {CONTACT_INFO.phoneFormatted}
                </a>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">KURUMSAL E-POSTA</span>
                <a href={`mailto:${CONTACT_INFO.email}`} className="text-white hover:text-cyan-400 font-bold mt-0.5 block">
                  {CONTACT_INFO.email}
                </a>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">RESMİ DOMAIN</span>
                <span className="text-cyan-300 font-bold mt-0.5 block">
                  www.novazentr.com
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">HİZMET ALANI</span>
                <span className="text-slate-300 font-bold mt-0.5 block">
                  Türkiye Geneli Proje & Saha
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Specialized Services Badges */}
        <div className="w-full max-w-4xl mt-14">
          <div className="text-center mb-6">
            <span className="text-xs font-mono uppercase tracking-widest text-slate-400">
              Uzmanlık Alanlarımız & Hizmet Kapsamı
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                title: 'TKGM 3B Sayısal Yapı Modeli (3B-SYM)',
                desc: 'Yapı ruhsatı ve kat irtifakı için CityGML ve IFC standartlarında resmi tescil modelleri.',
                icon: Building2,
                color: 'text-cyan-400',
              },
              {
                title: 'BIM Seviyesinde 3B Bina Çizimi',
                desc: 'LOD 200 - LOD 350 standardında mimari, statik ve as-built 3 boyutlu dijital ikiz.',
                icon: Layers,
                color: 'text-blue-400',
              },
              {
                title: 'İHA (Drone) & Fotogrametrik Harita',
                desc: 'RTK/PPK ile santimetre altı True-Ortofoto, halihazır ve sayısal yükseklik modelleri (DEM).',
                icon: Plane,
                color: 'text-emerald-400',
              },
              {
                title: '3D Lazer Tarama & Nokta Bulutu (LIDAR)',
                desc: 'Tarihi yapılar, cephe rölöveleri ve endüstriyel tesisler için milimetrik nokta bulutu.',
                icon: Sparkles,
                color: 'text-amber-400',
              },
              {
                title: 'İmar, İfraz, Tevhid & Kadastro',
                desc: '3194 Sayılı Kanun 18. Madde, parselasyon, sınır tespiti ve aplikasyon tescil dosyaları.',
                icon: MapPin,
                color: 'text-rose-400',
              },
              {
                title: 'Kübaj & Hassas Deformasyon Takibi',
                desc: 'Hafriyat-dolgu hacim hesapları, iki yüzey fark modeli ve mikro oturma analizleri.',
                icon: ShieldCheck,
                color: 'text-violet-400',
              },
            ].map((srv, idx) => {
              const Icon = srv.icon;
              return (
                <div
                  key={idx}
                  className="p-4.5 rounded-2xl bg-slate-950/70 border border-slate-800/80 text-left hover:border-cyan-500/40 transition-colors"
                >
                  <div className="flex items-center gap-2.5 mb-2">
                    <Icon className={`w-4 h-4 ${srv.color}`} />
                    <h3 className="text-xs font-bold text-white font-mono">{srv.title}</h3>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed font-sans">{srv.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Real-Time Geodetic Coordinates HUD */}
        <div className="mt-14 inline-flex items-center gap-4 px-5 py-2 rounded-2xl bg-slate-950/80 border border-slate-800 font-mono text-xs text-slate-400 backdrop-blur-md">
          <div className="flex items-center gap-1.5 text-cyan-400">
            <Navigation className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '9s' }} />
            <span>ITRF96 TM 30°:</span>
          </div>
          <div>Y: <strong className="text-white">{coords.x.toFixed(2)}</strong></div>
          <div>X: <strong className="text-white">{coords.y.toFixed(2)}</strong></div>
          <div>Z: <strong className="text-emerald-400">+{coords.z.toFixed(2)} m</strong></div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-20 py-8 px-4 border-t border-slate-900 bg-[#03050a]/90 text-center text-xs font-mono text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            © {new Date().getFullYear()} Nova Zen Mühendislik • Mustafa Kale. Tüm Hakları Saklıdır.
          </div>
          
          <div className="flex items-center gap-4">
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
