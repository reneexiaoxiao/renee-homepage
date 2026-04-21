# Daily Digest 添加指南

## 目录结构

```
digests/
└── YYYY/
    └── MM/
        └── YYYY-MM-DD-slug/
            ├── images/
            │   ├── cover.jpg          # 封面图 (9:16 比例)
            │   ├── 01.jpg             # 卡片图1 (4320×7680)
            │   ├── 02.jpg             # 卡片图2 (4320×7680)
            │   ├── 03.jpg             # 卡片图3 (4320×7680)
            │   └── long-form.jpg      # 文字长图
            ├── metadata.json          # 元数据
            └── content.md             # 文字内容
```

## 添加新打卡步骤

### 1. 创建目录

```bash
# 例如：2024年3月21日，添加 Agentic AI 打卡
mkdir -p digests/2024/03/2024-03-21-agentic-ai/images
```

### 2. 准备图片

将以下图片放入 `images/` 文件夹：
- `cover.jpg` - 封面图，建议 1080×1920 (9:16)
- `01.jpg` ~ `03.jpg` - 卡片图，竖版 4320×7680
- `long-form.jpg` - 文字长图

### 3. 创建 metadata.json

```json
{
  "id": "2024-03-21-agentic-ai",
  "title": "Agentic AI 十大趋势：当AI成为主动的代理人",
  "date": "2024-03-21",
  "category": "ai",
  "categoryLabel": "AI与企业",
  "tags": ["Agentic AI", "AI趋势", "智能体"],
  "excerpt": "AI正在从被动工具转向主动代理人...",
  "images": {
    "cover": "cover.jpg",
    "cards": ["01.jpg", "02.jpg", "03.jpg"],
    "longForm": "long-form.jpg"
  },
  "author": "Renee",
  "readTime": "8 分钟"
}
```

**category 可选值：**
- `ai` - AI与企业
- `workforce` - 劳动力与职场
- `tech` - 前沿科技与宏观

### 4. 创建 content.md

使用 Markdown 格式编写内容：

```markdown
# 标题

## 核心洞察

内容...

## 要点

- 要点1
- 要点2

## 行动清单

1. 行动1
2. 行动2
```

### 5. 添加到 JavaScript 数据

在 `script.js` 中的 `digestData` 数组添加新条目：

```javascript
{
    id: '2024-03-21-agentic-ai',
    title: 'Agentic AI 十大趋势：当AI成为主动的代理人',
    date: '2024-03-21',
    category: 'ai',
    // ... 其他字段
    content: `这里是 HTML 格式的完整内容...`
}
```

## 图片规格建议

| 图片类型 | 建议尺寸 | 用途 |
|---------|---------|------|
| cover.jpg | 1080×1920 | 画廊封面 |
| 01-03.jpg | 4320×7680 | 小红书卡片 |
| long-form.jpg | 宽度≥1080 | 文字长图 |

## 自动化加载（未来版本）

目前数据硬编码在 `script.js` 中。未来版本将支持：
- 自动扫描 digests 目录
- 动态加载 metadata.json
- 自动生成卡片
