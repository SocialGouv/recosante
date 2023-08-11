import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

export default function Markdown({ children, ...rest }) {
  return (
    <ReactMarkdown
      rehypePlugins={[rehypeRaw]}
      children={children}
      components={{
        a: ({ node: _, children, ...props }) => {
          if (props.href?.includes("http")) {
            props.target = "_blank";
            props.rel = "noreferrer";
          }
          return <a {...props}>{children}</a>;
        },
      }}
      {...rest}
    />
  );
}
