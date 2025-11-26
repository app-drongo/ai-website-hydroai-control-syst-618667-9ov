import Pageheader from '@/components/sections/technical-documentation/Pageheader'
import Tabs from '@/components/sections/technical-documentation/Tabs'
import Comparison from '@/components/sections/technical-documentation/Comparison'
import Integrations from '@/components/sections/technical-documentation/Integrations'
import Download from '@/components/sections/technical-documentation/Download'
import Faq from '@/components/sections/technical-documentation/Faq'
import Contact from '@/components/sections/technical-documentation/Contact'

export default function TechnicalDocumentationPage() {
  return (
    <>
      <Pageheader />
      <Tabs />
      <Comparison />
      <Integrations />
      <Download />
      <Faq />
      <Contact />
    </>
  )
}