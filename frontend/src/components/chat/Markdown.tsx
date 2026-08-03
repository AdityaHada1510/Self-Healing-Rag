import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function Markdown({ children }: { children: string }) {
  return (
    <div className="text-sm leading-relaxed [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          p: (props) => <p className="my-3" {...props} />,
          h1: (props) => <h1 className="mt-5 mb-3 text-lg font-semibold" {...props} />,
          h2: (props) => <h2 className="mt-5 mb-2 text-base font-semibold" {...props} />,
          h3: (props) => <h3 className="mt-4 mb-2 text-sm font-semibold" {...props} />,
          strong: (props) => <strong className="font-semibold text-foreground" {...props} />,
          ul: (props) => <ul className="my-3 list-disc space-y-1 pl-5" {...props} />,
          ol: (props) => <ol className="my-3 list-decimal space-y-1 pl-5" {...props} />,
          a: (props) => (
            <a className="text-primary underline underline-offset-2" target="_blank" rel="noreferrer" {...props} />
          ),
          blockquote: (props) => (
            <blockquote className="my-3 border-l-2 border-primary/60 pl-3 text-muted-foreground" {...props} />
          ),
          code: ({ className, children, ...props }) => {
            const isBlock = typeof className === "string" && className.includes("language-");
            if (isBlock) {
              return (
                <code className="block font-mono text-xs leading-relaxed" {...props}>
                  {children}
                </code>
              );
            }
            return (
              <code
                className="rounded-md bg-secondary px-1.5 py-0.5 font-mono text-[0.8em] text-primary"
                {...props}
              >
                {children}
              </code>
            );
          },
          pre: (props) => (
            <pre
              className="my-3 overflow-x-auto rounded-xl border border-border bg-background/70 p-3"
              {...props}
            />
          ),
          table: (props) => (
            <div className="my-3 overflow-x-auto rounded-xl border border-border">
              <table className="w-full text-left text-xs" {...props} />
            </div>
          ),
          thead: (props) => <thead className="bg-secondary/70" {...props} />,
          th: (props) => <th className="px-3 py-2 font-semibold" {...props} />,
          td: (props) => <td className="border-t border-border px-3 py-2" {...props} />,
          hr: (props) => <hr className="my-4 border-border" {...props} />,
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}