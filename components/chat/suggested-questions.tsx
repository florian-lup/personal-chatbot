'use client';

import {
  Briefcase,
  Code2,
  FolderGit2,
  Shirt,
  TrendingUp,
  User,
} from 'lucide-react';
import { memo, useLayoutEffect, useRef, useState } from 'react';

import { Badge } from '../ui/badge';
import { Card } from '../ui/card';

const suggestedQuestions = [
    {
    question: 'Can you tell me more about yourself?',
    category: 'About me',
    icon: User,
  },
    {
    question: "What's your work experience?",
    category: 'Experience',
    icon: Briefcase,
  },
  {
    question: 'What have you built outside of work?',
    category: 'Extracurricular',
    icon: FolderGit2,
  },
  {
    question: 'How have you improved a process at work?',
    category: 'Impact',
    icon: TrendingUp,
  },
  {
    question: 'What are your strongest skills?',
    category: 'Skills',
    icon: Code2,
  },
  {
    question: 'Show me some of your outfits',
    category: 'Style',
    icon: Shirt,
  },
];

const VISIBLE_ON_MOBILE = 4;
const MOBILE_MEDIA = '(max-width: 767px)';
/** Gap is 12px; a little extra reveals the top of the next card. */
const NEXT_CARD_PEEK = 28;

interface SuggestedQuestionsProps {
  onPromptClick: (prompt: string) => void;
}

const SuggestedQuestionsComponent = ({
  onPromptClick,
}: SuggestedQuestionsProps) => {
  const listRef = useRef<HTMLDivElement>(null);
  const [maxHeight, setMaxHeight] = useState<number>();

  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const media = window.matchMedia(MOBILE_MEDIA);

    const update = () => {
      if (!media.matches) {
        setMaxHeight(undefined);
        return;
      }

      const cards = list.querySelectorAll<HTMLElement>(
        '[data-suggested-question]',
      );
      const first = cards[0];
      const lastVisible = cards[VISIBLE_ON_MOBILE - 1];
      if (!first || !lastVisible) return;

      const peek = cards.length > VISIBLE_ON_MOBILE ? NEXT_CARD_PEEK : 0;
      const next =
        lastVisible.offsetTop +
        lastVisible.offsetHeight -
        first.offsetTop +
        peek;
      setMaxHeight(current => (current === next ? current : next));
    };

    update();

    const observer = new ResizeObserver(update);
    observer.observe(list);
    for (const card of list.querySelectorAll('[data-suggested-question]')) {
      observer.observe(card);
    }
    media.addEventListener('change', update);

    return () => {
      observer.disconnect();
      media.removeEventListener('change', update);
    };
  }, []);

  return (
    <div
      ref={listRef}
      className="no-scrollbar grid w-full grid-cols-1 gap-3 overflow-y-auto overscroll-y-contain md:grid-cols-2 md:overflow-visible"
      style={maxHeight !== undefined ? { maxHeight } : undefined}
    >
      {suggestedQuestions.map(item => {
        const Icon = item.icon;
        return (
          <Card
            key={item.question}
            data-suggested-question
            className="hover:bg-accent/50 border-border/50 bg-card/50 animate-slide-up cursor-pointer p-4"
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
