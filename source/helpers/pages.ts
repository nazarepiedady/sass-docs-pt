interface Page {
  url: string | false;
  fileSlug: string;
  filePathStem: string;
  date: Date;
  inputPath: string;
  outputPath: string | false;
  outputFileExtension: string;
}

/**
 * Removes leading id (e.g. `001-`) from blog filenames.
 */
export const getBlogSlug = (page: Page) => page.fileSlug.replace(/^(\d*-)/, '');

/**
 * Indicates whether the given page is part of the JS API documentation.
 */
export const isTypedoc = (page: Page) =>
  page.url ? page.url.startsWith('/documentation/js-api/') : false;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function pagesPlugin(eleventyConfig: any) {
  // filters...
  eleventyConfig.addLiquidFilter('getBlogSlug', getBlogSlug);
  eleventyConfig.addLiquidFilter('isTypedoc', isTypedoc);
}
