# LLM OCR Comparator

A modern web application that leverages Large Language Models to perform Optical Character Recognition (OCR) on documents and images while preserving LaTeX formatting and outputting clean markdown.

## ✨ Features

- **📄 Document Upload & Conversion** - Upload PDF or image files and convert them to base64 format for LLM processing
- **🤖 LLM Provider Selection** - Choose from multiple OCR models powered by OpenRouter.ai
- **🔤 Smart OCR Processing** - Send documents to selected LLM OCR models with optimized prompts that maintain LaTeX formatting
- **📝 Markdown Formatting** - Intelligently format OCR results into markdown while preserving mathematical expressions and LaTeX formulas
- **👀 Live Preview** - Split-screen interface showing the original document and OCR result side-by-side for easy comparison
- **⬇️ Download Results** - Export the formatted markdown result as a `.md` file

## 🚀 Tech Stack

- **Frontend Framework** - [Next.js 15](https://nextjs.org/) with React 19
- **Language** - TypeScript
- **Styling** - [Tailwind CSS](https://tailwindcss.com/) with custom animations
- **UI Components** - [Radix UI](https://www.radix-ui.com/) primitives
- **Form Handling** - [React Hook Form](https://react-hook-form.com/) with Zod validation
- **Math Rendering** - [KaTeX](https://katex.org/) for LaTeX support
- **Markdown** - [React Markdown](https://github.com/remarkjs/react-markdown) with remark-math and rehype-katex
- **AI Integration** - [Google Genkit](https://genkit.ai/) for LLM orchestration
- **Charts** - [Recharts](https://recharts.org/) for data visualization

## 📋 Prerequisites

- Node.js 18+ (20+ recommended)
- npm, yarn, pnpm, or bun package manager

## 🛠️ Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd llm-ocr-comparison
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
# Edit .env.local with your configuration
```

## 🏃 Development

Start the development server:
```bash
npm run dev
```

The application will be available at [http://localhost:9002](http://localhost:9002)

Other useful commands:
```bash
# Type checking
npm run typecheck

# Linting
npm run lint

# Build for production
npm run build

# Start production server
npm start

# Genkit AI development
npm run genkit:dev
npm run genkit:watch
```

## 🐳 Docker Deployment

### Build Docker Image

```bash
docker build -t llm-ocr-comparison .
```

### Run Locally with Docker

```bash
docker compose up
```

The application will be available at [http://localhost:3000](http://localhost:3000)

### Deploy to EasyPanel

1. Push your repository to GitHub/GitLab
2. In EasyPanel dashboard:
   - Create a new service
   - Select "Docker" as the deployment type
   - Point to your repository
   - Configure environment variables as needed
   - Set the internal port to `3000`
   - Deploy

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Home page
│   └── actions/
│       └── ocr-actions.ts    # Server actions for OCR processing
├── components/
│   ├── DocumentPreview.tsx   # Document preview component
│   ├── ModelSelector.tsx     # LLM model selection
│   ├── OCRWorkspace.tsx      # Main workspace component
│   └── ui/                   # Radix UI component library
├── hooks/
│   ├── use-mobile.tsx        # Mobile detection hook
│   └── use-toast.ts          # Toast notifications hook
└── lib/
    ├── placeholder-images.ts # Image utility functions
    ├── utils.ts              # General utilities
    └── placeholder-images.json # Sample images
```

## 🔧 Environment Variables

Create a `.env.local` file with the following variables:

```env
# OpenRouter API Configuration
NEXT_PUBLIC_OPENROUTER_API_KEY=your_api_key_here

# Google Genkit Configuration (if using Google AI)
GOOGLE_GENAI_API_KEY=your_api_key_here

# Application Configuration
NODE_ENV=development
NEXT_PUBLIC_API_URL=http://localhost:9002
```

## 🎨 Design System

- **Primary Color** - White (#FFFFFF) for a clean, modern aesthetic
- **Accent Color** - Orange (#FF5B00) for interactive elements and CTAs
- **Typography** - Inter (UI), Source Code Pro (code)
- **Layout** - Minimalist split-screen design for document/result comparison

## 📦 Building for Production

```bash
npm run build
npm start
```

The application is optimized with:
- Next.js automatic static optimization
- Image optimization and remote pattern handling
- CSS minification with PostCSS
- TypeScript strict type checking

## 🐛 Troubleshooting

**Build Errors:**
```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

**Port Already in Use (Dev):**
- Development runs on port 9002
- Production runs on port 3000

**Docker Issues:**
```bash
# Rebuild the image without cache
docker build --no-cache -t llm-ocr-comparison .
```

## 📝 Notes

- LaTeX formulas are preserved through the OCR process using optimized prompts
- The split-screen layout provides real-time comparison between source and result
- Results can be exported as markdown files for further processing
- The application supports multiple document formats and sizes

## 📄 License

All rights reserved. This project is proprietary.

## 🤝 Support

For issues and questions, please open an issue in the repository.
