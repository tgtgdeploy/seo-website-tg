import { redirect } from 'next/navigation'

// 下载页面 - 跳转到独立下载站点
// 主站保持纯净，所有下载链接指向 adminapihub.xyz
const DOWNLOAD_SITE = 'https://adminapihub.xyz'

export default function DownloadPage() {
  redirect(DOWNLOAD_SITE)
}
