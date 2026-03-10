import Announcement from './Announcement'

/**
 * CTA：外层负责整行背景，内层限制内容宽度并居中
 */
export default function CTA({ notice }) {
  return (
    <section
      className="w-full bg-[#81c97d] dark:bg-hexo-black-gray text-black"
      aria-label="site announcement"
      style={{ paddingTop: '2rem', paddingBottom: '2rem' }} // py-8
    >
      <div
        className="mx-auto px-4"
        style={{
          maxWidth: '640px', // 缩窄到 640px
          lineHeight: 1.12,
          letterSpacing: '-0.3px'
        }}
      >
        <Announcement post={notice} className="text-center text-black" />
      </div>
    </section>
  )
}
