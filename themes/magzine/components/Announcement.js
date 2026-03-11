import dynamic from 'next/dynamic'
import { useEffect, useRef } from 'react'

const NotionPage = dynamic(() => import('@/components/NotionPage'))

/**
 * Announcement：渲染 NotionPage，并对指定句子应用不换行与自适应缩放
 */
const Announcement = ({ post, className = '' }) => {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!post?.blockMap) return

    const t = setTimeout(() => {
      try {
        const container = containerRef.current
        if (!container) return

        // 精确要保持在同一行的完整句子（按需修改为你页面上的确切文本）
        const exactSentence = 'Welcome to contributing your works to our society'

        // 查找所有段落并匹配文本（p, li, div 以兼容不同 Notion 渲染）
        const nodes = container.querySelectorAll('p, li, div')
        nodes.forEach((el) => {
          const text = (el.textContent || '').trim()
          if (!text) return
          if (!text.includes(exactSentence)) return

          // 应用不换行样式
          el.classList.add('tn-no-wrap')

          // 自适应缩放：逐像素减小字号直到不溢出或达到最小字号
          const parentWidth = container.clientWidth || container.getBoundingClientRect().width
          const computeFits = () => el.scrollWidth <= parentWidth + 1 // 允许 1px 容差

          const style = window.getComputedStyle(el)
          let fontSizePx = parseFloat(style.fontSize) || 16
          const minFontSizeDesktop = 11
          const minFontSizeMobile = 10
          const isMobile = window.innerWidth <= 420
          const minFontSize = isMobile ? minFontSizeMobile : minFontSizeDesktop

          // 如果初始就不换行但溢出（scrollWidth > parentWidth），逐步缩小
          let safety = 0
          while (!computeFits() && fontSizePx > minFontSize && safety < 30) {
            fontSizePx = Math.max(minFontSize, fontSizePx - 1)
            el.style.fontSize = fontSizePx + 'px'
            safety += 1
          }

          // 如果仍然不适配（极端窄屏），允许换行作为最后回退
          if (!computeFits()) {
            el.classList.remove('tn-no-wrap')
            el.style.whiteSpace = 'normal'
          } else {
            // 保证不被裁剪
            el.style.overflow = 'visible'
          }
        })
      } catch (err) {
        // 忽略错误，避免影响页面
      }
    }, 80)

    return () => clearTimeout(t)
  }, [post])

  if (!post?.blockMap) return <></>

  return (
    <div className={className} ref={containerRef}>
      <div id="announcement-content" className="w-full">
        {post && <NotionPage post={post} />}
      </div>

      <style jsx>{`
        /* 更窄的全局排版（更紧凑） */
        #announcement-content :global(p),
        #announcement-content :global(li) {
          line-height: 1.00 !important;        /* 更窄行高 */
          letter-spacing: -0.45px !important;  /* 更紧字间距 */
          margin-bottom: 0.22rem !important;
          color: inherit !important;
          font-size: 0.94rem !important;
        }

        #announcement-content :global(h1),
        #announcement-content :global(h2),
        #announcement-content :global(h3) {
          line-height: 1.02 !important;
          margin-top: 0.18rem !important;
          margin-bottom: 0.18rem !important;
          color: inherit !important;
          font-size: 0.98rem !important;
        }

        /* 不换行样式（用于精确匹配的句子） */
        .tn-no-wrap {
          white-space: nowrap !important;
          display: inline-block !important;
          line-height: 1.00 !important;
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

        /* 移动端回退：避免文字被压得不可读 */
        @media (max-width: 420px) {
          #announcement-content :global(p),
          #announcement-content :global(li) {
            font-size: 0.92rem !important;
            line-height: 1.02 !important;
            letter-spacing: -0.35px !important;
          }
        }
      `}</style>
    </div>
  )
}

export default Announcement
