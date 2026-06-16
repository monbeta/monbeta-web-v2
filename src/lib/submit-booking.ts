import { createServerFn } from "@tanstack/react-start";
import {
  bookingSchema,
  getBookingPrice,
  TIMEZONE_LABELS,
  type BookingFormData,
} from "@/lib/booking-schema";

function requireEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

function requireBrevoApiKey(): string {
  const apiKey = requireEnv("BREVO_API_KEY");
  if (apiKey.startsWith("xsmtpsib-")) {
    throw new Error(
      "BREVO_API_KEY is an SMTP key (xsmtpsib-). Create a REST API key (xkeysib-) in Brevo: Settings → SMTP & API → API Keys.",
    );
  }
  if (!apiKey.startsWith("xkeysib-")) {
    throw new Error(
      "BREVO_API_KEY must be a Brevo REST API key starting with xkeysib-.",
    );
  }
  return apiKey;
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function formatOptional(value: string | undefined): string {
  const trimmed = value?.trim();
  return trimmed ? trimmed : "—";
}

function buildEmailContent(data: BookingFormData) {
  const price = getBookingPrice(data.length);
  const timezoneLabel = TIMEZONE_LABELS[data.timezone] ?? data.timezone;
  const priceText = price != null ? `$${price} CAD` : "—";

  const rows: [string, string][] = [
    ["姓名", data.name],
    ["邮箱", data.email],
    ["电话", formatOptional(data.phone)],
    ["微信", formatOptional(data.wechat)],
    ["咨询主题", data.topic],
    ["咨询时长", `${data.length} 分钟`],
    ["咨询费用", priceText],
    ["期望日期", data.date],
    ["期望时间", data.time],
    ["时区", timezoneLabel],
    ["备注", formatOptional(data.notes)],
  ];

  const textBody = [
    "收到新的预约咨询请求：",
    "",
    ...rows.map(([label, value]) => `${label}：${value}`),
    "",
    "回复此邮件将直接联系客户。",
  ].join("\n");

  const htmlRows = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 12px;border:1px solid #e5e7eb;font-weight:600;white-space:nowrap;">${escapeHtml(label)}</td><td style="padding:8px 12px;border:1px solid #e5e7eb;">${escapeHtml(value)}</td></tr>`,
    )
    .join("");

  const htmlBody = `
    <p>收到新的预约咨询请求：</p>
    <table style="border-collapse:collapse;font-family:sans-serif;font-size:14px;max-width:600px;">
      <tbody>${htmlRows}</tbody>
    </table>
    <p style="color:#6b7280;font-size:13px;">回复此邮件将直接联系客户。</p>
  `.trim();

  const topicShort = data.topic.split("/")[0]?.trim() ?? data.topic;
  const subject = `[MonBeta 预约] ${data.name} - ${topicShort} / ${data.length}分钟`;

  return { subject, textBody, htmlBody };
}

export const submitBooking = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => bookingSchema.parse(data))
  .handler(async ({ data }) => {
    const apiKey = requireBrevoApiKey();
    const fromEmail = requireEnv("BOOKING_FROM_EMAIL");
    const fromName = requireEnv("BOOKING_FROM_NAME");
    const notifyEmail = requireEnv("BOOKING_NOTIFY_EMAIL");

    const { subject, textBody, htmlBody } = buildEmailContent(data);

    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify({
        sender: { name: fromName, email: fromEmail },
        to: [{ email: notifyEmail, name: fromName }],
        replyTo: { email: data.email, name: data.name },
        subject,
        textContent: textBody,
        htmlContent: htmlBody,
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error("Brevo API error:", response.status, errorBody);
      throw new Error("Failed to send booking notification email");
    }

    return { ok: true as const };
  });
