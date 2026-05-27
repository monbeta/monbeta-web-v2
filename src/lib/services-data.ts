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
      { code: "CS04", name: "大学 / 学院申请咨询", en: "College / University Admission" },
    ],
  },
  {
    id: "tr",
    title: "临时居民签证",
    subtitle: "Temporary Resident",
    items: [
      { code: "TR01", name: "访问签证", en: "Visitor Visa", desc: "境外申请加拿大签证。" },
      { code: "TR01", name: "超级签证", en: "Super Visa" },
      { code: "TR02", name: "境内续小签", en: "TRV inside Canada" },
      { code: "TR02", name: "访问者身份延期 / 恢复", en: "Visitor Record / Restore" },
      { code: "TR03", name: "电子旅行授权 eTA", en: "eTA" },
      { code: "TR04", name: "ARC / 临时居民许可", en: "ARC / TRP", desc: "因 Removal Order 后回加 / 加境内特殊事由。" },
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
    ],
  },
  {
    id: "pr",
    title: "永久居民与身份",
    subtitle: "Permanent Residency",
    items: [
      { code: "PR01", name: "枫叶卡更新 / 旅行证件", en: "PR Card Renewal / PRTD" },
      { code: "PR02", name: "经济类移民评估与申请", en: "Economic Immigration" },
      { code: "PR03", name: "家庭团聚类申请", en: "Family Sponsorship" },
    ],
  },
];

/** Programs we deliberately do NOT take, with reasons. */
export const AVOIDED_PROGRAMS = [
  {
    title: "Saskatchewan / Quebec 项目",
    reason: "省级法规与本顾问执业范围不匹配；不接案以免影响您的时间与成功率。",
  },
  {
    title: "美国签证 / 移民",
    reason: "本顾问仅持有加拿大执照 (RCIC-IRB)，美国事务由美国持牌律师处理更稳妥。",
  },
  {
    title: "成功率明显偏低的小众项目",
    reason: "若评估认为风险高于收益，会直接告知并不接案，绝不为收费而递交。",
  },
  {
    title: "代填表 / 仅审材料",
    reason: "咨询阶段不提供代填表服务；正式委托后通过完整服务流程交付。",
  },
];
