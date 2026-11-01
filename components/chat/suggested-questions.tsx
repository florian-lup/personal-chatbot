import {
  Briefcase,
  Code2,
  FolderGit2,
  Shirt,
  User,
  Workflow,
} from 'lucide-react';
import { memo } from 'react';

import { Badge } from '../ui/badge';
import { Card } from '../ui/card';

const suggestedQuestions = [
  {
    question: 'What have you built outside of work?',
    category: 'Projects',
    icon: FolderGit2,
  },
  {
    question: "What's your work experience?",
    category: 'Experience',
    icon: Briefcase,
  },
  {
    question: 'How have you improved a process at work?',
    category: 'Process',
    icon: Workflow,
  },
  {
    question: 'What are your strongest skills?',
    category: 'Skills',
    icon: Code2,
  },
  {
    question: 'Can you tell me more about yourself?',
    category: 'About me',
    icon: User,
  },
  {
    question: 'Show me some of your outfits',
    category: 'Style',
    icon: Shirt,
  },
];

interface SuggestedQuestionsProps {
  onPromptClick: (prompt: string) => void;
}

const SuggestedQuestionsComponent = ({
  onPromptClick,
}: SuggestedQuestionsProps) => {
  return (
    <div className="grid w-full grid-cols-1 gap-3 md:grid-cols-2">
      {suggestedQuestions.map((item, index) => {
        const Icon = item.icon;
        return (
          <Card
            key={index}
            className={`hover:bg-accent/50 border-border/50 bg-card/50 animate-slide-up cursor-pointer p-4`}
            onClick={() => {
              onPromptClick(item.question);
            }}
          >
            <div className="flex flex-col gap-2">
              <Badge
                variant="secondary"
                className="flex w-fit items-center gap-1"
              >
                <Icon className="h-3 w-3" />
                {item.category}
              </Badge>
              <p className="text-foreground text-sm">{item.question}</p>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export const SuggestedQuestions = memo(SuggestedQuestionsComponent);
