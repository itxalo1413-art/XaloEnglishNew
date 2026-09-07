"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type LazyWhenVisibleProps = {
  children: ReactNode;
  className?: string;
  minHeight?: number;
  rootMargin?: string;
};

/** Chỉ mount children khi section sắp vào viewport — giảm JS/ảnh tải lúc mở trang. */
export function LazyWhenVisible({
  children,
  className,
  minHeight = 320,
  rootMargin = "240px 0px",
}: LazyWhenVisibleProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || visible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setVisible(true);
        observer.disconnect();
      },
      { rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin, visible]);

  return (
    <div
      ref={ref}
      className={className}
      style={visible ? undefined : { minHeight, contentVisibility: "auto" as const }}
      aria-busy={!visible}
    >
      {visible ? children : null}
    </div>
  );
}
