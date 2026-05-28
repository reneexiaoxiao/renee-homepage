// ===== Language Toggle =====
const LANG_STORAGE_KEY = 'renee-lang';
const supportedLanguages = ['zh', 'en'];
let renderActiveCareerPanel = null;

function isEnglishRoute() {
    return window.location.pathname.replace(/\/+$/, '') === '/en';
}

function getStoredLanguage() {
    if (isEnglishRoute()) return 'en';
    const storedLanguage = localStorage.getItem(LANG_STORAGE_KEY);
    return supportedLanguages.includes(storedLanguage) ? storedLanguage : 'zh';
}

let currentLanguage = getStoredLanguage();

const translations = {
    en: {
        '关于': 'About',
        '履历': 'Career',
        '公开分享': 'Speaking',
        '思考手记': 'Notes',
        'AI 小项目': 'AI Projects',
        '联系': 'Contact',
        '尾声': 'Epilogue',
        '首页': 'Home',
        '分享': 'Speaking',
        '思考': 'Notes',
        '项目': 'Projects',
        'The Timeless Art of Evolution': 'The Timeless Art of Evolution',
        '飞书企业效能顾问，关注企业 AI 应用从场景到结果的落地。': 'Feishu enterprise efficiency consultant focused on turning enterprise AI from scenarios into measurable outcomes.',
        '"在所有人都在加速的时代，我选择先把手弄脏，亲手把石头推上山。石头会滚下来——但沿途那些「叮」的瞬间，是真的。我是 Renee。"': '"In an age where everyone is accelerating, I choose to get my hands dirty and push the stone myself. It may roll back down, but the sparks along the way are real. I am Renee."',
        '飞书企业效能顾问': 'Feishu Consultant',
        '华东KA客户': 'East China KA Clients',
        '企业AI应用落地': 'Enterprise AI Adoption',
        '开始浏览': 'Start Exploring',
        '聊聊企业 AI 落地': 'Talk Enterprise AI',
        '关于我': 'About Me',
        '大家好，我是张岚焱（Renee），base 上海，目前在字节跳动飞书做企业效能顾问，服务华东区域 KA 客户，主要聚焦互联网和机器人行业，日常在做企业 AI 应用落地这件事。': 'Hi, I am Renee Zhang, based in Shanghai. I work as an enterprise efficiency consultant at ByteDance Feishu, serving East China KA clients with a focus on internet and robotics companies. Most of my work is about helping enterprise AI move from idea to actual usage.',
        '从 UC 伯克利交流回来后，我一直在想一个问题：AI 时代，有哪些事即便 AI 能做，我也坚持要自己做？': 'After returning from UC Berkeley, I kept asking myself: in the AI era, what should I still insist on doing myself, even when AI can help?',
        '我给自己的答案是三件事：亲自消化内容、亲自在脑子里连出新的线索、亲自动手写下来。于是就有了 #Learn&Digest 这项长期练习。工作里也是一样，我更愿意从场景挖掘、方案设计到陪跑实施，一步步把 AI 真正推到业务现场。': 'My answer is three things: digest ideas myself, connect them in my own mind, and write them down by hand. That became my long-term #Learn&Digest practice. At work, I take the same approach: discover scenarios, design solutions, and walk with teams until AI actually enters their workflow.',
        '这件事做着做着，我越来越确信：AI 越强大，人越需要和真实的人面对面碰撞。 再精准的推荐，也不如一次真实相遇带来的“叮”更有生命力。所以工作之外，我也在持续搭智能体、玩 AI 编程，运营飞书客户的 AI 实践交流群，也在复旦 MBA AI 俱乐部、私董会和公开分享场域里继续和人碰撞。': 'The longer I do this, the more I believe that the stronger AI becomes, the more people need real, face-to-face collisions. No recommendation engine can replace the spark of a real encounter. Outside work, I keep building agents, experimenting with AI coding, running Feishu AI practice communities, and showing up in MBA, peer advisory, and public sharing spaces.',
        'AI 时代最稀缺的，不是算力，而是人对场景的洞察力，以及一步步把事做成的行动力。如果你也在做企业 AI 落地，或者你的企业正在琢磨从哪里开始，我很乐意一起聊聊场景、方案和共创的可能。': 'In the AI era, the scarce resource is not compute. It is human insight into real scenarios, plus the will to make things work step by step. If you are also working on enterprise AI adoption, or wondering where your company should begin, I would love to talk about scenarios, solutions, and co-creation.',
        '企业AI落地 × 场景共创 × 陪跑实施': 'Enterprise AI × Scenario Co-creation × Implementation',
        '华东KA × 互联网 × 机器人': 'East China KA × Internet × Robotics',
        '企业AI应用落地分享': 'Enterprise AI Talks',
        '飞书客户AI实践交流群': 'Feishu AI Practice Community',
        '复旦MBA AI俱乐部': 'Fudan MBA AI Club',
        '私董会教练': 'Peer Advisory Coach',
        '滑雪': 'Skiing',
        '自由潜': 'Freediving',
        '掼蛋': 'Guandan',
        '鸡尾酒': 'Cocktails',
        '探店': 'Food Hunting',
        '桌游': 'Board Games',
        '职业履历': 'Career Journey',
        '当前角色': 'Current Role',
        '能力证明': 'Proof of Work',
        '德勤咨询': 'Deloitte Consulting',
        '高级咨询顾问': 'Senior Consultant',
        '数据与成长': 'Data and Growth',
        '能力底盘': 'Foundation',
        '高价值客户': 'High-value Clients',
        'AI 应用场景': 'AI Scenarios',
        '2022.03 - 至今': '2022.03 - Present',
        '2016 - 至今': '2016 - Present',
        '字节跳动（飞书）企业效能顾问': 'ByteDance Feishu Enterprise Efficiency Consultant',
        'base 上海，服务华东区域 KA 客户，主要看互联网和机器人行业，把场景挖掘、方案设计与陪跑实施接成完整交付链路。': 'Based in Shanghai, serving East China KA clients in internet and robotics, connecting scenario discovery, solution design, and implementation support into one delivery loop.',
        'base 上海，服务华东区域 KA 客户，聚焦互联网和机器人行业，把场景挖掘、方案设计与陪跑实施接到一起做。': 'Based in Shanghai, serving East China KA clients in internet and robotics, connecting scenario discovery, solution design, and implementation support.',
        '华东KA': 'East China KA',
        '互联网与机器人': 'Internet and Robotics',
        '企业AI落地': 'Enterprise AI Adoption',
        '重点客户深度服务': 'Key Clients Supported Deeply',
        '挖场景-出方案-陪跑': 'Discover-Design-Implement',
        '服务对象': 'Clients',
        '工作方式': 'Working Style',
        '字节跳动（飞书）': 'ByteDance Feishu',
        '企业效能顾问': 'Enterprise Efficiency Consultant',
        '从企业效能顾问的视角，把 AI 落地推进到客户业务现场': 'Push AI Adoption into Real Client Workflows',
        '这段经历的核心，不只是做项目，而是围绕客户业务真实问题，把 AI 的价值从概念推进到能跑起来的日常流程里。': 'The core of this role is not just project delivery. It is moving AI from concept into daily workflows around real client problems.',
        '长期服务华东区域 KA 客户，重点看互联网和机器人行业，累计覆盖 30+ 家高价值客户，也持续深度陪跑其中 13+ 家关键客户。': 'I serve East China KA clients, especially in internet and robotics, covering 30+ high-value clients and deeply supporting 13+ key accounts.',
        '更常做的是从业务流里挖场景、出方案、陪跑实施，让 AI 方案不只停在演示里，而是能够进入客户团队真实使用。': 'My work usually starts from business workflows: discover scenarios, design solutions, and support implementation so AI enters real team usage.',
        '把 AI 从概念推到结果：20+ 场景、黑客松与商业验证': 'From AI Concepts to Results: 20+ Scenarios, Hackathons, and Business Validation',
        '围绕真实业务问题，做出 20+ 个落地场景，主导交个朋友 AI 黑客松，并跑出新的商业模式。': 'Built 20+ implementation scenarios around real business problems, led the Be Friends AI hackathon, and validated new business models.',
        '20+AI场景': '20+ AI Scenarios',
        '交个朋友黑客松': 'Be Friends Hackathon',
        '新商业模式': 'New Business Model',
        'AI应用场景': 'AI Application Scenarios',
        '交个朋友AI黑客松': 'Be Friends AI Hackathon',
        '新商业模式': 'New Business Model',
        'AI × 结果落地': 'AI × Outcomes',
        '把 AI 从概念推进到结果，最终还是要看这些证据': 'Turning AI Concepts into Results Comes Down to Evidence',
        '30+ 高价值客户、20+ AI 应用场景、交个朋友 AI 黑客松，以及从共创里跑出的新商业模式，构成了我这几年最有代表性的几组结果。': '30+ high-value clients, 20+ AI scenarios, the Be Friends AI hackathon, and new business models from co-creation are representative proof points from recent years.',
        '场景落地': 'Scenario Implementation',
        '黑客松与商业验证': 'Hackathon and Business Validation',
        '围绕客户业务流程，累计落地 20+ 个 AI 应用场景，把多维表格、Aily、知识问答与工作流能力接进真实团队协作中。': 'Implemented 20+ AI scenarios around client workflows, connecting Base, Aily, Q&A, and workflow capabilities into real collaboration.',
        '主导交个朋友全司范围 AI 黑客松，在场景共创和方案陪跑中，不只跑出可用 Demo，也验证出新的商业模式与后续落地方向。': 'Led a company-wide AI hackathon at Be Friends, producing usable demos while validating new business models and implementation directions.',
        '风险咨询 · 高级咨询顾问': 'Risk Advisory · Senior Consultant',
        '在银行转型、系统推广和经营分析项目里，把咨询方法真正做进了可复制的组织动作。': 'Turned consulting methods into repeatable organizational actions through banking transformation, system rollout, and business analysis projects.',
        '战略转型': 'Strategic Transformation',
        '系统落地': 'System Implementation',
        '经营分析': 'Business Analysis',
        '推广网点': 'Branches Rolled Out',
        '人效提升': 'Productivity Lift',
        '交叉销售提升': 'Cross-sell Lift',
        '把复杂转型做成组织真的跑得动的系统': 'Turn Complex Transformation into Systems Organizations Can Run',
        '从战略设计、流程重塑，到试点验证和规模复制，这段经历让我系统地练过一遍“怎么把复杂问题落地”。': 'From strategy design and process redesign to pilot validation and scaled replication, this experience trained me in landing complex problems.',
        '作为南京银行网点转型项目核心骨干，负责顶层蓝图设计和网点全生命周期管理系统实施推广，最终将模式复制到全行 300+ 网点，人效提升 50%，交叉销售率提升 40%。': 'As a core member of Nanjing Bank branch transformation, I worked on top-level blueprint design and system rollout, scaling the model to 300+ branches with 50% productivity lift and 40% cross-sell lift.',
        '分析与落地': 'Analysis and Implementation',
        '为大型制造业集团搭建数字化价值评价模型，量化跨部门协同指标，辅助管理层做资源配置和渠道优化。': 'Built a digital value evaluation model for a large manufacturing group, quantifying cross-department collaboration metrics to support resource allocation and channel optimization.',
        '数据 / MBA / 社群': 'Data / MBA / Community',
        '从 MBA、私董会到 AI 工具栈，持续搭建学习与连接方式': 'Keep Building Learning and Connection Through MBA, Peer Advisory, and AI Tools',
        '校园、分享、社群、教练与 AI 工具实践，一起构成了我工作之外持续生长的方式。': 'Campus life, public sharing, communities, coaching, and AI tool practice form how I keep growing beyond daily work.',
        '复旦MBA': 'Fudan MBA',
        '私董会教练': 'Peer Advisory Coach',
        '复旦在读': 'Fudan MBA Candidate',
        '分享与教练角色': 'Sharing and Coaching Roles',
        '把校园、社群、分享与工具实践，接成一条持续生长的能力线': 'Connect Campus, Community, Sharing, and Tools into a Continuous Growth Line',
        '除了日常工作，我也把公开分享、私董会教练、校园社群和 AI 工具实践连在一起，让输入、连接和输出形成闭环。': 'Beyond daily work, I connect public speaking, peer advisory coaching, campus communities, and AI tool practice into a loop of input, connection, and output.',
        '校园、分享与教练角色': 'Campus, Sharing, and Coaching',
        '工具栈与证书': 'Tool Stack and Certifications',
        '复旦大学 MBA 在读（2024.07 - 2027.06），兼任 MBA AI 俱乐部核心理事，也持续参与企业 AI 应用落地分享与私董会教练相关工作。': 'Fudan MBA candidate (2024.07 - 2027.06), core member of the MBA AI Club, and active in enterprise AI talks and peer advisory coaching.',
        '熟练使用 Coze、Aily、aPaaS、Python、SQL、R、Tableau、Power BI；持有 CISA（全球 Top 20%）、CIA 与证券从业资格证。': 'Comfortable with Coze, Aily, aPaaS, Python, SQL, R, Tableau, and Power BI; certified in CISA (global top 20%), CIA, and securities practice.',
        '每天读、每天想、每天写。对我来说，这更像一场长期训练，而不只是内容归档。': 'Read daily, think daily, write daily. To me, this is long-term training, not just content archiving.',
        '每日报告打卡': 'Daily Report Notes',
        '搬运中': 'Migrating',
        '历史内容还在逐步搬运到这个站里。想完整跟进我的每日报告打卡，可以在底部': 'Older notes are still being migrated here. To follow the full daily practice, you can',
        '加我微信朋友圈': 'add me on WeChat',
        '关注我的小红书': 'follow my Xiaohongshu',
        '每天留下一个标题、一组标签，也留下一次真实的输入。': 'A title, a few tags, and one real piece of input every day.',
        '全部': 'All',
        '📌 每日打卡': 'Daily Notes',
        '🤖 AI与企业': 'AI and Enterprise',
        '🌍 劳动力与职场': 'Workforce',
        '🚀 前沿科技与宏观': 'Frontier Tech',
        '每日报告': 'Daily Report',
        'AI生成': 'AI Generated',
        '学习打卡': 'Learning Notes',
        '每日报告打卡': 'Daily Report Notes',
        'AI与企业': 'AI and Enterprise',
        '劳动力与职场': 'Workforce',
        '前沿科技与宏观': 'Frontier Tech',
        '#Learn&Digest/36：IEG AI应用启示录——从隐性知识到同行治理': '#Learn&Digest/36: IEG AI Lessons, From Tacit Knowledge to Peer Governance',
        '世界银行内部独立评估小组（IEG）的AI战略探索，揭示AI在知识密集型组织中的渗透速度比想象中慢，核心是「判断力」难以被AI替代。提出5级成熟度模型和同行治理模式。': 'The World Bank IEG AI strategy shows that AI diffuses more slowly in knowledge-intensive organizations than expected, because judgment is hard to replace. It proposes a five-level maturity model and peer governance.',
        'AI战略': 'AI Strategy',
        '组织转型': 'Organizational Transformation',
        '治理模式': 'Governance Model',
        '10 分钟': '10 min',
        'Agentic AI 十大趋势：当AI成为主动的代理人': 'Top 10 Agentic AI Trends: When AI Becomes an Active Agent',
        'AI正在从被动工具转向主动代理人。Agentic AI不仅能理解指令，更能自主规划、执行和验证。这十大趋势将重新定义人机协作的未来...': 'AI is shifting from passive tool to active agent. Agentic AI can understand, plan, execute, and verify. These ten trends will reshape human-AI collaboration...',
        'AI趋势': 'AI Trends',
        '智能体': 'Agents',
        '8 分钟': '8 min',
        'Anthropic劳动力市场报告：AI时代的人才进化论': 'Anthropic Labor Market Report: Talent Evolution in the AI Era',
        'Anthropic最新报告揭示：AI正在重塑劳动力市场。高薪技能受到的冲击最大，而人际互动类工作反而变得更重要...': 'Anthropic’s latest report shows how AI is reshaping the labor market. High-income skills face the largest impact, while interpersonal work becomes more important...',
        '劳动力市场': 'Labor Market',
        'AI影响': 'AI Impact',
        '技能变革': 'Skill Shift',
        'ARK Big Ideas 2026：九大颠覆性技术投资图谱': 'ARK Big Ideas 2026: Nine Disruptive Technology Investment Maps',
        'ARK年度报告发布，从AI到机器人，从基因编辑到航天技术，九大技术领域的投资机遇与风险图谱...': 'ARK’s annual report maps opportunities and risks across nine disruptive technologies, from AI and robotics to gene editing and space...',
        '投资趋势': 'Investment Trends',
        '前沿科技': 'Frontier Tech',
        '12 分钟': '12 min',
        '公开分享不是抛出观点，而是把洞见翻译成别人真正能带走、能继续讨论、也能带回现场去用的东西。': 'Public speaking is not about tossing out opinions. It is about translating insight into something people can take away, keep discussing, and use back in the field.',
        '11 条': '11 Records',
        '已整理公开记录': 'public records curated',
        'AI × 组织': 'AI × Organization',
        '反复出现的主题': 'recurring theme',
        '课堂 · 社群 · 舞台': 'Classrooms · Communities · Stages',
        '不同场景里的表达样本': 'speaking samples across contexts',
        '条记录': 'records',
        '把还没完全定型的想法，也放在阳光下慢慢长。': 'Let unfinished thoughts grow slowly in the open.',
        '这里会收录完整长文、阶段性判断，也会留下一些还在发酵中的问题，让它们慢慢长成更完整的思考手记。': 'This space collects long-form essays, interim judgments, and questions still taking shape.',
        '长文手记': 'Essays',
        '问题清单': 'Questions',
        '文档链接': 'Docs',
        '持续更新': 'Updated',
        '我会长期追问这些问题：': 'Questions I keep returning to:',
        'AI 时代，人的判断力要怎么练，才不会被外包掉？': 'How do we train human judgment so it is not outsourced to AI?',
        '企业真正落地 AI，卡住的到底是技术、组织还是心理安全感？': 'When enterprise AI gets stuck, is the blocker technology, organization, or psychological safety?',
        '什么样的连接与表达，是机器越强、人越该亲手去做的？': 'What kinds of connection and expression become more human as machines get stronger?',
        '文档、方法手册和片段随记，会一起留在这里。': 'Documents, playbooks, and fragments live here together.',
        '飞书文档、课堂手册和一些仍在发酵中的判断，会在这里持续补充、彼此连接。': 'Feishu docs, class playbooks, and developing ideas will keep connecting here.',
        '我的小项目': 'My Small Projects',
        '用AI辅助编程，把想法变成可运行的产品。': 'Using AI-assisted coding to turn ideas into working products.',
        '不追求完美代码，追求「从0到1」的创造快感。': 'Not chasing perfect code, but the joy of making something from zero to one.',
        '起点': 'Start',
        '目标': 'Goal',
        '可体验': 'Live',
        '知识游戏': 'Knowledge Game',
        '和朋友从同一个维基起点出发，沿着词条链接竞速抵达目标。': 'Race friends from the same Wikipedia starting point to a target page through links.',
        '产品实验': 'Product Experiment',
        '一个玄学出海方向的小实验，探索命理内容的产品化表达。': 'A small global product experiment around fate-reading content.',
        '财务规划': 'Financial Planning',
        '以终为始的财务规划记账 App，把消费、情绪、价值观和人生目标连起来。': 'A financial planning app that connects spending, emotions, values, and life goals.',
        '联系我': 'Contact Me',
        '如果你在做企业 AI 落地，或者你的企业有需要，欢迎来聊场景、方案和共创。': 'If you are working on enterprise AI adoption, or your company needs it, let’s talk scenarios, solutions, and co-creation.',
        '也欢迎围绕企业 AI 应用落地分享、社群交流和具体项目合作，直接来连接我。': 'You are also welcome to reach out for talks, community exchange, or project collaboration around enterprise AI.',
        '微信同号': 'Same on WeChat',
        '加我微信': 'Add My WeChat',
        '如果你正在看企业 AI 落地、想聊具体场景，或者希望做进一步交流共创，欢迎直接来找我。': 'If you are exploring enterprise AI adoption, specific scenarios, or deeper collaboration, feel free to reach out.',
        '关注小红书': 'Follow Xiaohongshu',
        '小红书号 412982838。公开分享、学习碎片和一线观察，会更持续地更新在那里。': 'Xiaohongshu ID: 412982838. I update public talks, learning fragments, and field observations there.',
        '最后留一个更轻的分镜，把这些线索安静地收在一起。': 'A lighter final storyboard to gather these threads quietly.',
        '从亲手验证，到持续训练、公开表达，再到继续生长，这几条线不会停在这里，而会在后面的工作、写作和相遇里继续展开。': 'From hands-on validation to ongoing training, public expression, and continued growth, these threads will keep unfolding in future work, writing, and encounters.',
        '先把手弄脏': 'Get Hands Dirty First',
        '比起追赶最新工具，我更在意什么值得亲手验证、亲手做成。': 'Rather than chasing the latest tools, I care about what is worth validating and building myself.',
        '训练': 'Practice',
        '把思考力留在自己身上': 'Keep Thinking In-House',
        '持续阅读、消化和输出，是我对抗“似乎什么都知道”的方式。': 'Reading, digesting, and writing are how I resist the illusion of knowing everything.',
        '碰撞': 'Collision',
        '让洞见进入真实人群': 'Bring Insights to Real People',
        '公开分享、课堂和社群，是让表达被验证、被接住的现场。': 'Public talks, classrooms, and communities are where expression gets tested and received.',
        '生长': 'Growth',
        '把未完成也留在这里': 'Leave the Unfinished Here',
        '文章、项目和新的问题会继续长出来，后面的相遇里也会有新的展开。': 'Essays, projects, and new questions will keep growing here, with more to unfold in future encounters.'
    }
};

