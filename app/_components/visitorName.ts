"use client";

import { useSyncExternalStore } from "react";

/** 訪客稱呼：存在 localStorage，下次造訪直接顯示 */
const KEY = "i7-visitor-name";
const NEW_KEY = "i7-visitor-name-new"; // 本次分頁中才剛設定（顯示「歡迎」而非「歡迎回來」）
const SKIP_KEY = "i7-visitor-name-skip"; // 本次分頁中選擇略過
const EVT = "i7-visitor-name-change";
export const OPEN_EVT = "i7-open-welcome";
export const MAX_NAME_LENGTH = 20;

// localStorage 無法使用（如部分無痕模式）時的記憶體備援
let memory: { name: string | null; isNew: boolean; skipped: boolean } = {
  name: null,
  isNew: false,
  skipped: false,
};

function read<T>(fn: () => T, fallback: T): T {
  try {
    return fn();
  } catch {
    return fallback;
  }
}

function subscribe(cb: () => void) {
  window.addEventListener("storage", cb);
  window.addEventListener(EVT, cb);
  return () => {
    window.removeEventListener("storage", cb);
    window.removeEventListener(EVT, cb);
  };
}

// 快取快照，確保同樣的值回傳同一個物件（useSyncExternalStore 的要求）
let cache = { key: "", value: { name: null as string | null, isNew: false, skipped: false } };

function getSnapshot() {
  const name = read(() => localStorage.getItem(KEY), null) ?? memory.name;
  const isNew = read(() => sessionStorage.getItem(NEW_KEY) === "1", false) || memory.isNew;
  const skipped = read(() => sessionStorage.getItem(SKIP_KEY) === "1", false) || memory.skipped;
  const key = JSON.stringify([name, isNew, skipped]);
  if (key !== cache.key) cache = { key, value: { name, isNew, skipped } };
  return cache.value;
}

/** 伺服器端尚不知道訪客資訊：回傳 null，前端掛載後才顯示 */
const getServerSnapshot = () => null;

export function useVisitor() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function setVisitorName(raw: string) {
  const name = raw.trim().slice(0, MAX_NAME_LENGTH);
  if (!name) return;
  memory = { ...memory, name, isNew: true };
  read(() => localStorage.setItem(KEY, name), undefined);
  read(() => sessionStorage.setItem(NEW_KEY, "1"), undefined);
  window.dispatchEvent(new Event(EVT));
}

export function skipVisitorName() {
  memory = { ...memory, skipped: true };
  read(() => sessionStorage.setItem(SKIP_KEY, "1"), undefined);
  window.dispatchEvent(new Event(EVT));
}

export function clearVisitorName() {
  memory = { name: null, isNew: false, skipped: true };
  read(() => localStorage.removeItem(KEY), undefined);
  read(() => sessionStorage.removeItem(NEW_KEY), undefined);
  window.dispatchEvent(new Event(EVT));
}

export function openWelcome() {
  window.dispatchEvent(new Event(OPEN_EVT));
}
