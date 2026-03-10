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
