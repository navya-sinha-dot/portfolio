"use client";

import React, { useState, useRef, useMemo } from "react";
import { motion, useAnimationControls, AnimatePresence } from "framer-motion";

interface InteractiveBookProps {
    width?: number;
    height?: number;
    borderRadius?: number;
    pages: React.ReactNode[];
    onClose?: () => void;
}

export const InteractiveBook: React.FC<InteractiveBookProps> = ({
    width = 450,
    height = 600,
    borderRadius = 8,
    pages,
    onClose,
}) => {
    const [flippedCount, setFlippedCount] = useState(0);
    const [isBookClosed, setIsBookClosed] = useState(true);

    // Total leaves (sheets of paper) is pages.length / 2 (ceiling if odd)
    const leafPairs = useMemo(() => {
        const pairs: [React.ReactNode, React.ReactNode][] = [];
        for (let i = 0; i < pages.length; i += 2) {
            pairs.push([pages[i], pages[i + 1] || null]);
        }
        return pairs;
    }, [pages]);

    const totalLeaves = leafPairs.length;

    // Simplified animation: no more controlsPool (which violated hook rules)
    const bookContainerAnimate = {
        x: isBookClosed ? 0 : width / 2,
    };

    const handleClick = (e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const isLeftSide = x < rect.width / 2;

        if (isLeftSide) {
            // FLIP BACKWARD
            if (flippedCount > 0) {
                setFlippedCount((prev) => prev - 1);
                if (flippedCount === 1) {
                    setIsBookClosed(true);
                }
            }
        } else {
            // FLIP FORWARD
            if (flippedCount < totalLeaves) {
                if (isBookClosed) setIsBookClosed(false);
                setFlippedCount((prev) => prev + 1);
            } else {
                // Return to start
                setFlippedCount(0);
                setIsBookClosed(true);
            }
        }
    };

    const faceStyle: React.CSSProperties = {
        position: "absolute",
        inset: 0,
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        backgroundColor: "#FDFCF8", // Creamy paper color
        overflow: "hidden",
        boxShadow: "inset 3px 0 10px rgba(0,0,0,0.05)",
    };

    const spineGradient: React.CSSProperties = {
        position: "absolute",
        left: 0,
        top: 0,
        bottom: 0,
        width: "15%",
        background: "linear-gradient(to right, rgba(0,0,0,0.12), transparent)",
        pointerEvents: "none",
        zIndex: 10,
    };

    return (
        <div
            className="flex items-center justify-center relative select-none"
            style={{
                perspective: 2500,
                width: "100%",
                height: "100%",
                cursor: "pointer",
            }}
            onClick={handleClick}
        >
            <motion.div
                animate={bookContainerAnimate}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                initial={{ x: 0 }}
                style={{
                    width,
                    height,
                    position: "relative",
                    transformStyle: "preserve-3d",
                    boxShadow: isBookClosed
                        ? "10px 10px 30px rgba(0,0,0,0.2)"
                        : "0px 0px 0px transparent",
                    willChange: "transform",
                }}
            >
                {leafPairs.map(([frontContent, backContent], index) => {
                    const isFlipped = index < flippedCount;
                    const zOffset = isFlipped ? index * 0.5 : (totalLeaves - index) * 0.5;
                    const zIndex = isFlipped ? index : totalLeaves - index;

                    return (
                        <motion.div
                            key={index}
                            animate={{ rotateY: isFlipped ? -180 : 0 }}
                            transition={{
                                duration: 0.8,
                                ease: [0.4, 0, 0.2, 1],
                                delay: isFlipped ? 0 : (flippedCount - index) * 0.05 // Staggered close
                            }}
                            initial={{ rotateY: 0 }}
                            style={{
                                position: "absolute",
                                inset: 0,
                                transformOrigin: "left center",
                                transformStyle: "preserve-3d",
                                zIndex: zIndex,
                                transform: `translateZ(${zOffset}px)`,
                                willChange: "transform",
                            }}
                        >
                            {/* FRONT OF LEAF */}
                            <div
                                style={{
                                    ...faceStyle,
                                    borderRadius: `0px ${borderRadius}px ${borderRadius}px 0px`,
                                }}
                            >
                                {frontContent}
                                <div style={spineGradient} />
                            </div>

                            {/* BACK OF LEAF */}
                            <div
                                style={{
                                    ...faceStyle,
                                    transform: "rotateY(180deg) translateZ(0.1px)",
                                    borderRadius: `${borderRadius}px 0px 0px ${borderRadius}px`,
                                }}
                            >
                                {backContent}
                                <div
                                    style={{
                                        ...spineGradient,
                                        left: "auto",
                                        right: 0,
                                        transform: "scaleX(-1)",
                                    }}
                                />
                            </div>
                        </motion.div>
                    );
                })}
            </motion.div>

            {onClose && (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onClose();
                    }}
                    className="absolute top-4 right-4 text-[#1A2A3A]/40 hover:text-[#1A2A3A] transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
            )}
        </div>
    );
};
