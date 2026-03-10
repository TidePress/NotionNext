import AnalyticsBusuanzi from '@/components/AnalyticsBusuanzi'
import { BeiAnGongAn } from '@/components/BeiAnGongAn'
import BeiAnSite from '@/components/BeiAnSite'
import CopyRightDate from '@/components/CopyRightDate'
import DarkModeButton from '@/components/DarkModeButton'
import LazyImage from '@/components/LazyImage'
import PoweredBy from '@/components/PoweredBy'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import SmartLink from '@/components/SmartLink'
import CONFIG from '../config'
import SocialButton from './SocialButton'

/**
 * 网页底脚
 */
const Footer = ({ title }) => {
  const { siteInfo } = useGlobal()
  const MAGZINE_FOOTER_LINKS = siteConfig('MAGZINE_FOOTER_LINKS', [], CONFIG)

  return (
    <footer
      id='footer-bottom'
      className='z-10 bg-black text-white justify-center m-auto w-full p-6 relative'>

        <div className="w-full flex justify-center my-4">
  <style dangerouslySetInnerHTML={{__html: `
    /* 隐藏浏览器默认的折叠黑三角 */
    .custom-notice summary::-webkit-details-marker { display: none; }
    .custom-notice summary { list-style: none; outline: none; }
  `}} />
  
  <details className="custom-notice" style={{ cursor: 'pointer', textAlign: 'center' }}>
    {/* summary 就是那句可点击的话 */}
    <summary className="font-bold text-gray-500 hover:text-gray-700 transition-colors">
      Our Tenor
    </summary>
    
    {/* 下面是展开后的内容 */}
    <div className="mt-2 text-sm text-gray-600 bg-gray-100 dark:bg-gray-800 p-4 rounded">
      · This platform is intended to bring the perspicacity of the Chinese societies with an academic, philosophical and critical perspectives for the world<br/>
      · As a public and supportive community, we want the world to see the unheard voices of the era of China's transformationalisation<br/>
      · Our writing and commuting language are multi-lingual and inclusive with English (UK), française (FR) and Chinese (TC&SC)<br/>
      完全不会有 Notion 自带的那个箭头符号！
    </div>
  </details>
</div>
      
      </div>
    </footer>
  )
}

export default Footer
