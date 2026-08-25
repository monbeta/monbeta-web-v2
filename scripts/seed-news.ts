import { inArray } from "drizzle-orm";
import { getDb } from "../src/db";
import { articleTags, articles, tags, type TiptapJSON } from "../src/db/schema";

const SEED_TAGS = [
  { id: "seed-tag-policy", name: "政策更新", slug: "policy-update" },
  { id: "seed-tag-study", name: "学签", slug: "study-permit" },
  { id: "seed-tag-pgwp", name: "PGWP", slug: "pgwp" },
  { id: "seed-tag-work", name: "工签", slug: "work-permit" },
  { id: "seed-tag-super", name: "超级签证", slug: "super-visa" },
  { id: "seed-tag-oinp", name: "省提名", slug: "oinp" },
] as const;

type SeedArticle = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverUrl: string | null;
  tagIds: string[];
  status: "draft" | "published";
  publishedAt: string | null;
  paragraphs: string[];
};

const SEED_ARTICLES: SeedArticle[] = [
  {
    id: "seed-article-01",
    slug: "ircc-study-permit-quota-2026",
    title: "2026 年 IRCC 学签配额调整：申请人最该关注的三件事",
    excerpt: "联邦学签配额延续紧缩，省级 PAL/TAL 仍是核心瓶颈。本文拆解配额逻辑与新生申请窗口。",
    coverUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1400&q=80",
    tagIds: ["seed-tag-policy", "seed-tag-study"],
    status: "published",
    publishedAt: "2026-08-12T10:00:00.000Z",
    paragraphs: [
      "IRCC 延续学签配额管理后，学校录取并不能直接换来签证。真正卡住进度的，往往是省份签发的 PAL/TAL 名额，以及材料是否能解释清楚学习目的。",
      "第一，确认学校是否仍有可发放的省级证明；第二，资金证明要覆盖学费、生活费和来回路费，避免临时补件；第三，学习计划要和过往学历、工作经历对得上，而不是只堆形容词。",
      "如果您已经拿到录取但还没有 PAL，不要急着递交。窗口期每年都会变化，提前把材料骨架搭好，比抢一个尚未开放的通道更有效。",
    ],
  },
  {
    id: "seed-article-02",
    slug: "pgwp-eligible-programs",
    title: "PGWP 资格新规：哪些专业不再符合开放式工签？",
    excerpt: "IRCC 更新 PGWP 专业清单，部分商科与文科项目被剔除。先核对您的项目是否仍在列表内。",
    coverUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1400&q=80",
    tagIds: ["seed-tag-pgwp", "seed-tag-study"],
    status: "published",
    publishedAt: "2026-08-05T10:00:00.000Z",
    paragraphs: [
      "毕业工签不再是“读完任意项目就能拿”。专业是否在 IRCC 公布的清单里，会直接决定您毕业后能不能拿开放式工签。",
      "转专业、转学分、或者从学院转大学，都可能改变最终 CIP 代码。入学前就要把课程结构看清楚，而不是临毕业才发现对不上。",
      "如果您已经在读，先向学校要一份官方专业代码，再对照最新清单。对不上也不等于没有出路，但需要尽早规划其他工签路径。",
    ],
  },
  {
    id: "seed-article-03",
    slug: "spouse-open-work-permit-rules",
    title: "配偶开放工签门槛收紧：谁还能继续申请？",
    excerpt: "Spouse Open Work Permit 可申请人群收窄，留学生与一般工签持有人配偶受影响最大。",
    coverUrl: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1400&q=80",
    tagIds: ["seed-tag-work", "seed-tag-policy"],
    status: "published",
    publishedAt: "2026-07-28T10:00:00.000Z",
    paragraphs: [
      "配偶开放工签不再覆盖所有留学生和工签家庭。主申请人的项目类型、职位类别和剩余有效期，都会影响配偶能不能拿开放工签。",
      "硕士、博士和部分高需求职业的家庭，通常仍比本科或短课程更有空间。但“看起来像硕士”不够，课程长度和学校资质都要核验。",
      "如果配偶工签即将到期，不要等到最后两周。续签、换雇主工签，或调整主申请人身份，需要一起算时间表。",
    ],
  },
  {
    id: "seed-article-04",
    slug: "super-visa-insurance-income",
    title: "超级签证 2026：保险与收入要求实操指南",
    excerpt: "新版超级签证对担保人收入和医疗保险更细，文内附常见材料和避坑清单。",
    coverUrl: "https://images.unsplash.com/photo-1503614472-8c93d56cd240?auto=format&fit=crop&w=1400&q=80",
    tagIds: ["seed-tag-super"],
    status: "published",
    publishedAt: "2026-07-18T10:00:00.000Z",
    paragraphs: [
      "超级签证看两件事：子女在加拿大的收入够不够，以及父母是否买到符合要求的医疗保险。缺任何一块，都可能被退回或拒签。",
      "收入证明不要只交一页 Notice of Assessment。银行流水、雇主信、家庭人口计算都要能对上当年 LICO 标准。",
      "保险条款要写清覆盖急诊和住院，有效期从入境日起算。出发前临时改行程，记得核对保单生效日。",
    ],
  },
  {
    id: "seed-article-05",
    slug: "oinp-human-capital-priorities",
    title: "OINP 人力资本优先：你有资格入池吗？",
    excerpt: "安省省提名近期轮次更看重语言、工作和职业匹配。入池前先做一轮条件核对。",
    coverUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=80",
    tagIds: ["seed-tag-oinp", "seed-tag-policy"],
    status: "published",
    publishedAt: "2026-07-08T10:00:00.000Z",
    paragraphs: [
      "OINP 不是把 Express Entry 分数做高就一定获邀。职业是否在当轮邀请范围、是否有安省工作或留学经历，经常比总分更关键。",
      "语言成绩过期、工作职责写得太虚、NOC 选错，都是常见卡点。入池前把这三项核对清楚，比反复刷分更省时间。",
      "如果您人在安省且已有雇主，也可以同时评估雇主担保通道，不必把所有希望押在一轮邀请上。",
    ],
  },
  {
    id: "seed-article-06",
    slug: "inside-canada-study-permit-extension",
    title: "境内学签续签：最容易被忽略的时间节点",
    excerpt: "课还没上完、学签先到期，是境内学生最常见的身份空窗。续签要按学校日历倒推。",
    coverUrl: "https://images.unsplash.com/photo-1519832979-6fa011b87667?auto=format&fit=crop&w=1400&q=80",
    tagIds: ["seed-tag-study"],
    status: "published",
    publishedAt: "2026-06-26T10:00:00.000Z",
    paragraphs: [
      "学签到期日不等于学期结束日。很多同学在春季学期还没出分，身份已经只剩几周，这时才开始准备资金和在读证明，往往来不及。",
      "建议在到期前 3 个月启动：在读信、学费收据、新学期注册、护照有效期，四样一起收齐。",
      "如果已经 implied status，出行、换工作、给配偶办手续都可能受影响。先把主申请人身份续上，再处理家庭成员。",
    ],
  },
  {
    id: "seed-article-07",
    slug: "lmia-vs-lmia-exempt",
    title: "LMIA 和豁免工签怎么选？雇主和申请人各自要准备什么",
    excerpt: "不是所有工作都需要 LMIA。先分清通道，再决定招聘广告、工资和解说信怎么写。",
    coverUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=80",
    tagIds: ["seed-tag-work"],
    status: "published",
    publishedAt: "2026-06-14T10:00:00.000Z",
    paragraphs: [
      "LMIA 解决的是“这个岗位为什么招不到加拿大人”。豁免通道则依赖国际协议、公司内部调动或特定政策，材料逻辑完全不同。",
      "雇主最怕的是广告时长不够、工资低于中位数、职位描述和 NOC 对不上。申请人最怕的是简历经历无法支撑这个职位。",
      "选错通道会浪费整轮招聘周期。第一次沟通就把公司结构、职位和申请人身份放在一张表上，能少走很多回头路。",
    ],
  },
  {
    id: "seed-article-08",
    slug: "express-entry-crs-what-changed",
    title: "Express Entry 分数在涨什么：语言、职业和省提名各自占多少",
    excerpt: "CRS 看起来像总分游戏，真正拉开差距的是语言、加拿大经验和省提名。",
    coverUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1400&q=80",
    tagIds: ["seed-tag-policy", "seed-tag-oinp"],
    status: "published",
    publishedAt: "2026-06-02T10:00:00.000Z",
    paragraphs: [
      "很多人把时间花在堆工作年限，却忽略语言成绩差一分就掉一档。对多数申请人来说，CLB 再升一级，比多一年海外经验更划算。",
      "加拿大境内经验和学历加分是实打实的。已经在读或在工作的人，不要为了“再观望一轮”错过可提交的材料窗口。",
      "省提名仍是分数跃升最明显的路径，但前提是职业和居住意向说得通。没有匹配度的话，硬申只会耗掉时间和申请费。",
    ],
  },
  {
    id: "seed-article-09",
    slug: "pal-tal-application-window",
    title: "PAL / TAL 怎么卡进度：没有省级证明，录取通知书还不够",
    excerpt: "省级证明名额有限。拿到 offer 之后，真正的排队往往才开始。",
    coverUrl: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1400&q=80",
    tagIds: ["seed-tag-study", "seed-tag-policy"],
    status: "published",
    publishedAt: "2026-05-21T10:00:00.000Z",
    paragraphs: [
      "学校发录取，不等于省份会给你 PAL。各校分配到的名额不同，热门项目可能在开学前几个月就发完。",
      "材料上最常见的问题是：学费押金没交、护照姓名和录取不一致、以及把 PAL 和学签材料混成一包一次性乱交。",
      "建议把时间轴分成三段：拿录取、拿省级证明、再递学签。每一段的材料清单分开准备，减少被退回的机会。",
    ],
  },
  {
    id: "seed-article-10",
    slug: "restoration-of-status-checklist",
    title: "身份过期之后还能补救吗？Restoration 适用和不适用的情况",
    excerpt: "逾期不是自动出境，但也不是再交一份表格就结束。90 天窗口和解释信同样重要。",
    coverUrl: null,
    tagIds: ["seed-tag-policy"],
    status: "published",
    publishedAt: "2026-05-09T10:00:00.000Z",
    paragraphs: [
      "访客、学生、工人身份过期后，通常有 90 天可以申请恢复身份。超时再拖，选择会迅速变少。",
      "恢复身份要解释清楚为什么过期、现在为什么仍符合该类身份，以及之后如何避免再次空窗。只说“我忘了”通常不够。",
      "如果已经离境或收到更严重的执法文件，restoration 可能不是正确工具。这类情况需要单独评估，不要套用普通续签模板。",
    ],
  },
  {
    id: "seed-article-11",
    slug: "bc-pnp-tech-and-healthcare",
    title: "BC PNP 近期邀请：技术和医疗类申请人还要补什么材料",
    excerpt: "BC 省提名对工资、职位真实性和居住安排查得更细。邀请到了也不等于稳过。",
    coverUrl: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1400&q=80",
    tagIds: ["seed-tag-oinp", "seed-tag-work"],
    status: "published",
    publishedAt: "2026-04-27T10:00:00.000Z",
    paragraphs: [
      "BC PNP 邀请后，审核重点往往转向这份工作是否真实、工资是否达标、以及申请人是否真的会留在 BC。",
      "雇主信、组织架构、汇报对象、办公地点，最好能互相印证。远程工作尤其需要说清为什么岗位必须在省内。",
      "医疗和技术岗位材料看起来“专业”，但如果职责描述像从招聘网站复制，反而容易被追问。用日常工作内容改写一遍更稳。",
    ],
  },
  {
    id: "seed-article-12",
    slug: "visitor-record-vs-new-visa",
    title: "Visitor Record 和签证贴纸不是一回事：到期前该延哪一个",
    excerpt: "很多人把入境签证和境内身份混在一起。一个过期不等于另一个也失效，但出行会受影响。",
    coverUrl: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1400&q=80",
    tagIds: ["seed-tag-policy", "seed-tag-super"],
    status: "published",
    publishedAt: "2026-04-15T10:00:00.000Z",
    paragraphs: [
      "Visitor visa 是入境许可，visitor record 才是您在境内可以合法停留到哪一天。两者日期经常不一样。",
      "如果只是人在加拿大、暂时不出境，通常优先延长境内身份。如果近期要回国再进来，才需要同时看签证贴纸是否还有效。",
      "父母探亲、超级签证持有人尤其容易搞混。出行前把护照印章、签证页和 IRCC 信放在一起看，比只看手机日历安全。",
    ],
  },
  {
    id: "seed-article-13",
    slug: "study-to-work-pgwp-timing",
    title: "毕业后多久必须申 PGWP？成绩单、全职工作和旅行怎么排",
    excerpt: "毕业工签有严格时限。先等最终成绩再走，还是先递后补，取决于学校出分节奏。",
    coverUrl: null,
    tagIds: ["seed-tag-pgwp", "seed-tag-work"],
    status: "published",
    publishedAt: "2026-04-03T10:00:00.000Z",
    paragraphs: [
      "毕业工签通常要在官方毕业证明出具后的限定时间内提交。等 diploma 寄到手里再办，经常已经偏晚。",
      "学校能先出 completion letter 的话，就用这封信启动申请。护照有效期、照片、成绩单和学签记录一并准备。",
      "毕业后立刻回国探亲可以，但要算清身份空窗和申请递交地点。边旅行边拖材料，是最常见的失误。",
    ],
  },
  {
    id: "seed-article-14",
    slug: "refusal-letter-how-to-read",
    title: "拒签信怎么读：先分清是材料不足、目的不明，还是身份历史问题",
    excerpt: "同一句“我不信你会回国”，背后可能是资金、行程或过往记录。下一步完全不同。",
    coverUrl: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=1400&q=80",
    tagIds: ["seed-tag-policy", "seed-tag-study"],
    status: "published",
    publishedAt: "2026-03-22T10:00:00.000Z",
    paragraphs: [
      "拒签信里的模板句，不等于可以忽略。签证官勾选的理由，决定您该补材料、重写解释，还是根本不该原方案再递。",
      "资金不足、学习目的不清、旅行历史薄弱，这三类最常见。把 GCMS 或拒签条款逐条对照，比马上再交一版更重要。",
      "短时间内原封不动再递，通过率通常不会变好。先改证据结构，再决定是否换学校、换行程或换申请类别。",
    ],
  },
  {
    id: "seed-article-15",
    slug: "draft-employer-document-list",
    title: "雇主担保材料清单（草稿）",
    excerpt: "这篇还在整理，先不当作正式政策解读发布。",
    coverUrl: null,
    tagIds: ["seed-tag-work"],
    status: "draft",
    publishedAt: null,
    paragraphs: [
      "这是一篇草稿，用来在后台列表里查看草稿状态长什么样。",
      "正式发布前还需要补上工资中位数、广告要求和职位描述示例。",
    ],
  },
  {
    id: "seed-article-16",
    slug: "draft-family-sponsorship-notes",
    title: "团聚移民面谈笔记（草稿）",
    excerpt: "内部整理中，尚未对公众开放。",
    coverUrl: null,
    tagIds: ["seed-tag-policy"],
    status: "draft",
    publishedAt: null,
    paragraphs: [
      "草稿仅用于后台预览多种文章同时存在时的列表密度。",
    ],
  },
];

