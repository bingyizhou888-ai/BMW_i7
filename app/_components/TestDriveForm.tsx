"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, CircleAlert } from "lucide-react";
import DateSelect from "./DateSelect";

const purposes = ["預約試駕", "索取正式報價", "舊車換購估價"];

// 需有 @、網域，且結尾為至少 2 碼英文字母的頂級網域（例：name@yahoo.com）
const EMAIL_RE = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?)*\.[A-Za-z]{2,}$/;

type Field = "name" | "phone" | "email";
type Errors = Partial<Record<Field, string>>;

function validate(field: Field, raw: string): string | undefined {
  const v = raw.trim();
  if (field === "name" && !v) return "請輸入姓名";
  if (field === "phone" && !v) return "請輸入聯絡電話";
  if (field === "email" && v) {
    if (!v.includes("@")) return "Email 需包含「@」，例如 name@example.com";
    if (!EMAIL_RE.test(v)) return "Email 格式不正確，請確認網域是否完整（例如 @yahoo.com）";
  }
  return undefined;
}

const inputClass = (err?: string) =>
  `rounded-sm border bg-black px-4 py-2.5 text-sm text-white placeholder:text-neutral-500 focus:outline-none ${
    err ? "border-red-500/70 focus:border-red-400" : "border-white/10 focus:border-white/60"
  }`;

function FieldError({ id, msg }: { id: string; msg?: string }) {
  if (!msg) return null;
  return (
    <p id={id} className="flex items-center gap-1 text-xs text-red-400">
      <CircleAlert size={12} className="shrink-0" /> {msg}
    </p>
  );
}

export default function TestDriveForm() {
  const [submitted, setSubmitted] = useState(false);
  const [purpose, setPurpose] = useState(purposes[0]);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});

  const check = (field: Field, value: string) =>
    setErrors((prev) => ({ ...prev, [field]: validate(field, value) }));

  // 離開欄位時驗證；驗證過一次後，輸入時即時更新錯誤訊息
  const fieldProps = (field: Field) => ({
    name: field,
    "aria-invalid": !!errors[field],
    "aria-describedby": errors[field] ? `${field}-error` : undefined,
    onBlur: (e: { currentTarget: HTMLInputElement }) => {
      setTouched((t) => ({ ...t, [field]: true }));
      check(field, e.currentTarget.value);
    },
    onChange: (e: { currentTarget: HTMLInputElement }) => {
      if (touched[field]) check(field, e.currentTarget.value);
    },
    className: inputClass(errors[field]),
  });

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const next: Errors = {};
    (["name", "phone", "email"] as Field[]).forEach((f) => {
      const el = form.elements.namedItem(f) as HTMLInputElement | null;
      next[f] = validate(f, el?.value ?? "");
    });
    setErrors(next);
    setTouched({ name: true, phone: true, email: true });
    const firstInvalid = (["name", "phone", "email"] as Field[]).find((f) => next[f]);
    if (firstInvalid) {
      (form.elements.namedItem(firstInvalid) as HTMLInputElement | null)?.focus();
      return;
    }
    // 示範用表單：僅在前端顯示送出成功狀態，未連接任何後端或儲存資料。
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-sm border border-white/20 bg-neutral-950 p-10 text-center">
        <CheckCircle2 size={36} className="text-white" />
        <p className="text-lg font-semibold text-white">已收到你的「{purpose}」申請！</p>
        <p className="text-sm text-neutral-400">
          （示範頁面：此表單未實際送出資料，僅供介面練習用）
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-2 text-sm text-white underline underline-offset-4"
        >
          返回填寫表單
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="grid gap-5 rounded-sm border border-white/10 bg-neutral-950 p-8 sm:grid-cols-2"
    >
      <fieldset className="sm:col-span-2">
        <legend className="font-mono text-xs text-neutral-400">諮詢項目</legend>
        <div className="mt-2 grid grid-cols-3 gap-2">
          {purposes.map((p) => (
            <button
              key={p}
              type="button"
              aria-pressed={p === purpose}
              onClick={() => setPurpose(p)}
              className={`rounded-sm border py-2 font-mono text-xs transition-colors ${
                p === purpose
                  ? "border-white bg-white text-black"
                  : "border-white/15 text-neutral-300 hover:border-white/40"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="font-mono text-xs text-neutral-400">
          姓名
        </label>
        <input
          id="name"
          {...fieldProps("name")}
          type="text"
          placeholder="王小明"
        />
        <FieldError id="name-error" msg={errors.name} />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="phone" className="font-mono text-xs text-neutral-400">
          聯絡電話
        </label>
        <input
          id="phone"
          {...fieldProps("phone")}
          type="tel"
          placeholder="0912-345-678"
        />
        <FieldError id="phone-error" msg={errors.phone} />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="font-mono text-xs text-neutral-400">
          Email <span className="text-neutral-600">（選填）</span>
        </label>
        <input
          id="email"
          {...fieldProps("email")}
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="you@example.com"
        />
        <FieldError id="email-error" msg={errors.email} />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="trim" className="font-mono text-xs text-neutral-400">
          偏好車型
        </label>
        <select
          id="trim"
          name="trim"
          className="rounded-sm border border-white/10 bg-black px-4 py-2.5 text-sm text-white focus:border-white/60 focus:outline-none"
          defaultValue="xDrive60"
        >
          <option value="eDrive50">i7 eDrive50</option>
          <option value="xDrive60">i7 xDrive60</option>
          <option value="M70">i7 M70 xDrive</option>
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="center" className="font-mono text-xs text-neutral-400">
          偏好展示中心
        </label>
        <select
          id="center"
          name="center"
          className="rounded-sm border border-white/10 bg-black px-4 py-2.5 text-sm text-white focus:border-white/60 focus:outline-none"
          defaultValue="taipei"
        >
          <option value="taipei">台北展示中心</option>
          <option value="taichung">台中展示中心</option>
          <option value="kaohsiung">高雄展示中心</option>
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="date" className="font-mono text-xs text-neutral-400">
          偏好日期
        </label>
        <DateSelect id="date" name="date" />
      </div>

      <button
        type="submit"
        className="sm:col-span-2 mt-2 rounded-sm bg-white px-6 py-2.5 font-mono text-xs font-medium text-black transition-opacity hover:opacity-90"
      >
        送出 {purpose}
      </button>
    </form>
  );
}
