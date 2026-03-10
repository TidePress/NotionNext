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
 * Footer
 *
 * Layout:
 *  - Grid with three columns inside the page container:
 *    left: site owner (left aligned)
 *    center: flexible spacer (fills available space)
 *    right: Our Tenor (top) + links + analytics (stacked)
 *
 *  This ensures Our Tenor and site owner remain on the same horizontal line,
 *  and Our Tenor aligns vertically with AnalyticsBusuanzi in the right column.
 */
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

  const computePopupPosition = () => {
    const btn = buttonRef.current
    const popup = popupRef.current
    const container = containerRef.current
    if (!btn || !popup || !container) {
      setPopupStyle((s) => ({ ...s, visibility: 'hidden' }))
      return
    }

    const btnRect = btn.getBoundingClientRect()
    const popupRect = popup.getBoundingClientRect()
    const containerRect = container.getBoundingClientRect()
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight

    // Horizontal: center relative to container (page content area)
    let containerCenterX = containerRect.left + containerRect.width / 2
    let left = containerCenterX - popupRect.width / 2
    left = Math.max(8, Math.min(left, viewportWidth - popupRect.width - 8))

    // Vertical: prefer above the button; fallback below
    let top = btnRect.top - popupRect.height - 12
    if (top < 8) {
      top = btnRect.bottom + 12
      top = Math.max(8, Math.min(top, viewportHeight - popupRect.height - 8))
    }

    setPopupStyle({ left: Math.round(left), top: Math.round(top), visibility: 'visible' })
  }

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
      {/* page content container used as horizontal center reference */}
      <div ref={containerRef} className="max-w-screen-3xl w-full mx-auto relative">
        {/* Top row: left site owner and right column on same line */}
        <div className="w-full py-6">
          {/* Grid with three columns: left | center spacer | right column */}
          <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4">
            {/* Left: site owner info (left aligned) */}
            <div className="flex items-center gap-x-3">
              <LazyImage
                src={siteInfo?.icon}
                className="rounded-full"
                width={40}
                alt={siteConfig('AUTHOR')}
              />
              <div className="leading-tight">
                <div className="text-lg">{title}</div>
                <div className="flex items-center text-sm text-neutral-300">
                  <i className="fas fa-copyright" />
                  <a href={siteConfig('LINK')} className="underline font-bold ml-1">
                    {siteConfig('AUTHOR')}
                  </a>
                </div>
              </div>
            </div>

            {/* Center spacer: fills available space to keep left and right on same line */}
            <div />

            {/* Right column: Our Tenor (top) + links + analytics (stacked) */}
            <div className="flex flex-col items-end gap-4">
              {/* Our Tenor trigger aligned to the right edge of this column */}
              <div
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="relative"
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

              {/* Links block (right aligned) */}
              <div className="hidden sm:block w-full">
                <div className="grid grid-cols-2 lg:grid-cols-4 lg:gap-16 gap-6 justify-end">
                  {MAGZINE_FOOTER_LINKS?.map((group, index) => {
                    return (
                      <div key={index} className="text-right">
                        <div className="font-bold text-xl text-white lg:pb-8 pb-4">
                          {group.name}
                        </div>
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

              {/* Analytics and social (keeps aligned under Our Tenor) */}
              <div className="flex items-center gap-x-4">
                <AnalyticsBusuanzi />
                <SocialButton />
              </div>
            </div>
          </div>
        </div>

        {/* Tenor popup fixed and horizontally centered relative to containerRef */}
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

        {/* Bottom controls: 3-column grid so DarkModeButton stays centered */}
        <div className="py-4 border-t border-gray-800 mt-6">
          <div className="max-w-screen-3xl w-full mx-auto grid grid-cols-1 sm:grid-cols-3 items-center gap-4">
            {/* left column */}
            <div className="flex justify-center sm:justify-start items-center gap-x-2">
              <CopyRightDate />
              <PoweredBy />
            </div>

            {/* center column: DarkModeButton centered */}
            <div className="flex justify-center items-center">
              <DarkModeButton className="text-white" />
            </div>

            {/* right column */}
            <div className="flex justify-center sm:justify-end items-center gap-x-4">
              <div className="flex items-center gap-x-4">
                {/* AnalyticsBusuanzi already appears in the top-right column; this is a duplicate placement if you want it here too */}
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
      </div>
    </footer>
  )
}

export default Footer
