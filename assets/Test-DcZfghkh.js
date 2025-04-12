import{c as a,h as u,P as t,a as n,g as o,F as s,Q as g,R as c}from"./main-D3UjMyXd.js";const r={title:"第一篇文章",date:"2023-04-27T14:49:00.000Z",description:"文章介绍",tags:["测试","标题","文章"]},h=`<p><img src="../assets/img/background1.webp" alt="主页"></p>
<h1>xiaoqvan 的个人主页</h1>
<p>这里是 xiaoqvan 的个人主页，使用 vue3 + vite + JS 构建</p>
<h2>访问量</h2>
<p><img src="https://count.getloli.com/@xiaoqvan.github.io?name=xiaoqvan.github.io&amp;theme=rule34&amp;padding=9&amp;offset=0&amp;align=top&amp;scale=1&amp;pixelated=1&amp;darkmode=auto" alt=":xiaoqvan.github.io"></p>
<h2>未来</h2>
<ul>
<li>
<p>更换天气显示卡片</p>
</li>
<li>
<p>设置页面</p>
</li>
<li>
<p>博客页面</p>
</li>
</ul>
<h2>主页界面</h2>
<p>xiaoqvan 的个人主页
<img src="../assets/img/background10.webp" alt="主页"></p>
<h3>预览</h3>
<ul>
<li><a href="https://www.xiaoqvan.top">权的主页</a></li>
</ul>
<h2>功能</h2>
<ul>
<li>[x] Hitokotod 一言</li>
<li>[x] 音乐播放器</li>
<li>[ ] 移动端适配</li>
<li>[x] 动漫番剧</li>
<li>[ ] 博客页面</li>
<li>[x] 游戏信息页面</li>
</ul>
<h2>构建并部署</h2>
<h3>克隆</h3>
<pre><code class="language-bash"># 克隆仓库
git clone https://github.com/xiaoqvan/xiaoqvan.github.io.git
# 进入
cd xiaoqvan.github.io
# 安装依赖
npm install
</code></pre>
<h3>构建</h3>
<pre><code class="language-bash"># 预览
npm run dev
# 构建
npm run build
</code></pre>
<h3>自动部署</h3>
<ul>
<li>
<p><code>settings &gt; Actions &gt; General</code>，拉到页面底部，在 <code>Workflow permissions</code> 下，勾选 <code>Read and write permissions</code>，并点击保存按钮</p>
</li>
<li>
<p><code>settings &gt; Pages</code>, 在 <code>Build and deployment</code> 中，<code>Source</code> 选择 <code>Deploy from a branch</code>, <code>Branch</code> 选择 <code>gh-pages</code>，并点击保存按钮
(首次创建可能没有 <code>gh-pages</code>分支，你可以先完成上面的设置后，推送一次构建后的代码到<code>gh-pages</code>分支，等待 <code>github actions</code> 自动部署完成)</p>
</li>
<li>
<p>修改 <code>vite.config.ts</code> 中的 <code>base</code> 选项：</p>
<ul>
<li>如果你准备发布到 <code>https://&lt;USERNAME&gt;.github.io/</code> ，你可以省略这一步，因为 <code>base</code> 默认就是 <code>&quot;/&quot;</code> 。</li>
<li>如果你准备发布到 <code>https://&lt;USERNAME&gt;.github.io/&lt;REPO&gt;/</code> ，也就是说你的仓库地址是 <code>https://github.com/&lt;USERNAME&gt;/&lt;REPO&gt;</code> ，则将 <code>base</code> 设置为 <code>&quot;/&lt;REPO&gt;/&quot;</code>。</li>
<li>REPO 代表仓库名，USERNAME 为你的 github 用户名</li>
</ul>
</li>
</ul>
<p>如需要自定义域名，请查看 <a href="https://docs.github.com/zh/pages/configuring-a-custom-domain-for-your-github-pages-site/about-custom-domains-and-github-pages">Github Pages 文档</a></p>
<pre><code class="language-js">export default defineConfig({
  base: '/', // &lt;&lt;设置这行
  plugins: [
    // ... 其他代码 ...
  ],
  // ... 其他代码 ...
})
</code></pre>
<h3>开启 pages 功能</h3>
<p>在 github 仓库进入 Settings → Pages → 选择 gh-pages 分支作为 github 仓库的 Pages 分支
<img src="/screenshots/image1.png" alt="Pages"></p>
<h2>修改页面内容</h2>
<h3>社交链接</h3>
<p>在 <code>src/config/Config.js</code> 中的 <code>socialLinks</code> 可以自定义社交链接。
更换 <code>href</code> 为自己的链接</p>
<pre><code class="language-js">  socialLinks: [
      { href: &quot;#&quot;, title: &quot;添加QQ&quot;, icon: &quot;fa-qq&quot; },
      { href: &quot;#&quot;, title: &quot;bilibili&quot;, icon: &quot;fa-bilibili&quot; },
      { href: &quot;#&quot;, title: &quot;前往GitHub&quot;, icon: &quot;fa-github&quot; },
      { href: &quot;#&quot;, title: &quot;前往x-twitter&quot;, icon: &quot;fa-x-twitter&quot; },
      { href: &quot;#&quot;, title: &quot;前往Telegram&quot;, icon: &quot;fa-telegram&quot; },
    ],
</code></pre>
<h3>音乐</h3>
<blockquote>
<p>本项目采用了基于免费使用的 <code>明月浩空</code> 的音乐播放器，可使用明月浩空的后台管理页面自定义歌单列表
请在 <code>src/config/Config.js</code> 中的 <code>playerId</code> 中填写你自己的明月浩空播放器 id</p>
</blockquote>
<pre><code class="language-js">  // 【音乐播放器】
  // 填写明月浩空音乐播放器ID
  // 没有前往myhkw.cn获取，登录后在侧边栏的\`主页\`点击\`我的播放器\`获取ID
  // 侧边栏\`歌单管理\`→\`我的全部歌单\`→\`新建歌单\`可定义歌曲
  // 侧边栏\`播放器管理\`→\`全部设置\`设置你的域名授权和添加刚刚新建立的歌单
  playerId: &quot;#############&quot;,
</code></pre>
<h3>网站背景</h3>
<p>使用自定义外部链接的可以在 <code>src/config/Config.ts</code> 中的 <code>backgroundImg</code> 中自定义.</p>
<pre><code class="language-ts">  // 【背景图片】
  // 填写背景图片链接
  backgroundImg: &quot;#&quot;,
</code></pre>
<h3>游戏页面</h3>
<p>在 <code>src/config/Config.js</code> 中的 <code>games</code> 中自定义游戏信息</p>
<pre><code class="language-ts">  games: [
    {
      // 游戏简称
      gameclass: &quot;#&quot;,
      // 角色名称
      playerName: &quot;#&quot;,
      // 角色等级
      playerLevel: &quot;LV.#&quot;,
      // 角色头像
      avatar: &quot;#&quot;,
      // 游戏名称
      gameName: &quot;#&quot;,
      // 游戏图标
      gameIcon: &quot;#&quot;,
      // 游戏UID
      gameUID: &quot;UID:##########&quot;,
      // 游戏服务器
      gameServer: &quot;#&quot;,
      // 游戏活跃信息
      gameActive: [
        { value: &quot;100&quot;, label: &quot;活跃天数&quot; },
        { value: &quot;100&quot;, label: &quot;角色数&quot; },
        { value: &quot;100&quot;, label: &quot;成就&quot; }
      ]
    },
  ],
</code></pre>
<h3>番剧</h3>
<p>番剧页面使用 Bangumi 的 api 接口实时更新。
感谢<a href="https://bangumi.github.io/api/">Bangumi</a>的 API 接口</p>
<h2>技术栈</h2>
<ul>
<li><a href="https://cn.vuejs.org/">Vue</a></li>
<li><a href="https://vitejs.cn/vite3-cn/">Vite</a></li>
<li><a href="https://pinia.vuejs.org/zh/">Pinia</a></li>
<li><a href="https://github.com/alexmacarthur/typeit">typeit</a></li>
<li><a href="https://router.vuejs.org/zh/">Vue-router</a></li>
<li><a href="https://devtools-next.vuejs.org/">Vue DevTools</a></li>
</ul>
<h2>API</h2>
<ul>
<li><a href="https://bangumi.github.io/api/">Bangumi</a></li>
<li><a href="https://hitokoto.cn/">Hitokoto</a></li>
</ul>
`,m=[{level:"1",content:"xiaoqvan &#x7684;&#x4E2A;&#x4EBA;&#x4E3B;&#x9875;"},{level:"2",content:"&#x8BBF;&#x95EE;&#x91CF;"},{level:"2",content:"&#x672A;&#x6765;"},{level:"2",content:"&#x4E3B;&#x9875;&#x754C;&#x9762;"},{level:"3",content:"&#x9884;&#x89C8;"},{level:"2",content:"&#x529F;&#x80FD;"},{level:"2",content:"&#x6784;&#x5EFA;&#x5E76;&#x90E8;&#x7F72;"},{level:"3",content:"&#x514B;&#x9686;"},{level:"3",content:"&#x6784;&#x5EFA;"},{level:"3",content:"&#x81EA;&#x52A8;&#x90E8;&#x7F72;"},{level:"3",content:"&#x5F00;&#x542F; pages &#x529F;&#x80FD;"},{level:"2",content:"&#x4FEE;&#x6539;&#x9875;&#x9762;&#x5185;&#x5BB9;"},{level:"3",content:"&#x793E;&#x4EA4;&#x94FE;&#x63A5;"},{level:"3",content:"&#x97F3;&#x4E50;"},{level:"3",content:"&#x7F51;&#x7AD9;&#x80CC;&#x666F;"},{level:"3",content:"&#x6E38;&#x620F;&#x9875;&#x9762;"},{level:"3",content:"&#x756A;&#x5267;"},{level:"2",content:"&#x6280;&#x672F;&#x6808;"},{level:"2",content:"API"}];function l(i,e){return u(),a(s,null,[e[0]||(e[0]=t('<p><img src="'+g+'" alt="主页"></p><h1>xiaoqvan 的个人主页</h1><p>这里是 xiaoqvan 的个人主页，使用 vue3 + vite + JS 构建</p><h2>访问量</h2><p><img src="https://count.getloli.com/@xiaoqvan.github.io?name=xiaoqvan.github.io&amp;theme=rule34&amp;padding=9&amp;offset=0&amp;align=top&amp;scale=1&amp;pixelated=1&amp;darkmode=auto" alt=":xiaoqvan.github.io"></p><h2>未来</h2><ul><li><p>更换天气显示卡片</p></li><li><p>设置页面</p></li><li><p>博客页面</p></li></ul><h2>主页界面</h2><p>xiaoqvan 的个人主页 <img src="'+c+'" alt="主页"></p><h3>预览</h3><ul><li><a href="https://www.xiaoqvan.top">权的主页</a></li></ul><h2>功能</h2><ul><li>[x] Hitokotod 一言</li><li>[x] 音乐播放器</li><li>[ ] 移动端适配</li><li>[x] 动漫番剧</li><li>[ ] 博客页面</li><li>[x] 游戏信息页面</li></ul><h2>构建并部署</h2><h3>克隆</h3>',15)),e[1]||(e[1]=n("pre",null,[n("code",{class:"language-bash","v-pre":"true"},`# 克隆仓库
git clone https://github.com/xiaoqvan/xiaoqvan.github.io.git
# 进入
cd xiaoqvan.github.io
# 安装依赖
npm install
`)],-1)),e[2]||(e[2]=n("h3",null,"构建",-1)),e[3]||(e[3]=n("pre",null,[n("code",{class:"language-bash","v-pre":"true"},`# 预览
npm run dev
# 构建
npm run build
`)],-1)),e[4]||(e[4]=t('<h3>自动部署</h3><ul><li><p><code>settings &gt; Actions &gt; General</code>，拉到页面底部，在 <code>Workflow permissions</code> 下，勾选 <code>Read and write permissions</code>，并点击保存按钮</p></li><li><p><code>settings &gt; Pages</code>, 在 <code>Build and deployment</code> 中，<code>Source</code> 选择 <code>Deploy from a branch</code>, <code>Branch</code> 选择 <code>gh-pages</code>，并点击保存按钮 (首次创建可能没有 <code>gh-pages</code>分支，你可以先完成上面的设置后，推送一次构建后的代码到<code>gh-pages</code>分支，等待 <code>github actions</code> 自动部署完成)</p></li><li><p>修改 <code>vite.config.ts</code> 中的 <code>base</code> 选项：</p><ul><li>如果你准备发布到 <code>https://&lt;USERNAME&gt;.github.io/</code> ，你可以省略这一步，因为 <code>base</code> 默认就是 <code>&quot;/&quot;</code> 。</li><li>如果你准备发布到 <code>https://&lt;USERNAME&gt;.github.io/&lt;REPO&gt;/</code> ，也就是说你的仓库地址是 <code>https://github.com/&lt;USERNAME&gt;/&lt;REPO&gt;</code> ，则将 <code>base</code> 设置为 <code>&quot;/&lt;REPO&gt;/&quot;</code>。</li><li>REPO 代表仓库名，USERNAME 为你的 github 用户名</li></ul></li></ul><p>如需要自定义域名，请查看 <a href="https://docs.github.com/zh/pages/configuring-a-custom-domain-for-your-github-pages-site/about-custom-domains-and-github-pages">Github Pages 文档</a></p>',3)),e[5]||(e[5]=n("pre",null,[n("code",{class:"language-js","v-pre":"true"},`export default defineConfig({
  base: '/', // <<设置这行
  plugins: [
    // ... 其他代码 ...
  ],
  // ... 其他代码 ...
})
`)],-1)),e[6]||(e[6]=t('<h3>开启 pages 功能</h3><p>在 github 仓库进入 Settings → Pages → 选择 gh-pages 分支作为 github 仓库的 Pages 分支 <img src="/screenshots/image1.png" alt="Pages"></p><h2>修改页面内容</h2><h3>社交链接</h3><p>在 <code>src/config/Config.js</code> 中的 <code>socialLinks</code> 可以自定义社交链接。 更换 <code>href</code> 为自己的链接</p>',5)),e[7]||(e[7]=n("pre",null,[n("code",{class:"language-js","v-pre":"true"},`  socialLinks: [
      { href: "#", title: "添加QQ", icon: "fa-qq" },
      { href: "#", title: "bilibili", icon: "fa-bilibili" },
      { href: "#", title: "前往GitHub", icon: "fa-github" },
      { href: "#", title: "前往x-twitter", icon: "fa-x-twitter" },
      { href: "#", title: "前往Telegram", icon: "fa-telegram" },
    ],
`)],-1)),e[8]||(e[8]=n("h3",null,"音乐",-1)),e[9]||(e[9]=n("blockquote",null,[n("p",null,[o("本项目采用了基于免费使用的 "),n("code",null,"明月浩空"),o(" 的音乐播放器，可使用明月浩空的后台管理页面自定义歌单列表 请在 "),n("code",null,"src/config/Config.js"),o(" 中的 "),n("code",null,"playerId"),o(" 中填写你自己的明月浩空播放器 id")])],-1)),e[10]||(e[10]=n("pre",null,[n("code",{class:"language-js","v-pre":"true"},'  // 【音乐播放器】\n  // 填写明月浩空音乐播放器ID\n  // 没有前往myhkw.cn获取，登录后在侧边栏的`主页`点击`我的播放器`获取ID\n  // 侧边栏`歌单管理`→`我的全部歌单`→`新建歌单`可定义歌曲\n  // 侧边栏`播放器管理`→`全部设置`设置你的域名授权和添加刚刚新建立的歌单\n  playerId: "#############",\n')],-1)),e[11]||(e[11]=n("h3",null,"网站背景",-1)),e[12]||(e[12]=n("p",null,[o("使用自定义外部链接的可以在 "),n("code",null,"src/config/Config.ts"),o(" 中的 "),n("code",null,"backgroundImg"),o(" 中自定义.")],-1)),e[13]||(e[13]=n("pre",null,[n("code",{class:"language-ts","v-pre":"true"},`  // 【背景图片】
  // 填写背景图片链接
  backgroundImg: "#",
`)],-1)),e[14]||(e[14]=n("h3",null,"游戏页面",-1)),e[15]||(e[15]=n("p",null,[o("在 "),n("code",null,"src/config/Config.js"),o(" 中的 "),n("code",null,"games"),o(" 中自定义游戏信息")],-1)),e[16]||(e[16]=n("pre",null,[n("code",{class:"language-ts","v-pre":"true"},`  games: [
    {
      // 游戏简称
      gameclass: "#",
      // 角色名称
      playerName: "#",
      // 角色等级
      playerLevel: "LV.#",
      // 角色头像
      avatar: "#",
      // 游戏名称
      gameName: "#",
      // 游戏图标
      gameIcon: "#",
      // 游戏UID
      gameUID: "UID:##########",
      // 游戏服务器
      gameServer: "#",
      // 游戏活跃信息
      gameActive: [
        { value: "100", label: "活跃天数" },
        { value: "100", label: "角色数" },
        { value: "100", label: "成就" }
      ]
    },
  ],
`)],-1)),e[17]||(e[17]=t('<h3>番剧</h3><p>番剧页面使用 Bangumi 的 api 接口实时更新。 感谢<a href="https://bangumi.github.io/api/">Bangumi</a>的 API 接口</p><h2>技术栈</h2><ul><li><a href="https://cn.vuejs.org/">Vue</a></li><li><a href="https://vitejs.cn/vite3-cn/">Vite</a></li><li><a href="https://pinia.vuejs.org/zh/">Pinia</a></li><li><a href="https://github.com/alexmacarthur/typeit">typeit</a></li><li><a href="https://router.vuejs.org/zh/">Vue-router</a></li><li><a href="https://devtools-next.vuejs.org/">Vue DevTools</a></li></ul><h2>API</h2><ul><li><a href="https://bangumi.github.io/api/">Bangumi</a></li><li><a href="https://hitokoto.cn/">Hitokoto</a></li></ul>',6))],64)}const p={render:l};p.__hmrId="/home/runner/work/xiaoqvan.github.io/xiaoqvan.github.io/src/markdown/Test.md";const x=i=>({components:i,render:l});export{p as VueComponent,x as VueComponentWith,r as attributes,h as html,m as toc};
