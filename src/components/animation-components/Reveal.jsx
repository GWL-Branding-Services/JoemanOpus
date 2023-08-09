import { motion, useAnimation, useInView } from "framer-motion";
import React, { useEffect, useRef } from "react";

function Reveal({ children, Rdelay, Rfrom, Rto, RXfrom, RXto, Rduration }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const mainControl = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControl.start("visible");
    } 
  }); // Add isInView as a dependency to re-run the effect when it changes

  return (
    <div className="overflow-hidden  h-auto  relative">
      <motion.div
        ref={ref} // Set the ref on the div element
        variants={{
          hidden: { opacity: 0, y: Rfrom, x: RXfrom },
          visible: {
            opacity: 1,
            y: Rto,
            x: RXto,
            transition: { duration: Rduration, delay: Rdelay },
          },
        }}
        initial="hidden"
        animate={mainControl}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 10,
          // delay: Rdelay,
          // duration: Rduration,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export default Reveal;
export { Scale };

function Scale({ children }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const mainControl = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControl.start("visible");
    } 
  }); // Add isInView as a dependency to re-run the effect when it changes

  return (
    <motion.div
      ref={ref}
      variants={{
        hidden: { opacity: 0, scale: 0 },
        visible: {
          opacity: 1,
          scale: 1,
          transition: { delay: 1, duration: 2.8 },
        },
      }}
      initial="hidden"
      animate={mainControl}
      transition={{
        delay: 1.9,
        duration: 2.8,
        // ease: [0, 0.71, 0.2, 1.01],
      }}
      className=" h-auto "
    >
      {children}
    </motion.div>
  );
}
