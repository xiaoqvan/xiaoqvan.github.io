/**
 * 社交链接项配置
 */
export interface SocialLink {
  /** 链接地址，格式为完整URL，如 'https://github.com/username' */
  href: string
  /** 链接标题，显示为提示文本 */
  title: string
  /** 图标名称，使用 'fa-' 前缀的Font Awesome图标名，如 'fa-github' */
  icon: string
}

/**
 * 个人信息配置
 */
export interface MeConfig {
  /** 个人名称，显示在页面顶部 */
  name: string
  /**
   * 头像图片路径
   * 可以是本地路径(如从assets导入)或外部URL
   */
  avatar: string
  /** 个人简介文字，显示在名称下方 */
  introduction: string
  /**
   * 社交链接列表
   * 建议至少添加2-3个社交链接
   */
  socialLinks: SocialLink[]
}

/**
 * 网站头部配置
 */
export interface HeaderConfig {
  /** 网站标题，显示在浏览器标签页 */
  title: string
}

/**
 * 游戏活动项配置
 */
export interface GameActivity {
  /** 数值，如活跃天数、角色数量等 */
  value: number
  /** 标签文本，说明该数值代表什么 */
  label: string
}

/**
 * 单个游戏配置
 */
export interface GameConfig {
  /**
   * 游戏类别标识符，用于样式和识别
   * 例如：'genshi'、'sr'、'zzz'等
   */
  gameclass: string
  /** 游戏内玩家名称 */
  playerName: string
  /**
   * 玩家等级，通常格式为"LV.XX"
   * 例如：'LV.60'
   */
  playerLevel: string
  /**
   * 游戏内头像图片URL
   * 可以使用官方API提供的头像或自定义图片
   */
  avatar: string
  /** 游戏名称，如"原神"、"崩坏：星穹铁道"等 */
  gameName: string
  /**
   * 游戏图标URL
   * 通常是游戏官方logo
   */
  gameIcon: string
  /**
   * 游戏UID，通常格式为"UID:XXXXXXXXX"
   * 例如：'UID:109087710'
   */
  gameUID: string
  /** 游戏服务器名称，如"天空岛"、"星穹列车"等 */
  gameServer: string
  /**
   * 游戏活跃度指标列表
   * 通常包含活跃天数、角色数、成就数等
   */
  gameActive: GameActivity[]
}

/**
 * 游戏展示区配置
 */
export interface GamesConfig {
  /** 要展示的游戏列表 */
  games: GameConfig[]
}

/**
 * 页面底部配置
 */
export interface FooterConfig {
  /**
   * ICP备案号，中国大陆网站需填写
   * 例如：'蜀ICP备XXXXXXXX号-X'
   * 没有可留空字符串
   */
  icp: string
  /** 底部显示的名称 */
  footername: string
  /** 底部名称链接，点击后跳转的地址 */
  footerlink: string
  /**
   * 是否启用公安备案信息显示
   * true: 显示公安备案
   * false: 不显示公安备案
   */
  beian_enabled: boolean
  /** 公安备案跳转链接，格式为完整URL */
  beian_link: string
  /** 公安备案图标图片链接 */
  beian_imgSrc: string
  /**
   * 公安备案号文本
   * 例如：'XXXXXXXXXXXXXX号'
   */
  beian_text: string
}

/**
 * 应用全局配置
 */
export interface AppConfig {
  /**
   * 背景图片路径
   * 可以是本地路径如'src/assets/img/background.webp'
   * 或完整的外部URL
   */
  backgroundImg: string
  /**
   * 明月浩空音乐播放器ID
   * 需要前往myhkw.cn获取
   * 登录后在侧边栏的`主页`点击`我的播放器`获取ID
   */
  playerId: number
}
