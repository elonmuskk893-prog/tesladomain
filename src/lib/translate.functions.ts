import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const schema = z.object({
  lang: z.string().min(2).max(40),
  texts: z.array(z.string()).min(1).max(120),
});

export const translateTexts = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => schema.parse(data))
  .handler(async ({ data }) => {
    const apiKey = process.env["LOVABLE_API_KEY"];
    if (!apiKey) return { translations: data.texts };

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content:
              "You are a website localization engine. Translate each string of the JSON array into the requested language. Keep emoji, numbers, currency symbols, brand names (Tesla, Model 3, Model Y, Cybertruck, Roadster) and formatting untouched. Do not add or remove array items. Reply with ONLY a JSON array of translated strings in the same order.",
          },
          {
            role: "user",
            content: `Target language: ${data.lang}\n\n${JSON.stringify(data.texts)}`,
          },
        ],
      }),
    });

    if (!res.ok) return { translations: data.texts };

    const json = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const raw = json.choices?.[0]?.message?.content ?? "";
    const match = raw.match(/\[[\s\S]*\]/);
    if (!match) return { translations: data.texts };

    try {
      const parsed = JSON.parse(match[0]);
      if (
        Array.isArray(parsed) &&
        parsed.length === data.texts.length &&
        parsed.every((t) => typeof t === "string")
      ) {
        return { translations: parsed as string[] };
      }
    } catch {
      // fall through
    }
    return { translations: data.texts };
  });
