
'use server';

export type OCRResult = {
  success: boolean;
  content?: string;
  error?: string;
};

export async function processOCR(base64Image: string, model: string, apiKey: string): Promise<OCRResult> {
  if (!apiKey) {
    return { success: false, error: 'OpenRouter API Key is required' };
  }

  try {
    const promptMessage = `
        You are a precise document scanner. Transcribe the following image content into Markdown.

        RULES:
        1. KEEP SENTENCES: Transcribe text exactly as it appears.
        2. MATH & LATEX: You MUST output mathematical formulas using LaTeX.
          - Inline math: $x^2$
          - Block math: $$ \\frac{a}{b} $$
        3. IMAGES: If there are diagrams/plots, add a description: *[Image: detailed description of the diagram]*
        4. STRUCTURE: Use #, ## for headers mirroring the document.
        5. TABLES: Convert tables to markdown table format.
        6. LISTS: Preserve bullet points and numbered lists.
        7. Do NOT include any intro/outro text like. Output ONLY the markdown.
        8. Do Not Skip / Remove The Part of Content. Transcribe All of Content of the document
    `

    const payloadData = JSON.stringify({
      model: model,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: promptMessage
            },
            {
              type: 'image_url',
              image_url: {
                url: base64Image,
              }
            }
          ]
        }
      ],
    })


    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': 'https://localhost:3000', // Required by OpenRouter
        'X-Title': 'LLM OCR Comparator',
        'Content-Type': 'application/json',
      },
      body: payloadData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData?.error?.message || 'OpenRouter API request failed');
    }

    const data = await response.json();
    const rawContent = data.choices[0]?.message?.content || '';

    const cleanedContent = rawContent.replaceAll('```markdown', '').replaceAll('```')

    return {
      success: true,
      content: cleanedContent,
    };
  } catch (err: any) {
    console.error('OCR Processing Error:', err);
    return {
      success: false,
      error: err.message || 'An unexpected error occurred during OCR processing',
    };
  }
}
