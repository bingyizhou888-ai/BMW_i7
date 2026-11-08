import TestDriveForm from "./TestDriveForm";
import SectionHeading from "./SectionHeading";
import { MapPin, Phone, Mail } from "lucide-react";

export default function TestDriveSection() {
  return (
    <section id="test-drive" className="scroll-mt-16 border-t border-white/10 bg-black py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <SectionHeading eyebrow="預約試駕 · 購車諮詢" title="一次試駕，" muted="親自感受純電豪華。" />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-neutral-500">
            留下聯絡方式，展示中心專人將與你聯繫，安排試駕、提供正式報價或舊車換購估價。
          </p>
          <div className="mt-10 space-y-4 font-mono text-xs text-neutral-400">
            <div className="flex items-center gap-2">
              <MapPin size={14} /> 台北 · 台中 · 高雄展示中心
            </div>
            <div className="flex items-center gap-2">
              <Phone size={14} /> 0800-000-000（示範電話）
            </div>
            <div className="flex items-center gap-2">
              <Mail size={14} /> i7@example.com（示範信箱）
            </div>
          </div>
        </div>

        <div>
          <TestDriveForm />
        </div>
      </div>
    </section>
  );
}
