import * as cheerio from 'cheerio';

type TOCItem = {
  [key: string]: string | boolean | TOCItem[];
};

/**
 * Returns `text` and `href` for a documentation table-of-contents section.
 */
export const getDocTocData = (data: TOCItem) => {
  const text = Object.keys(data).filter(
    key => ![':children', ':expanded'].includes(key)
  )[0];
  const href = data[text] as string;
  const expanded = Boolean(data[':expanded']);
  return {text, href, expanded};
};

/**
 * Generates table of contents data for a documentation page.
 */
export const getToc = (html: string, topLevelTotal: number): TOCItem[] => {
  const $ = cheerio.load(html);
  $('a.anchor').remove();
  const headings = $('h2, h3, h4, h5, h6').filter('[id]');
  if (!headings.length) {
    return [];
  }
  const toc: TOCItem[] = [];
  let stack: TOCItem[] = [];
  const byLevel: Record<number, TOCItem[]> = {
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
  };

  headings.each((index, element) => {
    const h = element as cheerio.TagElement;
    const level = parseInt(h.name[1], 10);
    const title = $(h).html() as string;
    const id = $(h).attr('id') as string;
    const tocItem: TOCItem = {[title]: `#${id}`};
    byLevel[level].push(tocItem);
    if (level === 2) {
      toc.push(tocItem);
      stack = [tocItem];
    } else {
      const parent = stack[level - 3];
      if (parent) {
        if (!parent[':children']) {
          parent[':children'] = [];
        }
        (parent[':children'] as TOCItem[]).push(tocItem);
        stack.length = level - 2;
        stack[level - 2] = tocItem;
      } else {
        throw new Error(`Invalid heading level without parent: h${level}`);
      }
    }
  });

  // Expand the table of contents to the deepest level possible without making
  // it longer than the most-collapsed-possible top-level documentation table of
  // contents.
  let expandedLevel = 3;
  let totalEntries = byLevel[2].length;
  while (expandedLevel < 7) {
    const children = byLevel[expandedLevel];
    totalEntries += children.length;

    if (totalEntries > topLevelTotal) {
      break;
    }

    for (const entry of byLevel[expandedLevel - 1]) {
      entry[':expanded'] = true;
    }

    expandedLevel += 1;
  }

  return toc;
};
