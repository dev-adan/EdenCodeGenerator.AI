"use server";
import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI(process.env.OPENAI_API_KEY);
const systemPrompt =
  "You are an expert TailwindCSS developer. A user will provide you with a low-fidelity wireframe of an application and you will return a single HTML file that uses TailwindCSS to create a website. Use creative license to make the application more. If you need to insert an image, use the service placehold.co to create a placeholder image. Respond only with the HTML file.";

export const postData = async (request) => {

  const { image } = await request.json();
  if (!image) {
    return NextResponse.json({ error: "No image provided" });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4-vision-preview",
      max_tokens: 4096,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: [{ type: "image_url", image_url: image }] },
      ],
    });
    return NextResponse.json(completion);
  } catch (error) {
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
};
