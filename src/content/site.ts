/**
 * サイト全体で使う定数(リンク・名乗り)。
 * 問い合わせ先の URL はここだけ書き換えれば全 CTA に反映される。
 */

export const site = {
  brand: 'knao',
  brandTagline: 'Character Art Partner',
  /** 問い合わせ用 Google フォーム URL */
  contactFormUrl:
    'https://docs.google.com/forms/d/e/1FAIpQLSd3JzhylqDMy-xuoaWoAag5SvcHwfgzZWwx4URyABMcfQJQdw/viewform',
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
