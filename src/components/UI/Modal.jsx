import { useRef } from "react";
import { useEffect } from "react";
import { createPortal } from "react-dom";

export default function Modal({ children, open, className = "" }) {
  const modalRef = useRef(null);

  useEffect(() => {
    if (open) modalRef.current.showModal();

    return () => modalRef.current.close();
    
  }, [open]);

  return createPortal(
    <dialog ref={modalRef} className={`modal ${className}`}>
      {children}
    </dialog>,
    document.getElementById("modal"),
  );
}
