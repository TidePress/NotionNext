import dynamic from 'next/dynamic'
import { useEffect, useRef } from 'react'

const NotionPage = dynamic(() => import('@/components/NotionPage'))

/**
 * Announcement：渲染 NotionPage，并对指定句子应用不换行与更激进的自适应缩放
 */
const Announcement = ({ post, className = '' }) => {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!post?.blockMap) return

    const t = setTimeout(() => {
      try {
        const container = containerRef.current
        if (!container) return

        // 请确保与页面上该句完全一致（包括大小写与标点）
        const exactSentence = 'Welcome to contributing your works to our society'

        // 查找所有可能的文本节点（p, li, div）
        const nodes = container.querySelectorAll('p, li, div')
        nodes.forEach((el) => {
          const text = (el.textContent || '').trim()
          if (!text) return
          if (!text.includes(exactSentence)) return

          // 强制不换行与保持单词完整
          el.classList.add('tn-no-wrap')

          // 读取父容器宽度（内层限制宽度）
          const parentWidth = container.clientWidth || container.getBoundingClientRect().width
          const computeFits = () => el.scrollWidth <= parentWidth + 1 // 允许 1px 容差

          // 初始字号（读取当前计算值或默认 16px）
          const style = window.getComputedStyle(el)
          let fontSizePx = parseFloat(style.fontSize) || 16

          // 更激进的最小字号以便在 320px 容器内适配
          const minFontSizeDesktop = 9
          const minFontSizeMobile = 8
          const isMobile = window.innerWidth <= 420
          const minFontSize = isMobile ? minFontSizeMobile : minFontSizeDesktop

          // 允许更紧的字间距以帮助适配
          el.style.letterSpacing = '-0.6px'

          // 逐像素减小字号直到适配或达到最小字号
          let safety = 0
          while (!computeFits() && fontSizePx > minFontSize && safety < 40) {
            fontSizePx = Math.max(minFontSize, fontSizePx - 1)
            el.style.fontSize = fontSizePx + 'px'
            safety += 1
          }

          // 最后回退：若仍不适配（极窄屏或极端内容），允许换行以保证可读性
          if (!computeFits()) {
            el.classList.remove('tn-no-wrap')
            el.style.whiteSpace = 'normal'
            el.style.letterSpacing = '-0.35px'
          } else {
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
          line-height: 0.98 !important;
          letter-spacing: -0.45px !important;
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

        /* 精确匹配句子时使用：强制不换行并保持单词完整 */
        .tn-no-wrap {
          white-space: nowrap !important;
          display: inline-block !important;
          line-height: 0.98 !important;
          word-break: keep-all !important;
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
