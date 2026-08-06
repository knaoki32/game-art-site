import CtaButton from '../components/CtaButton'
import { site } from '../content/site'

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-16 px-5 py-24 sm:px-8 md:py-32">
      <div className="mx-auto w-full max-w-3xl text-center">
        <p className="text-xs font-bold tracking-[0.25em] text-gold uppercase">Contact</p>
        <h2 className="mt-3 text-2xl font-black leading-snug sm:text-3xl md:text-4xl">
          キャラクターの展開、ご相談ください。
        </h2>
        <p className="mt-5 text-sm leading-relaxed text-mute sm:text-base">
          {/* 和文は連結して書く。JSXの改行はスペース1個になり、日本語では字間が空いて見えるため */}
          {'「この絵柄を維持できるか?」の検証サンプルからでも、キャラクター資料を共有してのご相談からでも構いません。' +
            'お見積り・ご相談は無料です。'}
          <br />
          <span lang="en">Inquiries in English are welcome.</span>
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <CtaButton href={site.contactFormUrl} external className="w-full sm:w-auto">
            プロジェクトについて相談する
          </CtaButton>
          <CtaButton href={site.xUrl} external variant="ghost" className="w-full sm:w-auto">
            X のDMで相談 {site.xHandle}
          </CtaButton>
        </div>
        <ul className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-mute">
          <li>2営業日以内に返信します</li>
          <li>NDA締結後の資料共有に対応</li>
          <li>日本語 / English</li>
        </ul>
      </div>
    </section>
  )
}
