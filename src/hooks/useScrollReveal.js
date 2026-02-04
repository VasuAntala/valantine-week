import { useRef, useEffect } from 'react';
import { useInView } from 'framer-motion';

export const useScrollReveal = (options = { once: true, amount: 0.3 }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, options);

    return { ref, isInView };
};
