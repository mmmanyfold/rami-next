"use client";
import { useState } from "react";
import SectionToggle from "../SectionToggle";
import InfoSection from "../InfoSection";
import CVSection from "../CVSection";

function SectionDrawer({ name, type, items, isNested = false, children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section>
      {name && (
        <SectionToggle
          label={name}
          isActive={isOpen}
          onToggle={() => setIsOpen(!isOpen)}
        />
      )}

      {isOpen && (
        <div style={{ transition: "slide 300ms" }}>
          {type === "cv" ? (
            <CVSection items={items} isNested={isNested} />
          ) : type === "info" ? (
            <InfoSection items={items} />
          ) : children}
        </div>
      )}
    </section>
  );
}

export default SectionDrawer;
