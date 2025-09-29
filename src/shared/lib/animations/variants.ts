export const pageVariants = {
    initial: (direction: number) => ({
        x: direction > 0 ? 300 : -300,
        opacity: 0,
        scale: 0.98
    }),
    in: {
        x: 0,
        opacity: 1,
        scale: 1
    },
    out: (direction: number) => ({
        x: direction > 0 ? -300 : 300,
        opacity: 0,
        scale: 0.98
    })
};

export const slideUpVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { duration: 0.5, ease: "easeOut" }
    }
};

export const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};