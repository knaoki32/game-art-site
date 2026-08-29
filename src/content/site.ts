/**
 * サイト全体で使う定数(リンク・名乗り)。
 *
 * 問い合わせは 2026-08-30 に Googleフォームからサイト内フォームへ移した。
 * 送信先は同じWorkerの POST /api/contact で、内容はKVにだけ保存される(外部送信なし)。
 * 受信の確認は /admin/contacts?token=<ADMIN_TOKEN>。
 */

export const site = {
  brand: 'なお',
  brandTagline: 'Character Art Partner',
  /** 問い合わせ先(サイト内フォームのアンカー)。全CTAはここを指す */
  contactFormUrl: '#contact',
  /** X (Twitter) プロフィール */
  xUrl: 'https://x.com/knaoki23',
  xHandle: '@knaoki23',
} as const

export const nav = [
  { href: '#proof', label: '一貫性の証明' },
  { href: '#expansion', label: '展開実例' },
  { href: '#products', label: '商品' },
  { href: '#process', label: '制作工程' },
  { href: '#pricing', label: '料金' },
  { href: '#policy', label: '方針・FAQ' },
] as const
