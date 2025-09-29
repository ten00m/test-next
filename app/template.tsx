'use client';

import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { pageVariants } from '@/src/shared/lib/animations/variants';

export default function Template({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <motion.div
            key={pathname}
            variants={pageVariants}
            initial="initial"
            animate="in"
            exit="out"
            transition={{
                type: "tween",
                ease: "anticipate",
                duration: 0.8
            }}
            className="flex flex-col items-center justify-center px-[15%] py-10"
        >
            {children}
        </motion.div>
    );
}