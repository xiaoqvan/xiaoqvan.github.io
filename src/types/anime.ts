/**
 * 一周中的某一天信息
 */
interface AnimeWeekday {
  /** 英文名称，例如 "Mon" */
  en: string;
  /** 中文名称，例如 "星期一" */
  cn: string;
  /** 日文名称，例如 "月耀日" */
  ja: string;
  /** 数字表示周几，例如 1 */
  id: number;
}

/**
 * 各分数的评分人数统计
 */
interface AnimeRatingCount {
  1: number;
  2: number;
  3: number;
  4: number;
  5: number;
  6: number;
  7: number;
  8: number;
  9: number;
  10: number;
}

/**
 * 动画评分信息
 */
interface AnimeRating {
  /** 总评分人数 */
  total: number;
  /** 各分数人数 */
  count: AnimeRatingCount;
  /** 平均分 */
  score: number;
}

/**
 * 动画封面图片
 */
interface AnimeImages {
  /** 大图 */
  large: string;
  /** 常规图 */
  common: string;
  /** 中等图 */
  medium: string;
  /** 小图 */
  small: string;
  /** 网格图 */
  grid: string;
}

/**
 * 收藏相关信息
 */
interface AnimeCollection {
  /** 正在追番人数 */
  doing: number;
  // 可根据实际接口补充其他字段
}

/**
 * 动画单条信息
 */
interface AnimeItem {
  /** 动画 ID */
  id: number;
  /** 动画链接 */
  url: string;
  /** 类型，例如 2 */
  type: number;
  /** 原名 */
  name: string;
  /** 中文名 */
  name_cn: string;
  /** 简介 */
  summary: string;
  /** 首播日期，格式 "YYYY-MM-DD" */
  air_date: string;
  /** 首播星期几，数字表示 */
  air_weekday: number;
  /** 评分信息 */
  rating: AnimeRating;
  /** 排名 */
  rank: number;
  /** 封面图片 */
  images: AnimeImages;
  /** 收藏信息 */
  collection: AnimeCollection;
}

/**
 * 动画周表数据 — 单天的动画信息
 */
export interface AnimeDay {
  /** 一周中某一天的信息 */
  weekday: AnimeWeekday;
  /** 当天的动画列表 */
  items: AnimeItem[];
}

/**
 * 动画周表数据 — 一周的动画数据
 */
export type Anime = AnimeDay[];
