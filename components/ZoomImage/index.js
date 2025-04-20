"use client";
import { useState, useEffect, useCallback, useMemo } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import NavArrows from "../NavArrows";
import X from "../../icon/X";
import { BREAKPOINTS } from "../../config/breakpoints";
import "./index.scss";

const getContentHeight = () => {
  return window.innerHeight - (window.innerWidth < BREAKPOINTS.MID ? 94 : 118);
}

const getImageAlt = (block) => {
  return block.caption?.map(block => block.plain_text).join();
}

const ZoomImage = ({ imageBlock, allImageBlocks }) => {
  const [contentHeight, setContentHeight] = useState(getContentHeight());
  const [dialogOpen, setDialogOpen] = useState(false);
  const [zoomImageBlock, setZoomImageBlock] = useState(imageBlock);
  const [zoomMode, setZoomMode] = useState(false);
  
  const [isDragging, setIsDragging] = useState(false);
  const [mouseDownPos, setMouseDownPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    function handleResize() {
      setContentHeight(getContentHeight());
    }
    window.addEventListener("resize", handleResize);
    return (_) => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleTransformStart = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleTransformEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleMouseDown = (e) => {
    setMouseDownPos({ x: e.clientX, y: e.clientY });
  };

  const handleClick = (e) => {
    const dx = e.clientX - mouseDownPos.x;
    const dy = e.clientY - mouseDownPos.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance < 5 && !isDragging) {
      setZoomMode(false);
    }
  };

  const currentZoomIndex = useMemo(() => 
    allImageBlocks.indexOf(zoomImageBlock),
    [allImageBlocks, zoomImageBlock]
  );

  const handlePreviousClick = useCallback(() => {
    const prevImageUrl = 
      currentZoomIndex > 0 ? (
        allImageBlocks[currentZoomIndex - 1]
      ) : (
        allImageBlocks[allImageBlocks.length - 1]
      )
    setZoomImageBlock(prevImageUrl);
    setZoomMode(false);
  }, [allImageBlocks, currentZoomIndex])

  const handleNextClick = useCallback(() => {
    const nextImageUrl = currentZoomIndex < allImageBlocks.length - 1 ? (
      allImageBlocks[currentZoomIndex + 1]
    ) : (
      allImageBlocks[0]
    );
    setZoomImageBlock(nextImageUrl);
    setZoomMode(false);
  }, [allImageBlocks, currentZoomIndex])

  const zoomImage = useMemo(() => (
    <img
      src={zoomImageBlock.file.url}
      alt={getImageAlt(zoomImageBlock)}
      loading="lazy"
      style={{
        height: "100%",
        maxWidth: "100%",
        objectFit: "contain",
      }}
    />
  ), [zoomImageBlock]);

  return (
    <Dialog.Root
      open={dialogOpen}
      onOpenChange={(open) => {
        setDialogOpen(open);
        setZoomImageBlock(imageBlock);
        setZoomMode(false);
      }}
    >
      <Dialog.Trigger asChild>
        <img
          src={imageBlock.file.url}
          alt={getImageAlt(imageBlock)}
          loading="lazy"
          className="zoom-trigger"
          style={{ width: "100%" }}
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
            <div 
              className="zoom-image-container"
              onMouseDown={handleMouseDown}
              onClick={handleClick}
            >
              <TransformWrapper
                onTransformationStart={handleTransformStart}
                onTransformationEnd={handleTransformEnd}
                centerOnInit={true}
              >
                <TransformComponent
                  wrapperStyle={{
                    maxHeight: `${contentHeight}px`,
                    maxWidth: "100%",
                    margin: "auto",
                  }}
                >
                  {zoomImage}
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
              {zoomImage}
            </div>
          )}
          <NavArrows 
            onLeftClick={handlePreviousClick}
            onRightClick={handleNextClick}
          />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ZoomImage;
