"use client";
import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";
import InnerImageZoom from "react-inner-image-zoom";
import X from "../../icon/X";
import "./index.scss";

const ZoomImage = ({ src, alt, fullWidth }) => (
  <Dialog.Root>
    <Dialog.Trigger asChild>
      <img
        className="zoom-trigger"
        src={src}
        style={fullWidth ? { width: "100%" } : null}
        alt={alt}
      />
    </Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className="zoom-overlay" />
      <Dialog.Content className="zoom-content">
        <Dialog.Close asChild>
          <div className="close-container">
            <X />
          </div>
        </Dialog.Close>
        <InnerImageZoom
          src={src}
          zoomSrc={src}
          hideCloseButton={true}
          hideHint={true}
        />
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);

export default ZoomImage;
