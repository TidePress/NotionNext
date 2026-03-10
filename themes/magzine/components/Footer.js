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
 */
const Footer = ({ title }) => {
  const { siteInfo } = useGlobal()
  const MAGZINE_FOOTER_LINKS = siteConfig('MAGZINE_FOOTER_LINKS', [], CONFIG)

  const [tenorOpen, setTenorOpen] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  const buttonRef = useRef(null)
  const popupRef = useRef(null)

  // popupStyle 用于将弹窗定位为 fixed，避免被父容器 overflow:hidden 裁剪
  const [popupStyle, setPopupStyle] = useState({ left: 0, top: 0, visibility: 'hidden' })

  // Detect touch device
  useEffect(() => {
    const touch =
      typeof window !== 'undefined' &&
      ('ontouchstart' in window || navigator.maxTouchPoints > 0)
    setIsTouchDevice(Boolean(touch))
  }, [])

  // 点击页面任意处关闭（适用于触摸设备和鼠标）
  useEffect(() => {
    function handleDocClick(e) {
      if (buttonRef.current && buttonRef.current.contains(e.target)) return
      if (popupRef.current && popupRef.current.contains(e.target)) return
      setTenorOpen(false)
    }
    document.addEventListener('click', handleDocClick)
    return () => document.removeEventListener('click', handleDocClick)
  }, [])

  // Esc 关闭
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') setTenorOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  // 计算并设置弹窗位置（fixed），使其在按钮上方居中显示并避免超出视口
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

    // 目标：弹窗水平居中于按钮（以按钮中心为基准），垂直显示在按钮上方
    let left = btnRect.left + btnRect.width / 2 - popupRect.width / 2
    // 限制不超出视口左右边界（留 8px 间距）
    left = Math.max(8, Math.min(left, viewportWidth - popupRect.width - 8))

    // 优先放在按钮上方
    let top = btnRect.top - popupRect.height - 8
    // 如果上方空间不足（例如按钮靠近顶部），则放在按钮下方作为回退（但用户要求上方优先）
    if (top < 8) {
      top = btnRect.bottom + 8
    }

    setPopupStyle({ left: Math.round(left), top: Math.round(top), visibility: 'visible' })
  }

  // 在打开时和窗口变化时重新计算位置
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
      // 如果鼠标进入弹窗则不要关闭（弹窗上也绑定了 enter/leave）
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
        {/* 主体区块：使用 grid 三列布局，确保中间列严格居中 */}
        <div className="w-full py-16">
          <div className="flex flex-col lg:grid lg:grid-cols-3 lg:items-start gap-6">
            {/* 左列：站长信息 */}
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

            {/* 中间列：Our Tenor（按钮） */}
            <div className="lg:col-start-2 flex justify-center items-start py-6">
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

            {/* 右列：链接区块 */}
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

        {/* 悬浮弹窗（fixed，避免被父容器裁剪） */}
        {/*
          popupStyle.visibility 控制显示/隐藏
          popupRef 绑定 mouse enter/leave 以防止在从按钮移入弹窗时关闭
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

        {/* 底部组件区块 */}
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
