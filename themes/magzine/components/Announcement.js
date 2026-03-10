import dynamic from 'next/dynamic'

const NotionPage = dynamic(() => import('@/components/NotionPage'))

/**
 * Magzine主题的公告
 */
const Announcement = ({ post, className = '' }) => {
  if (!post?.blockMap) return <></>

  return (
    <div className={className}>
      <section
        id="announcement-wrapper"
        className="rounded-xl px-4 py-3 bg-[#81c97d] text-black mx-auto"
        style={{ maxWidth: '900px' }}
      >
        {/* 可选：如果你希望更紧凑的内边距，可调整 px/py */}
        <div
          id="announcement-content"
          className="mx-auto w-full leading-tight tracking-tight text-sm"
          style={{ lineHeight: 1.15, letterSpacing: '-0.2px' }}
        >
          {post && <NotionPage post={post} />}
        </div>
      </section>

      {/* 强制覆盖 NotionPage 内部段落/标题的样式（当 NotionPage 自带样式覆盖时使用） */}
      <style jsx>{`
        /* 仅在 announcement 区域内生效，优先级较高 */
        #announcement-wrapper :global(p),
        #announcement-wrapper :global(li) {
          line-height: 1.15 !important;
          letter-spacing: -0.2px !important;
          margin-bottom: 0.5rem !important;
        }

        #announcement-wrapper :global(h1),
        #announcement-wrapper :global(h2),
        #announcement-wrapper :global(h3) {
          line-height: 1.1 !important;
          margin-top: 0.5rem !important;
          margin-bottom: 0.5rem !important;
        }

        /* 如果 NotionPage 内部设置了宽度或 max-width，可以在这里覆盖 */
        #announcement-wrapper :global(.notion-page),
        #announcement-wrapper :global(.notion-block) {
          max-width: 100% !important;
          width: 100% !important;
        }
      `}</style>
    </div>
  )
}

export default Announcement
