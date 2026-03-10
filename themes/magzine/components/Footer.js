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
      className='z-10 bg-black text-white justify-center m-auto w-full p-6 relative'
    >
      <div className='max-w-screen-3xl w-full mx-auto '>
        
        {/* === 主体区块：左侧站长信息 + 右侧导航链接 === */}
        <div className='w-full flex lg:flex-row flex-col justify-between py-16'>
          
          {/* --- 左侧区块：包含图标、版权 以及 Our Tenor --- */}
          <div className='py-6 flex flex-wrap items-center gap-x-8 gap-y-4'>
            
            {/* 1. 原本的站长头像与版权信息 */}
            <div className='flex items-center gap-x-2'>
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
                  className='underline font-bold justify-start ml-1'>
                  {siteConfig('AUTHOR')}
                </a>
              </div>
            </div>

            {/* 2. Our Tenor (与左侧同行显示) */}
            <div className="flex items-center">
              <style dangerouslySetInnerHTML={{__html: `
                /* 隐藏浏览器默认的折叠黑三角 */
                .custom-notice summary::-webkit-details-marker { display: none; }
                .custom-notice summary { list-style: none; outline: none; }
              `}} />
              
              {/* relative 确保弹出的文本框以此文字为基准点 */}
              <details className="custom-notice relative" style={{ cursor: 'pointer' }}>
                
                {/* 标题文字 */}
                <summary className="font-bold text-neutral-400 hover:text-white transition-colors duration-300 py-2 select-none">
                  Our Tenor
                </summary>
                
                {/* 展开后的悬浮文本框 (使用 absolute 脱离文档流，像下拉菜单一样悬浮弹出) */}
                <div className="absolute z-50 left-0 top-full mt-2 w-[85vw] sm:w-[450px] lg:w-[600px] text-sm text-[#cccccc] bg-[#333333] p-6 rounded-lg text-left leading-relaxed shadow-2xl border border-neutral-700 cursor-auto">
                  <p className="mb-3">
                    · This platform is intended to bring the perspicacity of the Chinese societies with an academic, philosophical and critical perspectives for the world.
                  </p>
                  <p className="mb-3">
                    · As a public and supportive community, we want the world to see the unheard voices of the era of China's transformationalisation.
                  </p>
                  <p className="mb-0">
                    · Our writing and commuting language are multi-lingual and inclusive with English (UK), française (FR) and Chinese (TC&SC).
                  </p>
                </div>
                
              </details>
            </div>
            
          </div>

          {/* --- 右侧链接区块 --- */}
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

        {/* === 底部组件区块（夜间模式、统计等） === */}
        <div className='py-4 flex flex-col lg:flex-row  justify-between items-center border-t border-gray-800'>
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

        {/* === 备案区块 === */}
        <div className='w-full text-center flex flex-wrap items-center justify-center gap-x-2 text-neutral-500'>
          <BeiAnSite />
          <BeiAnGongAn />
        </div>
        
      </div>
    </footer>
  )
}

export default Footer
