import React, { useState, useRef, useEffect } from 'react'
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

  const [tenorOpen, setTenorOpen] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  const wrapperRef = useRef(null)

  // Detect touch device to switch hover -> click behavior
  useEffect(() => {
    const touch =
      typeof window !== 'undefined' &&
      ('ontouchstart' in window || navigator.maxTouchPoints > 0)
    setIsTouchDevice(Boolean(touch))
  }, [])

  // Close when clicking outside
  useEffect(() => {
    function handleDocClick(e) {
      if (!wrapperRef.current) return
      if (!wrapperRef.current.contains(e.target)) {
        setTenorOpen(false)
      }
    }

    document.addEventListener('click', handleDocClick)
    return () => document.removeEventListener('click', handleDocClick)
  }, [])

  // Close on Escape for accessibility
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') setTenorOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  const handleMouseEnter = () => {
    if (!isTouchDevice) setTenorOpen(true)
  }
  const handleMouseLeave = () => {
    if (!isTouchDevice) setTenorOpen(false)
  }
  const handleToggleClick = () => {
    if (isTouchDevice) setTenorOpen((v) => !v)
  }

  return (
    <footer
      id="footer-bottom"
      className="z-10 bg-black text-white justify-center m-auto w-full p-6 relative"
    >
      <div className="max-w-screen-3xl w-full mx-auto ">
        {/* === 主体区块：左侧站长信息 + 中间 Our Tenor + 右侧导航链接 === */}
        {/* 使用 grid 在 lg 及以上屏幕严格分三列，确保中间列居中 */}
        <div className="w-full py-16">
          <div className="flex flex-col lg:grid lg:grid-cols-3 lg:items-start gap-6">
            {/* 左列：站长信息（左对齐） */}
            <div className="lg:col-start-1 flex items-center gap-x-4 py-6">
              <div className="flex items-center gap-x-2">
                <LazyImage
                  src={siteInfo?.icon}
                  className="rounded-full"
                  width={40}
                  alt={siteConfig('AUTHOR')}
                />
                <div>
                  <h1 className="text-lg">{title}</h1>
                  <i className="fas fa-copyright" />
                  <a
                    href={siteConfig('LINK')}
                    className="underline font-bold justify-start ml-1"
                  >
                    {siteConfig('AUTHOR')}
                  </a>
                </div>
              </div>
            </div>

            {/* 中间列：Our Tenor（严格居中） */}
            <div className="lg:col-start-2 flex justify-center items-start py-6">
              <div
                ref={wrapperRef}
                className="relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  type="button"
                  className="font-bold text-neutral-400 hover:text-white transition-colors duration-200 py-2 select-none"
                  aria-expanded={tenorOpen}
                  aria-haspopup="true"
                  onClick={handleToggleClick}
                >
                  Our Tenor
                </button>

                {tenorOpen && (
                  <div
                    className="absolute z-50 left-1/2 transform -translate-x-1/2 top-full mt-2 w-[85vw] sm:w-[450px] lg:w-[600px] text-sm text-[#cccccc] bg-[#333333] p-6 rounded-lg text-left leading-relaxed shadow-2xl border border-neutral-700 cursor-auto"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
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
                )}
              </div>
            </div>

            {/* 右列：链接区块（右对齐） */}
            <div className="lg:col-start-3 py-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 lg:gap-16 gap-8">
                {MAGZINE_FOOTER_LINKS?.map((group, index) => {
                  return (
                    <div key={index}>
                      <div className="font-bold text-xl text-white lg:pb-8 pb-4">
                        {group.name}
                      </div>
                      <div className="flex flex-col gap-y-2">
                        {group?.menus?.map((menu, i) => {
                          return (
                            <div key={i}>
                              <SmartLink href={menu.href} className="hover:underline">
                                {menu.title}
                              </SmartLink>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* === 底部组件区块（夜间模式、统计等） === */}
        <div className="py-4 flex flex-col lg:flex-row  justify-between items-center border-t border-gray-800">
          <div className="flex gap-x-2 flex-wrap justify-between items-center">
            <CopyRightDate />
            <PoweredBy />
          </div>

          <DarkModeButton className="text-white" />

          <div className="flex justify-between items-center gap-x-2">
            <div className="flex items-center gap-x-4">
              <AnalyticsBusuanzi />
              <SocialButton />
            </div>
          </div>
        </div>

        {/* === 备案区块 === */}
        <div className="w-full text-center flex flex-wrap items-center justify-center gap-x-2 text-neutral-500">
          <BeiAnSite />
          <BeiAnGongAn />
        </div>
      </div>
    </footer>
  )
}

export default Footer
