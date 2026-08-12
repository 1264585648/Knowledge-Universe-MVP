# Xuan.Z Knowledge Universe

一个以“知识宇宙”为世界观的 3D 个人主页实验：中央是神性知识核心，多个知识星球沿不同轨道运行，每颗星球代表一个长期学习领域。

## MVP 已实现

- 3D 星空与粒子背景
- 程序化神性中央主体（后续可替换为专属人物模型）
- 6 个知识领域星球
- 星球公转 + 自转 + 发光星环
- Hover 标签与视觉聚焦
- 点击星球展示领域详情
- Camera 轻微视差 / 聚焦移动
- 传统知识领域导航兜底
- 移动端响应式布局
- `prefers-reduced-motion` 降低动态支持
- GitHub Pages Actions 工作流

## 技术栈

- React
- Vite
- Three.js
- React Three Fiber
- Drei

## 本地启动

```bash
npm install
npm run dev
```

生产构建：

```bash
npm run build
```

## 下一阶段

1. 用专属“神 / 知识守护者”人物资产替换程序化剪影。
2. 增加 Bloom 后处理、轨道能量流、星云与更高级材质。
3. 星球接入真实博客分类和文章数量。
4. 点击星球后 Camera 飞行到局部知识地图。
5. 把子主题做成卫星，把文章做成卫星节点。
6. 与 `my_blog` 主站共享内容数据，形成“炫酷入口 + 高可读文章页”。

## GitHub Pages

Vite `base` 已配置为：

```js
base: '/Knowledge-Universe-MVP/'
```

推送到 `main` 后，在 Repository → Settings → Pages 中选择 **GitHub Actions** 作为 Source，即可由工作流发布。
