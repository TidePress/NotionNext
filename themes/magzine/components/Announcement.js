import dynamic from 'next/dynamic'
import { useEffect, useRef } from 'react'

const NotionPage = dynamic(() => import('@/components/NotionPage'))

/**
 * Announcement：渲染 NotionPage，并对特定句子应用不换行与自适应缩放
 */
const Announcement = ({ post, className = '' }) => {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!post?.blockMap) return

    // 延迟以等待 NotionPage 完全渲染
    const t = setTimeout(() => {
      try {
        const container = containerRef.current
        if (!container) return

        // 要匹配的不换行句子的关键字（可按需增删）
        const matchers = [
          'Welcome to contributing', // 英文常见开头
          'Welcome to contributing your works', 
          'Welcome to contributing your works to our society',
          '欢迎', // 中文“欢迎”作为兜底
          '欢迎投稿' // 若有中文版本
        ]

        // 查找所有段落并匹配文本
        const paragraphs = container.querySelectorAll('p, li, div')
        paragraphs.forEach((el) => {
          const text = (el.textContent || '').trim()
          if (!text) return

          const matched = matchers.some((m) => text.includes(m))
          if (!matched) return

          // 应用不换行样式
          el.classList.add('tn-no-wrap')

          // 自适应缩放：若仍然超出容器宽度，则逐步减小字号（像素）
          const parentWidth = container.clientWidth || container.getBoundingClientRect().width
          const computeFits = () => el.scrollWidth <= parentWidth

          // 初始字号（读取当前计算值或默认 16px）
          const style = window.getComputedStyle(el)
          let fontSizePx = parseFloat(style.fontSize) || 16
          const minFontSize = 12 // 最小字号 px，防止过小不可读

          // 如果初始就不换行但溢出（scrollWidth > parentWidth），逐步缩小
          let safety = 0
          while (!computeFits() && fontSizePx > minFontSize && safety < 20) {
            fontSizePx = Math.max(minFontSize, fontSizePx - 1)
            el.style.fontSize = fontSizePx + 'px'
            safety += 1
          }

          // 如果仍然不适配，可以允许溢出（不裁剪），或改为缩放 transform（此处保留溢出）
          // el.style.overflow = 'visible'
        })
      } catch (err) {
        // 忽略错误，避免影响页面
        // console.error(err)
      }
    }, 80) // 小延迟以等待动态渲染

    return () => clearTimeout(t)
  }, [post])

  if (!post?.blockMap) return <></>

  return (
    <div className={className} ref={containerRef}>
      <div id="announcement-content" className="w-full">
        {post && <NotionPage post={post} />}
      </div>

      <style jsx>{`
        /* 不换行样式：优先级高，保证该行不换行 */
        .tn-no-wrap {
          white-space: nowrap !important;
          display: inline-block !important;
          line-height: 1.08 !important;
        }

        /* 仍保留对 NotionPage 的透明背景与紧凑排版覆盖 */
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

        #announcement-content :global(p),
        #announcement-content :global(li) {
          line-height: 1.08 !important;
          letter-spacing: -0.35px !important;
          margin-bottom: 0.35rem !important;
          color: inherit !important;
        }

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
