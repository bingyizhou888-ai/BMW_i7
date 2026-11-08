const columns = [
  {
    title: "車型",
    links: [
      { label: "i7 eDrive50", href: "/#showroom-edrive50" },
      { label: "i7 xDrive60", href: "/#showroom-xdrive60" },
      { label: "i7 M70 xDrive", href: "/#showroom-m70" },
    ],
  },
  {
    title: "服務",
    links: [
      { label: "預約試駕", href: "/#test-drive" },
      { label: "購車試算", href: "/#finance" },
      { label: "車型專欄", href: "/blog" },
    ],
  },
  {
    title: "關於",
    links: [
      { label: "品牌故事", href: "#" },
      { label: "新聞中心", href: "#" },
      { label: "永續承諾", href: "#" },
    ],
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-black py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <span className="font-mono text-sm font-semibold tracking-widest text-white">
              BMW&nbsp;i7
            </span>
            <p className="mt-3 max-w-xs text-sm text-neutral-500">
              純粹電能，重新定義豪華。此頁面為前端練習示範網站。
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="font-mono text-xs text-neutral-400">{col.title}</h4>
              <ul className="mt-4 space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-neutral-500 transition-colors hover:text-neutral-300"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-xs leading-relaxed text-neutral-500">
          <p>
            本網站為前端開發練習 Demo，<strong>非 BMW 官方網站</strong>，與 BMW
            AG 或其台灣代理商無任何關聯。頁面中之車型名稱、數據與售價僅為示範用途，不代表正式規格或報價，實際資訊請以當地授權經銷商公告為準。
          </p>
          <p className="mt-3">
            圖片來源：Unsplash（Samuel Hagger、Salman Sidheek、Mohammad Mardani 等攝影師，完整名單見 public/image/CREDITS.md）。
          </p>
          <p className="mt-3">© {year} 本練習專案。僅供學習與展示使用。</p>
        </div>
      </div>
    </footer>
  );
}
