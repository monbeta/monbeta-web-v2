import { getCloudinarySignature } from "@/lib/cloudinary";

export async function uploadToCloudinary(file: File): Promise<{ publicId: string; url: string }> {
  const sig = await getCloudinarySignature();
  const form = new FormData();
  form.append("file", file);
  form.append("api_key", sig.apiKey);
  form.append("timestamp", String(sig.timestamp));
  form.append("signature", sig.signature);
  form.append("folder", sig.folder);
  const response = await fetch(`https://api.cloudinary.com/v1_1/${sig.cloudName}/image/upload`, {
    method: "POST",
    body: form,
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || "图片上传失败");
  }
  const json = (await response.json()) as { public_id: string; secure_url: string };
  return { publicId: json.public_id, url: json.secure_url };
}
