"use client";

/* ==========================================================================
   EDIT HERE: 3D FLOATING SHAPES CONFIG
   This component renders the interactive 3D Neo-Brutalist floating geometric
   shapes using Three.js and WebGL.
   - To change colors: modify hex codes (e.g. 0xffea00 = yellow, 0xff3399 = pink)
   - To change shapes: use BoxGeometry, TorusGeometry, OctahedronGeometry, etc.
   - Performance: on mobile devices, devicePixelRatio is capped at 1.5,
     mouse parallax is disabled on touchscreens, and rendering auto-pauses
     when scrolled off-screen or when the tab is hidden.
   ========================================================================== */

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function NeoScene3D() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect capabilities
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const isMobile = window.innerWidth < 768 || isCoarsePointer;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = isMobile ? 9.5 : 8;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isMobile, // antialias on desktop, disable on low-power mobile to save battery
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    // Cap pixel ratio at 1.5 on mobile/tablets, 2 on desktop
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2));
    renderer.shadowMap.enabled = false;
    container.appendChild(renderer.domElement);

    // Lights for Neo-Brutalist flat/cel-shaded look
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 1.8);
    dirLight1.position.set(5, 8, 4);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight2.position.set(-5, -4, -2);
    scene.add(dirLight2);

    // Helper to create a Neo-Brutalist 3D object: solid vibrant color + thick black edges
    const shapes: {
      mesh: THREE.Group;
      rotSpeed: { x: number; y: number; z: number };
      floatSpeed: number;
      floatAmp: number;
      basePos: THREE.Vector3;
    }[] = [];

    function createBrutalShape(
      geometry: THREE.BufferGeometry,
      color: number,
      position: [number, number, number],
      scale: number = 1
    ) {
      const group = new THREE.Group();

      // Solid color mesh with flat shading
      const material = new THREE.MeshLambertMaterial({
        color,
        flatShading: true,
      });
      const mesh = new THREE.Mesh(geometry, material);
      group.add(mesh);

      // Black wireframe / edge lines
      const edges = new THREE.EdgesGeometry(geometry, 20);
      const lineMaterial = new THREE.LineBasicMaterial({ color: 0x0d0d0d, linewidth: 2 });
      const wireframe = new THREE.LineSegments(edges, lineMaterial);
      group.add(wireframe);

      // Scale down slightly on mobile so shapes neatly frame the screen
      const finalScale = isMobile ? scale * 0.72 : scale;
      // Adjust positions on mobile to prevent overlapping center portrait or text
      const finalPos: [number, number, number] = isMobile
        ? [position[0] * 0.65, position[1] * 0.85, position[2]]
        : position;

      group.position.set(...finalPos);
      group.scale.setScalar(finalScale);

      scene.add(group);

      shapes.push({
        mesh: group,
        rotSpeed: {
          x: (Math.random() - 0.5) * 0.012,
          y: (Math.random() - 0.5) * 0.016,
          z: (Math.random() - 0.5) * 0.008,
        },
        floatSpeed: 0.8 + Math.random() * 0.6,
        floatAmp: (isMobile ? 0.08 : 0.15) + Math.random() * 0.08,
        basePos: group.position.clone(),
      });
    }

    /* EDIT HERE: Shape placements & colors */
    // 1. Torus Ring (Electric Yellow) - top-left
    createBrutalShape(new THREE.TorusGeometry(0.7, 0.28, 16, 28), 0xffea00, [-3.4, 1.8, -0.5], 1.1);

    // 2. Dodecahedron (Cyber Pink) - top-right
    createBrutalShape(new THREE.DodecahedronGeometry(0.75), 0xff3399, [3.2, 2.0, -1.0], 1.0);

    // 3. Extruded Cube (Neon Cyan) - mid-left
    createBrutalShape(new THREE.BoxGeometry(0.9, 0.9, 0.9), 0x00e5ff, [-3.8, -1.2, 0.2], 0.95);

    // 4. Octahedron (Radiant Lime Green) - mid-right
    createBrutalShape(new THREE.OctahedronGeometry(0.8), 0x00e676, [3.6, -1.0, 0], 1.05);

    // 5. Icosahedron (Electric Purple) - bottom-left
    createBrutalShape(new THREE.IcosahedronGeometry(0.65), 0xb266ff, [-2.2, -2.6, -0.2], 0.9);

    // 6. Cylinder (Bold Orange) - bottom-right
    createBrutalShape(new THREE.CylinderGeometry(0.5, 0.5, 0.8, 8), 0xff5400, [2.5, -2.5, -0.5], 0.85);

    // Mouse Tracking for Parallax (Desktop / Fine pointer only)
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onPointerMove = (e: PointerEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    if (!isCoarsePointer && !prefersReducedMotion && window.innerWidth >= 768) {
      window.addEventListener("pointermove", onPointerMove);
    }

    // Debounced Resize & Orientation Handler
    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (!container) return;
        const w = container.clientWidth || window.innerWidth;
        const h = container.clientHeight || window.innerHeight;
        camera.aspect = w / h;
        camera.position.z = w < 768 ? 9.5 : 8;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      }, 150);
    };
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);

    // Lifecycle state for pausing RAF loop when off-screen or tab hidden
    let isRendering = true;
    let isIntersecting = true;
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const render = () => {
      if (!isRendering) return;
      animationFrameId = requestAnimationFrame(render);

      const elapsedTime = clock.getElapsedTime();

      // Smooth camera tilt towards mouse (only if fine pointer)
      if (!isCoarsePointer && window.innerWidth >= 768) {
        targetX += (mouseX - targetX) * 0.05;
        targetY += (mouseY - targetY) * 0.05;
        camera.position.x = targetX * 0.6;
        camera.position.y = -targetY * 0.4;
      }
      camera.lookAt(0, 0, 0);

      // Rotate and float shapes (skip if reduced motion)
      if (!prefersReducedMotion) {
        shapes.forEach((s) => {
          s.mesh.rotation.x += s.rotSpeed.x;
          s.mesh.rotation.y += s.rotSpeed.y;
          s.mesh.rotation.z += s.rotSpeed.z;

          // Bobbing float
          s.mesh.position.y = s.basePos.y + Math.sin(elapsedTime * s.floatSpeed + s.basePos.x) * s.floatAmp;
          s.mesh.position.x = s.basePos.x + Math.cos(elapsedTime * (s.floatSpeed * 0.7) + s.basePos.y) * (s.floatAmp * 0.5);
        });
      }

      renderer.render(scene, camera);
    };

    const startRendering = () => {
      if (!isRendering && isIntersecting && !document.hidden) {
        isRendering = true;
        clock.start();
        render();
      }
    };

    const stopRendering = () => {
      if (isRendering) {
        isRendering = false;
        cancelAnimationFrame(animationFrameId);
        clock.stop();
      }
    };

    // Pause when scrolled off-screen via IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        isIntersecting = entry.isIntersecting;
        if (isIntersecting) {
          startRendering();
        } else {
          stopRendering();
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // Pause when tab is inactive / hidden
    const onVisibilityChange = () => {
      if (document.hidden) {
        stopRendering();
      } else if (isIntersecting) {
        startRendering();
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    // Start initial render
    render();

    return () => {
      stopRendering();
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
      clearTimeout(resizeTimer);

      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
      shapes.forEach((s) => {
        s.mesh.traverse((obj) => {
          if (obj instanceof THREE.Mesh) {
            obj.geometry.dispose();
            if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
            else obj.material.dispose();
          }
        });
      });
    };
  }, []);

  return <div className="neo-3d-stage" ref={mountRef} aria-hidden />;
}
