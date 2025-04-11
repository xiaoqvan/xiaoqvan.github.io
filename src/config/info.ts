import tx from '@/assets/img/tx.png'
import { MeConfig } from '@/types/types'

export const me: MeConfig = {
  // 【个人信息界面】
  // 名称
  name: 'xiaoqvan',
  // 头像
  avatar: tx,
  // 个人简介
  introduction: '欢迎来到我的个人主页',
  // 社交链接 (不需要的可以注释推荐最少2-3个)
  socialLinks: [
    { href: 'https://qm.qq.com/q/xwIReHzTLG', title: '添加QQ', icon: 'fa-qq' },
    { href: 'https://space.bilibili.com/171896697', title: 'bilibili', icon: 'fa-bilibili' },
    { href: 'https://github.com/xiaoqvan', title: '前往GitHub', icon: 'fa-github' },
    { href: 'https://twitter.com/xiao_qvan668', title: '前往x-twitter', icon: 'fa-twitter' },
    { href: 'https://t.me/xiaoqvan', title: '前往Telegram', icon: 'fa-telegram' },
  ],
}
