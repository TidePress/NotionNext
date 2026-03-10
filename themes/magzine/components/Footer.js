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
      <div className='max-w-screen-3xl w-full mx-auto '>
        {/* 信息与链接区块 */}
        <div className='w-full flex lg:flex-row flex-col justify-between py-16'>
          <div className='gap-x-2 py-6 flex items-center'>
            {/* 站长信息 */}
            <LazyImage
              src={siteInfo?.icon}
              className='rounded-full'
              width={40}
              alt={siteConfig('AUTHOR')}
            />
            <div>
              <h1 className='text-lg'>{title}</h1>
              <i className='fas fa-copyright' />
              <a
                href={siteConfig('LINK')}
                className='underline font-bold justify-start  '>
                {siteConfig('AUTHOR')}
              </a>
            </div>
          </div>

          {/* 右侧链接区块 */}
          <div className='grid grid-cols-2 lg:grid-cols-4 lg:gap-16 gap-8'>
            {MAGZINE_FOOTER_LINKS?.map((group, index) => {
              return (
                <div key={index}>
                  <div className='font-bold text-xl text-white lg:pb-8 pb-4'>
                    {group.name}
                  </div>
                  <div className='flex flex-col gap-y-2'>
                    {group?.menus?.map((menu, index) => {
                      return (
                        <div key={index}>
                          <Link href={menu.href} className='hover:underline'>
                            {menu.title}
                          </Link>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* 页脚 */}
        <div className='py-4 flex flex-col lg:flex-row  justify-between items-center border-t border-gray-400'>
          <div className='flex gap-x-2 flex-wrap justify-between items-center'>
            <CopyRightDate />
            <PoweredBy />
          </div>

          <DarkModeButton className='text-white' />

          <div className='flex justify-between items-center gap-x-2'>
            <div className='flex items-center gap-x-4'>
              <AnalyticsBusuanzi />
              <SocialButton />
            </div>
          </div>
        </div>

        {/* 备案 */}
        <div className='w-full text-center flex flex-wrap items-center justify-center gap-x-2'>
          <BeiAnSite />
          <BeiAnGongAn />
        </div>
      </div>
    </footer>
  )
}

export default Footer
