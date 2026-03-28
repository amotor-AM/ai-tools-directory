#!/usr/bin/env python3
"""
Convert markdown articles to Next.js TSX pages for AI Tools Directory.
Usage: python3 convert-md-to-tsx.py <input.md> <output.tsx>
"""

import sys
import re
from pathlib import Path

def parse_frontmatter(content):
    """Extract YAML frontmatter from markdown."""
    if not content.startswith('---'):
        return {}, content
    
    parts = content.split('---', 2)
    if len(parts) < 3:
        return {}, content
    
    fm_lines = parts[1].strip().split('\n')
    frontmatter = {}
    for line in fm_lines:
        if ':' in line:
            key, value = line.split(':', 1)
            frontmatter[key.strip()] = value.strip().strip('"')
    
    return frontmatter, parts[2].strip()

def md_to_jsx(md_text):
    """Convert markdown to JSX with proper escaping."""
    # Escape curly braces and dollar signs
    text = md_text.replace('{', '{{').replace('}', '}}')
    # Escape dollar signs for JSX
    text = re.sub(r'\$(\d)', r'$\1', text)  # Keep dollar amounts as-is, they're fine in text
    
    # Convert headers
    text = re.sub(r'^# (.+)$', r'<h1 className="text-4xl font-bold mb-6">\1</h1>', text, flags=re.M)
    text = re.sub(r'^## (.+)$', r'<h2 className="text-3xl font-bold mt-12 mb-6">\1</h2>', text, flags=re.M)
    text = re.sub(r'^### (.+)$', r'<h3 className="text-2xl font-bold mt-8 mb-4">\1</h3>', text, flags=re.M)
    text = re.sub(r'^#### (.+)$', r'<h4 className="text-xl font-semibold mt-6 mb-3">\1</h4>', text, flags=re.M)
    
    # Convert bold
    text = re.sub(r'\*\*(.+?)\*\*', r'<strong>\1</strong>', text)
    
    # Convert lists (basic)
    lines = text.split('\n')
    result = []
    in_list = False
    
    for line in lines:
        if line.strip().startswith('- ') or line.strip().startswith('* '):
            if not in_list:
                result.append('<ul className="list-disc pl-6 mb-6 space-y-2">')
                in_list = True
            item = line.strip()[2:]
            # Handle checkmarks
            item = item.replace('✅ ', '<span className="text-green-600">✅</span> ')
            item = item.replace('❌ ', '<span className="text-red-600">❌</span> ')
            result.append(f'<li>{item}</li>')
        else:
            if in_list:
                result.append('</ul>')
                in_list = False
            
            # Regular paragraph
            if line.strip() and not line.strip().startswith('<'):
                result.append(f'<p className="mb-4">{line}</p>')
            elif line.strip().startswith('<'):
                result.append(line)
            else:
                result.append(line)
    
    if in_list:
        result.append('</ul>')
    
    return '\n'.join(result)

def convert_md_to_tsx(md_path, tsx_path):
    """Convert markdown file to TSX Next.js page."""
    with open(md_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Parse frontmatter
    fm, body = parse_frontmatter(content)
    
    # Extract component name from slug or filename
    slug = fm.get('slug', Path(md_path).stem)
    component_name = ''.join(word.capitalize() for word in slug.split('-'))
    
    # Generate canonical URL
    canonical_url = f"https://amotor-am.github.io/ai-tools-directory/articles/{slug}"
    
    # Convert markdown body (simplified - just handle basics)
    # For complex tables/formatting, manual review recommended
    
    # Build TSX content
    tsx_content = f"""import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/Layout';

export default function {component_name}() {{
  return (
    <Layout>
      <Head>
        <title>{fm.get('title', slug)}</title>
        <meta name="description" content="{fm.get('description', '')}" />
        <meta name="keywords" content="{fm.get('keywords', '')}" />
        <link rel="canonical" href="{canonical_url}" />
      </Head>

      <article className="max-w-4xl mx-auto px-4 py-12">
        <div className="prose prose-lg max-w-none">
          {md_to_jsx(body)}
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            <strong>Last Updated:</strong> {fm.get('date', '2026-03-28')} | 
            <Link href="/blog"><a className="text-blue-600 hover:underline ml-2">← Back to Blog</a></Link>
          </p>
        </div>
      </article>
    </Layout>
  );
}}
"""
    
    with open(tsx_path, 'w', encoding='utf-8') as f:
        f.write(tsx_content)
    
    print(f"✅ Converted {md_path} → {tsx_path}")
    print(f"⚠️  Manual review recommended for tables, complex formatting")

if __name__ == '__main__':
    if len(sys.argv) != 3:
        print("Usage: python3 convert-md-to-tsx.py <input.md> <output.tsx>")
        sys.exit(1)
    
    convert_md_to_tsx(sys.argv[1], sys.argv[2])
