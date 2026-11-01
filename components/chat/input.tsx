import { ArrowUp, RotateCcw } from 'lucide-react';
import { memo } from 'react';

import { useEnterSubmit } from '@/hooks';
import { cn } from '@/lib/utils';

import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';

interface ChatInputProps {
  message: string;
  setMessage: (message: string) => void;
  onSendMessage: () => void;
  onNewChat: () => void;
  isTyping: boolean;
  hasMessages: boolean;
}

const ChatInputComponent = ({
  message,
  setMessage,
  onSendMessage,
  onNewChat,
  isTyping,
  hasMessages,
}: ChatInputProps) => {
  const handleKeyDown = useEnterSubmit(onSendMessage);

  function handleSendMessage() {
    if (!message.trim()) return;
    onSendMessage();
  }

  function handleChange(val: string) {
    setMessage(val);
  }

  return (
    <div className="mx-auto max-w-3xl p-4 pt-2">
      {/* Wrapper to allow positioning button inside the input container */}
      <div className="relative overflow-hidden rounded-md border">
        <Textarea
          id="chat-input"
          placeholder={
            hasMessages ? 'Ask a follow up question…' : 'Ask me anything…'
          }
          value={message}
          onChange={e => {
            handleChange(e.target.value);
          }}
          onKeyDown={handleKeyDown}
          className={cn(
            'no-scrollbar max-h-60 min-h-36 w-full resize-none rounded-none border-none shadow-none',
            hasMessages ? 'pr-40' : 'pr-12',
          )}
          rows={2}
          disabled={isTyping}
        />

        <div className="absolute right-3 bottom-3 z-10 flex items-center gap-2">
          {hasMessages && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="text-muted-foreground"
              onClick={onNewChat}
              disabled={isTyping}
            >
              <RotateCcw className="size-4" />
              New Chat
            </Button>
          )}
          <Button
            type="button"
            size="icon"
            onClick={handleSendMessage}
            disabled={!message.trim() || isTyping}
            className="size-9 rounded-full"
          >
            <ArrowUp className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export const ChatInput = memo(ChatInputComponent);
