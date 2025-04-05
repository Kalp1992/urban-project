import { Canvas } from "@react-three/fiber";
import { Sky, Environment, OrbitControls, useGLTF } from "@react-three/drei";
import { Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./page2.css"
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";
import Page3CustomHook from "./hook/page3CustomHook";
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);
// Tree and mountain model loader component (GLTF or custom if available)
const TreeModel = () => {
  const tree = useGLTF("/models/mountain.gltf"); // Replace with actual path
  return <primitive object={tree.scene} scale={0.5} position={[0, 0, 0]} />;
};

const MountainModel = () => {
  const mountain = useGLTF("/models/Blender Snow Mountains Download.gltf"); // Replace with actual path
  return <primitive object={mountain.scene} scale={2} position={[2, 0, -3]} />;
};

export default function page3() {
   const width = Page3CustomHook();
    const isMobile = width < 480;
    const isTablet = width >= 480 && width < 768;
    const isDesktop = width >= 768 && width < 1024;
    const isLargeDesktop = width >= 1024;
 
    let chartX, chartY, chartWidth;
    if (isMobile) {
      chartX = -20;
      chartY = -150;
      chartWidth = 220;
    } else if (isTablet) {
      chartX = -60;
      chartY = -160;
      chartWidth = 280;
    } else if (isDesktop) {
      chartX = -100;
      chartY = -180;
      chartWidth = 340;
    } else {
      chartX = -120;
      chartY = -180;
      chartWidth = 360;
    }

 const data = {
   labels: [0.415, 0.418, 0.421, 0.424, 0.427, 0.43],
   datasets: [
     {
       label: "Data Flow",
       data: [0.41, 0.43, 0.42, 0.44, 0.58, 0.6],
       borderColor: "gray",
       backgroundColor: "rgba(19, 23, 20, 0.3)",
       tension: 0.5,
       fill: true,
       pointRadius: 2,
       pointHoverRadius: 6,
     },
   ],
 };

 const options = {
   responsive: true,
   animation: {
     duration: 1500,
     easing: "easeInOutSine",
   },
   plugins: {
     legend: { display: false },
     annotation: {
       annotations: {
         xThreshold: {
           type: "line",
           xMin: 0.422,
           xMax: 0.422,
           borderColor: "red",
           borderWidth: 2,
           label: {
             content: "x = 0.422",
             enabled: true,
             position: "start",
           },
         },
         yThreshold: {
           type: "line",
           yMin: 0.46,
           yMax: 0.6,
           borderColor: "blue",
           borderWidth: 2,
           label: {
             content: "y = 0.6",
             enabled: true,
             position: "end",
           },
         },
       },
     },
   },
   scales: {
     x: {
       type: "linear",
       min: 0.415,
       max: 0.43,
       ticks: {
         stepSize: 0.003, // Shows 6 points: 0.415 → 0.418 → 0.421 → ...
         callback: (val) => val.toFixed(3),
         maxTicksLimit: 6,
       },
       grid: { display: false },
       title: { display: true, text: "learning rate" },
     },
     y: {
       min: 0.4,
       max: 0.65,
       ticks: {
         maxTicksLimit: 4,
         callback: (val) => val.toFixed(2),
       },
       grid: { color: "rgba(200,200,200,0.2)" },
       title: { display: true, text: "" },
     },
   },
 };


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
              {/* <mesh rotation={[-0.5 * Math.PI, 0, 0]} receiveShadow>
                <planeGeometry args={[100, 100]} />
                <meshStandardMaterial color="#222" />
              </mesh> */}
              {/* <mesh position={[0, 0.5, 0]} castShadow>
                <coneGeometry args={[1, 2, 16]} />
                <meshStandardMaterial color="#8fff" />
              </mesh> */}
              <MountainModel/>
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
        <motion.div
          key="chart"
          className="form-container"
          initial={{ opacity: 0, width: 0, x: chartX, y: chartY }}
          animate={{ opacity: 1, width: chartWidth, x: chartX, y: chartY }}
          exit={{ opacity: 0, width: 0, x: chartX, y: chartY }}
          transition={{
            duration: 0.6,
            ease: "easeInOut",
          }}
          style={{
            overflow: "hidden",
            position: "absolute",
          }}
        >
          <p className="learing-heading">LEARNING RATE VS ERROR REDUCTION</p>
          <p>
            <span className="point">3,000</span> Data points Analyzed
          </p>
          <Line data={data} options={options} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
