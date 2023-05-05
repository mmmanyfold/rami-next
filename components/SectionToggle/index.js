"use client";
import { useState } from "react";
import CaretRight from "../../icon/CaretRight";
import CaretDown from "../../icon/CaretDown";
import "./index.scss";

function SectionToggle({ onToggle, isActive, activeSection, label }) {
  const active = activeSection ? activeSection === label : isActive;

  return (
    <div
      onClick={() => onToggle(label)}
      role="button"
      className={`section-toggle ${active ? "active" : ""}`}
      aria-expanded={active}
    >
      {active ? <CaretDown /> : <CaretRight />}
      <h1>{label}</h1>
    </div>
  );
}

export default SectionToggle;
