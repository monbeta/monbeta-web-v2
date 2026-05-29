export type ChatMessage = {
  from: "client" | "advisor";
  text?: string;
  image?: string;
  time?: string;
};

export type CaseStudy = {
  slug: string;
  category: string;       // e.g. "学签转工签 · SP02"
  title: string;          // headline
  excerpt: string;        // short card summary
  cover: string;          // emoji or image url placeholder
  outcome: string;        // pill on the card, e.g. "PGWP 获批 · 21 天"
  origin: string;         // e.g. "中国 上海"
  timeline: string;       // e.g. "2024.03 – 2024.06"
  body: string[];         // paragraphs for the detail page
  chats: ChatMessage[];   // chat screenshots / transcript
};

// Placeholder content — replace text & images with your real cases.
export const CASES: CaseStudy[] = [
  {
    slug: "from-rejection-to-pgwp",
    category: "毕业工签 · PGWP",
    title: "被拒签后 21 天内重新申请并获批 PGWP",
    excerpt:
      "客户首次自办 PGWP 因学习时长计算错误被拒，距毕业 90 天窗口仅剩 3 周。我们重新梳理出勤、补交说明信，21 天内重新递交并获批。",
    cover: "🍁",
    outcome: "PGWP 获批 · 21 天",
    origin: "中国 上海 → 温哥华",
    timeline: "2024.03 – 2024.06",
    body: [
      "（占位文字）客户 W 同学 2024 年 2 月毕业，自行递交 PGWP，3 月底收到拒信，理由为学习时长不足。距首次毕业 90 天的递交窗口仅剩 21 天。",
      "（占位文字）我们重新核对了其 transcript、入学记录、签证有效期与远程学习占比，确认其实际符合 PGWP 政策。补交了一封结构化的 explanation letter，附上学校开具的出勤证明与课程性质说明。",
      "（占位文字）4 月中旬重新递交，5 月获批 3 年 open work permit。客户已于 2024 年 7 月入职温哥华本地科技公司，正在准备 EE CEC 通道。",
    ],
    chats: [
      { from: "client",  text: "Becky 老师，我刚收到拒信，下周二就是 90 天的最后一天，怎么办……", time: "3月29日 22:14" },
      { from: "advisor", text: "先别慌。把拒信和你毕业证、transcript、所有 study permit 复印件拍清楚发我，我今晚先看，明早给你方案。", time: "3月29日 22:16" },
      { from: "client",  image: "（占位 · 拒信截图）", time: "3月29日 22:21" },
      { from: "advisor", text: "看到了。officer 算的远程学习占比有误，我们可以补一封 explanation letter + 学校出勤证明重新递。来得及。", time: "3月30日 09:02" },
      { from: "client",  text: "太感谢了！需要我做什么？", time: "3月30日 09:04" },
      { from: "advisor", text: "今天先去学校 registrar 申请一份盖章的 attendance verification,模板我等下发你。", time: "3月30日 09:05" },
    ],
  },
  {
    slug: "spouse-open-work-permit",
    category: "配偶开放工签 · WP02",
    title: "配偶 SOWP 政策收紧后的合规方案",
    excerpt:
      "2024 年 SOWP 政策调整后,客户 Master 在读、配偶在境外。我们重新规划材料口径,3 个月内完成境外申请并双双登陆。",
    cover: "💍",
    outcome: "SOWP 获批 · 双登陆",
    origin: "中国 北京 → 多伦多",
    timeline: "2024.05 – 2024.08",
    body: [
      "（占位文字）2024 年 3 月 IRCC 收紧配偶开放工签申请条件,客户 L 先生在多大读 master,妻子原本准备申请 SOWP。",
      "（占位文字）我们重新审视专业是否落在合资格 program list 内,确认后帮助配偶在境外完成签证 + SOWP 同步申请,并准备了真实婚姻关系证据包。",
      "（占位文字）3 个月内全部获批,配偶顺利登陆并入职本地工作。",
    ],
    chats: [
      { from: "client",  text: "看到新政策吓死了,我老婆的 SOWP 还能办吗?", time: "5月12日 10:30" },
      { from: "advisor", text: "你专业是 CIP 11 下的 CS,在合资格列表里。可以办,但口径要重新做。我们今晚 zoom 半小时,我把材料清单给你。", time: "5月12日 10:33" },
      { from: "client",  image: "（占位 · 录取信截图）", time: "5月12日 10:40" },
    ],
  },
  {
    slug: "trp-after-removal",
    category: "TRP · TR04",
    title: "被遣返 6 个月后,通过 TRP 合法返回完成学业",
    excerpt:
      "客户因身份过期被边境官员遣返。评估后采用 TRP 路径,详细论证返加必要性,4 个月获批,顺利继续 master 学业。",
    cover: "🛂",
    outcome: "TRP 获批 · 返加复学",
    origin: "中国 广州 → 蒙特利尔",
    timeline: "2023.11 – 2024.04",
    body: [
      "（占位文字）客户 Z 同学 2023 年 11 月因签证身份计算错误,在入境时被发 removal order 遣返。",
      "（占位文字）评估后我们采用 TRP 路径,详细论证其返加必要性 —— 学业已完成 80%、奖学金合同、学校支持信。",
      "（占位文字）2024 年 3 月获批 TRP,客户 4 月返加并按时完成毕业,目前已进入 PGWP 阶段。",
    ],
    chats: [
      { from: "client",  text: "Becky,我刚刚在 YVR 被遣返了……现在人在国内,我的 master 还有半年就读完了。", time: "11月8日 18:22" },
      { from: "advisor", text: "先确认你拿到的是 exclusion order 还是 deportation order。把所有边境给你的纸全部拍清楚。", time: "11月8日 18:25" },
      { from: "client",  image: "（占位 · 边境文件截图）", time: "11月8日 18:31" },
      { from: "advisor", text: "好,是 exclusion order,12 个月内需要 ARC,我们走 TRP+ARC 组合。这条路可以走。", time: "11月8日 18:40" },
    ],
  },
];
