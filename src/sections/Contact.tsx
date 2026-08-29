import Section from '../components/Section'
import ContactForm from '../components/ContactForm'
import { site } from '../content/site'

export default function Contact() {
  return (
    <Section
      id="contact"
      kicker="お問い合わせ"
      title="キャラクターの展開、ご相談ください。"
      lead={
        <>
          {/* 和文は連結して書く。JSXの改行はスペース1個になり、日本語では字間が空いて見えるため */}
          {'「この絵柄を維持できるか?」の検証サンプルからでも、キャラクター資料を共有してのご相談からでも構いません。'}
          <br />
          {'お見積り・ご相談は無料です。'}
          <br />
          <span lang="en">Inquiries in English are welcome.</span>
        </>
      }
    >
      {/* フォーム自体は他セクションと同じ横幅(max-w-6xl)まで広げず、
          入力欄が間延びしないよう max-w-3xl に留める */}
      <div className="max-w-3xl rounded-lg border border-line bg-card p-6 sm:p-8">
        <ContactForm />
      </div>

      <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-mute">
        <li>2営業日以内に返信します</li>
        <li>NDA締結後の資料共有に対応</li>
        <li>日本語 / English</li>
      </ul>

      <p className="mt-6 text-sm text-mute">
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
    </Section>
  )
}