const htmlTranslations = {
    '.about-intro': 'Hi, I am Renee Zhang, based in Shanghai. I work as an <strong>enterprise efficiency consultant</strong> at ByteDance Feishu, serving East China KA clients with a focus on internet and robotics companies. Most of my work is about helping enterprise AI move from idea to actual usage.',
    '.about-quote': 'After returning from UC Berkeley, I kept asking myself: <strong>in the AI era, what should I still insist on doing myself, even when AI can help?</strong>',
    '.about-mission': 'My answer is three things: digest ideas myself, connect them in my own mind, and write them down by hand. That became my long-term <strong>#Learn&amp;Digest</strong> practice. At work, I take the same approach: discover scenarios, design solutions, and walk with teams until AI actually enters their workflow.',
    '.about-belief': 'The longer I do this, the more I believe that <strong>the stronger AI becomes, the more people need real, face-to-face collisions.</strong> No recommendation engine can replace the spark of a real encounter. Outside work, I keep building agents, experimenting with AI coding, running Feishu AI practice communities, and showing up in MBA, peer advisory, and public sharing spaces.',
    '.about-vision': 'In the AI era, the scarce resource is not compute. It is human insight into real scenarios, plus the will to make things work step by step. <strong>If you are also working on enterprise AI adoption, or wondering where your company should begin, I would love to talk about scenarios, solutions, and co-creation.</strong>'
};

function normalizeText(text) {
    return text.replace(/\s+/g, ' ').trim();
}

function t(text) {
    if (!text || currentLanguage === 'zh') return text;
    return translations.en[normalizeText(text)] || text;
}

function tItem(item, key) {
    if (!item) return '';
    if (currentLanguage === 'en' && item[`${key}En`]) return item[`${key}En`];
    return t(item[key]);
}

function tList(list = []) {
    return list.map(value => t(value));
}

function siteAssetPath(path) {
    if (!path || path.startsWith('http') || path.startsWith('#') || path.startsWith('/')) return path;
    if (window.location.protocol === 'file:') return encodeURI(path);
    return `/${encodeURI(path)}`;
}

function translateTextNodes(root = document.body) {
    if (!root) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
        acceptNode(node) {
            const parent = node.parentElement;
            if (!parent || ['SCRIPT', 'STYLE', 'NOSCRIPT', 'SVG'].includes(parent.tagName)) {
                return NodeFilter.FILTER_REJECT;
            }
            return normalizeText(node.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
        }
    });

    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);

    nodes.forEach(node => {
        if (!node.__reneeZhText) node.__reneeZhText = node.nodeValue;
        const original = node.__reneeZhText;
        const leading = original.match(/^\s*/)?.[0] || '';
        const trailing = original.match(/\s*$/)?.[0] || '';
        const translated = currentLanguage === 'en' ? t(original) : normalizeText(original);
        node.nodeValue = `${leading}${translated}${trailing}`;
    });
}

function applyLanguageMeta() {
    document.documentElement.lang = currentLanguage === 'en' ? 'en' : 'zh-CN';
    document.title = currentLanguage === 'en'
        ? 'Renee Zhang | Enterprise AI Adoption'
        : '张岚焱 Renee | 企业 AI 应用落地实践';

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
        metaDescription.setAttribute(
            'content',
            currentLanguage === 'en'
                ? 'Renee Zhang, enterprise efficiency consultant at ByteDance Feishu, focused on enterprise AI adoption, public speaking, field notes, and AI projects.'
                : '张岚焱（Renee），字节跳动飞书企业效能顾问，关注企业 AI 应用落地、公开分享、深度阅读与 AI 小项目实践。'
        );
    }
}

function applyHtmlTranslations() {
    Object.entries(htmlTranslations).forEach(([selector, enHtml]) => {
        const element = document.querySelector(selector);
        if (!element) return;
        if (!element.dataset.zhHtml) element.dataset.zhHtml = element.innerHTML;
        element.innerHTML = currentLanguage === 'en' ? enHtml : element.dataset.zhHtml;
    });
}

function updateLanguageToggle() {
    document.querySelectorAll('[data-lang-option]').forEach(button => {
        const isActive = button.dataset.langOption === currentLanguage;
        button.classList.toggle('active', isActive);
        button.setAttribute('aria-pressed', String(isActive));
    });
}

function syncLanguageRoute(language) {
    if (!window.history?.replaceState) return;
    const targetPath = language === 'en' ? '/en/' : '/';
    const targetUrl = `${targetPath}${window.location.hash || ''}`;
    const currentUrl = `${window.location.pathname}${window.location.hash || ''}`;
    if (currentUrl !== targetUrl) {
        window.history.replaceState(null, '', targetUrl);
    }
}

function applyStaticTranslations() {
    applyLanguageMeta();
    applyHtmlTranslations();
    translateTextNodes();
    updateLanguageToggle();
}

function refreshLocalizedDynamicContent() {
    if (typeof renderActiveCareerPanel === 'function') renderActiveCareerPanel();
    if (typeof renderSpeakingCards === 'function') renderSpeakingCards();
    if (typeof renderThinkingCards === 'function') renderThinkingCards();
    if (typeof renderDigestCards === 'function') renderDigestCards();
}

function setLanguage(language) {
    if (!supportedLanguages.includes(language) || language === currentLanguage) return;
    currentLanguage = language;
    localStorage.setItem('renee-lang', language);
    syncLanguageRoute(language);
    refreshLocalizedDynamicContent();
    applyStaticTranslations();
}

function initLanguageToggle() {
    updateLanguageToggle();
    document.querySelectorAll('[data-lang-option]').forEach(button => {
        button.addEventListener('click', () => setLanguage(button.dataset.langOption));
    });
}

const mobileSectionPagerQuery = window.matchMedia('(max-width: 768px) and (orientation: portrait)');

function isMobileSectionPager() {
    return mobileSectionPagerQuery.matches;
}

function getHorizontalScrollLeft() {
    return window.scrollX
        || document.documentElement.scrollLeft
        || document.body.scrollLeft
        || 0;
}

function getHorizontalScrollMax() {
    const scrollWidth = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth);
    return Math.max(scrollWidth - window.innerWidth, 0);
}

function scrollToSection(section) {
    section.scrollIntoView({
        behavior: 'smooth',
        block: isMobileSectionPager() ? 'nearest' : 'start',
        inline: isMobileSectionPager() ? 'start' : 'nearest'
    });
}

// ===== Smooth Scrolling =====
function bindSmoothScroll(root = document) {
    root.querySelectorAll('a[href^="#"]').forEach(anchor => {
        if (anchor.dataset.smoothBound === 'true') return;

        anchor.dataset.smoothBound = 'true';
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                scrollToSection(target);
            }
        });
    });
}

bindSmoothScroll();

// ===== Navigation Background on Scroll =====
const nav = document.querySelector('.nav');
let lastScroll = 0;

