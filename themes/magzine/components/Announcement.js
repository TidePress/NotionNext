import dynamic from 'next/dynamic'

const NotionPage = dynamic(() => import('@/components/NotionPage'))

/**
 * Announcement：渲染 NotionPage，并覆盖其默认样式以保证紧凑与透明背景
 */
const Announcement = ({ post, className = '' }) => {
  if (!post?.blockMap) return <></>

  return (
    <div className={className}>
      <div id="announcement-content" className="w-full">
        {post && <NotionPage post={post} />}
      </div>

      <style jsx>{`
        /* 紧凑排版，覆盖 NotionPage 默认样式 */
        #announcement-content :global(p),
        #announcement-content :global(li) {
          line-height: 1.12 !important;
          letter-spacing: -0.3px !important;
          margin-bottom: 0.45rem !important;
          color: inherit !important;
        }

        #announcement-content :global(h1),
        #announcement-content :global(h2),
        #announcement-content :global(h3) {
          line-height: 1.08 !important;
          margin-top: 0.35rem !important;
          margin-bottom: 0.35rem !important;
          color: inherit !important;
        }

        /* 移除 Notion 渲染器可能带来的白色背景/内边距/阴影 */
        #announcement-content :global(.notion-page),
        #announcement-content :global(.notion-block),
        #announcement-content :global(.notion-viewport),
        #announcement-content :global(.notion-collection) {
          background: transparent !important;
          max-width: 100% !important;
          width: 100% !important;
          box-shadow: none !important;
          padding: 0 !important;
          margin: 0 !important;
        }

        /* 响应式：更窄屏时进一步缩小字体 */
        @media (max-width: 480px) {
          #announcement-content :global(p),
          #announcement-content :global(li) {
            font-size: 0.92rem !important;
          }
        }
      `}</style>
    </div>
  )
}

export default Announcement
