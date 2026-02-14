"use client";

import React, { useState } from 'react';
import { Book } from './Book';
import { categories, projects, experiences } from '@/lib/portfolioData';

interface BookshelfProps {
    onOpenArchive?: (type: string) => void;
    openBookId: string | null;
    onBookToggle: (id: string | null) => void;
}

export const Bookshelf: React.FC<BookshelfProps> = ({
    onOpenArchive,
    openBookId,
    onBookToggle
}) => {
    const handleOpenBook = (id: string | null) => {
        onBookToggle(id);
        if (id && onOpenArchive) {
            // Find category to get type
            const cat = categories.find(c => c.title === id);
            if (cat) {
                onOpenArchive(cat.id);
            }
        }
    };

    return (
        <group position={[0, -2, 0]}>
            {/* Modern Minimalist Shelf */}
            <mesh position={[0, -0.1, 0.2]}>
                <boxGeometry args={[12, 0.1, 2]} />
                <meshStandardMaterial
                    color="#D7C2A3"
                    roughness={0.9}
                    metalness={0}
                />
            </mesh>

            {/* Books */}
            {categories.map((cat, index) => {
                let content = null;
                if (cat.id === 'projects') content = projects;
                if (cat.id === 'experience') content = experiences;

                // Aggressively thin & spaced for clear "Archive" separation
                // Thickness (X), Height (Y), Depth (Z into shelf)
                const bookThicknesses = [0.7, 0.7, 0.8, 0.9];
                const bookHeights = [4.2, 4.8, 3.8, 4.5];
                const bookDepths = [2.8, 3.2, 2.5, 3.0];
                const spacing = 1.5;

                return (
                    <Book
                        key={cat.id}
                        title={cat.title}
                        color={cat.color}
                        index={index}
                        type={cat.id as any}
                        content={content}
                        isOpen={openBookId === cat.title}
                        onOpen={handleOpenBook}
                        width={bookThicknesses[index % bookThicknesses.length]}
                        height={bookHeights[index % bookHeights.length]}
                        depth={bookDepths[index % bookDepths.length]}
                        spacing={spacing}
                    />
                );
            })}
        </group>
    );
};
