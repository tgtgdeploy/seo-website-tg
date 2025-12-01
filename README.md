# SEO Website TG

Telegram主站 - 提供Telegram相关资讯、教程和下载指南。

## 功能特点

- 多域名支持，动态适配站点配置
- 博客文章系统，从Supabase数据库获取
- 响应式设计，支持移动端

## SEO优化

已完成的SEO优化：

- **Open Graph**: 动态生成OG标签
- **Twitter Cards**: 社交分享优化
- **Canonical URLs**: 规范链接防止重复内容
- **JSON-LD Schema**: WebSite, Organization, SoftwareApplication, BlogPosting
- **动态Metadata**: 根据域名生成不同的SEO配置
- **图片优化**: AVIF/WebP格式，响应式尺寸
- **安全头部**: X-Content-Type-Options, Referrer-Policy
- **静态资源缓存**: 1年缓存策略

## 技术栈

- Next.js 14 (App Router)
- TailwindCSS
- Prisma Client
- TypeScript

## 快速开始

### 安装依赖

```bash
pnpm install
```

### 开发模式

```bash
pnpm dev
```

### 构建

```bash
pnpm build
```

## 部署到Vercel

1. 导入此仓库到Vercel
2. 配置环境变量
3. 绑定域名

## 环境变量

```bash
DATABASE_URL=postgresql://...
NEXT_PUBLIC_API_URL=https://adminseohub.xyz/api
NEXT_PUBLIC_SITE_URL=https://your-domain.com
GOOGLE_SITE_VERIFICATION=your-verification-code
```

## 项目结构

```
app/
├── layout.tsx      # 根布局，动态Metadata生成
├── page.tsx        # 首页
├── blog/
│   └── [id]/
│       └── page.tsx  # 博客详情页，含ArticleJsonLd
components/
├── JsonLd.tsx      # JSON-LD结构化数据组件
```

## 许可证

Private - All Rights Reserved
