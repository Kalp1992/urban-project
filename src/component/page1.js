import { useState, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sky, Environment, useGLTF } from "@react-three/drei";
import { Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./page1.css";

// Reusable responsive hook
const useResponsive = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowWidth;
};
const MountainModel = () => {
  const mountain = useGLTF("/models/Mountain.gltf"); // Replace with actual path
  return <primitive object={mountain.scene} scale={2} position={[2, 0, -3]} />;
};
const TerrenModel = () => {
  const mountain = useGLTF("/models/uploads_files_2708212_terrain.gltf"); // Replace with actual path
  return <primitive object={mountain.scene} scale={2} position={[2, 0, -3]} />;
};

// Dropdown component
const CustomDropdown = ({ label, options, id }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(options[0]);
  const dropdownRef = useRef(null);

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  return (
    <div className="custom-dropdown" ref={dropdownRef}>
      <label htmlFor={id}>{label}</label>
      <div className="dropdown-wrapper" onClick={() => setIsOpen(!isOpen)}>
        <div className="dropdown-selected">{selected}</div>
        <div className={`dropdown-arrow ${isOpen ? "open" : ""}`}>&#9662;</div>
        <AnimatePresence>
          {isOpen && (
            <motion.ul
              className="dropdown-options"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {options.map((option, index) => (
                <li key={index} onClick={() => handleSelect(option)}>
                  {option}
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// Main Page Component
const Page1 = () => {
  const width = useResponsive();

  // Responsive form positions
  let formX, formY;
  if (width < 480) {
   formX = -50;
   formY = -100;
  } else if (width < 768) {
    formX = -20;
    formY = -40;
  } else if (width < 1024) {
    formX = -60;
    formY = -280;
  } else {
    formX = -160;
    formY = -140;
  }

  return (
    <div className="container">
      <motion.div
        className="scene-wrapper"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mountain">
          <Canvas camera={{ position: [0, 1, 5], fov: 60 }}>
            <Suspense fallback={null}>
              <Sky sunPosition={[100, 20, 100]} />
              <Environment preset="sunset" />
              {/* <mesh rotation={[-0.5 * Math.PI, 0, 0]} receiveShadow>
                <planeGeometry args={[100, 100]} />
                <meshStandardMaterial color="#445" />
              </mesh>
              <mesh position={[0, 0.5, 0]} castShadow>
                <coneGeometry args={[1, 2, 16]} />
                <meshStandardMaterial color="#8866ff" />
              </mesh> */}
              <MountainModel />
              <TerrenModel/>
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

      <motion.div
        className="form-container"
        initial={{ x: 150, y: 200, opacity: 0 }}
        animate={{ x: formX, y: formY, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 70,
          damping: 10,
          delay: 1.2,
        }}
      >
        <form>
          <div className="form-group">
            <CustomDropdown
              id="mode-select"
              label="Customization Options:"
              options={[
                "Energy-efficient mode",
                "Low latency mode",
                "High accuracy mode",
                "Optimization for speed",
                "Balanced performance",
                "Custom parameters",
              ]}
            />
          </div>

          <div className="form-group">
            <CustomDropdown
              id="advanced-1"
              label="Advanced Customization:"
              options={["Neural Network"]}
            />
            <CustomDropdown id="advanced-2" label="" options={["Multi-GPU"]} />
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Page1;
