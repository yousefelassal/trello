import { useDocumentTitle } from '@uidotdev/usehooks'
import "@code-hike/mdx/styles"
import Content from './Content.mdx'

export default function Docs() {
  useDocumentTitle('Docs | Trello 3al daya2')
  return (
    <div className="min-h-screen w-full rounded-md flex items-center justify-center antialiased bg-grid-white/[0.02] relative overflow-hidden">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black/40 md:bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        <div className="max-w-3xl w-full px-4 py-16 sm:px-8 mx-0">
          <Content />
        </div>
    </div>
  )
}
