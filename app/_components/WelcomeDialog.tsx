"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { Hand, X } from "lucide-react";
import {
  MAX_NAME_LENGTH,
  OPEN_EVT,
  clearVisitorName,
  setVisitorName,
  skipVisitorName,
  useVisitor,
} from "./visitorName";

/** 初次造訪時詢問訪客稱呼；之後可從導覽列再次開啟修改 */
export default function WelcomeDialog() {
  const visitor = useVisitor();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");

  // 尚未設定稱呼、也沒有略過 → 自動開啟
  const shouldPrompt = visitor !== null && !visitor.name && !visitor.skipped;
  useEffect(() => {
    if (shouldPrompt && !dialogRef.current?.open) dialogRef.current?.showModal();
  }, [shouldPrompt]);

  // 導覽列「修改稱呼」
  useEffect(() => {
    const open = () => {
      if (inputRef.current) inputRef.current.value = visitor?.name ?? "";
      setError("");
      dialogRef.current?.showModal();
    };
    window.addEventListener(OPEN_EVT, open);
    return () => window.removeEventListener(OPEN_EVT, open);
  }, [visitor?.name]);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const name = inputRef.current?.value.trim() ?? "";
    if (!name) return setError("請輸入你的稱呼");
    if (name.length > MAX_NAME_LENGTH) return setError(`稱呼最多 ${MAX_NAME_LENGTH} 個字`);
    setVisitorName(name);
    dialogRef.current?.close();
  }

  function skip() {
    if (!visitor?.name) skipVisitorName();
    dialogRef.current?.close();
  }

  return (
    <dialog
      ref={dialogRef}
      onCancel={skip}
      aria-labelledby="welcome-title"
      className="m-auto w-[calc(100%-2rem)] max-w-sm rounded-sm border border-white/10 bg-neutral-950 p-0 text-white backdrop:bg-black/70 backdrop:backdrop-blur-sm open:animate-fade-up"
    >
      <form onSubmit={handleSubmit} noValidate className="relative p-6 sm:p-8">
        <button
          type="button"
          aria-label="略過"
          onClick={skip}
          className="absolute right-4 top-4 rounded-sm p-1 text-neutral-400 hover:bg-white/10 hover:text-white"
        >
          <X size={18} />
        </button>

        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5">
          <Hand size={18} className="text-neutral-200" />
        </span>
        <h2 id="welcome-title" className="mt-5 text-2xl font-light tracking-tight">
          歡迎來到 BMW i7
        </h2>
        <p className="mt-2 text-sm text-neutral-500">請問我們該如何稱呼你？</p>

        <label htmlFor="visitor-name" className="mt-6 block font-mono text-xs text-neutral-400">
          你的稱呼
        </label>
        <input
          ref={inputRef}
          id="visitor-name"
          type="text"
          autoComplete="nickname"
          autoFocus
          maxLength={MAX_NAME_LENGTH}
          placeholder="例如：王先生、Eddy"
          defaultValue={visitor?.name ?? ""}
          aria-invalid={!!error}
          aria-describedby={error ? "visitor-name-error" : undefined}
          onChange={() => error && setError("")}
          className={`mt-2 w-full rounded-sm border bg-black px-4 py-2.5 text-sm text-white placeholder:text-neutral-600 focus:outline-none ${
            error ? "border-red-500/70 focus:border-red-400" : "border-white/10 focus:border-white/60"
          }`}
        />
        {error && (
          <p id="visitor-name-error" className="mt-2 text-xs text-red-400">
            {error}
          </p>
        )}

        <div className="mt-6 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={visitor?.name ? () => { clearVisitorName(); dialogRef.current?.close(); } : skip}
            className="rounded-sm border border-white/15 py-2.5 font-mono text-xs text-neutral-300 hover:border-white/40"
          >
            {visitor?.name ? "清除稱呼" : "先略過"}
          </button>
          <button type="submit" className="rounded-sm bg-white py-2.5 font-mono text-xs font-medium text-black">
            確定
          </button>
        </div>
        <p className="mt-4 font-mono text-[10px] text-neutral-600">稱呼只會儲存在你的瀏覽器中。</p>
      </form>
    </dialog>
  );
}
