import { useGlobal } from '@/lib/global'
import dynamic from 'next/dynamic'

const NotionPage = dynamic(() => import('@/components/NotionPage'))

const Announcement = ({ post, className }) => {
  const { locale } = useGlobal()
  if (post?.blockMap) {
    return <div className={className}>
        <section id='announcement-wrapper' className="dark:text-gray-300 text-left ">
      //rounded-xl px-2 py-4 rounded-xl lg:p-6 p-4
            <div><i className='mr-2 fas fa-bullhorn' />{locale.COMMON.ANNOUNCEMENT}</div>
            {post && (<div id="announcement-content" className='texe-left'>
            <NotionPage post={post} />
        </div>)}
        </section>
    </div>
  } else {
    return <></>
  }
}
export default Announcement
