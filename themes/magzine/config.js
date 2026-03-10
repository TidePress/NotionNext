const CONFIG = {
  // 首屏信息栏按钮文字
  MAGZINE_HOME_BANNER_ENABLE: false, // 首屏右上角的宣传位
  MAGZINE_HOME_BUTTON: true,
  MAGZINE_HOME_BUTTON_URL: '/about',
  MAGZINE_HOME_BUTTON_TEXT: '了解更多',

  MAGZINE_HOME_HIDDEN_CATEGORY: '分享杂文', //不希望在首页展示的文章分类，用英文逗号隔开

  MAGZINE_HOME_TITLE: '立即开创您的在线业务。完全免费。',
  MAGZINE_HOME_DESCRIPTION:
    '借助NotionNext，获得助您开创、经营和扩展业务所需的全部工具和帮助。',
  MAGZINE_HOME_TIPS: 'AI时代来临，这是属于超级个体的狂欢盛宴！',

  // 首页底部推荐文章标签, 例如 [推荐] , 最多六篇文章; 若留空白''，则推荐最近更新文章
  MAGZINE_RECOMMEND_POST_TAG: 'hot',
  MAGZINE_RECOMMEND_POST_COUNT: 6,
  MAGZINE_RECOMMEND_POST_TITLE: '推荐文章',
  MAGZINE_RECOMMEND_POST_SORT_BY_UPDATE_TIME: false, // 推荐文章排序，为`true`时将强制按最后修改时间倒序

  // Style
  MAGZINE_RIGHT_PANEL_DARK: process.env.NEXT_PUBLIC_MAGZINE_RIGHT_DARK || false, // 右侧面板深色模式

  MAGZINE_POST_LIST_COVER: true, // 文章列表显示图片封面
  MAGZINE_POST_LIST_PREVIEW: true, // 列表显示文章预览
  MAGZINE_POST_LIST_CATEGORY: true, // 列表显示文章分类
  MAGZINE_POST_LIST_TAG: true, // 列表显示文章标签

  MAGZINE_POST_DETAIL_CATEGORY: true, // 文章显示分类
  MAGZINE_POST_DETAIL_TAG: true, // 文章显示标签

  // 文章页面联系卡
  MAGZINE_SOCIAL_CARD: true, // 是否显示右侧，点击加入社群按钮
  MAGZINE_SOCIAL_CARD_TITLE_1: '投稿入口',
  MAGZINE_SOCIAL_CARD_TITLE_2: 'Submit your works',
  MAGZINE_SOCIAL_CARD_TITLE_3: '点击这里/Click here',
  MAGZINE_SOCIAL_CARD_URL: 'mailto://tidewavereport@gmail.com',

  // 页脚菜单
  /*MAGZINE_FOOTER_LINKS: [
    {
      name: '友情链接',
      menus: [
        {
          title: 'Tangly的学习笔记',
          href: 'https://blog.tangly1024.com'
        },
        {
          title: 'NotionNext',
          href: 'https://www.tangly1024.com'
        }
      ]
    },
    {
      name: '开发者',
      menus: [
        { title: 'Github', href: 'https://github.com/tangly1024/NotionNext' },
        {
          title: '开发帮助',
          href: 'https://docs.tangly1024.com/article/how-to-develop-with-notion-next'
        },
        {
          title: '功能反馈',
          href: 'https://github.com/tangly1024/NotionNext/issues/new/choose'
        },
        {
          title: '技术讨论',
          href: 'https://github.com/tangly1024/NotionNext/discussions'
        },
        {
          title: '关于作者',
          href: 'https://blog.tangly1024.com/about'
        }
      ]
    },
    {
      name: '支持',
      menus: [
        {
          title: '站长社群',
          href: 'https://docs.tangly1024.com/article/chat-community'
        },
        {
          title: '咨询与定制',
          href: 'https://docs.tangly1024.com/article/my-service'
        },
        {
          title: '升级手册',
          href: 'https://docs.tangly1024.com/article/my-service'
        },
        {
          title: '安装教程',
          href: 'https://docs.tangly1024.com/article/how-to-update-notionnext'
        },
        { title: 'SEO推广', href: 'https://seo.tangly1024.com/' }
      ]
    },
    {
      name: '解决方案',
      menus: [
        { title: '建站工具', href: 'https://www.tangly1024.com/' },
        { title: 'NotionNext', href: 'https://docs.tangly1024.com/about' }
      ]
    }
  ],*/
  //页脚公告
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

  // 旧版本顶部菜单
  MAGZINE_MENU_CATEGORY: true, // 显示分类
  MAGZINE_MENU_TAG: true, // 显示标签
  MAGZINE_MENU_ARCHIVE: true, // 显示归档
  MAGZINE_MENU_SEARCH: true, // 显示搜索

  MAGZINE_WIDGET_TO_TOP: true // 跳回顶部
}
export default CONFIG
