import dynamic from 'next/dynamic'

const NotionPage = dynamic(() => import('@/components/NotionPage'))

/**
 * Magzine主题的公告（整行背景色）
 */
const Announcement = ({ post, className = '' }) => {
  if (!post?.blockMap) return <></>

  return (
    <div className={className}>
      {/* 整行背景色容器：宽度 100%，背景色 #81c97d */}
      <section
        id="announcement-wrapper-full"
        className="w-full bg-[#81c97d] text-black"
      >
        {/* 内部内容容器：限制最大宽度并居中，控制内边距与排版 */}
        <div
          id="announcement-inner"
          className="mx-auto px-4 py-6"
          style={{ maxWidth: '1100px', lineHeight: 1.15, letterSpacing: '-0.2px' }}
        >
          {post && <NotionPage post={post} />}
        </div>
      </section>

      {/* 覆盖 NotionPage 内部段落/标题样式以保证紧凑排版并移除额外背景 */}
      <style jsx>{`
        /* 使公告区内的段落、列表更紧凑 */
        #announcement-wrapper-full :global(p),
        #announcement-wrapper-full :global(li) {
          line-height: 1.15 !important;
          letter-spacing: -0.2px !important;
          margin-bottom: 0.5rem !important;
          color: inherit !important;
        }

        /* 标题更紧凑 */
        #announcement-wrapper-full :global(h1),
        #announcement-wrapper-full :global(h2),
        #announcement-wrapper-full :global(h3) {
          line-height: 1.1 !important;
          margin-top: 0.4rem !important;
          margin-bottom: 0.4rem !important;
          color: inherit !important;
        }

        /* 如果 NotionPage 自带背景或容器宽度，强制覆盖为透明并占满内层容器 */
        #announcement-wrapper-full :global(.notion-page),
        #announcement-wrapper-full :global(.notion-block),
        #announcement-wrapper-full :global(.notion-viewport) {
          background: transparent !important;
          max-width: 100% !important;
          width: 100% !important;
          box-shadow: none !important;
          padding: 0 !important;
        }

        /* 可选：缩小公告内文字在极窄屏的字号（避免换行过多） */
        @media (max-width: 480px) {
          #announcement-wrapper-full :global(p),
          #announcement-wrapper-full :global(li) {
            font-size: 0.92rem !important;
          }
        }
      `}</style>
    </div>
  )
}

export default Announcement
