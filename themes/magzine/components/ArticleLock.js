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

/**
 * 网页底脚
 *
 * 行为要点
 * - 在大屏（lg 及以上）使用三列布局：左侧站长信息左对齐，中间 Our Tenor 严格居中，右侧链接右侧（保持原样）。
 * - 在小屏（< lg）改为垂直堆叠，并且**两者都居中于页面中央**（站长信息与 Our Tenor 同一列、居中对齐）。
 * - 悬浮框使用 fixed 定位并始终在按钮上方显示（若上方空间不足则回退到下方），避免被页脚裁剪。
 * - 非触摸设备使用 hover（mouseenter/leave）控制显示；触摸设备使用点击切换；Esc 与点击外部关闭。
 */
const Footer = ({ title }) => {
  const { siteInfo } = useGlobal()
  const MAGZINE_FOOTER_LINKS = siteConfig('MAGZINE_FOOTER_LINKS', [], CONFIG)

  const [tenorOpen, setTenorOpen] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  const buttonRef = useRef(null)
  const popupRef = useRef(null)

  const [popupStyle, setPopupStyle] = useState({ left: 0, top: 0, visibility: 'hidden' })

  // Detect touch device
  useEffect(() => {
    const touch =
      typeof window !== 'undefined' &&
      ('ontouchstart' in window || navigator.maxTouchPoints > 0)
    setIsTouchDevice(Boolean(touch))
  }, [])

  // Click outside to close
  useEffect(() => {
    function handleDocClick(e) {
      if (buttonRef.current && buttonRef.current.contains(e.target)) return
      if (popupRef.current && popupRef.current.contains(e.target)) return
      setTenorOpen(false)
    }
    document.addEventListener('click', handleDocClick)
    return () => document.removeEventListener('click', handleDocClick)
  }, [])

  // Esc to close
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') setTenorOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  // Compute fixed popup position so it won't be clipped by footer container
  const computePopupPosition = () => {
    const btn = buttonRef.current
    const popup = popupRef.current
    if (!btn || !popup) {
      setPopupStyle((s) => ({ ...s, visibility: 'hidden' }))
      return
    }

    const btnRect = btn.getBoundingClientRect()
    const popupRect = popup.getBoundingClientRect()
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight

    // center horizontally on button center
    let left = btnRect.left + btnRect.width / 2 - popupRect.width / 2
    left = Math.max(8, Math.min(left, viewportWidth - popupRect.width - 8))

    // prefer above the button
    let top = btnRect.top - popupRect.height - 8
    if (top < 8) {
      // fallback below the button
      top = btnRect.bottom + 8
      // if still too low, clamp inside viewport
      top = Math.max(8, Math.min(top, viewportHeight - popupRect.height - 8))
    }

    setPopupStyle({ left: Math.round(left), top: Math.round(top), visibility: 'visible' })
  }

  // Recompute when open, on resize and on scroll
  useLayoutEffect(() => {
    if (tenorOpen) {
      computePopupPosition()
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

  // Hover / click handlers
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
  }

  return (
    <footer
      id="footer-bottom"
      className="z-10 bg-black text-white justify-center m-auto w-full p-6 relative"
    >
      <div className="max-w-screen-3xl w-full mx-auto ">
        {/* 主体区块
            - 小屏：flex-col 且居中（站长信息与 Our Tenor 垂直堆叠并居中）
            - 大屏：grid 三列，lg:items-center 保证三列垂直居中对齐（站长信息左对齐，Our Tenor 居中）
        */}
        <div className="w-full py-16">
          <div className="flex flex-col items-center lg:grid lg:grid-cols-3 lg:items-center gap-6">
            {/* 左列：站长信息
                - 小屏：宽度 100% 且居中
                - 大屏：左对齐（lg:justify-start）
            */}
            <div className="w-full flex items-center gap-x-4 py-6 justify-center lg:justify-start lg:col-start-1">
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

            {/* 中间列：Our Tenor 按钮
                - 小屏：与站长信息垂直堆叠并居中
                - 大屏：严格居中
            */}
            <div className="w-full flex justify-center items-center py-6 lg:col-start-2">
              <div
                className="relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  ref={buttonRef}
                  type="button"
                  className="font-bold text-neutral-400 hover:text-white transition-colors duration-200 py-2 select-none"
                  aria-expanded={tenorOpen}
                  aria-haspopup="true"
                  onClick={handleToggleClick}
                >
                  Our Tenor
                </button>
              </div>
            </div>

            {/* 右列：链接区块
                - 小屏：宽度 100%（会在垂直堆叠时显示在下方）
                - 大屏：右侧列
            */}
            <div className="w-full py-6 lg:col-start-3">
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

        {/* 悬浮弹窗（fixed，避免被父容器裁剪）
            - popupStyle.visibility 控制显示/隐藏
            - popupRef 绑定 mouse enter/leave 以防止在从按钮移入弹窗时关闭
        */}
        <div
          ref={popupRef}
          onMouseEnter={() => !isTouchDevice && setTenorOpen(true)}
          onMouseLeave={handlePopupMouseLeave}
          style={{
            position: 'fixed',
            left: popupStyle.left,
            top: popupStyle.top,
            visibility: popupStyle.visibility,
            zIndex: 9999
          }}
          className="w-[85vw] sm:w-[450px] lg:w-[600px] text-sm text-[#cccccc] bg-[#333333] p-6 rounded-lg text-left leading-relaxed shadow-2xl border border-neutral-700 pointer-events-auto"
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

        {/* 底部组件区块（夜间模式、统计等） */}
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

        {/* 备案区块 */}
        <div className="w-full text-center flex flex-wrap items-center justify-center gap-x-2 text-neutral-500">
          <BeiAnSite />
          <BeiAnGongAn />
        </div>
      </div>
    </footer>
  )
}

export default Footer
