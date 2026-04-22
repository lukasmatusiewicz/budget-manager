import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars

const pageVariants = {
  initial: {
    opacity: 0,
    x: 20
  },
  in: {
    opacity: 1,
    x: 0,
    position: 'relative'
  },
  out: {
    opacity: 0,
    x: -20,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%'
  }
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.3
};

const AnimatedView = ({ children }) => {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      style={{ width: '100%' }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedView;
