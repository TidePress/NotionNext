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
      className='z-50 bg-black text-white justify-center m-auto w-full p-6 relative'>
      {/* ⚠️ 注意看上面的 z-50 ⚠️ */}

      <div className="w-full flex justify-center my-4 relative z-[9999] bg-red-500">
        {/* ⚠️ 我加了一个 bg-red-500 (红色背景) 和 z-[9999]，这是终极排错法！ 
            如果部署后你看到一个大红色的块，但没有字，说明字被挤没了；
            如果连红色都看不到，说明这段代码压根没被执行！ */}
        <style dangerouslySetInnerHTML={{__html: `
          .custom-notice summary::-webkit-details-marker { display: none; }
          .custom-notice summary { list-style: none; outline: none; }
        `}} />
        
        <details className="custom-notice w-full max-w-2xl" style={{ cursor: 'pointer', textAlign: 'center' }}>
          <summary className="font-bold text-gray-300 hover:text-white transition-colors py-4">
            Our Tenor
          </summary>
          
          <div className="mt-2 text-sm text-gray-800 bg-gray-100 p-4 rounded text-left">
            · This platform is intended to bring the perspicacity of the Chinese societies with an academic, philosophical and critical perspectives for the world<br/>
            · As a public and supportive community, we want the world to see the unheard voices of the era of China's transformationalisation<br/>
            · Our writing and commuting language are multi-lingual and inclusive with English (UK), française (FR) and Chinese (TC&SC)<br/>
          </div>
        </details>
      </div>
      
    </footer>
  )
}

export default Footer
