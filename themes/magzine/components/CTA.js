import Announcement from './Announcement'

/**
 * CTA，用于创建一个呼吁用户行动的部分（Call To Action，简称 CTA）。
 * 现在：外层容器负责整行背景色与内层居中限制，
 * Announcement 只负责渲染内容（不再带背景类）。
 **/
export default function CTA({ notice }) {
  return (
    <section
      className="w-full bg-[#81c97d] dark:bg-hexo-black-gray text-black"
      aria-label="site announcement"
      style={{ paddingTop: '4rem', paddingBottom: '4rem' }} // py-16 等价
    >
      {/* 内层容器：限制最大宽度并居中，控制内边距与排版 */}
      <div className="mx-auto px-4" style={{ maxWidth: '1100px', lineHeight: 1.15, letterSpacing: '-0.2px' }}>
        {/* Announcement 不再携带背景类，只负责渲染内容 */}
        <Announcement post={notice} className="text-center text-black" />
      </div>
    </section>
  )
}
