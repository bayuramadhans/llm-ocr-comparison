# **App Name**: LLM OCR Comparator

## Core Features:

- Document Upload & Conversion: Convert PDF/image files to base64 format for LLM processing.
- LLM Provider Selection: Allow users to select OCR models from openrouter.ai.
- LLM OCR Processing: Send base64 encoded data to the selected LLM OCR model via openrouter.ai with a prompt designed to maintain LaTeX formatting.
- Markdown Formatting Tool: Tool to format the OCR result from LLM into markdown and attempt to retain original LaTeX formulas, using LLM reasoning to decide when/if to incorporate markdown conventions.
- Result Preview: Display the markdown-formatted OCR result in a preview panel alongside the uploaded document/image.
- Download Results: Enable downloading the formatted markdown result as a .md file.

## Style Guidelines:

- Primary color: White for a clean and modern look. Use Tailwind CSS white shades.
- Background color: White to ensure maximum readability of both the source document and the OCR results. Use Tailwind CSS white shades.
- Accent color: Orange (#FF5B00) for interactive elements and call-to-action buttons, providing a clear visual distinction. Use Tailwind CSS orange shades.
- Utilize 'Inter' through Tailwind's typography plugin, ensuring a modern, objective, neutral look suitable for precise information display.
- Apply 'Source Code Pro' using Tailwind's custom font configuration for LaTeX and markdown snippets, ensuring clear distinction between code and prose.
- Use minimalist, clear icons from a library like FontAwesome, styled with Tailwind CSS for consistency and responsiveness.
- Employ a split-screen layout with the original document/image on one side and the OCR result on the other for easy comparison, leveraging Tailwind's grid or flexbox utilities.
- Use subtle animations, like smooth transitions powered by Tailwind CSS transitions, to provide feedback during document loading and OCR processing.