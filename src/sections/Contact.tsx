import ContactForm from '../components/ContactForm'
import { site } from '../content/site'

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-16 px-5 py-24 sm:px-8 md:py-32">
      <div className="mx-auto w-full max-w-3xl">
        <div className="text-center">
          <p className="text-sm font-bold tracking-[0.2em] text-gold">お問い合わせ</p>
          <h2 className="mt-3 text-2xl font-black leading-snug sm:text-3xl md:text-4xl">
            キャラクターの展開、ご相談ください。
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-mute sm:text-base">
            {/* 和文は連結して書く。JSXの改行はスペース1個になり、日本語では字間が空いて見えるため */}
            {'「この絵柄を維持できるか?」の検証サンプルからでも、キャラクター資料を共有してのご相談からでも構いません。'}
            <br />
            {'お見積り・ご相談は無料です。'}
            <br />
            <span lang="en">Inquiries in English are welcome.</span>
          </p>
        </div>

        <div className="mt-10 rounded-lg border border-line bg-card p-6 sm:p-8">
          <ContactForm />
        </div>

        <ul className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-mute">
          <li>2営業日以内に返信します</li>
          <li>NDA締結後の資料共有に対応</li>
          <li>日本語 / English</li>
        </ul>

        <p className="mt-6 text-center text-sm text-mute">
          フォームが使えない場合は、
          <a
            href={site.xUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold underline underline-offset-4"
          >
            X のDM {site.xHandle}
          </a>
          　からでも受け付けています。
        </p>
      </div>
    </section>
  )
}
