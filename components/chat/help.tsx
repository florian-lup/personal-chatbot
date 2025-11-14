'use client';

import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import { useState, type ReactNode, memo } from 'react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '../ui/dialog';

interface HelpDialogProps {
  children: ReactNode;
}

const HelpDialogComponent = ({ children }: HelpDialogProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>About this Website</DialogTitle>
          <VisuallyHidden.Root>
            <DialogDescription>
              This is an AI-powered personal website that reads directly from a
              bio document to provide accurate answers.
            </DialogDescription>
          </VisuallyHidden.Root>
        </DialogHeader>
        <div className="text-muted-foreground space-y-3 pt-2 text-left text-sm">
          <p>
            Welcome! This website features an AI assistant designed to help you
            learn more about my background, projects, and expertise. When you
            chat here, you&apos;re interacting with an AI—not with me
            personally.
          </p>
          <p>
            <strong>How it works:</strong> The AI reads directly from my bio
            document to provide accurate, helpful answers about my background,
            projects, and expertise.
          </p>
          <p>
            <strong>Limitations:</strong> The AI tries its best, but it might
            not always get things perfect. If you have questions about how it
            works, my background, or anything else, just ask!
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export const HelpDialog = memo(HelpDialogComponent);
