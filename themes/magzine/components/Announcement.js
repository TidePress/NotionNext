import dynamic from 'next/dynamic'

const NotionPage = dynamic(() => import('@/components/NotionPage'))

/**
 * Announcement：渲染 NotionPage，并覆盖其默认样式以保证更紧凑的行间距
 */
const Announcement = ({ post, className = '' }) => {
  if (!post?.blockMap) return <></>

  return (
    <div className={className}>
      <div id="announcement-content" className="w-full">
        {post && <NotionPage post={post} />}
      </div>

      <style jsx>{`
        /* 更紧凑的排版：进一步收窄行高与字间距 */
        #announcement-content :global(p),
        #announcement-content :global(li) {
          line-height: 1.02 !important;        /* 更窄的行高 */
          letter-spacing: -0.4px !important;  /* 更紧的字间距 */
          margin-bottom: 0.28rem !important;  /* 缩短段落间距 */
          color: inherit !important;
          font-size: 0.94rem !important;      /* 略微减小字体以配合紧凑布局 */
        }

        #announcement-content :global(h1),
        #announcement-content :global(h2),
        #announcement-content :global(h3) {
          line-height: 1.02 !important;
          margin-top: 0.2rem !important;
          margin-bottom: 0.2rem !important;
          color: inherit !important;
          font-size: 0.98rem !important;
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

        /* 极窄屏的微调，避免文字过小或拥挤 */
        @media (max-width: 420px) {
          #announcement-content :global(p),
          #announcement-content :global(li) {
            font-size: 0.92rem !important;
            line-height: 1.04 !important;
          }
        }
      `}</style>
    </div>
  )
}

export default Announcement
