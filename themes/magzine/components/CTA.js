import Announcement from './Announcement'

/**
 * CTA：外层负责整行背景，内层限制内容宽度并居中（maxWidth: 320px）
 */
export default function CTA({ notice }) {
  return (
    <section
      className="w-full bg-cyan-600 dark:bg-hexo-black-gray text-white"
      aria-label="site announcement"
      style={{ paddingTop: '1rem', paddingBottom: '1rem' }} // 更紧凑的 py
    >
      <div
        className="mx-auto px-4"
        style={{
          maxWidth: '450px', // <- 更窄
          lineHeight: 1.12,
          letterSpacing: '-0.3px'
        }}
      >
        <Announcement post={notice} className="text-center text-white" />
      </div>
    </section>
  )
}