function toDoc(paragraphs: string[]): TiptapJSON {
  return {
    type: "doc",
    content: paragraphs.map((text) => ({
      type: "paragraph",
      content: [{ type: "text", text }],
    })),
  };
}

async function main() {
  const db = getDb();
  const tagIds = SEED_TAGS.map((tag) => tag.id);
  const articleIds = SEED_ARTICLES.map((article) => article.id);
  const now = new Date();

  await db.delete(articleTags).where(inArray(articleTags.articleId, articleIds));
  await db.delete(articles).where(inArray(articles.id, articleIds));
  await db.delete(tags).where(inArray(tags.id, tagIds));

  await db.insert(tags).values(SEED_TAGS.map((tag) => ({ ...tag, createdAt: now })));
  await db.insert(articles).values(
    SEED_ARTICLES.map((article) => ({
      id: article.id,
      slug: article.slug,
      title: article.title,
      excerpt: article.excerpt,
      coverPublicId: null,
      coverUrl: article.coverUrl,
      body: toDoc(article.paragraphs),
      status: article.status,
      publishedAt: article.publishedAt ? new Date(article.publishedAt) : null,
      createdAt: now,
      updatedAt: now,
    })),
  );
  await db.insert(articleTags).values(
    SEED_ARTICLES.flatMap((article) =>
      article.tagIds.map((tagId) => ({ articleId: article.id, tagId })),
    ),
  );

  const published = SEED_ARTICLES.filter((article) => article.status === "published").length;
  const drafts = SEED_ARTICLES.length - published;
  console.log(`Seeded ${SEED_TAGS.length} tags, ${published} published articles, ${drafts} drafts.`);
}

await main();
