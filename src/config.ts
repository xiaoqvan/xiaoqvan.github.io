import type { HeaderConfig, DefaultConfig, MyhkMusicConfig, MeConfig, FooterConfig } from "@/types";

/**
 * 网站的默认设置
 */
export const defaultConfig: DefaultConfig = {
  /** 网站标题 */
  title: "萌喵次元权的主页",
  /** 网站描述 */
  description: "xiaoqvan的个人网站",
};

/**
 * 顶部导航栏
 * 当logo为空时，会使用title作为logo
 * 如果你设置了 logo 那么 title 将会无效
 */
export const header: HeaderConfig = {
  /** 顶部栏标题 */
  title: "xiaoqvan",
  /** 顶部栏网站logo */
  logo: "",
};

/**
 * 音乐播放器配置
 * 没有前往myhkw.cn获取，登录后在侧边栏的`主页`点击`我的播放器`获取ID
 * 侧边栏`歌单管理`→`我的全部歌单`→`新建歌单`可定义歌曲
 */
export const musicConfig: MyhkMusicConfig = {
  /** 明月浩空播放器ID */
  playerId: 168460845260,
};

/**
 * 关于我
 */
export const me: MeConfig = {
  name: "xiaoqvan",
  avatar: new URL("@/assets/img/tx.png", import.meta.url).href,
  introduction: "欢迎来到我的个人主页",
  /** icon输入对应平台的名称就设置对应的 icon
   * 支持的平台有：qq、bilibili、github、x-twitter、telegram
   * facebook、discord、youtube、reddit、line、steam、instagram、tiktok
   * weibo、zhihu
   * 如果没有支持的平台，使用图标的url链接
   */
  socialLinks: [
    { href: "https://qm.qq.com/q/xwIReHzTLG", title: "添加QQ", icon: "qq" },
    { href: "https://space.bilibili.com/171896697", title: "bilibili", icon: "bilibili" },
    { href: "https://github.com/xiaoqvan", title: "前往GitHub", icon: "github" },
    // { href: "https://twitter.com/xiao_qvan668", title: "前往x-twitter", icon: "x-twitter" },
    // { href: "https://t.me/xiaoqvan", title: "前往Telegram", icon: "telegram" },
  ],
};

/**
 * 底部栏配置
 */
export const Footer: FooterConfig = {
  // 【底部栏】
  // icp备案号(没有可为空)
  icp: "",
  // 底部名称
  footername: "xiaoqvan",
  // 底部名称跳转链接
  footerlink: "https://xiaoqvan.top",
  // 是否启用公安备案
  beian_enabled: false,
  // 公安备案跳转链接
  beian_link: "",
  // 公安备案图片链接
  beian_imgSrc: "",
  // 公安备案号
  beian_text: "",
};
