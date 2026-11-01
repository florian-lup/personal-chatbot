import { FileText, ShieldAlert, Mail, SquareTerminal } from 'lucide-react';
import { memo } from 'react';

import { Button } from '../ui/button';

import { Contact } from './contact';
import { Privacy } from './privacy';
import { Terms } from './terms';

const HeaderComponent = () => {
  const handleGitHubClick = () => {
    window.open(
      'https://github.com/florian-lup',
      '_blank',
      'noopener,noreferrer',
    );
  };

  return (
    <header className="w-full px-6 py-4">
      <div className="flex items-center justify-end">
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
