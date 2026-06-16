export type ServiceCategory = {
  id: string;
  title: string;
  subtitle: string;
  items: { code: string; name: string; en: string; desc?: string }[];
};

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: "consult",
    title: "咨询服务",
    subtitle: "Consultation",
    items: [
      { code: "CS01", name: "付费咨询 · 常规", en: "Consultation - Regular", desc: "持牌移民顾问 3 个工作日内提供。移民规划 / PFL 回复 / 拒签后补救。" },
      { code: "CS02", name: "付费咨询 · 紧急", en: "Consultation - Emergency", desc: "持牌移民顾问 24 小时内响应。" },
      { code: "CS03", name: "移民申请检查", en: "Review Immigration Application" },
      { code: "CS04", name: "中小学申请咨询", en: "Primary & Secondary Admission" },
      { code: "CS05", name: "大学 / 学院申请咨询", en: "College / University Admission" },
    ],
  },
  {
    id: "tr",
    title: "临时居民签证",
    subtitle: "Temporary Resident",
    items: [
      { code: "TR01", name: "访问签证 / 超级签证", en: "Visitor Visa / Super Visa", desc: "加拿大境外申请访问签证或超级签证。" },
      { code: "TR02", name: "境内续小签 / 访问者身份延期与恢复", en: "TRV inside Canada / Visitor Record / Restore", desc: "学签或工签持有人境内续小签；访问者身份延期或恢复。" },
      { code: "TR03", name: "电子旅行授权 eTA", en: "eTA" },
      { code: "TR04", name: "ARC / 临时居民许可", en: "ARC / TRP", desc: "因 Removal Order 后回加授权；加境内特殊事由临时居民许可。" },
    ],
  },
  {
    id: "sp",
    title: "学习许可",
    subtitle: "Study Permit",
    items: [
      { code: "SP01", name: "境外学签", en: "Study Permit from outside Canada" },
      { code: "SP02", name: "境内学签 (工转学 / 旅转学)", en: "Study Permit from inside Canada" },
      { code: "SP03", name: "续学签 / 恢复学生身份", en: "Renewal / Restore" },
      { code: "SP04", name: "留学期间特殊情况处理", en: "Special Cases", desc: "学签条件变更 / 移民证件修正与补发。" },
    ],
  },
  {
    id: "wp",
    title: "工作许可",
    subtitle: "Work Permit",
    items: [
      { code: "WP01", name: "毕业工签 / 续签", en: "PGWP / Renewal" },
      { code: "WP02", name: "配偶开放工签", en: "Spouse Open Work Permit" },
      { code: "WP03", name: "打工度假工签", en: "Working Holiday Work Permit" },
      { code: "WP04", name: "青年专业人士工签", en: "Young Professional Work Permit" },
      { code: "WP05", name: "桥梁开放式工签", en: "Bridging Open Work Permit" },
      { code: "WP06", name: "恢复工人身份", en: "Restore your status as a Worker" },
      { code: "WP07", name: "封闭式工签", en: "Closed Work Permit" },
      { code: "WP08", name: "跨国企业内调工签", en: "ICT Intra-Company Transfer Work Permit" },
      { code: "WP09", name: "国际自由贸易协定工签", en: "Work Permit based on International Free Trade Agreements" },
    ],
  },
  {
    id: "pr",
    title: "永久居民",
    subtitle: "Permanent Residency",
    items: [
      { code: "PR01", name: "联邦快速通道", en: "Express Entry", desc: "加拿大经验类 (CEC) / 联邦技术移民 (FSW) / 省提名衔接联邦 PR。" },
      { code: "PR02", name: "省提名（魁北克省除外）", en: "Provincial Nominee Program (except Quebec)", desc: "含 EE 衔接省提名与纸质省提名 (base / non-EE)。" },
      { code: "PR03", name: "家庭团聚类申请", en: "Family Sponsorship", desc: "夫妻、伴侣、子女、父母、祖父母团聚；含孤独加拿大人计划担保亲属。" },
      { code: "PR04", name: "其他联邦移民项目", en: "Other Federal Immigration Programs", desc: "联邦自雇、投资移民、护理类移民等。" },
      { code: "PR05", name: "人道主义与同情类", en: "Humanitarian and Compassionate", desc: "含香港居民永居途径 (HK Pathway Stream A & B)、孤独父母祖父母等。" },
      { code: "PR06", name: "难民", en: "Refugee" },
    ],
  },
  {
    id: "other",
    title: "其他服务",
    subtitle: "Other Services",
    items: [
      { code: "CC01", name: "入籍", en: "Canadian Citizenship" },
      { code: "CC02", name: "公民纸申请", en: "Citizenship Certificate (Proof of Citizenship)", desc: "初次申请或补办公民身份证明。" },
      { code: "OIS01", name: "枫叶卡更新 / 永久居民旅行证", en: "PR Card Renewal / PRTD" },
      { code: "OIS02", name: "拒签上诉", en: "Appeal to Immigration and Refugee Board of Canada" },
      { code: "OIS03", name: "无犯罪记录恢复", en: "Rehabilitation / Pardon" },
      { code: "OIS04", name: "劳工市场影响评估", en: "Labour Market Impact Assessment (LMIA)" },
    ],
  },
];

/** Programs we deliberately do NOT take, with reasons. */
export const AVOIDED_PROGRAMS = [
  {
    title: "工作交易 / 买卖就业",
    reason: "任何形式的购买 LMIA、买工作 offer、虚假雇佣关系，我们一律不碰 —— 既违反 IRCC 规定，也会让申请人面临欺诈调查与永久拒签风险。",
  },
  {
    title: "假结婚 / 婚姻造假",
    reason: "不真实的婚姻关系是 IRPA 第 40 条下的严重虚假陈述。一旦被识别，申请人将被禁入加拿大五年并留下记录，我们绝不参与。",
  },
  {
    title: "评估后风险过高的项目",
    reason: "若专业评估后认为成功率明显低于风险代价，我们会直接告知并保留 / 拒接，绝不为了收费而递交。",
  },
];
