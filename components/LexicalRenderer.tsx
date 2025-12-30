import React, { Fragment } from 'react';
import Link from 'next/link';

// Basic type definitions for Lexical nodes
type LexicalNode = {
    type: string;
    children?: LexicalNode[];
    text?: string;
    format?: number;
    [key: string]: any;
};

// Text formatting bitmask (Payload/Lexical standard)
const IS_BOLD = 1;
const IS_ITALIC = 2;
const IS_STRIKETHROUGH = 4;
const IS_UNDERLINE = 8;
const IS_CODE = 16;
const IS_SUBSCRIPT = 32;
const IS_SUPERSCRIPT = 64;

function TextNode({ node }: { node: LexicalNode }) {
    let text: React.ReactNode = node.text;

    if (node.format) {
        if (node.format & IS_BOLD) text = <b>{text}</b>;
        if (node.format & IS_ITALIC) text = <i>{text}</i>;
        if (node.format & IS_STRIKETHROUGH) text = <s>{text}</s>;
        if (node.format & IS_UNDERLINE) text = <u>{text}</u>;
        if (node.format & IS_CODE) text = <code>{text}</code>;
        if (node.format & IS_SUBSCRIPT) text = <sub>{text}</sub>;
        if (node.format & IS_SUPERSCRIPT) text = <sup>{text}</sup>;
    }

    return <>{text}</>;
}

function RenderNode({ node }: { node: LexicalNode }) {
    if (node.type === 'text') {
        return <TextNode node={node} />;
    }

    const children = node.children?.map((child, i) => (
        <RenderNode key={i} node={child} />
    )) || null;

    switch (node.type) {
        case 'heading':
            const HeadingTag = node.tag as keyof JSX.IntrinsicElements;
            return <HeadingTag className="font-bold text-white my-4">{children}</HeadingTag>;
        case 'paragraph':
            return <p className="mb-4 text-gray-300 leading-relaxed">{children}</p>;
        case 'list':
            const ListTag = node.tag === 'ol' ? 'ol' : 'ul';
            const listClass = node.tag === 'ol' ? 'list-decimal' : 'list-disc';
            return <ListTag className={`${listClass} pl-5 mb-4 text-gray-300`}>{children}</ListTag>;
        case 'listitem':
            return <li className="mb-1">{children}</li>;
        case 'quote':
            return (
                <blockquote className="border-l-4 border-primary pl-4 italic my-6 text-gray-400">
                    {children}
                </blockquote>
            );
        case 'link':
            const href = node.fields?.url || node.url || '#';
            const isExternal = !href.startsWith('/');
            return (
                <Link
                    href={href}
                    target={isExternal ? '_blank' : undefined}
                    className="text-primary hover:underline underline-offset-4"
                >
                    {children}
                </Link>
            );
        case 'block':
            // Handle custom blocks if any (Banner, Code, etc currently ignored or basic render)
            return <div className="my-4 p-4 bg-white/5 rounded-lg border border-white/10">{children}</div>;
        default:
            // Default to rendering children in a fragment or generic div
            return <>{children}</>;
    }
}

export default function LexicalRenderer({ content }: { content: any }) {
    if (!content || !content.root || !content.root.children) return null;

    return (
        <div className="lexical-content">
            {content.root.children.map((node: LexicalNode, i: number) => (
                <RenderNode key={i} node={node} />
            ))}
        </div>
    );
}
