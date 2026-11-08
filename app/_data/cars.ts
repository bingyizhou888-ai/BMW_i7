import type { StaticImageData } from "next/image";

import e50Ext1 from "../../public/image/edrive50-1-exterior.jpg";
import e50Ext2 from "../../public/image/edrive50-2-exterior.jpg";
import e50Rear from "../../public/image/edrive50-3-rear-interior.jpg";
import e50Cockpit from "../../public/image/edrive50-4-cockpit.jpg";
import e50Charge from "../../public/image/edrive50-5-charging.jpg";
import x60Ext1 from "../../public/image/xdrive60-1-exterior.jpg";
import x60Ext2 from "../../public/image/xdrive60-2-exterior.jpg";
import x60Rear from "../../public/image/xdrive60-3-rear-interior.jpg";
import x60Cockpit from "../../public/image/xdrive60-4-cockpit.jpg";
import x60Charge from "../../public/image/xdrive60-5-charging.jpg";
import m70Ext1 from "../../public/image/m70-1-exterior.jpg";
import m70Ext2 from "../../public/image/m70-2-exterior.jpg";
import m70Rear from "../../public/image/m70-3-rear-interior.jpg";
import m70Cockpit from "../../public/image/m70-4-cockpit.jpg";
import m70Charge from "../../public/image/m70-5-charging.jpg";

export type Category = "exterior" | "rear" | "cockpit" | "charging";

export const categories: { key: Category; label: string; en: string }[] = [
  { key: "exterior", label: "外觀造型", en: "Exterior" },
  { key: "rear", label: "後座內裝", en: "Interior" },
  { key: "cockpit", label: "數位座艙", en: "Cockpit" },
  { key: "charging", label: "充電體驗", en: "Charging" },
];

export type Trim = {
  id: "edrive50" | "xdrive60" | "m70";
  name: string;
  tagline: string;
  mood: string;
  price: number;
  power: string;
  accel: string;
  range: string;
  highlight?: boolean;
  bullets: string[];
  images: {
    exterior: StaticImageData;
    exterior2: StaticImageData;
    rear: StaticImageData;
    cockpit: StaticImageData;
    charging: StaticImageData;
  };
  captions: Record<Category, string>;
};

export const trims: Trim[] = [
  {
    id: "edrive50",
    name: "i7 eDrive50",
    tagline: "後輪驅動｜最長續航",
    mood: "銀灰日光",
    price: 4_980_000,
    power: "449 hp",
    accel: "6.1 秒",
    range: "最高 625 km",
    bullets: ["單馬達後驅", "Executive 座艙", "Driving Assistant 基礎輔助"],
    images: {
      exterior: e50Ext1,
      exterior2: e50Ext2,
      rear: e50Rear,
      cockpit: e50Cockpit,
      charging: e50Charge,
    },
    captions: {
      exterior: "俐落的銀灰車身，在日光下展現純電旗艦的沉穩氣度。",
      rear: "淺色真皮與寬敞乘坐空間，日常通勤也像私人行館。",
      cockpit: "曲面雙螢幕整合儀表與中控，資訊一目了然。",
      charging: "625 km 最長續航，搭配居家充電，日常幾乎不必找充電站。",
    },
  },
  {
    id: "xdrive60",
    name: "i7 xDrive60",
    tagline: "四輪驅動｜均衡旗艦",
    mood: "曜黑藍調",
    price: 5_680_000,
    power: "544 hp",
    accel: "4.7 秒",
    range: "最高 590 km",
    highlight: true,
    bullets: ["雙馬達 xDrive 四驅", "Executive Lounge 後座套件", "Driving Assistant Professional"],
    images: {
      exterior: x60Ext1,
      exterior2: x60Ext2,
      rear: x60Rear,
      cockpit: x60Cockpit,
      charging: x60Charge,
    },
    captions: {
      exterior: "分離式頭燈與發光雙腎格柵，夜色中一眼辨識。",
      rear: "Executive Lounge 後座套件，把移動變成私人包廂。",
      cockpit: "BMW Curved Display 與 iDrive，科技藏於質感之中。",
      charging: "直流快充約 10 分鐘補充 160 km，長途規劃更從容。",
    },
  },
  {
    id: "m70",
    name: "i7 M70 xDrive",
    tagline: "M 性能四驅｜極致動力",
    mood: "赤焰黑金",
    price: 6_980_000,
    power: "660 hp",
    accel: "3.7 秒",
    range: "最高 488 km",
    bullets: ["M 性能專屬調校", "M 跑車座椅與外觀套件", "升級版主動式懸吊"],
    images: {
      exterior: m70Ext1,
      exterior2: m70Ext2,
      rear: m70Rear,
      cockpit: m70Cockpit,
      charging: m70Charge,
    },
    captions: {
      exterior: "M 專屬套件與低趴姿態，靜止時也充滿張力。",
      rear: "焦糖色真皮與鋼琴烤漆飾板，奢華與運動並存。",
      cockpit: "M 跑車方向盤與專屬介面，660 hp 盡在掌握。",
      charging: "即使是最強 M 動力，也能在充電站快速回到戰場。",
    },
  },
];

export const formatNTD = (n: number) =>
  "NT$ " + Math.round(n).toLocaleString("en-US");
