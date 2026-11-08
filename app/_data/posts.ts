import type { StaticImageData } from "next/image";
import { trims, type Trim } from "./cars";

export type Post = {
  slug: string;
  trimId: Trim["id"];
  category: string;
  title: string;
  excerpt: string;
  date: string;
  readMinutes: number;
  cover: StaticImageData;
  sections: { heading: string; body: string[]; image?: StaticImageData }[];
};

const t = (id: Trim["id"]) => trims.find((x) => x.id === id)!;

export const posts: Post[] = [
  {
    slug: "i7-edrive50-long-range",
    trimId: "edrive50",
    category: "長途續航",
    title: "625 公里的從容：i7 eDrive50 長途實用指南",
    excerpt:
      "後輪驅動、單馬達配置，讓 eDrive50 成為 i7 家族中續航最長的一員。我們從日常通勤到跨縣市旅程，拆解它最適合誰。",
    date: "2026-10-12",
    readMinutes: 6,
    cover: t("edrive50").images.exterior,
    sections: [
      {
        heading: "為什麼單馬達反而更適合多數人",
        body: [
          "很多人第一次看 i7 車型表，直覺會往馬力最大的版本看。但對於每天往返市區、週末偶爾出遊的車主來說，eDrive50 的單馬達後驅配置，其實是最均衡的選擇。",
          "少了一具前馬達，車重與能耗跟著下降，換來的是最高約 625 km 的 WLTP 續航。以台北到台中來回約 340 km 計算，滿電出發幾乎不需要在途中補電。",
        ],
      },
      {
        heading: "449 hp，已經比你需要的更多",
        body: [
          "0–100 km/h 6.1 秒的成績，放在任何一部大型豪華轎車上都相當從容。純電動力的即時扭力讓市區起步與高速超車都毫不費力，而且全程幾乎無聲。",
          "後輪驅動也保留了 BMW 一貫的操控手感：方向回饋清晰，轉向時車頭輕盈，這是許多四驅車型反而較難呈現的細節。",
        ],
        image: t("edrive50").images.cockpit,
      },
      {
        heading: "居家充電：讓加油站從生活中消失",
        body: [
          "若住家或公司有 11 kW 交流充電樁，夜間停放約 8–10 小時即可充飽。對多數車主而言，一週只需要插電兩到三次。",
          "長途旅程則可利用直流快充，在休息站喝杯咖啡的時間補充足夠里程。搭配車載導航的充電規劃功能，系統會自動建議最佳停靠點。",
        ],
        image: t("edrive50").images.charging,
      },
      {
        heading: "適合誰？",
        body: [
          "如果你重視續航與乘坐舒適，主要在都會與高速公路行駛，且希望以 i7 家族最親民的價格入主，eDrive50 會是最理性的旗艦選擇。",
        ],
      },
    ],
  },
  {
    slug: "i7-xdrive60-executive-lounge",
    trimId: "xdrive60",
    category: "後座體驗",
    title: "移動的私人包廂：i7 xDrive60 Executive Lounge 深度體驗",
    excerpt:
      "雙馬達四驅與 Executive Lounge 後座套件，讓 xDrive60 成為 i7 最受歡迎的版本。這次我們把重點放在後座。",
    date: "2026-10-26",
    readMinutes: 7,
    cover: t("xdrive60").images.exterior,
    sections: [
      {
        heading: "最受歡迎，不是沒有原因",
        body: [
          "xDrive60 站在 i7 家族的正中間：544 hp 的雙馬達四驅、4.7 秒破百，同時保有最高約 590 km 的續航。它不追求極端，而是把每一項表現都推到旗艦應有的水準。",
          "雙馬達 xDrive 系統會依路況即時分配前後軸扭力，在濕滑路面或山路彎道中，都能提供穩定且可預期的循跡表現。",
        ],
      },
      {
        heading: "Executive Lounge：把後座變成行政艙",
        body: [
          "選配 Executive Lounge 後座套件後，副駕駛座可向前收折，後座乘客能將座椅躺臥至接近平躺的角度，並展開腿托。搭配座椅按摩與加熱通風，長途移動也能好好休息。",
          "車門扶手上的觸控面板可以控制空調、座椅、遮陽簾與影音，乘客不需要請駕駛幫忙，就能打造自己的舒適環境。",
        ],
        image: t("xdrive60").images.rear,
      },
      {
        heading: "31 吋劇院螢幕與沉浸音場",
        body: [
          "車頂可降下一面 31 吋、8K 解析度的劇院螢幕，支援串流影音。搭配 Bowers & Wilkins 環繞音響系統，車內就是一間私人放映室。",
          "螢幕降下時，遮陽簾會自動關閉，並調暗車內氛圍燈，讓觀影體驗更加專注。",
        ],
      },
      {
        heading: "駕駛者也不會被冷落",
        body: [
          "Driving Assistant Professional 提供車道維持、自動跟車與塞車輔助等功能，在高速公路與市區壅塞路段大幅減輕駕駛負擔。曲面雙螢幕與 iDrive 系統則讓所有資訊都在視線範圍內。",
        ],
        image: t("xdrive60").images.cockpit,
      },
    ],
  },
  {
    slug: "i7-m70-performance",
    trimId: "m70",
    category: "性能解析",
    title: "660 hp 的靜默咆哮：i7 M70 xDrive 性能解析",
    excerpt:
      "首款純電 M 性能旗艦，3.7 秒破百。M70 xDrive 如何在豪華與性能之間找到平衡？我們從動力、底盤到內裝一次看懂。",
    date: "2026-11-02",
    readMinutes: 8,
    cover: t("m70").images.exterior,
    sections: [
      {
        heading: "M 性能，第一次以純電呈現",
        body: [
          "M70 xDrive 是 i7 家族的性能旗艦，雙馬達合計輸出最高 660 hp，0–100 km/h 僅需 3.7 秒。這樣的數字，放在任何一部超過兩噸半的豪華大型轎車上，都令人印象深刻。",
          "與燃油 M 車款不同，純電動力讓扭力在踩下踏板的瞬間就全數釋放，沒有換檔與渦輪遲滯，加速感更加線性且直接。",
        ],
        image: t("m70").images.exterior2,
      },
      {
        heading: "專屬調校的底盤",
        body: [
          "M70 配備升級版主動式懸吊與主動式防傾桿，在彎道中能有效抑制車身側傾；而在一般巡航時，又能回到旗艦應有的柔軟舒適。",
          "整合式主動轉向讓後輪參與轉向：低速時與前輪反向，縮小迴轉半徑；高速時同向，提升變換車道的穩定性。",
        ],
      },
      {
        heading: "運動與奢華並存的座艙",
        body: [
          "M 跑車方向盤、專屬儀表介面與 M 性能座椅，提醒你這是一部不一樣的 i7。後座則延續旗艦等級的用料，焦糖色真皮與鋼琴烤漆飾板營造出溫暖而華麗的氛圍。",
        ],
        image: t("m70").images.rear,
      },
      {
        heading: "性能的代價？比你想像的小",
        body: [
          "雖然性能大幅提升，M70 仍保有最高約 488 km 的 WLTP 續航，日常使用綽綽有餘。支援高功率直流快充，約 10 分鐘即可補充可觀的里程，讓你隨時回到賽道般的駕馭狀態。",
        ],
        image: t("m70").images.charging,
      },
    ],
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

export const formatDate = (iso: string) => {
  const [y, m, d] = iso.split("-");
  return `${y} 年 ${Number(m)} 月 ${Number(d)} 日`;
};
