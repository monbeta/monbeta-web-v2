import { z } from "zod";

export const BOOKING_FEES = [
  { len: 15, price: 99, tag: "快速答疑" },
  { len: 30, price: 179, tag: "最受欢迎", featured: true },
  { len: 45, price: 239, tag: "深度梳理" },
  { len: 60, price: 299, tag: "完整方案" },
] as const;

export const TIMEZONE_LABELS: Record<string, string> = {
  "America/Vancouver": "温哥华 PST/PDT",
  "America/Toronto": "多伦多 EST/EDT",
  "Asia/Shanghai": "中国 CST",
  "Asia/Hong_Kong": "香港 HKT",
};

export const bookingSchema = z.object({
  name: z.string().trim().min(1, "请填写姓名").max(80),
  email: z.string().trim().email("请输入有效邮箱").max(160),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  wechat: z.string().trim().max(80).optional().or(z.literal("")),
  topic: z.string().min(1, "请选择咨询主题"),
  length: z.number(),
  date: z.string().min(1, "请选择日期"),
  time: z.string().min(1, "请选择时间"),
  timezone: z.string().min(1),
  notes: z.string().max(1000).optional().or(z.literal("")),
});

export type BookingFormData = z.infer<typeof bookingSchema>;

export function getBookingPrice(length: number): number | undefined {
  return BOOKING_FEES.find((f) => f.len === length)?.price;
}
