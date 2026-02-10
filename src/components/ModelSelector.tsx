
'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const MODELS = [
  { id: 'openai/gpt-4o', name: 'GPT-4o (OpenAI)' },
  { id: 'anthropic/claude-3.5-sonnet', name: 'Claude 3.5 Sonnet (Anthropic)' },
  { id: 'google/gemini-2.5-flash-lite', name: 'Gemini 2.5 Flash Lite (Google)' },
  { id: 'google/gemini-2.5-flash', name: 'Gemini 2.5 Flash (Google)'},
  { id: 'meta-llama/llama-3.2-11b-vision-instruct', name: 'Llama 3.2 11B Vision (Meta)' },
  { id: 'mistralai/pixtral-12b', name: 'Pixtral 12B (Mistral)' },
  { id: 'qwen/qwen2.5-vl-32b-instruct', name: 'Qwen 2.5 32B Instruct (Qwen)'}
];

interface ModelSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export function ModelSelector({ value, onChange }: ModelSelectorProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="model-select" className="text-sm font-medium text-muted-foreground">
        AI Model
      </Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id="model-select" className="w-full bg-white">
          <SelectValue placeholder="Select an OCR model" />
        </SelectTrigger>
        <SelectContent>
          {MODELS.map((model) => (
            <SelectItem key={model.id} value={model.id}>
              {model.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
