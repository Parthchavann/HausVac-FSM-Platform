import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();
  const groqApiKey = process.env.GROQ_API_KEY;

  if (!groqApiKey) {
    return NextResponse.json({ error: "No Groq API key." }, { status: 500 });
  }

  const model = "llama3-8b-8192"; // or "llama3-70b-8192" for bigger model
  const apiUrl = "https://api.groq.com/openai/v1/chat/completions";

  const body = {
    model,
    messages: [
      { role: "system", content: "You are an expert service quote generator for HausVac." },
      { role: "user", content: prompt }
    ],
    max_tokens: 1024,
    temperature: 0.3
  };

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${groqApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    if (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) {
      return NextResponse.json({ quote: data.choices[0].message.content });
    } else {
      return NextResponse.json({ error: "No valid quote.", detail: data }, { status: 500 });
    }
  } catch (err) {
    return NextResponse.json({ error: "Error reaching Groq API.", detail: String(err) }, { status: 500 });
  }
}
