import Image from "next/image";
import mLogo from "../../public/image/bmw-m-logo.webp";

/** BMW M 標誌（取代原本的揮手圖示），以高度控制大小、寬度依比例 */
export default function MLogo({ height, className = "" }: { height: number; className?: string }) {
  return (
    <Image
      src={mLogo}
      alt=""
      aria-hidden
      height={height}
      width={Math.round((height * mLogo.width) / mLogo.height)}
      className={`shrink-0 ${className}`}
    />
  );
}
