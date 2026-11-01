import {
  FileText,
  Mail,
  Moon,
  ShieldAlert,
  SquareTerminal,
  Sun,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { memo, useEffect, useState } from 'react';

import { Button } from '../ui/button';
import { Switch } from '../ui/switch';

import { Contact } from './contact';
import { Privacy } from './privacy';
import { Terms } from './terms';

const HeaderComponent = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleGitHubClick = () => {
    window.open(
      'https://github.com/florian-lup',
      '_blank',
      'noopener,noreferrer',
    );
  };

  const isDark = mounted ? resolvedTheme === 'dark' : true;

  return (
    <header className="w-full px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sun className="text-muted-foreground size-4" />
          <Switch
            checked={isDark}
            onCheckedChange={checked => {
              setTheme(checked ? 'dark' : 'light');
            }}
            aria-label="Dark mode"
          />
          <Moon className="text-muted-foreground size-4" />
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground"
            onClick={handleGitHubClick}
          >
            <SquareTerminal className="h-4 w-4" />
            <span className="hidden sm:inline">GitHub</span>
          </Button>
          <Contact>
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              <Mail className="h-4 w-4" />
              <span className="hidden sm:inline">Contact</span>
            </Button>
          </Contact>
          <Terms>
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Terms</span>
            </Button>
          </Terms>
          <Privacy>
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              <ShieldAlert className="h-4 w-4" />
              <span className="hidden sm:inline">Privacy</span>
            </Button>
          </Privacy>
        </div>
      </div>
    </header>
  );
};

export const Header = memo(HeaderComponent);