function updateNavChrome() {
    const currentScroll = isMobileSectionPager()
        ? getHorizontalScrollLeft()
        : window.pageYOffset;

    // Add shadow when scrolled
    if (currentScroll > 50) {
        nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
    } else {
        nav.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
}

window.addEventListener('scroll', updateNavChrome, { passive: true });

// ===== Intersection Observer for Animations =====
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

function observeAnimatedElements(root = document) {
    const animatedElements = root.querySelectorAll(
        '.section-header, .story-lab-header, .story-visual, .career-panel, .career-step, .digest-category, .project-card, .about-text, .about-tags, .speaking-card, .speaking-showcase, .thinking-manifesto, .thinking-card'
    );

    animatedElements.forEach(el => {
        if (el.dataset.revealed === 'true') return;

        el.dataset.revealed = 'true';
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
}

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    observeAnimatedElements();
});

// ===== Page Progress =====
const pageProgressBar = document.getElementById('pageProgressBar');

function updatePageProgress() {
    if (!pageProgressBar) return;

    const maxScroll = isMobileSectionPager()
        ? getHorizontalScrollMax()
        : document.documentElement.scrollHeight - window.innerHeight;
    const currentScroll = isMobileSectionPager()
        ? getHorizontalScrollLeft()
        : window.scrollY;
    const progress = maxScroll > 0 ? (currentScroll / maxScroll) * 100 : 0;
    pageProgressBar.style.width = `${Math.min(Math.max(progress, 0), 100)}%`;
}

window.addEventListener('scroll', updatePageProgress, { passive: true });
window.addEventListener('resize', () => {
    updatePageProgress();
    updateActiveNavigation();
});

// ===== Active Navigation Link =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

function updateActiveNavigation() {
    let current = '';

    if (isMobileSectionPager()) {
        let closestDistance = Number.POSITIVE_INFINITY;

        sections.forEach(section => {
            const distance = Math.abs(section.getBoundingClientRect().left);
            if (distance < closestDistance) {
                closestDistance = distance;
                current = section.getAttribute('id');
            }
        });
    } else {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
    }

    navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${current}`) {
            link.style.color = 'var(--color-text)';
        }
    });
}

window.addEventListener('scroll', updateActiveNavigation, { passive: true });

function syncMobileSectionPagerState() {
    updateNavChrome();
    updatePageProgress();
    updateActiveNavigation();
}

document.body.addEventListener('scroll', syncMobileSectionPagerState, { passive: true });

// ===== Screen Pager =====
function initScreenPager() {
    const snapSections = Array.from(document.querySelectorAll('section.snap-section[id]'));

    if (snapSections.length === 0) return;

    const pager = document.createElement('div');
    pager.className = 'screen-pager';
    pager.setAttribute('aria-label', '页面分屏导航');

    const dots = snapSections.map((section, index) => {
        const dot = document.createElement('button');
        const label = section.dataset.screenLabel
            || section.querySelector('.section-title')?.textContent?.trim()
            || section.id;

        dot.className = 'screen-pager-dot';
        dot.type = 'button';
        dot.setAttribute('aria-label', `跳转到${label}`);
        dot.title = label;
        dot.addEventListener('click', () => {
            scrollToSection(section);
        });

        if (index === 0) {
            dot.classList.add('active');
        }

        pager.appendChild(dot);
        return dot;
    });

    document.body.appendChild(pager);

    const pagerObserver = new IntersectionObserver((entries) => {
        const visibleEntries = entries
            .filter(entry => entry.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleEntries.length === 0) return;

        const activeSection = visibleEntries[0].target;
        const activeIndex = snapSections.indexOf(activeSection);

        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === activeIndex);
        });
    }, {
        threshold: [0.45, 0.6, 0.75],
        rootMargin: '-12% 0px -12% 0px'
    });

    snapSections.forEach(section => pagerObserver.observe(section));
}

// ===== Parallax Effect for Hero Orbs =====
const orbs = document.querySelectorAll('.gradient-orb');

window.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    orbs.forEach((orb, index) => {
        const speed = (index + 1) * 20;
        const x = (mouseX - 0.5) * speed;
        const y = (mouseY - 0.5) * speed;
        orb.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// ===== Typing Effect for Hero Tagline (Optional) =====
const heroTagline = document.querySelector('.hero-tagline');
if (heroTagline) {
    const text = heroTagline.textContent;
    heroTagline.textContent = '';
    let index = 0;

    function typeWriter() {
        if (index < text.length) {
            heroTagline.textContent += text.charAt(index);
            index++;
            setTimeout(typeWriter, 50);
        }
    }

    // Start typing effect after a delay
    setTimeout(typeWriter, 1000);
}

// ===== Story Lab =====
function initStoryLab() {
    const storyVisual = document.getElementById('storyVisual');
    const storySteps = Array.from(document.querySelectorAll('.story-step'));
    const stepsContainer = document.querySelector('.story-steps');

    if (!storyVisual || storySteps.length === 0 || !stepsContainer) return;

    const fields = {
        kicker: document.getElementById('storyVisualKicker'),
        index: document.getElementById('storyVisualIndex'),
        label: document.getElementById('storyVisualLabel'),
        title: document.getElementById('storyVisualTitle'),
        desc: document.getElementById('storyVisualDesc'),
        tags: document.getElementById('storyVisualTags'),
        progress: document.getElementById('storyVisualProgress')
    };

    let activeIndex = 0;

    function renderStoryVisual(step, index) {
        const tags = (step.dataset.tags || '')
            .split('|')
            .map(tag => tag.trim())
            .filter(Boolean);

        if (fields.kicker) fields.kicker.textContent = step.dataset.kicker || `Chapter ${step.dataset.step || ''}`;
        if (fields.index) fields.index.textContent = `${String(index + 1).padStart(2, '0')} / ${String(storySteps.length).padStart(2, '0')}`;
        if (fields.label) fields.label.textContent = step.dataset.label || '';
        if (fields.title) fields.title.textContent = step.dataset.title || '';
        if (fields.desc) fields.desc.textContent = step.dataset.desc || '';
        if (fields.tags) {
            fields.tags.innerHTML = tags.map(tag => `<span>${tag}</span>`).join('');
        }
        if (fields.progress) {
            fields.progress.style.width = `${((index + 1) / storySteps.length) * 100}%`;
            fields.progress.style.background = `linear-gradient(90deg, ${step.dataset.accent || 'var(--color-accent)'}, color-mix(in srgb, ${step.dataset.accent || 'var(--color-accent)'} 55%, white 45%))`;
        }

        storyVisual.style.setProperty('--story-accent', step.dataset.accent || 'var(--color-accent)');
    }

    function setActiveStoryStep(index) {
        if (index < 0 || index >= storySteps.length || index === activeIndex) return;

        activeIndex = index;
        storySteps.forEach((step, stepIndex) => {
            step.classList.toggle('active', stepIndex === activeIndex);
        });
        renderStoryVisual(storySteps[activeIndex], activeIndex);
    }

    const stepObserver = new IntersectionObserver((entries) => {
        const visibleEntries = entries
            .filter(entry => entry.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        visibleEntries.forEach(entry => {
            entry.target.classList.add('is-visible');
        });

        if (visibleEntries.length > 0) {
            const nextIndex = storySteps.indexOf(visibleEntries[0].target);
            setActiveStoryStep(nextIndex);
        }
    }, {
        root: stepsContainer,
        threshold: [0.2, 0.45, 0.6, 0.8],
        rootMargin: '-8% 0px -18% 0px'
    });

    storySteps.forEach((step, index) => {
        if (index === 0) step.classList.add('is-visible');
        stepObserver.observe(step);
    });

    renderStoryVisual(storySteps[0], 0);
}

function initCareerStage() {
    const panel = document.getElementById('careerPanel');
    const steps = Array.from(document.querySelectorAll('.career-step'));
    const stepsContainer = document.querySelector('.career-steps');

    if (!panel || steps.length === 0 || !stepsContainer) return;

    const fields = {
        kicker: document.getElementById('careerPanelKicker'),
        period: document.getElementById('careerPanelPeriod'),
        label: document.getElementById('careerPanelLabel'),
        title: document.getElementById('careerPanelTitle'),
        desc: document.getElementById('careerPanelDesc'),
        tags: document.getElementById('careerPanelTags'),
        metrics: document.getElementById('careerPanelMetrics')
    };

    let activeIndex = 0;

    function renderCareerPanel(step) {
        const tags = (step.dataset.tags || '')
            .split('|')
            .map(tag => tag.trim())
            .filter(Boolean);
        const metrics = (step.dataset.metrics || '')
            .split('|')
            .map(entry => entry.trim())
            .filter(Boolean)
            .map(entry => {
                const [value, label] = entry.split(':');
                return { value: value || '', label: label || '' };
            });

        if (fields.kicker) fields.kicker.textContent = t(step.dataset.kicker || '');
        if (fields.period) fields.period.textContent = t(step.dataset.period || '');
        if (fields.label) fields.label.textContent = t(step.dataset.label || '');
        if (fields.title) fields.title.textContent = t(step.dataset.title || '');
        if (fields.desc) fields.desc.textContent = t(step.dataset.desc || '');
        if (fields.tags) {
            fields.tags.innerHTML = tags.map(tag => `<span>${t(tag)}</span>`).join('');
        }
        if (fields.metrics) {
            fields.metrics.innerHTML = metrics.map(metric => `
                <div class="career-panel-metric">
                    <span class="career-panel-metric-value">${t(metric.value)}</span>
                    <span class="career-panel-metric-label">${t(metric.label)}</span>
                </div>
            `).join('');
        }
    }

    function setActiveCareerStep(index) {
        if (index < 0 || index >= steps.length || index === activeIndex) return;

        activeIndex = index;
        steps.forEach((step, stepIndex) => {
            step.classList.toggle('active', stepIndex === activeIndex);
        });
        renderCareerPanel(steps[activeIndex]);
    }

    const observer = new IntersectionObserver((entries) => {
        const visibleEntries = entries
            .filter(entry => entry.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        visibleEntries.forEach(entry => {
            entry.target.classList.add('is-visible');
        });

        if (visibleEntries.length > 0) {
            const nextIndex = steps.indexOf(visibleEntries[0].target);
            setActiveCareerStep(nextIndex);
        }
    }, {
        root: stepsContainer,
        threshold: [0.2, 0.45, 0.6, 0.8],
        rootMargin: '-8% 0px -18% 0px'
    });

    steps.forEach((step, index) => {
        if (index === 0) step.classList.add('is-visible');
        observer.observe(step);
    });

    renderActiveCareerPanel = () => renderCareerPanel(steps[activeIndex]);
    renderCareerPanel(steps[0]);
}

// ===== Add hover effect to hobby items =====
const hobbyItems = document.querySelectorAll('.hobby-item');

hobbyItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-4px) scale(1.02)';
    });

    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ===== Console Welcome Message =====
console.log('%c Welcome to Renee\'s Homepage ', 'background: #2c2c2c; color: #fff; padding: 10px 20px; font-size: 14px;');
console.log('%c "AI时代最稀缺的，不是算力，是人对场景的洞察力" ', 'color: #666; font-style: italic;');

// ===== Lazy loading for better performance =====
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img.lazy').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===== Add current year to footer =====
const footerText = document.querySelector('.footer-text');
if (footerText) {
    const currentYear = new Date().getFullYear();
    footerText.textContent = `© ${currentYear} Renee Zhang. Made with 💫 in the AI era.`;
}

// ===== Digest Gallery Functionality =====

// Sample digest data (will be loaded from actual digests folder in production)
const digestData = [
    {
            "id": "2026-05-15-daily-report",
            "title": "企业 SKU 分析脑图",
            "titleEn": "Enterprise SKU Analysis Map",
            "date": "2026-05-15",
            "category": "ai-org",
            "categoryLabel": "AI与组织",
            "categoryLabelEn": "AI and Organizations",
            "tags": [
                    "企业分析",
                    "SKU策略",
                    "AI图解"
            ],
            "tagsEn": [
                    "Business Analysis",
                    "SKU Strategy",
                    "AI Visuals"
            ],
            "excerpt": "2026年5月15日 的每日阅读与报告打卡图片，共 4 张。",
            "excerptEn": "2026-05-15 daily reading and report-note images, 4 in total.",
            "images": {
                    "cover": "digests/2026/05/2026-05-15-daily-report/images/01.jpg",
                    "cards": [
                            "digests/2026/05/2026-05-15-daily-report/images/02.jpg",
                            "digests/2026/05/2026-05-15-daily-report/images/03.jpg",
                            "digests/2026/05/2026-05-15-daily-report/images/04.jpg"
                    ],
                    "longForm": null
            },
            "author": "Renee",
            "readTime": "2 分钟",
            "content": "<p>2026年5月15日 的每日阅读与报告打卡图片已按同日主题整理。点击上方图片可以逐张查看这一组 AI 生成的视觉笔记。</p>"
    },
    {
            "id": "2026-05-12-daily-report",
            "title": "从数字化到智能化的企业系统：论文图解",
            "titleEn": "From Digitalization to Intelligent Enterprise Systems",
            "date": "2026-05-12",
            "category": "ai-org",
            "categoryLabel": "AI与组织",
            "categoryLabelEn": "AI and Organizations",
            "tags": [
                    "数字化转型",
                    "企业系统",
                    "组织智能"
            ],
            "tagsEn": [
                    "Digital Transformation",
                    "Enterprise Systems",
                    "Organizational Intelligence"
            ],
            "excerpt": "2026年5月12日 的每日阅读与报告打卡图片，共 8 张。",
            "excerptEn": "2026-05-12 daily reading and report-note images, 8 in total.",
            "images": {
                    "cover": "digests/2026/05/2026-05-12-daily-report/images/01.jpg",
                    "cards": [
                            "digests/2026/05/2026-05-12-daily-report/images/02.jpg",
                            "digests/2026/05/2026-05-12-daily-report/images/03.jpg",
                            "digests/2026/05/2026-05-12-daily-report/images/04.jpg",
                            "digests/2026/05/2026-05-12-daily-report/images/05.jpg",
                            "digests/2026/05/2026-05-12-daily-report/images/06.jpg",
                            "digests/2026/05/2026-05-12-daily-report/images/07.jpg",
                            "digests/2026/05/2026-05-12-daily-report/images/08.jpg"
                    ],
                    "longForm": null
            },
            "author": "Renee",
            "readTime": "4 分钟",
            "content": "<p>2026年5月12日 的每日阅读与报告打卡图片已按同日主题整理。点击上方图片可以逐张查看这一组 AI 生成的视觉笔记。</p>"
    },
    {
            "id": "2026-05-11-daily-report",
            "title": "LLMs Corrupt Your Documents When You Delegate",
            "titleEn": "LLMs Corrupt Your Documents When You Delegate",
            "date": "2026-05-11",
            "category": "ai-tools",
            "categoryLabel": "工具与智能体",
            "categoryLabelEn": "Tools and Agents",
            "tags": [
                    "LLM委托",
                    "文档污染",
                    "智能体风险"
            ],
            "tagsEn": [
                    "LLM Delegation",
                    "Document Drift",
                    "Agent Risk"
            ],
            "excerpt": "2026年5月11日 的每日阅读与报告打卡图片，共 4 张。",
            "excerptEn": "2026-05-11 daily reading and report-note images, 4 in total.",
            "images": {
                    "cover": "digests/2026/05/2026-05-11-daily-report/images/01.jpg",
                    "cards": [
                            "digests/2026/05/2026-05-11-daily-report/images/02.jpg",
                            "digests/2026/05/2026-05-11-daily-report/images/03.jpg",
                            "digests/2026/05/2026-05-11-daily-report/images/04.jpg"
                    ],
                    "longForm": null
            },
            "author": "Renee",
            "readTime": "2 分钟",
            "content": "<p>2026年5月11日 的每日阅读与报告打卡图片已按同日主题整理。点击上方图片可以逐张查看这一组 AI 生成的视觉笔记。</p>"
    },
    {
            "id": "2026-05-07-daily-report",
            "title": "AI Layout Fight：图文排版实战",
            "titleEn": "AI Layout Fight: Visual Layout Practice",
            "date": "2026-05-07",
            "category": "ai-tools",
            "categoryLabel": "工具与智能体",
            "categoryLabelEn": "Tools and Agents",
            "tags": [
                    "AI排版",
                    "提示词实验",
                    "视觉表达"
            ],
            "tagsEn": [
                    "AI Layout",
                    "Prompt Experiment",
                    "Visual Expression"
            ],
            "excerpt": "2026年5月7日 的每日阅读与报告打卡图片，共 5 张。",
            "excerptEn": "2026-05-07 daily reading and report-note images, 5 in total.",
            "images": {
                    "cover": "digests/2026/05/2026-05-07-daily-report/images/01.jpg",
                    "cards": [
                            "digests/2026/05/2026-05-07-daily-report/images/02.jpg",
                            "digests/2026/05/2026-05-07-daily-report/images/03.jpg",
                            "digests/2026/05/2026-05-07-daily-report/images/04.jpg",
                            "digests/2026/05/2026-05-07-daily-report/images/05.jpg"
                    ],
                    "longForm": null
            },
            "author": "Renee",
            "readTime": "3 分钟",
            "content": "<p>2026年5月7日 的每日阅读与报告打卡图片已按同日主题整理。点击上方图片可以逐张查看这一组 AI 生成的视觉笔记。</p>"
    },
    {
            "id": "2026-04-24-daily-report",
            "title": "AI 对就业：重塑远大于替代",
            "titleEn": "AI and Jobs: Reshaping More Than Replacing",
            "date": "2026-04-24",
            "category": "work-efficiency",
            "categoryLabel": "职场与效率",
            "categoryLabelEn": "Work and Efficiency",
            "tags": [
                    "AI就业",
                    "岗位重塑",
                    "职场变化"
            ],
            "tagsEn": [
                    "AI Jobs",
                    "Role Redesign",
                    "Workplace Change"
            ],
            "excerpt": "2026年4月24日 的每日阅读与报告打卡图片，共 4 张。",
            "excerptEn": "2026-04-24 daily reading and report-note images, 4 in total.",
            "images": {
                    "cover": "digests/2026/04/2026-04-24-daily-report/images/01.jpg",
                    "cards": [
                            "digests/2026/04/2026-04-24-daily-report/images/02.jpg",
                            "digests/2026/04/2026-04-24-daily-report/images/03.jpg",
                            "digests/2026/04/2026-04-24-daily-report/images/04.jpg"
                    ],
                    "longForm": null
            },
            "author": "Renee",
            "readTime": "2 分钟",
            "content": "<p>2026年4月24日 的每日阅读与报告打卡图片已按同日主题整理。点击上方图片可以逐张查看这一组 AI 生成的视觉笔记。</p>"
    },
    {
            "id": "2026-04-22-daily-report",
            "title": "AI 工具 vs AI 运营层",
            "titleEn": "AI Tools vs AI Operations Layer",
            "date": "2026-04-22",
            "category": "ai-org",
            "categoryLabel": "AI与组织",
            "categoryLabelEn": "AI and Organizations",
            "tags": [
                    "AI运营层",
                    "工具架构",
                    "企业AI"
            ],
            "tagsEn": [
                    "AI Ops Layer",
                    "Tool Architecture",
                    "Enterprise AI"
            ],
            "excerpt": "2026年4月22日 的每日阅读与报告打卡图片，共 2 张。",
            "excerptEn": "2026-04-22 daily reading and report-note images, 2 in total.",
            "images": {
                    "cover": "digests/2026/04/2026-04-22-daily-report/images/01.jpg",
                    "cards": [
                            "digests/2026/04/2026-04-22-daily-report/images/02.jpg"
                    ],
                    "longForm": null
            },
            "author": "Renee",
            "readTime": "1 分钟",
            "content": "<p>2026年4月22日 的每日阅读与报告打卡图片已按同日主题整理。点击上方图片可以逐张查看这一组 AI 生成的视觉笔记。</p>"
    },
    {
            "id": "2026-04-21-daily-report",
            "title": "从人数到智效",
            "titleEn": "From Headcount to Intelligence Efficiency",
            "date": "2026-04-21",
            "category": "work-efficiency",
            "categoryLabel": "职场与效率",
            "categoryLabelEn": "Work and Efficiency",
            "tags": [
                    "组织效率",
                    "智效",
                    "岗位结构"
            ],
            "tagsEn": [
                    "Org Efficiency",
                    "Intelligence Efficiency",
                    "Role Structure"
            ],
            "excerpt": "2026年4月21日 的每日阅读与报告打卡图片，共 3 张。",
            "excerptEn": "2026-04-21 daily reading and report-note images, 3 in total.",
            "images": {
                    "cover": "digests/2026/04/2026-04-21-daily-report/images/01.jpg",
                    "cards": [
                            "digests/2026/04/2026-04-21-daily-report/images/02.jpg",
                            "digests/2026/04/2026-04-21-daily-report/images/03.jpg"
                    ],
                    "longForm": null
            },
            "author": "Renee",
            "readTime": "2 分钟",
            "content": "<p>2026年4月21日 的每日阅读与报告打卡图片已按同日主题整理。点击上方图片可以逐张查看这一组 AI 生成的视觉笔记。</p>"
    },
    {
            "id": "2026-04-19-daily-report",
            "title": "充裕时代的稀缺悖论",
            "titleEn": "The Scarcity Paradox in an Age of Abundance",
            "date": "2026-04-19",
            "category": "tech-business",
            "categoryLabel": "产业与商业",
            "categoryLabelEn": "Industries and Business",
            "tags": [
                    "稀缺悖论",
                    "App经济",
                    "供给过剩"
            ],
            "tagsEn": [
                    "Scarcity Paradox",
                    "App Economy",
                    "Abundance"
            ],
            "excerpt": "2026年4月19日 的每日阅读与报告打卡图片，共 5 张。",
            "excerptEn": "2026-04-19 daily reading and report-note images, 5 in total.",
            "images": {
                    "cover": "digests/2026/04/2026-04-19-daily-report/images/01.jpg",
                    "cards": [
                            "digests/2026/04/2026-04-19-daily-report/images/02.jpg",
                            "digests/2026/04/2026-04-19-daily-report/images/03.jpg",
                            "digests/2026/04/2026-04-19-daily-report/images/04.jpg",
                            "digests/2026/04/2026-04-19-daily-report/images/05.jpg"
                    ],
                    "longForm": null
            },
            "author": "Renee",
            "readTime": "3 分钟",
            "content": "<p>2026年4月19日 的每日阅读与报告打卡图片已按同日主题整理。点击上方图片可以逐张查看这一组 AI 生成的视觉笔记。</p>"
    },
    {
            "id": "2026-04-17-daily-report",
            "title": "18 个未来竞技场",
            "titleEn": "18 Future Arenas",
            "date": "2026-04-17",
            "category": "tech-business",
            "categoryLabel": "产业与商业",
            "categoryLabelEn": "Industries and Business",
            "tags": [
                    "未来产业",
                    "技术赛道",
                    "投资地图"
            ],
            "tagsEn": [
                    "Future Industries",
                    "Tech Arenas",
                    "Investment Map"
            ],
            "excerpt": "2026年4月17日 的每日阅读与报告打卡图片，共 11 张。",
            "excerptEn": "2026-04-17 daily reading and report-note images, 11 in total.",
            "images": {
                    "cover": "digests/2026/04/2026-04-17-daily-report/images/01.jpg",
                    "cards": [
                            "digests/2026/04/2026-04-17-daily-report/images/02.jpg",
                            "digests/2026/04/2026-04-17-daily-report/images/03.jpg",
                            "digests/2026/04/2026-04-17-daily-report/images/04.jpg",
                            "digests/2026/04/2026-04-17-daily-report/images/05.jpg",
                            "digests/2026/04/2026-04-17-daily-report/images/06.jpg",
                            "digests/2026/04/2026-04-17-daily-report/images/07.jpg",
                            "digests/2026/04/2026-04-17-daily-report/images/08.jpg",
                            "digests/2026/04/2026-04-17-daily-report/images/09.jpg",
                            "digests/2026/04/2026-04-17-daily-report/images/10.jpg",
                            "digests/2026/04/2026-04-17-daily-report/images/11.jpg"
                    ],
                    "longForm": null
            },
            "author": "Renee",
            "readTime": "6 分钟",
            "content": "<p>2026年4月17日 的每日阅读与报告打卡图片已按同日主题整理。点击上方图片可以逐张查看这一组 AI 生成的视觉笔记。</p>"
    },
    {
            "id": "2026-04-14-daily-report",
            "title": "Harness Engineering：三相可扩展性框架",
            "titleEn": "Harness Engineering: A Three-Phase Scaling Framework",
            "date": "2026-04-14",
            "category": "ai-tools",
            "categoryLabel": "工具与智能体",
            "categoryLabelEn": "Tools and Agents",
            "tags": [
                    "Agent工程",
                    "扩展框架",
                    "系统设计"
            ],
            "tagsEn": [
                    "Agent Engineering",
                    "Scaling Framework",
                    "System Design"
            ],
            "excerpt": "2026年4月14日 的每日阅读与报告打卡图片，共 1 张。",
            "excerptEn": "2026-04-14 daily reading and report-note images, 1 in total.",
            "images": {
                    "cover": "digests/2026/04/2026-04-14-daily-report/images/01.jpg",
                    "cards": [],
                    "longForm": null
            },
            "author": "Renee",
            "readTime": "1 分钟",
            "content": "<p>2026年4月14日 的每日阅读与报告打卡图片已按同日主题整理。点击上方图片可以逐张查看这一组 AI 生成的视觉笔记。</p>"
    },
    {
            "id": "2026-04-13-daily-report",
            "title": "冰山下潜：从答案到真问题",
            "titleEn": "Below the Iceberg: From Answers to Real Questions",
            "date": "2026-04-13",
            "category": "life-method",
            "categoryLabel": "生活与方法",
            "categoryLabelEn": "Life and Methods",
            "tags": [
                    "问题定义",
                    "认知方法",
                    "深度思考"
            ],
            "tagsEn": [
                    "Problem Framing",
                    "Thinking Method",
                    "Deep Thinking"
            ],
            "excerpt": "2026年4月13日 的每日阅读与报告打卡图片，共 5 张。",
            "excerptEn": "2026-04-13 daily reading and report-note images, 5 in total.",
            "images": {
                    "cover": "digests/2026/04/2026-04-13-daily-report/images/01.jpg",
                    "cards": [
                            "digests/2026/04/2026-04-13-daily-report/images/02.jpg",
                            "digests/2026/04/2026-04-13-daily-report/images/03.jpg",
                            "digests/2026/04/2026-04-13-daily-report/images/04.jpg",
                            "digests/2026/04/2026-04-13-daily-report/images/05.jpg"
                    ],
                    "longForm": null
            },
            "author": "Renee",
            "readTime": "3 分钟",
            "content": "<p>2026年4月13日 的每日阅读与报告打卡图片已按同日主题整理。点击上方图片可以逐张查看这一组 AI 生成的视觉笔记。</p>"
    },
    {
            "id": "2026-04-09-daily-report",
            "title": "The Vanishing Guardrails：消失的安全承诺",
            "titleEn": "The Vanishing Guardrails",
            "date": "2026-04-09",
            "category": "ai-tools",
            "categoryLabel": "工具与智能体",
            "categoryLabelEn": "Tools and Agents",
            "tags": [
                    "AI安全",
                    "护栏退化",
                    "模型治理"
            ],
            "tagsEn": [
                    "AI Safety",
                    "Guardrails",
                    "Model Governance"
            ],
            "excerpt": "2026年4月9日 的每日阅读与报告打卡图片，共 1 张。",
            "excerptEn": "2026-04-09 daily reading and report-note images, 1 in total.",
            "images": {
                    "cover": "digests/2026/04/2026-04-09-daily-report/images/01.jpg",
                    "cards": [],
                    "longForm": null
            },
            "author": "Renee",
            "readTime": "1 分钟",
            "content": "<p>2026年4月9日 的每日阅读与报告打卡图片已按同日主题整理。点击上方图片可以逐张查看这一组 AI 生成的视觉笔记。</p>"
    },
    {
            "id": "2026-04-08-daily-report",
            "title": "The BLIP：五天之内一场政变与反政变",
            "titleEn": "The BLIP: A Five-Day Coup and Counter-Coup",
            "date": "2026-04-08",
            "category": "ai-tools",
            "categoryLabel": "工具与智能体",
            "categoryLabelEn": "Tools and Agents",
            "tags": [
                    "AI安全",
                    "组织博弈",
                    "OpenAI"
            ],
            "tagsEn": [
                    "AI Safety",
                    "Organizational Conflict",
                    "OpenAI"
            ],
            "excerpt": "2026年4月8日 的每日阅读与报告打卡图片，共 2 张。",
            "excerptEn": "2026-04-08 daily reading and report-note images, 2 in total.",
            "images": {
                    "cover": "digests/2026/04/2026-04-08-daily-report/images/01.jpg",
                    "cards": [
                            "digests/2026/04/2026-04-08-daily-report/images/02.jpg"
                    ],
                    "longForm": null
            },
            "author": "Renee",
            "readTime": "1 分钟",
            "content": "<p>2026年4月8日 的每日阅读与报告打卡图片已按同日主题整理。点击上方图片可以逐张查看这一组 AI 生成的视觉笔记。</p>"
    },
    {
            "id": "2026-04-07-daily-report",
            "title": "The Founding Promise：安全守护者的诞生",
            "titleEn": "The Founding Promise: Birth of a Safety Guardian",
            "date": "2026-04-07",
            "category": "ai-tools",
            "categoryLabel": "工具与智能体",
            "categoryLabelEn": "Tools and Agents",
            "tags": [
                    "AI安全",
                    "OpenAI历史",
                    "治理承诺"
            ],
            "tagsEn": [
                    "AI Safety",
                    "OpenAI History",
                    "Governance Promise"
            ],
            "excerpt": "2026年4月7日 的每日阅读与报告打卡图片，共 1 张。",
            "excerptEn": "2026-04-07 daily reading and report-note images, 1 in total.",
            "images": {
                    "cover": "digests/2026/04/2026-04-07-daily-report/images/01.jpg",
                    "cards": [],
                    "longForm": null
            },
            "author": "Renee",
            "readTime": "1 分钟",
            "content": "<p>2026年4月7日 的每日阅读与报告打卡图片已按同日主题整理。点击上方图片可以逐张查看这一组 AI 生成的视觉笔记。</p>"
    },
    {
            "id": "2026-04-01-daily-report",
            "title": "机器人行业的七重挑战",
            "titleEn": "Seven Challenges in Robotics",
            "date": "2026-04-01",
            "category": "tech-business",
            "categoryLabel": "产业与商业",
            "categoryLabelEn": "Industries and Business",
            "tags": [
                    "机器人产业",
                    "技术挑战",
                    "产品交付"
            ],
            "tagsEn": [
                    "Robotics",
                    "Technical Challenges",
                    "Product Delivery"
            ],
            "excerpt": "2026年4月1日 的每日阅读与报告打卡图片，共 8 张。",
            "excerptEn": "2026-04-01 daily reading and report-note images, 8 in total.",
            "images": {
                    "cover": "digests/2026/04/2026-04-01-daily-report/images/01.jpg",
                    "cards": [
                            "digests/2026/04/2026-04-01-daily-report/images/02.jpg",
                            "digests/2026/04/2026-04-01-daily-report/images/03.jpg",
                            "digests/2026/04/2026-04-01-daily-report/images/04.jpg",
                            "digests/2026/04/2026-04-01-daily-report/images/05.jpg",
                            "digests/2026/04/2026-04-01-daily-report/images/06.jpg",
                            "digests/2026/04/2026-04-01-daily-report/images/07.jpg",
                            "digests/2026/04/2026-04-01-daily-report/images/08.jpg"
                    ],
                    "longForm": null
            },
            "author": "Renee",
            "readTime": "4 分钟",
            "content": "<p>2026年4月1日 的每日阅读与报告打卡图片已按同日主题整理。点击上方图片可以逐张查看这一组 AI 生成的视觉笔记。</p>"
    },
    {
            "id": "2026-03-27-daily-report",
            "title": "百川归海：从 AI 孤岛到元枢组",
            "titleEn": "Rivers to the Sea: From AI Islands to a Central Hub",
            "date": "2026-03-27",
            "category": "ai-org",
            "categoryLabel": "AI与组织",
            "categoryLabelEn": "AI and Organizations",
            "tags": [
                    "AI中台",
                    "元枢组",
                    "组织协同"
            ],
            "tagsEn": [
                    "AI Platform",
                    "Central Hub",
                    "Org Collaboration"
            ],
            "excerpt": "2026年3月27日 的每日阅读与报告打卡图片，共 5 张。",
            "excerptEn": "2026-03-27 daily reading and report-note images, 5 in total.",
            "images": {
                    "cover": "digests/2026/03/2026-03-27-daily-report/images/01.jpg",
                    "cards": [
                            "digests/2026/03/2026-03-27-daily-report/images/02.jpg",
                            "digests/2026/03/2026-03-27-daily-report/images/03.jpg",
                            "digests/2026/03/2026-03-27-daily-report/images/04.jpg",
                            "digests/2026/03/2026-03-27-daily-report/images/05.jpg"
                    ],
                    "longForm": null
            },
            "author": "Renee",
            "readTime": "3 分钟",
            "content": "<p>2026年3月27日 的每日阅读与报告打卡图片已按同日主题整理。点击上方图片可以逐张查看这一组 AI 生成的视觉笔记。</p>"
    },
    {
            "id": "2026-03-26-daily-report",
            "title": "雾中群山，看似繁荣",
            "titleEn": "Mountains in the Mist: Apparent Prosperity",
            "date": "2026-03-26",
            "category": "tech-business",
            "categoryLabel": "产业与商业",
            "categoryLabelEn": "Industries and Business",
            "tags": [
                    "云厂商",
                    "AI泡沫",
                    "商业繁荣"
            ],
            "tagsEn": [
                    "Cloud Vendors",
                    "AI Bubble",
                    "Business Growth"
            ],
            "excerpt": "2026年3月26日 的每日阅读与报告打卡图片，共 1 张。",
            "excerptEn": "2026-03-26 daily reading and report-note images, 1 in total.",
            "images": {
                    "cover": "digests/2026/03/2026-03-26-daily-report/images/01.jpg",
                    "cards": [],
                    "longForm": null
            },
            "author": "Renee",
            "readTime": "1 分钟",
            "content": "<p>2026年3月26日 的每日阅读与报告打卡图片已按同日主题整理。点击上方图片可以逐张查看这一组 AI 生成的视觉笔记。</p>"
    },
    {
            "id": "2026-03-24-daily-report",
            "title": "冲击全景：这次不是 2022",
            "titleEn": "Shock Panorama: This Is Not 2022",
            "date": "2026-03-24",
            "category": "tech-business",
            "categoryLabel": "产业与商业",
            "categoryLabelEn": "Industries and Business",
            "tags": [
                    "宏观冲击",
                    "油价",
                    "经济周期"
            ],
            "tagsEn": [
                    "Macro Shock",
                    "Oil Price",
                    "Economic Cycle"
            ],
            "excerpt": "2026年3月24日 的每日阅读与报告打卡图片，共 4 张。",
            "excerptEn": "2026-03-24 daily reading and report-note images, 4 in total.",
            "images": {
                    "cover": "digests/2026/03/2026-03-24-daily-report/images/01.jpg",
                    "cards": [
                            "digests/2026/03/2026-03-24-daily-report/images/02.jpg",
                            "digests/2026/03/2026-03-24-daily-report/images/03.jpg",
                            "digests/2026/03/2026-03-24-daily-report/images/04.jpg"
                    ],
                    "longForm": null
            },
            "author": "Renee",
            "readTime": "2 分钟",
            "content": "<p>2026年3月24日 的每日阅读与报告打卡图片已按同日主题整理。点击上方图片可以逐张查看这一组 AI 生成的视觉笔记。</p>"
    },
    {
            "id": "2026-03-19-daily-report",
            "title": "谁在 AI 的靶心上？",
            "titleEn": "Who Is in AI’s Crosshairs?",
            "date": "2026-03-19",
            "category": "work-efficiency",
            "categoryLabel": "职场与效率",
            "categoryLabelEn": "Work and Efficiency",
            "tags": [
                    "AI影响",
                    "岗位风险",
                    "职业变化"
            ],
            "tagsEn": [
                    "AI Impact",
                    "Job Risk",
                    "Career Change"
            ],
            "excerpt": "2026年3月19日 的每日阅读与报告打卡图片，共 6 张。",
            "excerptEn": "2026-03-19 daily reading and report-note images, 6 in total.",
            "images": {
                    "cover": "digests/2026/03/2026-03-19-daily-report/images/01.jpg",
                    "cards": [
                            "digests/2026/03/2026-03-19-daily-report/images/02.jpg",
                            "digests/2026/03/2026-03-19-daily-report/images/03.jpg",
                            "digests/2026/03/2026-03-19-daily-report/images/04.jpg",
                            "digests/2026/03/2026-03-19-daily-report/images/05.jpg",
                            "digests/2026/03/2026-03-19-daily-report/images/06.jpg"
                    ],
                    "longForm": null
            },
            "author": "Renee",
            "readTime": "3 分钟",
            "content": "<p>2026年3月19日 的每日阅读与报告打卡图片已按同日主题整理。点击上方图片可以逐张查看这一组 AI 生成的视觉笔记。</p>"
    },
    {
            "id": "2026-03-17-daily-report",
            "title": "AI 的信任危机",
            "titleEn": "AI’s Trust Crisis",
            "date": "2026-03-17",
            "category": "ai-org",
            "categoryLabel": "AI与组织",
            "categoryLabelEn": "AI and Organizations",
            "tags": [
                    "AI信任",
                    "医疗决策",
                    "风险分层"
            ],
            "tagsEn": [
                    "AI Trust",
                    "Medical Decisions",
                    "Risk Triage"
            ],
            "excerpt": "2026年3月17日 的每日阅读与报告打卡图片，共 4 张。",
            "excerptEn": "2026-03-17 daily reading and report-note images, 4 in total.",
            "images": {
                    "cover": "digests/2026/03/2026-03-17-daily-report/images/01.jpg",
                    "cards": [
                            "digests/2026/03/2026-03-17-daily-report/images/02.jpg",
                            "digests/2026/03/2026-03-17-daily-report/images/03.jpg",
                            "digests/2026/03/2026-03-17-daily-report/images/04.jpg"
                    ],
                    "longForm": null
            },
            "author": "Renee",
            "readTime": "2 分钟",
            "content": "<p>2026年3月17日 的每日阅读与报告打卡图片已按同日主题整理。点击上方图片可以逐张查看这一组 AI 生成的视觉笔记。</p>"
    },
    {
            "id": "2026-03-14-daily-report",
            "title": "大加速 The Great Acceleration",
            "titleEn": "The Great Acceleration",
            "date": "2026-03-14",
            "category": "tech-business",
            "categoryLabel": "产业与商业",
            "categoryLabelEn": "Industries and Business",
            "tags": [
                    "AI加速",
                    "技术扩散",
                    "宏观变化"
            ],
            "tagsEn": [
                    "AI Acceleration",
                    "Tech Diffusion",
                    "Macro Change"
            ],
            "excerpt": "2026年3月14日 的每日阅读与报告打卡图片，共 2 张。",
            "excerptEn": "2026-03-14 daily reading and report-note images, 2 in total.",
            "images": {
                    "cover": "digests/2026/03/2026-03-14-daily-report/images/01.jpg",
                    "cards": [
                            "digests/2026/03/2026-03-14-daily-report/images/02.jpg"
                    ],
                    "longForm": null
            },
            "author": "Renee",
            "readTime": "1 分钟",
            "content": "<p>2026年3月14日 的每日阅读与报告打卡图片已按同日主题整理。点击上方图片可以逐张查看这一组 AI 生成的视觉笔记。</p>"
    },
    {
            "id": "2026-03-10-daily-report",
            "title": "AI 越强大，人味越值钱",
            "titleEn": "The Stronger AI Gets, the More Human Taste Matters",
            "date": "2026-03-10",
            "category": "work-efficiency",
            "categoryLabel": "职场与效率",
            "categoryLabelEn": "Work and Efficiency",
            "tags": [
                    "人味价值",
                    "人机协作",
                    "表达"
            ],
            "tagsEn": [
                    "Human Taste",
                    "Human-AI Collaboration",
                    "Expression"
            ],
            "excerpt": "2026年3月10日 的每日阅读与报告打卡图片，共 4 张。",
            "excerptEn": "2026-03-10 daily reading and report-note images, 4 in total.",
            "images": {
                    "cover": "digests/2026/03/2026-03-10-daily-report/images/01.jpg",
                    "cards": [
                            "digests/2026/03/2026-03-10-daily-report/images/02.jpg",
                            "digests/2026/03/2026-03-10-daily-report/images/03.jpg",
                            "digests/2026/03/2026-03-10-daily-report/images/04.jpg"
                    ],
                    "longForm": null
            },
            "author": "Renee",
            "readTime": "2 分钟",
            "content": "<p>2026年3月10日 的每日阅读与报告打卡图片已按同日主题整理。点击上方图片可以逐张查看这一组 AI 生成的视觉笔记。</p>"
    },
    {
            "id": "2026-03-08-daily-report",
            "title": "资本火箭与商业化发动机",
            "titleEn": "Capital Rockets and Commercialization Engines",
            "date": "2026-03-08",
            "category": "tech-business",
            "categoryLabel": "产业与商业",
            "categoryLabelEn": "Industries and Business",
            "tags": [
                    "商业化",
                    "专利产业",
                    "技术转化"
            ],
            "tagsEn": [
                    "Commercialization",
                    "Patent Economy",
                    "Tech Transfer"
            ],
            "excerpt": "2026年3月8日 的每日阅读与报告打卡图片，共 4 张。",
            "excerptEn": "2026-03-08 daily reading and report-note images, 4 in total.",
            "images": {
                    "cover": "digests/2026/03/2026-03-08-daily-report/images/01.jpg",
                    "cards": [
                            "digests/2026/03/2026-03-08-daily-report/images/02.jpg",
                            "digests/2026/03/2026-03-08-daily-report/images/03.jpg",
                            "digests/2026/03/2026-03-08-daily-report/images/04.jpg"
                    ],
                    "longForm": null
            },
            "author": "Renee",
            "readTime": "2 分钟",
            "content": "<p>2026年3月8日 的每日阅读与报告打卡图片已按同日主题整理。点击上方图片可以逐张查看这一组 AI 生成的视觉笔记。</p>"
    },

];

const speakingData = [
    {
        year: '2026',
        type: '分享嘉宾',
        typeEn: 'Guest Speaker',
        title: '复旦 EMBA 智慧零售协会',
        titleEn: 'Fudan EMBA Smart Retail Association',
        event: '2026-04-19 · 零售与 AI 场景分享',
        eventEn: '2026-04-19 · Retail and AI scenario sharing',
        desc: '结合行业观察和企业落地经验，分享 AI 如何真正进入零售与经营场景。',
        descEn: 'Shared how AI can truly enter retail and business operations, grounded in industry observation and implementation experience.',
        tags: ['复旦EMBA', '智慧零售', 'AI场景'],
        tagsEn: ['Fudan EMBA', 'Smart Retail', 'AI Scenarios'],
        images: [
            '公开分享记录/20260419-复旦EMBA智慧零售协会/微信图片_20260420155157_334_656.jpg',
            '公开分享记录/20260419-复旦EMBA智慧零售协会/微信图片_20260420155211_337_656.jpg'
        ]
    },
    {
        year: '2026',
        type: '直播对谈',
        typeEn: 'Live Dialogue',
        title: '飞书直击先进直播 with 交个朋友副总裁',
        titleEn: 'Feishu Live Dialogue with a VP from Be Friends',
        event: '2026-04-09 · 直播行业与 AI 应用对话',
        eventEn: '2026-04-09 · Livestreaming and AI application dialogue',
        desc: '围绕直播、电商与企业 AI 实践展开交流，兼具行业洞察与一线案例。',
        descEn: 'A conversation on livestreaming, e-commerce, and enterprise AI practice, combining industry insight with field cases.',
        tags: ['直播行业', '交个朋友', 'AI应用'],
        tagsEn: ['Livestreaming', 'Be Friends', 'AI Apps'],
        images: [
            '公开分享记录/20260409-飞书直击先进直播with交个朋友副总裁/微信图片_20260420162719_354_656.jpg',
            '公开分享记录/20260409-飞书直击先进直播with交个朋友副总裁/微信图片_20260420162718_353_656.jpg'
        ]
    },
    {
        year: '2026',
        type: '社群分享',
        typeEn: 'Community Talk',
        title: '复旦追光研习社',
        titleEn: 'Fudan Zhui Guang Study Club',
        event: '2026-03-28 · 研习社主题交流',
        eventEn: '2026-03-28 · Study club themed exchange',
        desc: '在校园社群里分享 AI 时代的学习方式、表达训练和真实连接的重要性。',
        descEn: 'Shared learning methods, expression practice, and the importance of real connection in the AI era.',
        tags: ['复旦', '学习社群', '表达'],
        tagsEn: ['Fudan', 'Learning Community', 'Expression'],
        images: [
            '公开分享记录/20260328-复旦追光研习社/微信图片_20260420155220_338_656.jpg',
            '公开分享记录/20260328-复旦追光研习社/微信图片_20260420155158_335_656.jpg'
        ]
    },
    {
        year: '2026',
        type: '推文回顾',
        typeEn: 'Article Recap',
        title: '复旦校友会相约 9 号俱乐部',
        titleEn: 'Fudan Alumni Association at Club No. 9',
        event: '2026-03-09 · 校友会活动回顾',
        eventEn: '2026-03-09 · Alumni event recap',
        desc: '活动现场和推文回顾都保留下来，适合呈现一次公开活动从发生到传播的完整痕迹。',
        descEn: 'A complete trace from live event to public recap, preserving both the gathering and its later communication.',
        tags: ['校友会', '公众号', '活动回顾'],
        tagsEn: ['Alumni', 'WeChat Article', 'Event Recap'],
        images: [
            '公开分享记录/20260309-复旦校友会相约9号俱乐部/640.jpeg',
            '公开分享记录/20260309-复旦校友会相约9号俱乐部/微信图片_20260420163927_356_656.jpg'
        ],
        href: 'https://mp.weixin.qq.com/s/e7ooWinwsl9g0WZ-L_B-lA',
        cta: '阅读回顾',
        ctaEn: 'Read Recap'
    },
    {
        year: '2026',
        type: '圆桌交流',
        typeEn: 'Roundtable',
        title: 'C9 俱乐部',
        titleEn: 'C9 Club',
        event: '2026-03-10 · AI 与商业应用交流',
        eventEn: '2026-03-10 · AI and business applications exchange',
        desc: '更偏高密度互动的线下交流，能看到面对面碰撞里的表达状态和现场氛围。',
        descEn: 'A high-density offline exchange that captures the feel of face-to-face discussion and live interaction.',
        tags: ['线下沙龙', '圆桌', 'AI商业'],
        tagsEn: ['Offline Salon', 'Roundtable', 'AI Business'],
        images: [
            '公开分享记录/20260310-C9俱乐部/微信图片_20260420162152_339_656.jpg',
            '公开分享记录/20260310-C9俱乐部/微信图片_20260420162155_341_656.jpg',
            '公开分享记录/20260310-C9俱乐部/微信图片_20260420162205_342_656.jpg',
            '公开分享记录/20260310-C9俱乐部/微信图片_20260420162206_343_656.jpg'
        ]
    },
    {
        year: '2025',
        type: '课堂嘉宾',
        typeEn: 'Class Guest',
        title: '复旦 MBA 数字化转型课堂嘉宾分享',
        titleEn: 'Guest Talk for Fudan MBA Digital Transformation Class',
        event: '2025-12-13 · 课堂主题分享',
        eventEn: '2025-12-13 · Class themed sharing',
        desc: '将企业数字化与 AI 实践经验带回课堂，让内容兼顾方法论与真实业务案例。',
        descEn: 'Brought enterprise digitalization and AI practice back into the classroom, balancing methodology with real business cases.',
        tags: ['复旦MBA', '数字化转型', '课堂分享'],
        tagsEn: ['Fudan MBA', 'Digital Transformation', 'Class Talk'],
        images: [
            '公开分享记录/20251213-复旦MBA数字化转型课堂嘉宾分享/微信图片_20260420162242_345_656.jpg',
            '公开分享记录/20251213-复旦MBA数字化转型课堂嘉宾分享/微信图片_20260420155156_333_656.jpg'
        ]
    },
    {
        year: '2025',
        type: '公开亮相',
        typeEn: 'Public Appearance',
        title: '复旦 iLab 商赛优胜奖',
        titleEn: 'Fudan iLab Business Competition Award',
        event: '2025-08-17 · 公开领奖与项目展示',
        eventEn: '2025-08-17 · Public award and project showcase',
        desc: '虽然不是传统演讲，但很适合作为“公开表达被外部认可”的补充证据。',
        descEn: 'Not a traditional speech, but a useful proof point of public expression being recognized externally.',
        tags: ['复旦iLab', '优胜奖', '项目展示'],
        tagsEn: ['Fudan iLab', 'Award', 'Project Showcase'],
        images: [
            '公开分享记录/20250817-复旦iLab商赛优胜奖/微信图片_20260420162313_347_656.jpg',
            '公开分享记录/20250817-复旦iLab商赛优胜奖/微信图片_20260420162257_346_656.jpg'
        ]
    },
    {
        year: '2025',
        type: '主办活动',
        typeEn: 'Hosted Event',
        title: '飞书高管 AI 亲子营',
        titleEn: 'Feishu Executive AI Family Camp',
        event: '2025-07-18 · 小朋友的暑期 AI 科普营',
        eventEn: '2025-07-18 · Summer AI camp for children',
        desc: '从海报到现场，把 AI 解释给家庭与孩子听，是另一种更具翻译能力的公开表达。',
        descEn: 'Explained AI to families and children, from event poster to live session, as another kind of translation-oriented public expression.',
        tags: ['亲子营', 'AI科普', '活动主办'],
        tagsEn: ['Family Camp', 'AI Education', 'Hosted Event'],
        images: [
            '公开分享记录/20250718-主办飞书高管AI亲子营/微信图片_20260420163220_355_656.png',
            '公开分享记录/20250718-主办飞书高管AI亲子营/微信图片_20260420162512_348_656.jpg'
        ]
    },
    {
        year: '2025',
        type: '直播拆解',
        typeEn: 'Live Breakdown',
        title: '直击先进直播 with 爱回收',
        titleEn: 'Advanced Livestreaming with Aihuishou',
        event: '2025-07-14 · 直播场景交流',
        eventEn: '2025-07-14 · Livestreaming scenario exchange',
        desc: '围绕直播间运营与企业实践展开交流，补足了公开分享里更贴近电商现场的一条样本。',
        descEn: 'A field-oriented sample focused on livestream operations, e-commerce, and enterprise practice.',
        tags: ['直播拆解', '爱回收', '场景交流'],
        tagsEn: ['Live Breakdown', 'Aihuishou', 'Scenario Exchange'],
        images: [
            '公开分享记录/20250714-直击先进直播 with 爱回收/微信图片_20260420162515_349_656.jpg'
        ]
    },
    {
        year: '2025',
        type: '主办赛事',
        typeEn: 'Hosted Competition',
        title: '交个朋友 AI 应用挑战赛',
        titleEn: 'Be Friends AI Application Challenge',
        event: '2025-06-06 · 主办与对外传播',
        eventEn: '2025-06-06 · Hosting and public communication',
        desc: '这一条同时具备舞台现场图与公众号推文，能比较完整地呈现一场活动从发生到传播的闭环。',
        descEn: 'A complete event loop from live stage to public article, showing both execution and communication.',
        tags: ['交个朋友', 'AI应用大赛', '公众号'],
        tagsEn: ['Be Friends', 'AI Challenge', 'WeChat Article'],
        images: [
            '公开分享记录/20250606-主办交个朋友AI应用大赛/微信图片_20260420162544_351_656.jpg',
            '公开分享记录/20250606-主办交个朋友AI应用大赛/640 (1).jpeg'
        ],
        href: 'https://mp.weixin.qq.com/s/8ItwsySuVcVdBRHEG338YA',
        cta: '赛事回顾',
        ctaEn: 'Event Recap'
    },
    {
        year: '2024',
        type: '直播观察',
        typeEn: 'Live Observation',
        title: '揭秘交个朋友直播间直播',
        titleEn: 'Inside the Be Friends Livestream Room',
        event: '2024-10-29 · 直播场景观察',
        eventEn: '2024-10-29 · Livestreaming scenario observation',
        desc: '更偏观察与拆解的一次公开记录，能把你对直播间场景的洞察补进时间线里。',
        descEn: 'A record of observation and analysis that adds livestreaming scenario insight to the speaking archive.',
        tags: ['交个朋友', '直播间', '场景观察'],
        tagsEn: ['Be Friends', 'Livestream Room', 'Scenario Observation'],
        images: [
            '公开分享记录/20241029-揭秘交个朋友直播间直播/微信图片_20260420162616_352_656.jpg'
        ]
    }
];

const speakingGalleryData = [
    {
        type: 'photo',
        label: '赛事现场',
        title: '交个朋友 AI 应用挑战赛',
        desc: '舞台、评委席和活动现场感都很完整，适合作为公开分享区的开场图。',
        metaLeft: '2025-06-06',
        metaRight: '主办活动',
        image: '公开分享记录/20250606-主办交个朋友AI应用大赛/微信图片_20260420162544_351_656.jpg',
        href: 'https://mp.weixin.qq.com/s/8ItwsySuVcVdBRHEG338YA',
        cta: '查看推文'
    },
    {
        type: 'poster',
        label: '活动海报',
        title: '飞书高管 AI 亲子营',
        desc: '一张很强的视觉型海报，也把你公开表达里的“翻译能力”带出来了。',
        metaLeft: '2025-07-18',
        metaRight: '活动海报',
        image: '公开分享记录/20250718-主办飞书高管AI亲子营/微信图片_20260420163220_355_656.png',
        href: '公开分享记录/20250718-主办飞书高管AI亲子营/微信图片_20260420162512_348_656.jpg',
        cta: '查看现场'
    },
    {
        type: 'photo',
        label: '圆桌现场',
        title: 'C9 俱乐部分享',
        desc: '这张图更偏“现场中的你”，适合体现你在线下社群里真实交流的状态。',
        metaLeft: '2026-03-10',
        metaRight: '线下沙龙',
        image: '公开分享记录/20260310-C9俱乐部/微信图片_20260420162206_343_656.jpg',
        href: '公开分享记录/20260310-C9俱乐部/微信图片_20260420162155_341_656.jpg',
        cta: '查看更多'
    },
    {
        type: 'certificate',
        label: '公开亮相',
        title: '复旦 iLab 商赛优胜奖',
        desc: '获奖和公开展示结合在一起，能补足“被外部看见”的一类证据。',
        metaLeft: '2025-08-17',
        metaRight: '优胜团队',
        image: '公开分享记录/20250817-复旦iLab商赛优胜奖/微信图片_20260420162313_347_656.jpg',
        href: '公开分享记录/20250817-复旦iLab商赛优胜奖/微信图片_20260420162257_346_656.jpg',
        cta: '查看合照'
    },
    {
        type: 'photo',
        label: '课堂分享',
        title: '复旦 MBA 数字化转型课堂',
        desc: '课堂场景适合把你从“活动嘉宾”延展到“知识讲述者”的角色。',
        metaLeft: '2025-12-13',
        metaRight: '课堂嘉宾',
        image: '公开分享记录/20251213-复旦MBA数字化转型课堂嘉宾分享/微信图片_20260420162242_345_656.jpg',
        href: '公开分享记录/20251213-复旦MBA数字化转型课堂嘉宾分享/微信图片_20260420155156_333_656.jpg',
        cta: '查看海报'
    },
    {
        type: 'photo',
        label: '推文回顾',
        title: '复旦校友会相约 9 号俱乐部',
        desc: '这是“活动本身 + 公众号传播”都齐的一条记录，适合收在轮播尾声。',
        metaLeft: '2026-03-09',
        metaRight: '公众号回顾',
        image: '公开分享记录/20260309-复旦校友会相约9号俱乐部/640.jpeg',
        href: 'https://mp.weixin.qq.com/s/e7ooWinwsl9g0WZ-L_B-lA',
        cta: '查看推文'
    }
];

const thinkingData = [
    {
        id: 'ai-collaboration-constitution',
        status: 'live',
        statusLabel: '在线长文',
        statusLabelEn: 'Live Essay',
        title: '在 AI 什么都能做的时代，我给自己立了一部「协作宪法」',
        titleEn: 'A Collaboration Constitution for the Age of Omnipresent AI',
        desc: '从“训练我 / 显化我”和“我的浓度”出发，给自己定下什么亲自做、什么交给 AI 的边界。',
        descEn: 'A personal constitution for deciding what to keep human and what to delegate to AI.',
        format: '思考长文 / AI 协作',
        formatEn: 'Long Essay / AI Collaboration',
        topics: ['协作宪法', '训练我/显化我', 'AI 边界'],
        topicsEn: ['Collaboration Constitution', 'Training / Manifesting', 'AI Boundary'],
        href: 'https://renezhang.fun/thoughts/ai-collaboration-constitution/',
        cta: '阅读全文',
        ctaEn: 'Read Essay'
    },
    {
        id: 'ai-organizational-assets',
        status: 'live',
        statusLabel: '在线长文',
        statusLabelEn: 'Live Essay',
        title: 'AI 不会替代人，但会拉开两种组织',
        titleEn: 'AI Will Not Replace People, But It Will Split Organizations',
        desc: '从“租用智能”到“沉淀智能”，重新定义 AI 时代企业真正该积累的组织资产。',
        descEn: 'From renting intelligence to compounding it, this essay reframes what organizational assets enterprises should build in the AI era.',
        format: '思考长文 / 企业 AI',
        formatEn: 'Long Essay / Enterprise AI',
        topics: ['组织资产', '私有智能', 'Skill'],
        topicsEn: ['Organizational Assets', 'Private Intelligence', 'Skill'],
        href: 'https://renezhang.fun/thoughts/ai-organizational-assets/',
        cta: '阅读全文',
        ctaEn: 'Read Essay'
    },
    {
        id: 'openclaw-assistant',
        status: 'live',
        statusLabel: '飞书文档',
        statusLabelEn: 'Feishu Doc',
        title: 'OpenClaw 打造个人办公助理',
        titleEn: 'Build a Personal Office Assistant with OpenClaw',
        desc: '复旦 EMBA 校友专属的一份实操手册，把个人办公助理怎么搭、怎么用讲得很具体。',
        descEn: 'A practical playbook for Fudan EMBA alumni on how to build and use a personal office assistant.',
        format: '飞书 Wiki / 方法手册',
        formatEn: 'Feishu Wiki / Playbook',
        topics: ['OpenClaw', '个人助理', 'EMBA'],
        topicsEn: ['OpenClaw', 'Personal Assistant', 'EMBA'],
        href: 'https://bytedance.larkoffice.com/wiki/GfzXwpYMSiLdi4kSaAycPqw7n4O',
        cta: '打开文档',
        ctaEn: 'Open Doc'
    },
    {
        id: 'skill-platform',
        status: 'live',
        statusLabel: '飞书文档',
        statusLabelEn: 'Feishu Doc',
        title: '为什么你的企业需要一个 Skill 管理平台？',
        titleEn: 'Why Your Enterprise Needs a Skill Management Platform',
        desc: '从企业规模化复用的角度，解释为什么 Skill 不只是 prompt 集合，而会变成组织能力的基础设施。',
        descEn: 'Why Skills are more than prompt collections, and how they become infrastructure for organizational capability.',
        format: '飞书文档 / 观点文章',
        formatEn: 'Feishu Doc / Opinion',
        topics: ['Skill 平台', '组织能力', '企业 AI'],
        topicsEn: ['Skill Platform', 'Organizational Capability', 'Enterprise AI'],
        href: 'https://bytedance.larkoffice.com/docx/IBIBdHJcfodpvMxjxsMc67xKnXe',
        cta: '打开文档',
        ctaEn: 'Open Doc'
    },
    {
        id: 'aily-handbook',
        status: 'live',
        statusLabel: '飞书文档',
        statusLabelEn: 'Feishu Doc',
        title: '高管数字分身 · aily 智能伙伴的养虾手册',
        titleEn: 'Executive Digital Twin: Aily Companion Handbook',
        desc: '把高管数字分身的养成方法、使用边界和真实场景写成了一份更容易上手的说明书。',
        descEn: 'A hands-on guide to training, using, and setting boundaries for an executive digital twin.',
        format: '飞书 Wiki / 使用手册',
        formatEn: 'Feishu Wiki / Handbook',
        topics: ['Aily', '数字分身', '高管助手'],
        topicsEn: ['Aily', 'Digital Twin', 'Executive Assistant'],
        href: 'https://bytedance.larkoffice.com/wiki/PtDGwjxQ3iXGqJk80tGcnLhwn7e',
        cta: '打开文档',
        ctaEn: 'Open Doc'
    },
    {
        id: 'aily-templates',
        status: 'live',
        statusLabel: '飞书文档',
        statusLabelEn: 'Feishu Doc',
        title: '高管数字分身 · 专属 aily 定时任务 & 提示词模板',
        titleEn: 'Executive Digital Twin: Aily Scheduled Tasks and Prompt Templates',
        desc: '把高频定时任务和提示词模板整理成一套可以直接借用的高管工作台配置。',
        descEn: 'A reusable executive workspace configuration with scheduled tasks and prompt templates.',
        format: '飞书 Wiki / 模板库',
        formatEn: 'Feishu Wiki / Template Library',
        topics: ['定时任务', '提示词模板', 'Aily'],
        topicsEn: ['Scheduled Tasks', 'Prompt Templates', 'Aily'],
        href: 'https://bytedance.larkoffice.com/wiki/MjxXwCmNeiIgKLkdVvJcvVS0nof',
        cta: '打开文档',
        ctaEn: 'Open Doc'
    },
    {
        id: 'harness-engineering',
        status: 'building',
        statusLabel: '片段随记',
        statusLabelEn: 'Fragment',
        title: '从 Prompt 到 Harness：AI 开始接上人的上下文之后',
        titleEn: 'From Prompt to Harness: When AI Connects to Human Context',
        desc: '关键词：Harness Engineering / 认知显化 / 对齐。不是更大的滴管，而是把系统真正接上人的上下文。',
        descEn: 'Keywords: harness engineering, cognitive externalization, alignment. Not a bigger dropper, but a system connected to human context.',
        format: '元认知 / 元 AI',
        formatEn: 'Metacognition / Meta AI',
        topics: ['Harness Engineering', '认知上传', '对齐'],
        topicsEn: ['Harness Engineering', 'Cognition Upload', 'Alignment'],
        href: '',
        cta: '阅读全文',
        ctaEn: 'Read More',
        fullText: `
            <p>#1-Area/元认知 #AI/元AI</p>
            <p>以前 prompt engineering 和 context engineering 就像拿着滴管去河里面取水，不过是小滴管变成了大滴管甚至管道。</p>
            <p>但现在 harness engineering 是完全不一样的，尤其是结合飞书或者 OpenClaw 或者 Notion 或者 Obsidian 之类的各处主人信息，那就像阿凡达里面那个辫子和龙连在一起，就可以翱翔了。</p>
            <p>一开始给 AI 几个模糊的标签，AI 能懂你一点，大概按照你的标签去交互，没关系，重要的是建立起系统，过程中不断给反馈，优化迭代，就会越来越像你。这个过程的核心是自己的认知的显化和上传以及对齐。</p>
            <p>人和人的关系就像黑暗中并肩行走，永远无法真的知道对方和自己的真实全貌，但不断加深互相的了解和纠正共同前进，就够了，未来人和 AI 也是。</p>
        `
    },
    {
        id: 'startup-will',
        status: 'building',
        statusLabel: '片段随记',
        statusLabelEn: 'Fragment',
        title: '技术和想法都不稀缺，愿力与迭代才稀缺',
        titleEn: 'Technology and Ideas Are Not Scarce. Will and Iteration Are.',
        desc: '关键词：愿力 / 反馈 / 迭代。起步阶段真正稀缺的，不是技术和想法，而是你会不会真的去做。',
        descEn: 'Keywords: will, feedback, iteration. At the beginning, what is scarce is not technology or ideas, but whether you will actually do it.',
        format: '元认知 / 自我提醒',
        formatEn: 'Metacognition / Self Reminder',
        topics: ['创业', '愿力', '迭代'],
        topicsEn: ['Startup', 'Will', 'Iteration'],
        href: '',
        cta: '阅读全文',
        ctaEn: 'Read More',
        fullText: `
            <p>#1-Area/元认知</p>
            <p>昨天参加一个 AI 创业小酒馆的活动，分享结束后聚在一起聊天，有一位朋友说自己有个创业想法，但是没有技术能力，想找个有技术的一起做，又担心自己的可控性。</p>
            <p>我说：“现在这个时代做什么想什么都很容易，只有你真的发这个愿去做这件事情，一步步收集反馈，迭代，有所积累之后才是稀缺的，在最一开始，技术本身、想法本身，这些都不稀缺。”</p>
            <p>这句话也想送给我自己。</p>
        `
    },
    {
        id: 'workflow-data-gravity',
        status: 'building',
        statusLabel: '片段随记',
        statusLabelEn: 'Fragment',
        title: '从 Workflow Data Gravity 到 Decision Fabric',
        titleEn: 'From Workflow Data Gravity to Decision Fabric',
        desc: '关键词：Workflow Data Gravity / Decision Fabric / 飞书窗口期。两篇文章一起看，会把“卖结果”这件事照得更清楚。',
        descEn: 'Keywords: workflow data gravity, decision fabric, Feishu window. Two essays that clarify what it means to sell outcomes.',
        format: '阅读联想 / 产品脑洞',
        formatEn: 'Reading Notes / Product Ideas',
        topics: ['OpenClaw', 'Agent', '飞书'],
        topicsEn: ['OpenClaw', 'Agent', 'Feishu'],
        href: '',
        cta: '阅读全文',
        ctaEn: 'Read More',
        fullText: `
            <p>分享两篇最近读到的好文，都指向同一个方向，放一起看特别有启发。</p>
            <p>第一篇：《OpenClaw 是一个信号｜2026 Long-Horizon Agent 投资地图》——全景梳理了 AI Agent 赛道，核心判断是企业软件正在从“卖工具”转向“卖结果”，Agent 的终局是直接替代人力交付业务成果。文中提出的 Workflow Data Gravity 概念很值得琢磨：模型能力会趋同，但每次 Agent 执行任务积累下来的边界情况、修正记录和决策路径不会——这才是真正的护城河，客户用得越久越换不掉。</p>
            <p>第二篇：From Copilot to Autopilot.pdf（中文翻译版：从副驾驶到自动驾驶：构建自主型企业的架构蓝图）——用四层架构（引擎 → 编排层 → 驾驶舱 → 飞行员）描述了从“AI辅助”到“AI自治”的路径，提出 Decision Fabric（决策织网） 的概念，和第一篇的 Workflow Data Gravity 完全对应。</p>
            <p>借此开开脑洞想象下：飞书如何在这个窗口期卡住身位？</p>
            <p>现在 Aily 和 AI 工作流已经能做一些自动化和定时任务了，但坦白讲，配置门槛还比较高，体验也偏通用——更多是“你教会它，它才会干”，而不是“它懂你，所以替你干”。如果往前再走一步，飞书能不能变成一个不需要专门配置、懂用户的工作上下文、持续在替用户运转的产品？</p>
            <p>消息流：AI 持续学习你的角色和业务关系，主动帮你分层未读——哪些需要你立刻回复、哪些讨论已有结论只需知晓、哪个你答应跟进的事项已经沉了三天没人推动。</p>
            <p>文档：你打开时上次会议要点已经整理好了，相关资料和上下游文档已经关联进来，自动 highlight 哪些变更是你本人应该关注的，哪些数据和最新情况有出入需要你确认。</p>
            <p>日历：AI 综合项目状态和风险信号，发现某个项目出现延期风险且两周没有同步了，主动建议拉会，把相关人、待讨论问题和背景材料都准备好，你点确认就行。</p>
            <p>审批：对发起人，AI 预判材料可能不全，提前提醒补齐再提交，减少来回打回的摩擦；对审批人，AI 基于历史同类审批和公司政策，给出风险提示和建议判断，让审批从“逐条人工核对”变成“确认 AI 预判”。</p>
            <p>最好的界面是正在消失的界面。人从操作者变成指挥官——这就是两篇文章共同指向的方向。而飞书天然沉淀的沟通、审批、业务数据，恰恰就是让这个飞轮转起来的燃料。窗口期不会太长，谁先把这些数据跑成 Workflow Data Gravity，谁就拿到了下一张船票。</p>
        `
    },
    {
        id: 'aily-template-habit',
        status: 'building',
        statusLabel: '片段随记',
        statusLabelEn: 'Fragment',
        title: '先让 Aily 跑第一版，再由人做判断和拍板',
        titleEn: 'Let Aily Run the First Draft, Then Let People Judge',
        desc: '关键词：模板任务 / agent 初稿 / 人做判断。先让 Aily 跑一版，正在变成一种新的协作手感。',
        descEn: 'Keywords: template tasks, agent drafts, human judgment. Letting Aily run the first version is becoming a new collaboration reflex.',
        format: '工作流观察 / AI 协作',
        formatEn: 'Workflow Observation / AI Collaboration',
        topics: ['Aily', '模板任务', '协作方式'],
        topicsEn: ['Aily', 'Template Tasks', 'Collaboration'],
        href: '',
        cta: '阅读全文',
        ctaEn: 'Read More',
        fullText: `
            <p>最近在所有收到的填各种模板（客户档案、复盘、总结之类）的任务上，我已经养成一个新习惯：先把需求丢给 Aily 跑一版，再在它产出的基础上修改。</p>
            <p>结果发现一件事：Aily 在基于模板生成有效文档上现在真的越来越能干了，很多信息它能自己从群聊、文档里扒出来，比我到处翻记录快太多，只要原模板结构清晰，基本只要稍微调整下就可用。</p>
            <p>再一想，这好像不只是“偷个懒”的小技巧，其实完全可以变成一种新的协作和思考方式：分发任务的人往前多走一步，把背景和目标整理成一段提示词；接任务的人用自己的 Aily 跑一遍，再做判断和微调，人和 agent 各自干最值钱的那部分。</p>
            <p>开始畅想下个阶段 Aily 也变成个会抢活的小助手，识别聊天中有任务自动弹出按钮“需不需要我帮你做？”，先替我们拆解并完成 80%，人类再做那 20% 的判断和拍板。</p>
        `
    }
];

function renderSpeakingCards() {
    const grid = document.getElementById('speakingGrid');
    if (!grid) return;

    function toUrl(path) {
        if (!path) return '';
        return siteAssetPath(path);
    }

    const yearGroups = speakingData.reduce((groups, item, index) => {
        const currentGroup = groups.find(group => group.year === item.year);
        const entry = { ...item, originalIndex: index };

        if (currentGroup) {
            currentGroup.items.push(entry);
        } else {
            groups.push({ year: item.year, items: [entry] });
        }

        return groups;
    }, []);

    grid.innerHTML = `
        <div class="speaking-ticket-archive">
            ${yearGroups.map(group => `
                <section class="speaking-ticket-year-rail" aria-labelledby="speaking-year-${group.year}">
                    <div class="speaking-ticket-year">
                        <h3 id="speaking-year-${group.year}">${group.year}</h3>
                        <span>${group.items.length} ${currentLanguage === 'en' ? 'tickets' : '张票根'}</span>
                    </div>
                    <div class="speaking-ticket-stack">
                        ${group.items.map((item, groupIndex) => {
                            const images = (item.images || []).map(toUrl).filter(Boolean);
                            const hasCarousel = images.length > 1;
                            const eventText = tItem(item, 'event');
                            const eventDate = eventText.split('·')[0].trim();
                            const isFeatured = groupIndex === 0;
                            const title = tItem(item, 'title');

                            return `
                                <article class="speaking-ticket-stub ${isFeatured ? 'speaking-ticket-featured' : ''}">
                                    <div class="speaking-ticket-edge" aria-hidden="true"></div>
                                    <div class="speaking-ticket-photo speaking-ticket-carousel ${hasCarousel ? 'is-carousel' : ''}" data-ticket-carousel>
                                        ${images.length ? `
                                            <div class="speaking-ticket-track">
                                                ${images.map((image, imageIndex) => `
                                                    <figure class="speaking-ticket-slide">
                                                        <img src="${image}" alt="${title} ${imageIndex + 1}">
                                                    </figure>
                                                `).join('')}
                                            </div>
                                        ` : ''}
                                        <span class="speaking-ticket-index">${String(item.originalIndex + 1).padStart(2, '0')}</span>
                                        ${hasCarousel ? `
                                            <button class="speaking-ticket-nav prev" type="button" data-ticket-prev aria-label="${currentLanguage === 'en' ? 'Previous image' : '上一张图片'}">‹</button>
                                            <button class="speaking-ticket-nav next" type="button" data-ticket-next aria-label="${currentLanguage === 'en' ? 'Next image' : '下一张图片'}">›</button>
                                            <div class="speaking-ticket-dots" aria-hidden="true">
                                                ${images.map((_, imageIndex) => `
                                                    <button class="speaking-ticket-dot ${imageIndex === 0 ? 'active' : ''}" type="button" data-ticket-slide="${imageIndex}" tabindex="-1"></button>
                                                `).join('')}
                                            </div>
                                            <span class="speaking-ticket-count" data-ticket-count>1 / ${images.length}</span>
                                        ` : ''}
                                    </div>
                                    <div class="speaking-ticket-copy">
                                        <div class="speaking-ticket-meta">
                                            <span>${eventDate}</span>
                                            <span>${tItem(item, 'type')}</span>
                                        </div>
                                        <h3>${title}</h3>
                                        <p>${tItem(item, 'desc')}</p>
                                        <div class="speaking-ticket-tags">
                                            ${(item.tagsEn && currentLanguage === 'en' ? item.tagsEn : tList(item.tags)).map(tag => `<span class="speaking-card-tag">${tag}</span>`).join('')}
                                        </div>
                                    </div>
                                    <div class="speaking-ticket-action">
                                        <div class="speaking-ticket-perforation" aria-hidden="true"></div>
                                        <span class="speaking-ticket-admit">ADMIT</span>
                                        <span>${images.length} ${currentLanguage === 'en' ? 'images' : '张图'}</span>
                                        ${item.href ? `
                                            <a class="speaking-card-link" href="${toUrl(item.href)}" target="_blank" rel="noopener noreferrer">
                                                ${tItem(item, 'cta') || (currentLanguage === 'en' ? 'View Details' : '查看详情')}
                                            </a>
                                        ` : ''}
                                    </div>
                                </article>
                            `;
                        }).join('')}
                    </div>
                </section>
            `).join('')}
        </div>
    `;

    initSpeakingTicketCarousels(grid);
    observeAnimatedElements(grid);
}

function initSpeakingTicketCarousels(root = document) {
    root.querySelectorAll('[data-ticket-carousel]').forEach(carousel => {
        const track = carousel.querySelector('.speaking-ticket-track');
        const slides = carousel.querySelectorAll('.speaking-ticket-slide');
        const dots = carousel.querySelectorAll('.speaking-ticket-dot');
        const count = carousel.querySelector('[data-ticket-count]');
        const prevBtn = carousel.querySelector('[data-ticket-prev]');
        const nextBtn = carousel.querySelector('[data-ticket-next]');

        if (!track || slides.length <= 1) return;

        let currentIndex = 0;

        function updateCarousel(index) {
            currentIndex = (index + slides.length) % slides.length;
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
            dots.forEach((dot, dotIndex) => {
                dot.classList.toggle('active', dotIndex === currentIndex);
            });
            if (count) {
                count.textContent = `${currentIndex + 1} / ${slides.length}`;
            }
        }

        prevBtn?.addEventListener('click', (event) => {
            event.stopPropagation();
            updateCarousel(currentIndex - 1);
        });

        nextBtn?.addEventListener('click', (event) => {
            event.stopPropagation();
            updateCarousel(currentIndex + 1);
        });

        dots.forEach(dot => {
            dot.addEventListener('click', (event) => {
                event.stopPropagation();
                updateCarousel(Number(dot.dataset.ticketSlide || 0));
            });
        });

        carousel.addEventListener('click', (event) => {
            if (event.target.closest('button')) return;
            updateCarousel(currentIndex + 1);
        });

        updateCarousel(0);
    });
}

function initSpeakingEntryCarousels() {
    const carousels = document.querySelectorAll('.speaking-entry-carousel');

    carousels.forEach(carousel => {
        const track = carousel.querySelector('.speaking-entry-track');
        const slides = carousel.querySelectorAll('.speaking-entry-slide');
        const indicators = carousel.querySelectorAll('.speaking-entry-indicator');
        const prevBtn = carousel.querySelector('.speaking-entry-btn.prev');
        const nextBtn = carousel.querySelector('.speaking-entry-btn.next');

        if (!track || slides.length <= 1) return;

        let currentIndex = 0;

        function updateCarousel(index) {
            currentIndex = (index + slides.length) % slides.length;
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
            indicators.forEach((dot, dotIndex) => {
                dot.classList.toggle('active', dotIndex === currentIndex);
            });
        }

        indicators.forEach(dot => {
            dot.addEventListener('click', () => {
                updateCarousel(Number(dot.dataset.index || 0));
            });
        });

        prevBtn?.addEventListener('click', () => updateCarousel(currentIndex - 1));
        nextBtn?.addEventListener('click', () => updateCarousel(currentIndex + 1));

        let touchStartX = 0;
        let touchEndX = 0;

        carousel.addEventListener('touchstart', (event) => {
            touchStartX = event.changedTouches[0].clientX;
        }, { passive: true });

        carousel.addEventListener('touchend', (event) => {
            touchEndX = event.changedTouches[0].clientX;
            const deltaX = touchStartX - touchEndX;

            if (Math.abs(deltaX) > 40) {
                updateCarousel(currentIndex + (deltaX > 0 ? 1 : -1));
            }
        }, { passive: true });

        updateCarousel(0);
    });
}

function createSpeakingMediaMarkup(item) {
    const href = item.href ? siteAssetPath(item.href) : '';
    const image = item.image ? siteAssetPath(item.image) : '';

    if (item.image) {
        return `
            <div class="speaking-media-card">
                <div class="speaking-media-frame">
                    <img src="${image}" alt="${item.title}">
                </div>
                <div class="speaking-media-caption">
                    <span class="speaking-media-type">${item.label}</span>
                    <h4>${item.title}</h4>
                    <p>${item.desc}</p>
                    <div class="speaking-media-meta">
                        <span>${item.metaLeft}</span>
                        <span>${item.metaRight}</span>
                    </div>
                    ${href ? `<a class="speaking-media-link" href="${href}" target="_blank" rel="noopener noreferrer">${item.cta || '查看详情'}</a>` : ''}
                </div>
            </div>
        `;
    }

    return `
        <div class="speaking-media-card">
            <div class="speaking-media-frame">
                <div class="speaking-media-placeholder ${item.type}">
                    <span class="speaking-media-type">${item.label}</span>
                    <div class="speaking-media-body">
                        <h4>${item.title}</h4>
                        <p>${item.desc}</p>
                    </div>
                    <div class="speaking-media-meta">
                        <span>${item.metaLeft}</span>
                        <span>${item.metaRight}</span>
                    </div>
                </div>
            </div>
            <div class="speaking-media-caption">
                <h4>${item.title}</h4>
                <p>${item.desc}</p>
            </div>
        </div>
    `;
}

function renderSpeakingCarousel() {
    const carousel = document.getElementById('speakingCarousel');
    const track = document.getElementById('speakingCarouselTrack');
    const indicators = document.getElementById('speakingCarouselIndicators');
    const prevBtn = document.getElementById('speakingCarouselPrev');
    const nextBtn = document.getElementById('speakingCarouselNext');

    if (!carousel || !track || !indicators || !prevBtn || !nextBtn) return;

    track.innerHTML = speakingGalleryData.map(item => `
        <div class="speaking-carousel-slide">
            ${createSpeakingMediaMarkup(item)}
        </div>
    `).join('');

    indicators.innerHTML = speakingGalleryData.map((_, index) => `
        <button class="speaking-carousel-indicator ${index === 0 ? 'active' : ''}" data-index="${index}" aria-label="查看第 ${index + 1} 张"></button>
    `).join('');

    let currentIndex = 0;
    let autoPlayTimer;

    function goToSlide(index) {
        currentIndex = (index + speakingGalleryData.length) % speakingGalleryData.length;
        track.style.transform = `translateX(-${currentIndex * 100}%)`;

        indicators.querySelectorAll('.speaking-carousel-indicator').forEach((dot, dotIndex) => {
            dot.classList.toggle('active', dotIndex === currentIndex);
        });
    }

    function startAutoPlay() {
        autoPlayTimer = window.setInterval(() => {
            goToSlide(currentIndex + 1);
        }, 3600);
    }

    function stopAutoPlay() {
        window.clearInterval(autoPlayTimer);
    }

    prevBtn.addEventListener('click', () => {
        stopAutoPlay();
        goToSlide(currentIndex - 1);
        startAutoPlay();
    });

    nextBtn.addEventListener('click', () => {
        stopAutoPlay();
        goToSlide(currentIndex + 1);
        startAutoPlay();
    });

    indicators.querySelectorAll('.speaking-carousel-indicator').forEach(dot => {
        dot.addEventListener('click', () => {
            stopAutoPlay();
            goToSlide(Number(dot.dataset.index));
            startAutoPlay();
        });
    });

    let touchStartX = 0;
    let touchEndX = 0;

    carousel.addEventListener('mouseenter', stopAutoPlay);
    carousel.addEventListener('mouseleave', startAutoPlay);

    carousel.addEventListener('touchstart', (event) => {
        touchStartX = event.changedTouches[0].screenX;
        stopAutoPlay();
    }, { passive: true });

    carousel.addEventListener('touchend', (event) => {
        touchEndX = event.changedTouches[0].screenX;
        const deltaX = touchStartX - touchEndX;

        if (Math.abs(deltaX) > 40) {
            goToSlide(currentIndex + (deltaX > 0 ? 1 : -1));
        }

        startAutoPlay();
    }, { passive: true });

    goToSlide(0);
    startAutoPlay();
}

function renderThinkingCards() {
    const grid = document.getElementById('thinkingGrid');
    if (!grid) return;

    grid.innerHTML = thinkingData.map(item => `
        <article class="thinking-card">
            <span class="thinking-card-status ${item.status}">${tItem(item, 'statusLabel')}</span>
            <h3 class="thinking-card-title">${tItem(item, 'title')}</h3>
            <p class="thinking-card-desc">${tItem(item, 'desc')}</p>
            <div class="thinking-card-topics">
                ${(item.topicsEn && currentLanguage === 'en' ? item.topicsEn : tList(item.topics)).map(topic => `<span class="thinking-card-topic">${topic}</span>`).join('')}
            </div>
            <div class="thinking-card-footer">
                <span class="thinking-card-format">${tItem(item, 'format')}</span>
                ${item.href
                    ? `<a class="thinking-card-link" href="${item.href}" target="_blank" rel="noopener noreferrer">${tItem(item, 'cta')}</a>`
                    : item.fullText
                        ? `<button class="thinking-card-link" type="button" onclick="openThinkingModal('${item.id}')">${tItem(item, 'cta')}</button>`
                        : `<span class="thinking-card-link is-disabled">${tItem(item, 'cta')}</span>`
                }
            </div>
        </article>
    `).join('');

    bindSmoothScroll(grid);
    observeAnimatedElements(grid);
}

function openThinkingModal(thinkingId) {
    const entry = thinkingData.find(item => item.id === thinkingId);
    if (!entry || !entry.fullText) return;

    const modal = document.getElementById('thinkingModal');
    const modalBody = document.getElementById('thinkingModalBody');
    if (!modal || !modalBody) return;

    modalBody.innerHTML = `
        <div class="modal-header">
            <div class="modal-date">${tItem(entry, 'format')}</div>
            <h2 class="modal-title">${tItem(entry, 'title')}</h2>
            <div class="modal-tags">
                ${(entry.topicsEn && currentLanguage === 'en' ? entry.topicsEn : tList(entry.topics)).map(topic => `<span class="digest-card-tag">${topic}</span>`).join('')}
            </div>
        </div>
        <div class="modal-text">
            ${currentLanguage === 'en' && entry.fullTextEn ? entry.fullTextEn : entry.fullText}
        </div>
    `;

    modal.classList.add('active');
    updateBodyModalState();
}

function closeThinkingModal() {
    const modal = document.getElementById('thinkingModal');
    if (!modal) return;
    modal.classList.remove('active');
    updateBodyModalState();
}

function updateBodyModalState() {
    const hasOpenModal = document.querySelector('.digest-modal.active');
    document.body.style.overflow = hasOpenModal ? 'hidden' : '';
}

// Render digest cards
function renderDigestCards(filter = 'all') {
    const gallery = document.getElementById('digestGallery');
    if (!gallery) return;

    const filteredData = filter === 'all'
        ? digestData
        : digestData.filter(item => item.category === filter);

    const cardsMarkup = filteredData.map((digest, digestIndex) => {
        // 准备卡片要显示的所有图片（封面 + 卡片图）
        const cardImages = (digest.images.cards ?
            [digest.images.cover, ...digest.images.cards] :
            [digest.images.cover]).filter(Boolean).map(siteAssetPath);

        return `
            <div class="digest-card digest-rail-card" onclick="openDigestModal('${digest.id}')">
                <div class="digest-rail-card-meta">
                    <span>${formatDate(digest.date)}</span>
                    <span>${String(digestIndex + 1).padStart(2, '0')} · ${cardImages.length} ${currentLanguage === 'en' ? 'images' : '张图'}</span>
                </div>
                <div class="digest-card-cover">
                    <div class="digest-card-carousel" data-card-id="${digest.id}">
                        <div class="digest-card-carousel-track">
                            ${cardImages.map((img, index) => `
                                <div class="digest-card-carousel-slide" data-index="${index}">
                                    <img src="${img}" alt="${tItem(digest, 'title')}" onerror="this.parentElement.style.display='none'">
                                </div>
                            `).join('')}
                        </div>
                        ${cardImages.length > 1 ? `
                            <div class="digest-card-indicators">
                                ${cardImages.map((_, index) => `
                                    <div class="digest-card-indicator ${index === 0 ? 'active' : ''}"></div>
                                `).join('')}
                            </div>
                            <button class="digest-card-carousel-btn prev">‹</button>
                            <button class="digest-card-carousel-btn next">›</button>
                        ` : ''}
                    </div>
                </div>
                <div class="digest-card-content">
                    <h3 class="digest-card-title">${tItem(digest, 'title')}</h3>
                    <div class="digest-card-tags">
                        ${tList(digest.tags).slice(0, 3).map(tag => `<span class="digest-card-tag">${tag}</span>`).join('')}
                    </div>
                </div>
            </div>
        `;
    }).join('');

    gallery.innerHTML = `
        <div class="digest-rail-shell">
            <div class="digest-rail-track">
                ${cardsMarkup || `<p class="digest-rail-empty">${currentLanguage === 'en' ? 'No notes in this category yet.' : '这个分类下还没有打卡。'}</p>`}
            </div>
        </div>
    `;

    // 初始化卡片轮播
    initCardCarousels();
}

// 初始化卡片轮播
function initCardCarousels() {
    const carousels = document.querySelectorAll('.digest-card-carousel');

    carousels.forEach(carousel => {
        const track = carousel.querySelector('.digest-card-carousel-track');
        const indicators = carousel.querySelectorAll('.digest-card-indicator');
        const slides = carousel.querySelectorAll('.digest-card-carousel-slide');
        const totalSlides = slides.length;

        if (totalSlides <= 1) return;

        let currentIndex = 0;
        let autoPlayInterval;

        // 切换到指定幻灯片
        function goToSlide(index) {
            currentIndex = index;
            track.style.transform = `translateX(-${currentIndex * 100}%)`;

            indicators.forEach((indicator, i) => {
                indicator.classList.toggle('active', i === currentIndex);
            });
        }

        // 下一张
        function nextSlide() {
            goToSlide((currentIndex + 1) % totalSlides);
        }

        // 上一张
        function prevSlide() {
            goToSlide((currentIndex - 1 + totalSlides) % totalSlides);
        }

        // 自动播放
        function startAutoPlay() {
            autoPlayInterval = setInterval(nextSlide, 3000);
        }

        function stopAutoPlay() {
            clearInterval(autoPlayInterval);
        }

        // 绑定按钮事件
        const prevBtn = carousel.querySelector('.digest-card-carousel-btn.prev');
        const nextBtn = carousel.querySelector('.digest-card-carousel-btn.next');

        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                prevSlide();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                nextSlide();
            });
        }

        // 鼠标悬停时暂停
        carousel.addEventListener('mouseenter', stopAutoPlay);
        carousel.addEventListener('mouseleave', startAutoPlay);

        // 触摸滑动支持
        let touchStartX = 0;
        let touchEndX = 0;

        carousel.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            stopAutoPlay();
        }, { passive: true });

        carousel.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            const diff = touchStartX - touchEndX;

            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
            }

            startAutoPlay();
        }, { passive: true });

        // 启动自动播放
        startAutoPlay();
    });
}

// Format date
function formatDate(dateStr) {
    const date = new Date(dateStr);
    if (currentLanguage === 'en') {
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
    const month = date.toLocaleDateString('zh-CN', { month: 'long' });
    const day = date.getDate();
    return `${month} ${day}日`;
}

// Filter functionality
const filterBtns = document.querySelectorAll('.filter-btn');
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderDigestCards(btn.dataset.filter);
    });
});

// Open digest modal
function openDigestModal(digestId) {
    const digest = digestData.find(d => d.id === digestId);
    if (!digest) return;

    const modal = document.getElementById('digestModal');
    const modalBody = document.getElementById('modalBody');

    // 准备所有图片（封面 + 卡片图）
    const allImages = (digest.images.cards ?
        [digest.images.cover, ...digest.images.cards] :
        [digest.images.cover]).filter(Boolean).map(siteAssetPath);

    modalBody.innerHTML = `
        <div class="modal-header">
            <div class="modal-date">${formatDate(digest.date)} · ${t(digest.readTime)} ${currentLanguage === 'en' ? 'read' : '阅读'}</div>
            <h2 class="modal-title">${tItem(digest, 'title')}</h2>
            <div class="modal-tags">
                ${tList(digest.tags).map(tag => `<span class="digest-card-tag">${tag}</span>`).join('')}
            </div>
        </div>

        <div class="modal-gallery">
            ${allImages.map(img => `
                <div class="modal-gallery-item">
                    <img src="${img}" alt="${tItem(digest, 'title')}" onerror="this.parentElement.style.display='none'">
                </div>
            `).join('')}
        </div>

        ${digest.images.longForm ? `
            <div class="modal-longform">
                <img src="${siteAssetPath(digest.images.longForm)}" alt="${currentLanguage === 'en' ? 'Long-form image' : '文字长图'}" onerror="this.parentElement.style.display='none'">
            </div>
        ` : ''}

        <div class="modal-text">
            ${digest.content}
        </div>
    `;

    modal.classList.add('active');
    updateBodyModalState();
}

// Close digest modal
function closeDigestModal() {
    const modal = document.getElementById('digestModal');
    modal.classList.remove('active');
    updateBodyModalState();
}

// Close modal on ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeDigestModal();
        closeThinkingModal();
    }
});

// Initialize digest gallery on page load
document.addEventListener('DOMContentLoaded', () => {
    initLanguageToggle();
    updatePageProgress();
    updateActiveNavigation();
    initScreenPager();
    initCareerStage();
    renderSpeakingCards();
    renderSpeakingCarousel();
    renderThinkingCards();
    renderDigestCards();
    applyStaticTranslations();
});
