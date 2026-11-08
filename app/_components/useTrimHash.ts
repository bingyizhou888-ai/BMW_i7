"use client";

import { useEffect } from "react";
import type { Trim } from "../_data/cars";

/** 監聽 #<prefix>-<trimId> 錨點：切換車型並捲動到指定區塊 */
export function useTrimHash(
  prefix: string,
  sectionId: string,
  onTrim: (id: Trim["id"]) => void,
) {
  useEffect(() => {
    function handle() {
      const m = window.location.hash.match(new RegExp(`^#${prefix}-(edrive50|xdrive60|m70)$`));
      if (!m) return;
      onTrim(m[1] as Trim["id"]);
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    }
    handle();
    window.addEventListener("hashchange", handle);
    return () => window.removeEventListener("hashchange", handle);
  }, [prefix, sectionId, onTrim]);
}
