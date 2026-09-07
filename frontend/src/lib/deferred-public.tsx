import dynamic from "next/dynamic";
import type { ReactNode } from "react";
import { LazyWhenVisible } from "@/components/lazy-when-visible";

export const DeferredCoursesCatalog = dynamic(() =>
  import("@/components/khoa-hoc/courses-catalog").then((m) => ({
    default: m.CoursesCatalogSection,
  })),
);

export const DeferredTeachersSection = dynamic(() =>
  import("@/components/home/teachers-section").then((m) => ({
    default: m.TeachersSection,
  })),
);

export const DeferredFinalCta = dynamic(() =>
  import("@/components/home/final-cta").then((m) => ({ default: m.FinalCta })),
);

export const DeferredCoursesTeaser = dynamic(() =>
  import("@/components/home/courses-teaser").then((m) => ({
    default: m.CoursesTeaserSection,
  })),
);

export function BelowFold({
  children,
  minHeight = 360,
}: {
  children: ReactNode;
  minHeight?: number;
}) {
  return <LazyWhenVisible minHeight={minHeight}>{children}</LazyWhenVisible>;
}
