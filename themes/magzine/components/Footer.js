import React, { useState, useRef, useEffect, useLayoutEffect } from 'react'
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
import Announcement from './Announcement'

const Footer = ({ title }) => {
  const { siteInfo } = useGlobal()
  const MAGZINE_FOOTER_LINKS = siteConfig('MAGZINE_FOOTER_LINKS', [], CONFIG)

  const [tenorOpen, setTenorOpen] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  const buttonRef = useRef(null)
  const popupRef = useRef(null)
  const containerRef = useRef(null)

  const [popupStyle, setPopupStyle] = useState({ left: 0, top: 0, visibility: 'hidden' })

  useEffect(() => {
    const touch =
      typeof window !== 'undefined' &&
      ('ontouchstart' in window || navigator.maxTouchPoints > 0)
    setIsTouchDevice(Boolean(touch))
  }, [])

  useEffect(() => {
    function handleDocClick(e) {
      if (buttonRef.current && buttonRef.current.contains(e.target)) return
      if (popupRef.current && popupRef.current.contains(e.target)) return
      setTenorOpen(false)
    }
    document.addEventListener('click', handleDocClick)
    return () => document.removeEventListener('click', handleDocClick)
  }, [])

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') setTenorOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  // Compute popup position: always center in viewport (Scheme A: vertical center)
  const computePopupPosition = () => {
    const popup = popupRef.current
    if (!popup) {
      setPopupStyle((s) => ({ ...s, visibility: 'hidden' }))
      return
    }

    const popupRect = popup.getBoundingClientRect()
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight

    // Horizontal center
    const left = Math.max(8, Math.round((viewportWidth - popupRect.width) / 2))

    // Vertical center (Scheme A)
    const top = Math.max(8, Math.round((viewportHeight - popupRect.height) / 2))

    setPopupStyle({ left, top, visibility: 'visible' })
  }

  useLayoutEffect(() => {
    if (tenorOpen) {
      // ensure popup is rendered before measuring
      // small timeout helps when popup content size depends on fonts/images
      const id = setTimeout(() => computePopupPosition(), 0)
      return () => clearTimeout(id)
    } else {
      setPopupStyle((s) => ({ ...s, visibility: 'hidden' }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tenorOpen])

  useEffect(() => {
    function handleResizeScroll() {
      if (tenorOpen) computePopupPosition()
    }
    window.addEventListener('resize', handleResizeScroll)
    window.addEventListener('scroll', handleResizeScroll, true)
    return () => {
      window.removeEventListener('resize', handleResizeScroll)
      window.removeEventListener('scroll', handleResizeScroll, true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tenorOpen])

  const handleMouseEnter = () => {
    if (!isTouchDevice) setTenorOpen(true)
  }
  const handleMouseLeave = (e) => {
    if (!isTouchDevice) {
      const to = e.relatedTarget
      if (popupRef.current && popupRef.current.contains(to)) return
      setTenorOpen(false)
    }
  }
  const handlePopupMouseLeave = (e) => {
    if (!isTouchDevice) {
      const to = e.relatedTarget
      if (buttonRef.current && buttonRef.current.contains(to)) return
      setTenorOpen(false)
    }
  }
  const handleToggleClick = () => {
    if (isTouchDevice) setTenorOpen((v) => !v)
    else setTenorOpen((v) => !v)
  }

  return (
    <footer id="footer-bottom" className="z-10 bg-black text-white w-full p-6 relative">
      <div ref={containerRef} className="max-w-screen-3xl w-full mx-auto">

        {/* 顶部：图标 + 右侧三行信息（Tide Press / © Tide Press / Our Tenor） */}
        <div className="flex items-center gap-x-4 py-6">
          <LazyImage
            src={siteInfo?.icon}
            className="rounded-full"
            width={48}
            height={48}
            alt={siteConfig('AUTHOR')}
          />

          <div className="flex flex-col leading-tight">
            {/* 第一行：站点名 */}
            <div className="text-lg font-semibold text-white">{title}</div>

            {/* 第二行：版权 */}
            <div className="text-sm text-neutral-300 flex items-center">
              <i className="fas fa-copyright" />
              <span className="ml-1">{siteConfig('AUTHOR')}</span>
            </div>

            {/* 第三行：Our Tenor（与版权字体一致） */}
            <div className="mt-1">
              <button
                ref={buttonRef}
                type="button"
                className="text-sm font-medium text-neutral-300 hover:text-white transition-colors duration-200 select-none"
                aria-expanded={tenorOpen}
                aria-haspopup="true"
                onClick={handleToggleClick}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                Our Tenor
              </button>
            </div>
          </div>
        </div>

        {/* Announcement（如果有） */}
        <div className="mb-4">
          <Announcement post={siteInfo?.notice} className="" />
        </div>

        {/* 弹窗：fixed 居中（水平与垂直居中，Scheme A） */}
        <div
          ref={popupRef}
          onMouseEnter={() => !isTouchDevice && setTenorOpen(true)}
          onMouseLeave={handlePopupMouseLeave}
          style={{
            position: 'fixed',
            left: popupStyle.left,
            top: popupStyle.top,
            visibility: popupStyle.visibility,
            zIndex: 9999,
            transform: 'none'
          }}
          className="w-[85vw] sm:w-[420px] lg:w-[520px] text-sm text-[#e6e6e6] bg-[#333333] p-5 rounded-lg leading-relaxed shadow-2xl border border-neutral-700 pointer-events-auto"
        >
          <p className="mb-2">
            · This platform is intended to bring the perspicacity of the Chinese societies with an academic, philosophical and critical perspectives for the world.
          </p>
          <p className="mb-2">
            · As a public and supportive community, we want the world to see the unheard voices of the era of China's transformationalisation.
          </p>
          <p className="mb-0">
            · Our writing and commuting language are multi-lingual and inclusive with English (UK), française (FR) and Chinese (TC&SC).
          </p>
        </div>

        {/* 底部控制区：三列布局（左：CopyRight/PoweredBy；中：DarkMode；右：Analytics/Social） */}
        <div className="py-4 border-t border-gray-800 mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 items-center gap-4">
            <div className="flex justify-center sm:justify-start items-center gap-x-2">
              <CopyRightDate />
              <PoweredBy />
            </div>

            <div className="flex justify-center items-center">
              <DarkModeButton className="text-white" />
            </div>

            <div className="flex justify-center sm:justify-end items-center gap-x-4">
              <div className="flex items-center gap-x-4">
                <AnalyticsBusuanzi />
                <SocialButton />
              </div>
            </div>
          </div>
        </div>

        {/* 备案区块 */}
        <div className="w-full text-center flex flex-wrap items-center justify-center gap-x-2 text-neutral-500 mt-4">
          <BeiAnSite />
          <BeiAnGongAn />
        </div>

        {/* 右下可选的 footer links（保留原有链接布局） */}
        <div className="hidden sm:block mt-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 lg:gap-16 gap-8">
            {MAGZINE_FOOTER_LINKS?.map((group, index) => {
              return (
                <div key={index} className="text-right">
                  <div className="font-bold text-xl text-white lg:pb-8 pb-4">{group.name}</div>
                  <div className="flex flex-col gap-y-2 items-end">
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
    </footer>
  )
}

export default Footer
