import React, { FC, PropsWithChildren, useEffect } from "react";

interface OffCanvasProps extends PropsWithChildren {
  show?: boolean;
  close?: () => void;
}

const OffCanvas: FC<OffCanvasProps> = ({ children, show = false, close }) => {
  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [show]);
  return (
    <>
      {children}
      {show ? (
        <div
          className="fixed left-0 top-0 bottom-0 right-0 bg-black bg-opacity-50 z-[10]"
          onClick={() => close && close()}
        ></div>
      ) : null}
    </>
  );
};

export default OffCanvas;
