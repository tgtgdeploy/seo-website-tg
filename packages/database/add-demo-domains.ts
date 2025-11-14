import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('\n🚀 开始添加示例域名...\n')

  // 查找 TG中文纸飞机 网站
  const tgWebsite = await prisma.website.findFirst({
    where: {
      name: 'TG中文纸飞机'
    }
  })

  if (!tgWebsite) {
    console.error('❌ 未找到"TG中文纸飞机"网站')
    return
  }

  console.log(`✅ 找到网站: ${tgWebsite.name} (ID: ${tgWebsite.id})\n`)

  // 定义要添加的域名
  const domains = [
    {
      domain: 'tg-chinese.com',
      siteName: 'TG中文纸飞机',
      siteDescription: 'Telegram中文版官方下载与使用教程',
      isPrimary: true,
      primaryTags: ['telegram'],
      secondaryTags: ['download', 'tutorial', 'guide', 'app']
    },
    {
      domain: 'telegram-download.com',
      siteName: 'Telegram下载',
      siteDescription: 'Telegram官方下载渠道与安装指南',
      isPrimary: false,
      primaryTags: ['download'],
      secondaryTags: ['telegram', 'install', 'app']
    },
    {
      domain: 'telegram-tutorial.com',
      siteName: 'Telegram教程',
      siteDescription: 'Telegram使用教程与操作指南',
      isPrimary: false,
      primaryTags: ['tutorial'],
      secondaryTags: ['telegram', 'guide', 'howto']
    },
    {
      domain: 'telegram-features.com',
      siteName: 'Telegram功能',
      siteDescription: 'Telegram功能介绍与使用技巧',
      isPrimary: false,
      primaryTags: ['features'],
      secondaryTags: ['telegram', 'app', 'function']
    }
  ]

  // 添加每个域名
  for (const domainData of domains) {
    try {
      // 检查域名是否已存在
      const existing = await prisma.domainAlias.findUnique({
        where: {
          domain: domainData.domain
        }
      })

      if (existing) {
        console.log(`⚠️  域名已存在: ${domainData.domain}`)
        continue
      }

      // 创建域名别名
      const created = await prisma.domainAlias.create({
        data: {
          domain: domainData.domain,
          siteName: domainData.siteName,
          siteDescription: domainData.siteDescription,
          isPrimary: domainData.isPrimary,
          primaryTags: domainData.primaryTags,
          secondaryTags: domainData.secondaryTags,
          websiteId: tgWebsite.id
        }
      })

      console.log(`✅ 已添加: ${created.domain}`)
      console.log(`   ${created.isPrimary ? '🔵 主域名' : '⚪ 副域名'}`)
      console.log(`   主标签: ${created.primaryTags.join(', ')}`)
      console.log(`   副标签: ${created.secondaryTags.join(', ')}\n`)
    } catch (error) {
      console.error(`❌ 添加失败: ${domainData.domain}`, error)
    }
  }

  console.log('\n📊 最终结果:')
  const finalDomains = await prisma.domainAlias.findMany({
    where: {
      websiteId: tgWebsite.id
    }
  })

  console.log(`总共配置了 ${finalDomains.length} 个域名别名`)

  console.log('\n💡 下一步:')
  console.log('1. 在 Vercel Dashboard 添加这些自定义域名')
  console.log('2. 配置 DNS 解析')
  console.log('3. 等待 SSL 证书生效')
  console.log('4. 访问域名测试文章筛选\n')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
