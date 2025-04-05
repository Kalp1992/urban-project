import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Page1 from "./component/page1";
import Page2 from "./component/Page2";
import Page3 from "./component/Page3";
import "./App.css";

export default function App() {
  const [pageIndex, setPageIndex] = useState(0);
  const [seenLists, setSeenLists] = useState([false, false, false]);
  const [showText1, setShowText1] = useState(true);
  const [showText2, setShowText2] = useState(true);

  const [showText3, setShowText3] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setPageIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % 3;
        setSeenLists((prev) => {
          const updated = [...prev];
          updated[nextIndex] = true;
          return updated;
        });
        return nextIndex;
      });
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const pages = [
    <Page1 key="page1" />,
    <Page2 key="page2" />,
    <Page3 key="page3" />,
  ];

  const List1 = () => {
    useEffect(() => {
      const timer = setTimeout(() => setShowText1(false), 4000);
    }, []);
    return (
      <div className="list-content">
        {/* Text Section with animation */}
        <motion.div style={{ flex: 1 }} className="content-of-list">
          <AnimatePresence mode="wait">
            {showText1 ? (
              <motion.div
                key="scrolling-text"
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 0, y: -50 }}
                exit={{ opacity: 0, y: -100 }}
                transition={{ duration: 1.2, delay: 3 }}
                className="scrolling-text"
              >
                <h1>Customizable product</h1>
                <p>
                  Neoleaf provides advanced customization tools that deliver top
                  model performance at a competitive interface cost.
                </p>
              </motion.div>
            ) : null}
          </AnimatePresence>
          <div className="custom-item">
            <p>Custom</p>
            <span className="three-dots">...</span>
          </div>
        </motion.div>

        {/* Dots Grid Section */}
        <div style={{ flexShrink: 0 }}>
          <ul className="dot-grid">
            {[...Array(9)].map((_, i) => (
              <li key={i}>
                <div
                  style={{
                    background: [1, 2, 4, 6, 8].includes(i)
                      ? "rgba(248, 248, 11, 0.9)" // shining yellow
                      : "gray",
                  }}
                  className="circle-dot"
                ></div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };
  const List2 = () => {
    useEffect(() => {
      const timer = setTimeout(() => setShowText2(false), 4000);
    }, []);
    return (
      <AnimatePresence mode="wait">
        <div className="list-content">
          {/* Text Section */}
          <motion.div style={{ flex: 1 }} className="content-of-list">
            <AnimatePresence mode="wait">
              {showText2 && (
                <motion.div
                  key="scrolling-text-2"
                  initial={{ opacity: 1, y: 0 }}
                  animate={{ opacity: 0, y: -50 }}
                  exit={{ opacity: 0, y: -100 }}
                  transition={{ duration: 1.2, delay: 3 }}
                  className="scrolling-text"
                >
                  <h1>Flexibility and Diversity</h1>
                  <p>
                    Neoleaf delivers the greatest variety and diversity of data
                    to help deliver the greatest value to your product
                    performance.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="custom-item">
              <p>Flex</p>
              <span className="three-dots">...</span>
            </div>
          </motion.div>

          {/* Dots Grid Section */}
          <div style={{ flexShrink: 0 }}>
            <ul className="dot-grid">
              {[...Array(9)].map((_, i) => (
                <li key={i}>
                  <div
                    style={{
                      background: [0, 2, 6, 8].includes(i)
                        ? "rgba(248, 248, 11, 0.7)"
                        : "gray",
                    }}
                    className="circle-dot"
                  ></div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </AnimatePresence>
    );
  };
  const List3 = () => {
    useEffect(() => {
      const timer = setTimeout(() => setShowText3(false), 4000);
    }, []);
    return (
      <AnimatePresence mode="wait">
        <div className="list-content">
          {/* Text Content */}
          <motion.div style={{ flex: 1 }} className="content-of-list">
            <AnimatePresence mode="wait">
              {showText3 && (
                <motion.div
                  key="scrolling-text-3"
                  initial={{ opacity: 1, y: 0 }}
                  animate={{ opacity: 0, y: -50 }}
                  exit={{ opacity: 0, y: -100 }}
                  transition={{ duration: 1.2, delay: 3 }}
                  className="scrolling-text"
                >
                  <h1>Scalability</h1>
                  <p style={{ wordWrap: "break-word" }}>
                    Neoleaf is packaged with inference engines that deliver
                    better runtime performance at a lower cost. Scale up, or
                    down, as needed.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="custom-item">
              <p>Performance</p>
              <span className="three-dots">...</span>
            </div>
          </motion.div>

          {/* Grid of Dots */}
          <div style={{ flexShrink: 0 }}>
            <ul className="dot-grid">
              {[...Array(9)].map((_, i) => (
                <li key={i}>
                  <div
                    style={{
                      background: [1, 2, 3, 5, 6, 8].includes(i)
                        ? "rgba(248, 248, 11, 0.7)"
                        : "gray",
                    }}
                    className="circle-dot"
                  ></div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </AnimatePresence>
    );
  };
  const renderAllLists = () => {
    return (
      <>
        {seenLists[0] && <List1 key="list1" />}
        {seenLists[1] && <List2 key="list2" />}
        {seenLists[2] && <List3 key="list3" />}
      </>
    );
  };

  return (
    <>
      <div className="the-heading">
        <h1>The best in the bussiness</h1>
      </div>
      <div className="super-container">
        <AnimatePresence mode="wait">
          <motion.div
            key={`page-${pageIndex}`}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 2 }}
          >
            {pages[pageIndex]}
          </motion.div>
        </AnimatePresence>

        <div className="custom-list">
          {/* Only animate IN when list first appears */}
          <AnimatePresence>
            {seenLists.map((seen, index) =>
              seen ? (
                <motion.div
                  key={`list-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={false} // no exit animation
                  transition={{ duration: 1 }}
                >
                  {[<List1 />, <List2 />, <List3 />][index]}
                </motion.div>
              ) : null
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
