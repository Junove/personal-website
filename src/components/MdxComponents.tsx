import type { MDXRemoteProps } from "next-mdx-remote/rsc";

/** Element styling for post bodies, so MDX stays plain Markdown. */
const components: NonNullable<MDXRemoteProps["components"]> = {
  h2: (props) => <h2 className="mt-10 mb-4" {...props} />,
  h3: (props) => <h3 className="mt-8 mb-3" {...props} />,
  p: (props) => <p className="mb-5 text-base sm:text-lg leading-relaxed text-fg-soft" {...props} />,
  a: (props) => <a className="text-accent underline underline-offset-2" {...props} />,
  ul: (props) => <ul className="mb-5 list-disc pl-6 text-fg-soft space-y-1.5" {...props} />,
  ol: (props) => <ol className="mb-5 list-decimal pl-6 text-fg-soft space-y-1.5" {...props} />,
  blockquote: (props) => (
    <blockquote className="mb-5 border-l-4 border-accent pl-4 italic text-fg-soft" {...props} />
  ),
  pre: (props) => (
    <pre className="mb-5 overflow-x-auto rounded-lg border-2 border-neutral-300 bg-surface-50 p-4 text-sm" {...props} />
  ),
  code: (props) => <code className="font-mono text-[0.9em]" {...props} />,
  hr: (props) => <hr className="my-8 border-neutral-300" {...props} />,
};

export default components;
