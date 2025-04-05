import { Suspense, useEffect ,useState} from "react";
import { Canvas } from "@react-three/fiber";
import { Sky, Environment, OrbitControls, useGLTF } from "@react-three/drei";

import { motion ,AnimatePresence} from "framer-motion";
import "./page2.css";


const MountainModel = () => {
  const mountain = useGLTF("/models/Mountain.gltf"); // Replace with actual path
  return <primitive object={mountain.scene} scale={2} position={[2, 0, -3]} />;
};

export default function Page2() {

  function useWindowWidth() {
     const [width, setWidth] = useState(window.innerWidth);
    useEffect(() => {
      const handleResize = () => setWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);
    return width;
  }
  const width = useWindowWidth();

const isMobile = width < 480;
const isTablet = width >= 480 && width < 768;
const isDesktop = width >= 768 && width < 1024;
const isLargeDesktop = width >= 1024;

let formX, formY1, formY2, formWidth;

if (isMobile) {
  formX = -20;
  formY1 = -150;
  formY2 = -10;
  formWidth = 160;
} else if (isTablet) {
  formX = -50;
  formY1 = -80;
  formY2 = 30;
  formWidth = 150;
} else if (isDesktop) {
  formX = -60;
  formY1 = -330;
  formY2 = -200;
  formWidth = 250;
} else if (isLargeDesktop) {
  formX = -140;
  formY1 = -240;
  formY2 = -100;
  formWidth = 260;
}

  function handleRangeInput(e, type) {
    const input = e.target;
    const value = parseInt(input.value);
    const min = parseInt(input.min);
    const max = parseInt(input.max);

    const percent = ((value - min) / (max - min)) * 100;

    // Set the background fill color for the track
    input.style.background = `linear-gradient(to right, rgb(74, 75, 75) ${percent}%, #aaa ${percent}%)`;

    // Update floating label text
    const label = document.getElementById(`thumb-label-${type}`);
if (label) {
  // Include "sources" or "GB" in the floating label text
  label.textContent = type === "source" ? `${value} sources` : `${value} GB`;

  const inputWidth = input.offsetWidth;
  const labelWidth = label.offsetWidth;
  const thumbPos = (percent / 100) * inputWidth;

  label.style.left = `calc(${thumbPos}px - ${labelWidth / 2}px)`;
}


    // Update static value (optional)
    const staticLabel = document.getElementById(`range-value-${type}`);
    if (staticLabel) {
      staticLabel.textContent =
        type === "source" ? `${value} sources` : `${value} GB`;
    }
  }
  useEffect(() => {
    const sourceInput = document.getElementById("source-range");
    const volumeInput = document.getElementById("volume-range");

    if (sourceInput) handleRangeInput({ target: sourceInput }, "source");
    if (volumeInput) handleRangeInput({ target: volumeInput }, "volume");
  }, []);
  return (
    <div className="container">
      {/* Mountain scene fades in */}
      <motion.div
        className="scene-wrapper"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="mountain">
          <Canvas camera={{ position: [0, 1, 5], fov: 60 }}>
            <Suspense fallback={null}>
              <Sky sunPosition={[100, 20, 100]} />
              <Environment preset="sunset" />
              <mesh rotation={[-0.5 * Math.PI, 0, 0]} receiveShadow>
                <planeGeometry args={[100, 100]} />
                <meshStandardMaterial color="#500" />
              </mesh>
              <mesh position={[0, 0.5, 0]} castShadow>
                <coneGeometry args={[1, 2, 16]} />
                <meshStandardMaterial color="#88ff" />
              </mesh>

              {/* ✅ Add this line to load the GLTF model */}
              <MountainModel />

              <ambientLight intensity={0.5} />
              <directionalLight
                position={[5, 10, 5]}
                intensity={1}
                castShadow
              />
              <OrbitControls enableZoom={false} autoRotate />
            </Suspense>
          </Canvas>
        </div>
      </motion.div>
      <AnimatePresence>
        <>
          {/* Source Variety */}
          <motion.div
            key="source-form"
            className="form-container"
            initial={{ opacity: 0, width: 0, x: formX, y: formY1 }}
            animate={{ opacity: 1, width: formWidth }}
            exit={{ opacity: 0, width: 0, x: formX, y: formY1 }}
            transition={{
              duration: 0.6,
              ease: "easeInOut",
              delay: 0.5,
            }}
            style={{
              overflow: "hidden",
              position: "absolute",
            }}
          >
            <form>
              <div className="form-group-slider">
                <label htmlFor="source-range">Source variety</label>
                <div className="slider-wrapper">
                  <input
                    type="range"
                    id="source-range"
                    name="source-range"
                    min="1"
                    max="15"
                    defaultValue="9"
                    onInput={(e) => handleRangeInput(e, "source")}
                  />
                  <span className="slider-thumb-label" id="thumb-label-source">
                    9 sources
                  </span>
                </div>
              </div>
            </form>
          </motion.div>

          {/* Data Volume */}
          <motion.div
            key="volume-form"
            className="form-container"
            initial={{ opacity: 0, width: 0, x: formX, y: formY2 }}
            animate={{ opacity: 1, width: formWidth }}
            exit={{ opacity: 0, width: 0, x: formX, y: formY2 }}
            transition={{
              duration: 0.6,
              ease: "easeInOut",
              delay: 0.6,
            }}
            style={{
              overflow: "hidden",
              position: "absolute",
            }}
          >
            <form>
              <div className="form-group-slider">
                <label htmlFor="volume-range">Data volume</label>
                <div className="slider-wrapper">
                  <input
                    type="range"
                    id="volume-range"
                    name="volume-range"
                    min="1"
                    max="100"
                    defaultValue="65"
                    onInput={(e) => handleRangeInput(e, "volume")}
                  />
                  <span className="slider-thumb-label" id="thumb-label-volume">
                    65 GB
                  </span>
                </div>
              </div>
            </form>
          </motion.div>
        </>
      </AnimatePresence>
    </div>
  );
}
