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
 * Behavior summary
 * - The site-owner block (avatar / title / copyright) and the "Our Tenor" trigger
 *   remain on the same horizontal line at all viewport sizes.
 * - "Our Tenor" is visually centered relative to the page container while the
 *   site-owner block stays left-aligned. On very small screens both appear on
 *   the same line (center + left) rather than stacking.
 * - The Tenor popup is positioned fixed (above the trigger when possible) so it
 *   won't be clipped by the footer container.
 * - Hover (desktop) and click (touch) behaviors preserved; Esc and outside click close.
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
    const container = containerRef.current
    if (!btn || !popup || !container) {
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
      {/* containerRef spans the page-width content area; Our Tenor will be centered relative to this */}
      <div ref={containerRef} className="max-w-screen-3xl w-full mx-auto relative">
        {/* === Top row: site-owner (left) + Our Tenor (centered absolute) + links (right) === */}
        <div className="w-full py-16">
          {/* Row wrapper: keep the left block and the right block in flow.
              The Our Tenor trigger is absolutely centered within containerRef so it
              visually sits on the same horizontal line as the site-owner block. */}
          <div className="relative flex items-center justify-between gap-4">
            {/* Left: site-owner info (always on the same line) */}
            <div className="flex items-center gap-x-3 whitespace-nowrap">
              <LazyImage
                src={siteInfo?.icon}
                className="rounded-full"
                width={40}
                alt={siteConfig('AUTHOR')}
              />
              <div className="flex items-center gap-x-2">
                <div>
                  <h1 className="text-lg">{title}</h1>
                  <div className="flex items-center">
                    <i className="fas fa-copyright" />
                    <a
                      href={siteConfig('LINK')}
                      className="underline font-bold ml-1"
                    >
                      {siteConfig('AUTHOR')}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: links (keeps its place on the right) */}
            <div className="hidden sm:flex lg:grid lg:grid-cols-4 gap-8">
              {/* keep original link rendering but hide on very small screens to avoid overlap */}
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

            {/* On very small screens we keep links below; the important part is the left + centered tenor stay on one line */}
          </div>
        </div>

        {/* Our Tenor trigger: absolutely centered within the containerRef so it always sits on the same horizontal line */}
        <div
          className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
          style={{ pointerEvents: 'none' }} // allow the button itself to handle pointer events
        >
          <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{ pointerEvents: 'auto' }}
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

        {/* Tenor popup (fixed) */}
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

        {/* === Bottom area: keep the original footer controls and备案 blocks === */}
        <div className="py-4 flex flex-col lg:flex-row justify-between items-center border-t border-gray-800 mt-6">
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

        <div className="w-full text-center flex flex-wrap items-center justify-center gap-x-2 text-neutral-500 mt-4">
          <BeiAnSite />
          <BeiAnGongAn />
        </div>
      </div>
    </footer>
  )
}

export default Footer
