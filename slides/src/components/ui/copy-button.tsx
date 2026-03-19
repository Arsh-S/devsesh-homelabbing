import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Copy, ExternalLink } from 'lucide-react';

interface CopyButtonProps {
  text: string;
  className?: string;
}

export function CopyButton({ text, className = '' }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <motion.button
      onClick={handleCopy}
      className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl transition-all ${
        copied
          ? 'bg-primary text-primary-foreground'
          : 'bg-card/70 text-muted hover:text-foreground hover:bg-card border border-border/50 hover:border-border'
      } ${className}`}
      whileTap={{ scale: 0.97 }}
    >
      {copied ? (
        <>
          <Check className="w-4 h-4" />
          Copied
        </>
      ) : (
        <>
          <Copy className="w-4 h-4" />
          Copy
        </>
      )}
    </motion.button>
  );
}

interface CopyableCodeProps {
  code: string;
  className?: string;
}

export function CopyableCode({ code, className = '' }: CopyableCodeProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <motion.div
      onClick={handleCopy}
      className={`relative group cursor-pointer inline-flex items-center gap-3 ${className}`}
      whileTap={{ scale: 0.98 }}
    >
      <code className="font-mono text-primary">{code}</code>
      <span className={`flex items-center justify-center w-7 h-7 rounded-lg transition-all ${
        copied
          ? 'bg-primary/20 text-primary'
          : 'bg-card/60 text-muted group-hover:text-foreground group-hover:bg-card/80'
      }`}>
        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
      </span>
    </motion.div>
  );
}

interface CopyableLinkProps {
  url: string;
  label?: string;
  className?: string;
}

export function CopyableLink({ url, label, className = '' }: CopyableLinkProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
      >
        {label || url}
        <ExternalLink className="w-4 h-4 opacity-60" />
      </a>
      <motion.button
        onClick={handleCopy}
        className={`inline-flex items-center justify-center w-8 h-8 rounded-lg text-sm transition-all ${
          copied
            ? 'bg-primary/20 text-primary'
            : 'bg-card/60 text-muted hover:text-foreground hover:bg-card/80 border border-border/30'
        }`}
        whileTap={{ scale: 0.9 }}
      >
        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
      </motion.button>
    </div>
  );
}
