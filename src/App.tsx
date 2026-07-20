import Header from './components/Header'
import Footer from './components/Footer'
import Hero from './sections/Hero'
import Proof from './sections/Proof'
import Expansion from './sections/Expansion'
import MediaKit from './sections/MediaKit'
import Products from './sections/Products'
import Process from './sections/Process'
import Comparison from './sections/Comparison'
import TrackRecord from './sections/TrackRecord'
import Pricing from './sections/Pricing'
import Policy from './sections/Policy'
import Contact from './sections/Contact'

/**
 * ページ構成(営業ストーリー順):
 * 価値提案 → 109ページ証明 → 展開実例 → Steam/SNS/動画 → 商品 → 工程 → 比較 → 実績 → 料金 → FAQ/方針 → 問い合わせ
 */
export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Proof />
        <Expansion />
        <MediaKit />
        <Products />
        <Process />
        <Comparison />
        <TrackRecord />
        <Pricing />
        <Policy />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
