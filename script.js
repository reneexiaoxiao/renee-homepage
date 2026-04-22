// ===== Smooth Scrolling =====
function bindSmoothScroll(root = document) {
    root.querySelectorAll('a[href^="#"]').forEach(anchor => {
        if (anchor.dataset.smoothBound === 'true') return;

        anchor.dataset.smoothBound = 'true';
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

bindSmoothScroll();

// ===== Navigation Background on Scroll =====
const nav = document.querySelector('.nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add shadow when scrolled
    if (currentScroll > 50) {
        nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
    } else {
        nav.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});

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

    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0;
    pageProgressBar.style.width = `${Math.min(Math.max(progress, 0), 100)}%`;
}

window.addEventListener('scroll', updatePageProgress, { passive: true });
window.addEventListener('resize', updatePageProgress);

// ===== Active Navigation Link =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${current}`) {
            link.style.color = 'var(--color-text)';
        }
    });
});

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
            section.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
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

        if (fields.kicker) fields.kicker.textContent = step.dataset.kicker || '';
        if (fields.period) fields.period.textContent = step.dataset.period || '';
        if (fields.label) fields.label.textContent = step.dataset.label || '';
        if (fields.title) fields.title.textContent = step.dataset.title || '';
        if (fields.desc) fields.desc.textContent = step.dataset.desc || '';
        if (fields.tags) {
            fields.tags.innerHTML = tags.map(tag => `<span>${tag}</span>`).join('');
        }
        if (fields.metrics) {
            fields.metrics.innerHTML = metrics.map(metric => `
                <div class="career-panel-metric">
                    <span class="career-panel-metric-value">${metric.value}</span>
                    <span class="career-panel-metric-label">${metric.label}</span>
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
        id: '2026-03-23-ie-ai-journey',
        title: '#Learn&Digest/36：IEG AI应用启示录——从隐性知识到同行治理',
        date: '2026-03-23',
        category: 'ai',
        categoryLabel: 'AI与企业',
        tags: ['AI战略', '组织转型', '治理模式', 'IEG'],
        excerpt: '世界银行内部独立评估小组（IEG）的AI战略探索，揭示AI在知识密集型组织中的渗透速度比想象中慢，核心是「判断力」难以被AI替代。提出5级成熟度模型和同行治理模式。',
        images: {
            cover: 'digests/2026/03/2026-03-23/images/cover.jpg',
            cards: ['digests/2026/03/2026-03-23/images/01.jpg',
                     'digests/2026/03/2026-03-23/images/02.jpg',
                     'digests/2026/03/2026-03-23/images/03.jpg'],
            longForm: null
        },
        author: 'Renee',
        readTime: '10 分钟',
        content: `<h3>核心洞察</h3>
<p>IEG从2018年就开始探索用AI做评估了——比ChatGPT诞生早了整整4年。他们用过判别式AI做文本挖掘，用过地理空间AI分析卫星图像，甚至用计算机视觉评估城市扩张的经济影响。但这些探索，长期以来都是各团队各自为战、摸着石头过河。直到2026年，他们才第一次把这些散落的经验、教训和隐性知识，凝结成一份正式的战略文件。</p>
<p>背后原因是「显性知识」和「隐性知识」之前的转化成本。AI在组织中的应用，最难的从来不是技术本身，而是把一个人、一个小团队摸索出来的经验，变成整个组织都能复用的标准化流程。这个转化过程，需要足够多的失败案例作为「学费」，也需要足够的组织共识作为「基础设施」。</p>
<h3>认知1：战略从泥土里长出来</h3>
<p>如果你的企业也在探索AI，不要着急写战略。先让一线团队大胆试错，积累足够的隐性知识，等到「痛点」和「甜蜜点」都足够清晰了，再把它固化成战略，效果远好于自上而下的「纸上谈兵」。真正的战略，不是从PPT里长出来的，是从一线的泥土里长出来的。</p>
<h3>认知2：AI成熟度5级模型</h3>
<p>IEG给自己设计了一个5级成熟度模型，但自己才在第二层，看起来AI在知识密集型组织中的渗透速度，还比我们想象的慢。不是因为技术不够好，而是因为评估工作的核心是「判断力」——对发展效果的判断、对数据质量的判断、对因果关系的判断。这些判断力，目前还无法被AI完全替代。</p>
<p>如果AI在你的组织里应用得太快，那你可还得看一下，究竟有多少是别人用AI复刻不了的？自己的组织的核心竞争力是什么？一定得留有一些AI无法触及到的核心判断力，或者只有自己有的私域知识，是捏在手上的。不然以后可能就会陷入内卷竞争，不断被AI挤压。</p>
<p><strong>AI时代的竞争力 = AI加速的效率 × AI触不到的壁垒</strong>，两个乘数，缺一个都不行。</p>
<h3>认知3：混合中间地带</h3>
<p>IEG在报告中明确提出了一个核心理念：The sweet spot for IEG's use of AI lies in a hybrid space——AI应用的最佳位置，是一个「混合中间地带」。在这个空间里，AI工具被有控制地、有针对性地用于补充或增强传统评估方法，而非取代它们。</p>
<h3>认知4：同行治理模型</h3>
<p>最前沿的AI治理，不靠「层级管控」，靠「同行自治」。IEG提出了一个非常新颖的治理模型：Peer Governance（同行治理），也叫「集体自治」。他们要成立一个AI审查委员会（AIRB），成员不是高管，而是一个跨职能的同行团队——数据科学家、评估团队负责人、经理、方法论顾问、知识管理人员——大家轮换任期，共同制定标准、审查风险、分享经验。</p>
<h3>认知5：价值创造公式</h3>
<p>AI的价值创造公式 = <strong>AI能力 × 人类判断力 × 组织制度</strong>。AI能力在飞速提升，但如果人类判断力退化（过度依赖AI），或组织制度滞后（没有质量保证机制），那乘出来的结果反而可能变差。</p>
<p>所以，AI时代对人的要求不是降低了，而是升高了——从「执行者」升级为「设计者、解释者、守门人」。</p>
<p>不要问「AI会取代我的哪些工作」，要问「AI会让我做哪些以前做不了的工作」。主动把自己从「执行层」升维到「决策层」，你就不会被AI淘汰，反而会因为AI而变得更有价值。</p>
<p><strong>AI不会淘汰人，但会淘汰那些不愿意「升维」的人。</strong></p>
<h3>行动清单</h3>
<ul>
<li><strong>盘点隐性知识：</strong>盘点你的团队或公司过去一年所有的AI实验和探索，整理成一份「隐性知识清单」，看看哪些经验值得固化为流程</li>
<li><strong>AI成熟度体检：</strong>用IEG的5级成熟度模型，给自己的团队做一次「AI成熟度体检」，诚实打分，并确定未来6个月的目标等级</li>
<li><strong>找混合甜蜜点：</strong>找出你业务中的3个「混合甜蜜点」——AI能处理80%标准化工作、人类负责20%高价值判断的环节</li>
<li><strong>AI人才审计：</strong>做一次「AI人才审计」：团队里有多少人能独立使用AI工具完成核心业务？比例低于20%就启动培训计划</li>
<li><strong>建立AI实践小组：</strong>在团队内部建立一个非正式的「AI实践小组」，每两周分享一次各自的AI使用经验和踩坑教训</li>
<li><strong>任务升维迁移：</strong>列出你当前工作中3项「可被AI接管的执行任务」和3项「AI时代你可以升维做的高价值任务」，开始有意识地迁移时间和精力</li>
</ul>`
    },
    {
        id: '2024-03-21-agentic-ai',
        title: 'Agentic AI 十大趋势：当AI成为主动的代理人',
        date: '2024-03-21',
        category: 'ai',
        categoryLabel: 'AI与企业',
        tags: ['Agentic AI', 'AI趋势', '智能体'],
        excerpt: 'AI正在从被动工具转向主动代理人。Agentic AI不仅能理解指令，更能自主规划、执行和验证。这十大趋势将重新定义人机协作的未来...',
        images: {
            cover: 'digests/2024/03/2024-03-21-agentic-ai/images/cover.jpg',
            cards: ['digests/2024/03/2024-03-21-agentic-ai/images/01.jpg',
                     'digests/2024/03/2024-03-21-agentic-ai/images/02.jpg',
                     'digests/2024/03/2024-03-21-agentic-ai/images/03.jpg'],
            longForm: 'digests/2024/03/2024-03-21-agentic-ai/images/long-form.jpg'
        },
        author: 'Renee',
        readTime: '8 分钟',
        content: `<h3>核心洞察</h3>
<p>AI正在经历从被动工具到主动代理人的范式转移。这种转变不仅仅是技术升级，更是人机关系的根本重构。</p>
<h3>十大趋势</h3>
<ul>
<li><strong>从Copilot到Autopilot：</strong>AI不再只是副驾驶，而是能够独立完成复杂任务的自主代理人。</li>
<li><strong>多Agent协作：</strong>多个AI智能体像团队一样协同工作，各自专攻不同领域。</li>
<li><strong>持续学习能力：</strong>Agent能够在执行任务中持续学习和优化，而非依赖一次性训练。</li>
<li><strong>工具使用能力：</strong>Agent能够自主选择和使用各种工具来完成目标。</li>
<li><strong>长期规划能力：</strong>从单步响应转向多步推理和长期目标规划。</li>
<li><strong>记忆与上下文：</strong>Agent拥有持久记忆，能够在长期交互中积累和运用知识。</li>
<li><strong>自我验证与反思：</strong>Agent能够审视自己的输出，发现并修正错误。</li>
<li><strong>人机协作新范式：</strong>人类从操作者变为监督者和战略决策者。</li>
<li><strong>安全与可控性：</strong>随着Agent自主性增强，确保其行为符合人类价值观变得至关重要。</li>
<li><strong>企业级应用爆发：</strong>Agent将从实验走向大规模企业应用。</li>
</ul>
<h3>行动清单</h3>
<ul>
<li><strong>重新思考工作流程：</strong>识别哪些环节可以交给Agent自主完成</li>
<li><strong>建立监督机制：</strong>设计Agent行为的监控和干预体系</li>
<li><strong>投资Agent基础设施：</strong>构建支持多Agent协作的技术平台</li>
<li><strong>培养新技能：</strong>从"如何做"转向"如何设计Agent"</li>
<li><strong>关注安全边界：</strong>明确Agent的权限和限制条件</li>
</ul>`
    },
    {
        id: '2024-03-20-anthropic-workforce',
        title: 'Anthropic劳动力市场报告：AI时代的人才进化论',
        date: '2024-03-20',
        category: 'workforce',
        categoryLabel: '劳动力与职场',
        tags: ['劳动力市场', 'AI影响', '技能变革'],
        excerpt: 'Anthropic最新报告揭示：AI正在重塑劳动力市场。高薪技能受到的冲击最大，而人际互动类工作反而变得更重要...',
        images: {
            cover: 'digests/2024/03/2024-03-20-anthropic-workforce/images/cover.jpg',
            cards: ['digests/2024/03/2024-03-20-anthropic-workforce/images/01.jpg',
                     'digests/2024/03/2024-03-20-anthropic-workforce/images/02.jpg',
                     'digests/2024/03/2024-03-20-anthropic-workforce/images/03.jpg'],
            longForm: 'digests/2024/03/2024-03-20-anthropic-workforce/images/long-form.jpg'
        },
        author: 'Renee',
        readTime: '10 分钟',
        content: `<p>Anthropic最新报告揭示：AI正在重塑劳动力市场。高薪技能受到的冲击最大，而人际互动类工作反而变得更重要...</p>`
    },
    {
        id: '2024-03-19-ark-bigideas',
        title: 'ARK Big Ideas 2026：九大颠覆性技术投资图谱',
        date: '2024-03-19',
        category: 'tech',
        categoryLabel: '前沿科技与宏观',
        tags: ['ARK', '投资趋势', '前沿科技'],
        excerpt: 'ARK年度报告发布，从AI到机器人，从基因编辑到航天技术，九大技术领域的投资机遇与风险图谱...',
        images: {
            cover: 'digests/2024/03/2024-03-19-ark-bigideas/images/cover.jpg',
            cards: ['digests/2024/03/2024-03-19-ark-bigideas/images/01.jpg',
                     'digests/2024/03/2024-03-19-ark-bigideas/images/02.jpg',
                     'digests/2024/03/2024-03-19-ark-bigideas/images/03.jpg'],
            longForm: 'digests/2024/03/2024-03-19-ark-bigideas/images/long-form.jpg'
        },
        author: 'Renee',
        readTime: '12 分钟',
        content: `<p>ARK年度报告发布，从AI到机器人，从基因编辑到航天技术，九大技术领域的投资机遇与风险图谱...</p>`
    }
];

const speakingData = [
    {
        year: '2026',
        type: '分享嘉宾',
        title: '复旦 EMBA 智慧零售协会',
        event: '2026-04-19 · 零售与 AI 场景分享',
        desc: '结合行业观察和企业落地经验，分享 AI 如何真正进入零售与经营场景。',
        tags: ['复旦EMBA', '智慧零售', 'AI场景'],
        images: [
            '公开分享记录/20260419-复旦EMBA智慧零售协会/微信图片_20260420155157_334_656.jpg',
            '公开分享记录/20260419-复旦EMBA智慧零售协会/微信图片_20260420155211_337_656.jpg'
        ]
    },
    {
        year: '2026',
        type: '直播对谈',
        title: '飞书直击先进直播 with 交个朋友副总裁',
        event: '2026-04-09 · 直播行业与 AI 应用对话',
        desc: '围绕直播、电商与企业 AI 实践展开交流，兼具行业洞察与一线案例。',
        tags: ['直播行业', '交个朋友', 'AI应用'],
        images: [
            '公开分享记录/20260409-飞书直击先进直播with交个朋友副总裁/微信图片_20260420162719_354_656.jpg',
            '公开分享记录/20260409-飞书直击先进直播with交个朋友副总裁/微信图片_20260420162718_353_656.jpg'
        ]
    },
    {
        year: '2026',
        type: '社群分享',
        title: '复旦追光研习社',
        event: '2026-03-28 · 研习社主题交流',
        desc: '在校园社群里分享 AI 时代的学习方式、表达训练和真实连接的重要性。',
        tags: ['复旦', '学习社群', '表达'],
        images: [
            '公开分享记录/20260328-复旦追光研习社/微信图片_20260420155220_338_656.jpg',
            '公开分享记录/20260328-复旦追光研习社/微信图片_20260420155158_335_656.jpg'
        ]
    },
    {
        year: '2026',
        type: '推文回顾',
        title: '复旦校友会相约 9 号俱乐部',
        event: '2026-03-09 · 校友会活动回顾',
        desc: '活动现场和推文回顾都保留下来，适合呈现一次公开活动从发生到传播的完整痕迹。',
        tags: ['校友会', '公众号', '活动回顾'],
        images: [
            '公开分享记录/20260309-复旦校友会相约9号俱乐部/640.jpeg',
            '公开分享记录/20260309-复旦校友会相约9号俱乐部/微信图片_20260420163927_356_656.jpg'
        ],
        href: 'https://mp.weixin.qq.com/s/e7ooWinwsl9g0WZ-L_B-lA',
        cta: '阅读回顾'
    },
    {
        year: '2026',
        type: '圆桌交流',
        title: 'C9 俱乐部',
        event: '2026-03-10 · AI 与商业应用交流',
        desc: '更偏高密度互动的线下交流，能看到面对面碰撞里的表达状态和现场氛围。',
        tags: ['线下沙龙', '圆桌', 'AI商业'],
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
        title: '复旦 MBA 数字化转型课堂嘉宾分享',
        event: '2025-12-13 · 课堂主题分享',
        desc: '将企业数字化与 AI 实践经验带回课堂，让内容兼顾方法论与真实业务案例。',
        tags: ['复旦MBA', '数字化转型', '课堂分享'],
        images: [
            '公开分享记录/20251213-复旦MBA数字化转型课堂嘉宾分享/微信图片_20260420162242_345_656.jpg',
            '公开分享记录/20251213-复旦MBA数字化转型课堂嘉宾分享/微信图片_20260420155156_333_656.jpg'
        ]
    },
    {
        year: '2025',
        type: '公开亮相',
        title: '复旦 iLab 商赛优胜奖',
        event: '2025-08-17 · 公开领奖与项目展示',
        desc: '虽然不是传统演讲，但很适合作为“公开表达被外部认可”的补充证据。',
        tags: ['复旦iLab', '优胜奖', '项目展示'],
        images: [
            '公开分享记录/20250817-复旦iLab商赛优胜奖/微信图片_20260420162313_347_656.jpg',
            '公开分享记录/20250817-复旦iLab商赛优胜奖/微信图片_20260420162257_346_656.jpg'
        ]
    },
    {
        year: '2025',
        type: '主办活动',
        title: '飞书高管 AI 亲子营',
        event: '2025-07-18 · 小朋友的暑期 AI 科普营',
        desc: '从海报到现场，把 AI 解释给家庭与孩子听，是另一种更具翻译能力的公开表达。',
        tags: ['亲子营', 'AI科普', '活动主办'],
        images: [
            '公开分享记录/20250718-主办飞书高管AI亲子营/微信图片_20260420163220_355_656.png',
            '公开分享记录/20250718-主办飞书高管AI亲子营/微信图片_20260420162512_348_656.jpg'
        ]
    },
    {
        year: '2025',
        type: '直播拆解',
        title: '直击先进直播 with 爱回收',
        event: '2025-07-14 · 直播场景交流',
        desc: '围绕直播间运营与企业实践展开交流，补足了公开分享里更贴近电商现场的一条样本。',
        tags: ['直播拆解', '爱回收', '场景交流'],
        images: [
            '公开分享记录/20250714-直击先进直播 with 爱回收/微信图片_20260420162515_349_656.jpg'
        ]
    },
    {
        year: '2025',
        type: '主办赛事',
        title: '交个朋友 AI 应用挑战赛',
        event: '2025-06-06 · 主办与对外传播',
        desc: '这一条同时具备舞台现场图与公众号推文，能比较完整地呈现一场活动从发生到传播的闭环。',
        tags: ['交个朋友', 'AI应用大赛', '公众号'],
        images: [
            '公开分享记录/20250606-主办交个朋友AI应用大赛/微信图片_20260420162544_351_656.jpg',
            '公开分享记录/20250606-主办交个朋友AI应用大赛/640 (1).jpeg'
        ],
        href: 'https://mp.weixin.qq.com/s/8ItwsySuVcVdBRHEG338YA',
        cta: '赛事回顾'
    },
    {
        year: '2024',
        type: '直播观察',
        title: '揭秘交个朋友直播间直播',
        event: '2024-10-29 · 直播场景观察',
        desc: '更偏观察与拆解的一次公开记录，能把你对直播间场景的洞察补进时间线里。',
        tags: ['交个朋友', '直播间', '场景观察'],
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
        id: 'openclaw-assistant',
        status: 'live',
        statusLabel: '飞书文档',
        title: 'OpenClaw 打造个人办公助理',
        desc: '复旦 EMBA 校友专属的一份实操手册，把个人办公助理怎么搭、怎么用讲得很具体。',
        format: '飞书 Wiki / 方法手册',
        topics: ['OpenClaw', '个人助理', 'EMBA'],
        href: 'https://bytedance.larkoffice.com/wiki/GfzXwpYMSiLdi4kSaAycPqw7n4O',
        cta: '打开文档'
    },
    {
        id: 'skill-platform',
        status: 'live',
        statusLabel: '飞书文档',
        title: '为什么你的企业需要一个 Skill 管理平台？',
        desc: '从企业规模化复用的角度，解释为什么 Skill 不只是 prompt 集合，而会变成组织能力的基础设施。',
        format: '飞书文档 / 观点文章',
        topics: ['Skill 平台', '组织能力', '企业 AI'],
        href: 'https://bytedance.larkoffice.com/docx/IBIBdHJcfodpvMxjxsMc67xKnXe',
        cta: '打开文档'
    },
    {
        id: 'aily-handbook',
        status: 'live',
        statusLabel: '飞书文档',
        title: '高管数字分身 · aily 智能伙伴的养虾手册',
        desc: '把高管数字分身的养成方法、使用边界和真实场景写成了一份更容易上手的说明书。',
        format: '飞书 Wiki / 使用手册',
        topics: ['Aily', '数字分身', '高管助手'],
        href: 'https://bytedance.larkoffice.com/wiki/PtDGwjxQ3iXGqJk80tGcnLhwn7e',
        cta: '打开文档'
    },
    {
        id: 'aily-templates',
        status: 'live',
        statusLabel: '飞书文档',
        title: '高管数字分身 · 专属 aily 定时任务 & 提示词模板',
        desc: '把高频定时任务和提示词模板整理成一套可以直接借用的高管工作台配置。',
        format: '飞书 Wiki / 模板库',
        topics: ['定时任务', '提示词模板', 'Aily'],
        href: 'https://bytedance.larkoffice.com/wiki/MjxXwCmNeiIgKLkdVvJcvVS0nof',
        cta: '打开文档'
    },
    {
        id: 'harness-engineering',
        status: 'building',
        statusLabel: '片段随记',
        title: '从 Prompt 到 Harness：AI 开始接上人的上下文之后',
        desc: '关键词：Harness Engineering / 认知显化 / 对齐。不是更大的滴管，而是把系统真正接上人的上下文。',
        format: '元认知 / 元 AI',
        topics: ['Harness Engineering', '认知上传', '对齐'],
        href: '',
        cta: '阅读全文',
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
        title: '技术和想法都不稀缺，愿力与迭代才稀缺',
        desc: '关键词：愿力 / 反馈 / 迭代。起步阶段真正稀缺的，不是技术和想法，而是你会不会真的去做。',
        format: '元认知 / 自我提醒',
        topics: ['创业', '愿力', '迭代'],
        href: '',
        cta: '阅读全文',
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
        title: '从 Workflow Data Gravity 到 Decision Fabric',
        desc: '关键词：Workflow Data Gravity / Decision Fabric / 飞书窗口期。两篇文章一起看，会把“卖结果”这件事照得更清楚。',
        format: '阅读联想 / 产品脑洞',
        topics: ['OpenClaw', 'Agent', '飞书'],
        href: '',
        cta: '阅读全文',
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
        title: '先让 Aily 跑第一版，再由人做判断和拍板',
        desc: '关键词：模板任务 / agent 初稿 / 人做判断。先让 Aily 跑一版，正在变成一种新的协作手感。',
        format: '工作流观察 / AI 协作',
        topics: ['Aily', '模板任务', '协作方式'],
        href: '',
        cta: '阅读全文',
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
        return path.startsWith('http') || path.startsWith('#') ? path : encodeURI(path);
    }

    function renderSpeakingMedia(item, index) {
        const images = (item.images || []).map(toUrl).filter(Boolean);
        if (images.length === 0) {
            return '<div class="speaking-entry-visual"></div>';
        }

        if (images.length === 1) {
            return `
                <div class="speaking-entry-visual">
                    <div class="speaking-entry-media">
                        <img src="${images[0]}" alt="${item.title}">
                    </div>
                </div>
            `;
        }

        return `
            <div class="speaking-entry-visual">
                <div class="speaking-entry-media speaking-entry-carousel" data-carousel-id="speaking-${index}">
                    <div class="speaking-entry-track">
                        ${images.map((image, imageIndex) => `
                            <div class="speaking-entry-slide" data-index="${imageIndex}">
                                <img src="${image}" alt="${item.title} ${imageIndex + 1}">
                            </div>
                        `).join('')}
                    </div>
                    <div class="speaking-entry-controls">
                        <button class="speaking-entry-btn prev" type="button" aria-label="上一张">‹</button>
                        <div class="speaking-entry-indicators">
                            ${images.map((_, imageIndex) => `
                                <button
                                    class="speaking-entry-indicator ${imageIndex === 0 ? 'active' : ''}"
                                    type="button"
                                    data-index="${imageIndex}"
                                    aria-label="查看第 ${imageIndex + 1} 张"
                                ></button>
                            `).join('')}
                        </div>
                        <button class="speaking-entry-btn next" type="button" aria-label="下一张">›</button>
                    </div>
                </div>
            </div>
        `;
    }

    grid.innerHTML = speakingData.map((item, index) => `
        <article class="speaking-timeline-item speaking-card">
            <div class="speaking-timeline-year">${item.year}</div>
            <div class="speaking-entry">
                <div class="speaking-entry-copy">
                    <div class="speaking-card-topline">
                        <div class="speaking-card-identity">
                            <span class="speaking-card-type">${item.type}</span>
                            <span class="speaking-card-index">${String(index + 1).padStart(2, '0')}</span>
                        </div>
                        <span class="speaking-card-event">${item.event}</span>
                    </div>
                    <h3 class="speaking-card-title">${item.title}</h3>
                    <p class="speaking-card-desc">${item.desc}</p>
                    <div class="speaking-card-footer">
                        <div class="speaking-card-tags">
                            ${item.tags.map(tag => `<span class="speaking-card-tag">${tag}</span>`).join('')}
                        </div>
                        ${item.href ? `
                            <a class="speaking-card-link" href="${toUrl(item.href)}" target="_blank" rel="noopener noreferrer">
                                ${item.cta || '查看详情'}
                            </a>
                        ` : ''}
                    </div>
                </div>
                ${renderSpeakingMedia(item, index)}
            </div>
        </article>
    `).join('');

    initSpeakingEntryCarousels();
    observeAnimatedElements(grid);
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
    const href = item.href ? (item.href.startsWith('http') ? item.href : encodeURI(item.href)) : '';
    const image = item.image ? encodeURI(item.image) : '';

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
            <span class="thinking-card-status ${item.status}">${item.statusLabel}</span>
            <h3 class="thinking-card-title">${item.title}</h3>
            <p class="thinking-card-desc">${item.desc}</p>
            <div class="thinking-card-topics">
                ${item.topics.map(topic => `<span class="thinking-card-topic">${topic}</span>`).join('')}
            </div>
            <div class="thinking-card-footer">
                <span class="thinking-card-format">${item.format}</span>
                ${item.href
                    ? `<a class="thinking-card-link" href="${item.href}" target="_blank" rel="noopener noreferrer">${item.cta}</a>`
                    : item.fullText
                        ? `<button class="thinking-card-link" type="button" onclick="openThinkingModal('${item.id}')">${item.cta}</button>`
                        : `<span class="thinking-card-link is-disabled">${item.cta}</span>`
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
            <div class="modal-date">${entry.format}</div>
            <h2 class="modal-title">${entry.title}</h2>
            <div class="modal-tags">
                ${entry.topics.map(topic => `<span class="digest-card-tag">${topic}</span>`).join('')}
            </div>
        </div>
        <div class="modal-text">
            ${entry.fullText}
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

    gallery.innerHTML = filteredData.map(digest => {
        // 准备卡片要显示的所有图片（封面 + 卡片图）
        const cardImages = digest.images.cards ?
            [digest.images.cover, ...digest.images.cards] :
            [digest.images.cover];

        return `
            <div class="digest-card" onclick="openDigestModal('${digest.id}')">
                <div class="digest-card-cover">
                    <div class="digest-card-carousel" data-card-id="${digest.id}">
                        <div class="digest-card-carousel-track">
                            ${cardImages.map((img, index) => `
                                <div class="digest-card-carousel-slide" data-index="${index}">
                                    <img src="${img}" alt="${digest.title}" onerror="this.parentElement.style.display='none'">
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
                    <h3 class="digest-card-title">${digest.title}</h3>
                    <div class="digest-card-tags">
                        ${digest.tags.slice(0, 3).map(tag => `<span class="digest-card-tag">${tag}</span>`).join('')}
                    </div>
                </div>
            </div>
        `;
    }).join('');

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
    const allImages = digest.images.cards ?
        [digest.images.cover, ...digest.images.cards] :
        [digest.images.cover];

    modalBody.innerHTML = `
        <div class="modal-header">
            <div class="modal-date">${formatDate(digest.date)} · ${digest.readTime}阅读</div>
            <h2 class="modal-title">${digest.title}</h2>
            <div class="modal-tags">
                ${digest.tags.map(tag => `<span class="digest-card-tag">${tag}</span>`).join('')}
            </div>
        </div>

        <div class="modal-gallery">
            ${allImages.map(img => `
                <div class="modal-gallery-item">
                    <img src="${img}" alt="${digest.title}" onerror="this.parentElement.style.display='none'">
                </div>
            `).join('')}
        </div>

        ${digest.images.longForm ? `
            <div class="modal-longform">
                <img src="${digest.images.longForm}" alt="文字长图" onerror="this.parentElement.style.display='none'">
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
    updatePageProgress();
    initScreenPager();
    initCareerStage();
    renderSpeakingCards();
    renderSpeakingCarousel();
    renderThinkingCards();
    renderDigestCards();
});
