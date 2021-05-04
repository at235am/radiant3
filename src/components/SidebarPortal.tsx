import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const SidebarPortal = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState<Boolean>(false);
  const safeElement = document.getElementById("root") as Element;
  const sidebarPortalElement = useRef<Element>(safeElement);

  useEffect(() => {
    setMounted(true);
    sidebarPortalElement.current = document.getElementById(
      "sidebar-portal"
    ) as Element;
  }, []);

  return mounted
    ? createPortal(
        children,
        sidebarPortalElement.current
          ? sidebarPortalElement.current
          : safeElement
      )
    : null;
};

export default SidebarPortal;
