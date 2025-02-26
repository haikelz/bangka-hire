"use client";

import { atom, useAtom } from "jotai";
import { useEffect } from "react";

const scrollAtom = atom<boolean>(false);

/**
 * A custom hook to detect user scroll
 * @export
 * @returns {boolean}
 */
export function useScroll(): boolean {
  const [isScroll, setIsScroll] = useAtom(scrollAtom);

  const handleScroll = () => {
    setIsScroll(window.scrollY > 50);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return isScroll;
}
