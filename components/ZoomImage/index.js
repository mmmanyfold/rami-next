"use client";
import { useState, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import X from "../../icon/X";
import "./index.scss";

const ZoomImage = ({ src, alt, fullWidth }) => {
  const [contentHeight, setContentHeight] = useState(window.innerHeight - 118);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [zoomMode, setZoomMode] = useState(false);

  useEffect(() => {
    function handleResize() {
      setContentHeight(window.innerHeight - 118);
    }
    window.addEventListener("resize", handleResize);

    return (_) => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Dialog.Root
      open={dialogOpen}
      onOpenChange={(open) => {
        setDialogOpen(open);
        setZoomMode(false);
      }}
    >
      <Dialog.Trigger asChild>
        <img
          className="zoom-trigger"
          src={src}
          style={fullWidth ? { width: "100%" } : null}
          alt={alt}
          loading="lazy"
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
          {zoomMode ? (
            <div className="zoom-image-container">
              <TransformWrapper>
                <TransformComponent
                  wrapperStyle={{
                    maxHeight: `${contentHeight}px`,
                    maxWidth: "100%",
                    margin: "auto",
                  }}
                >
                  <img src={src} alt={alt} loading="lazy" />
                </TransformComponent>
              </TransformWrapper>
            </div>
          ) : (
            <div
              className="zoom-thumbnail"
              style={{
                height: `${contentHeight}px`,
              }}
              onClick={() => setZoomMode(true)}
              role="button"
            >
              <img
                src={src}
                alt={alt}
                loading="lazy"
                style={{
                  height: "100%",
                  maxWidth: "100%",
                  objectFit: "contain",
                }}
              />
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ZoomImage;
