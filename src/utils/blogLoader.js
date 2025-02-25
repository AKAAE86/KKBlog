import matter from 'gray-matter';

// 添加日期格式化函数
function formatDate(dateStr) {
  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) {
      return '';
    }
    
    // 格式化为 yyyyMMdd-HHmm
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    return `${year}/${month}/${day} ${hours}:${minutes}`;
  } catch (error) {
    console.error('Error formatting date:', error);
    return '';
  }
}

export async function loadBlogPosts({ locale }) {
  try {
    console.log('Starting to load blog posts...' + locale);
    
    // 使用 webpack 的动态导入来加载所有 markdown 文件
    const markdownContext = require.context('../data/posts', true, /\.md$/);
    console.log('Found markdown files:', markdownContext.keys());

    const posts = await Promise.all(
      markdownContext.keys().filter((path) => String(path).includes(locale)).map(async (path) => {
        try {
          // 获取文件名作为 slug
          const slug = path.replace(/^\.\/(.*)\.md$/, '$1');
          
          // 读取文件内容
          const content = await import(`../data/posts/${slug}.md`);
          // 确保我们获取到的是字符串内容
          const markdownContent = typeof content.default === 'string' 
            ? content.default 
            : typeof content === 'string' 
              ? content 
              : '';

          console.log('Raw content type:', typeof content);
          console.log('Content preview:', markdownContent.slice(0, 100));
          
          // 解析 frontmatter
          const { data: frontmatter, content: parsedContent } = matter(markdownContent);

          // 确保返回的内容都是字符串类型，并格式化日期
          return {
            slug,
            title: String(frontmatter.title || ''),
            date: formatDate(frontmatter.date),
            description: String(frontmatter.description || ''),
            tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : [],
            content: String(parsedContent || '')
          };
        } catch (parseError) {
          console.error(`Error parsing file ${path}:`, parseError);
          console.error('Error details:', {
            path,
            error: parseError.message,
            stack: parseError.stack
          });
          return null;
        }
      })
    );

    // 过滤掉解析失败的文章并按日期排序
    const sortedPosts = posts
      .filter(Boolean)
      .sort((a, b) => b.date.localeCompare(a.date)); // 使用字符串比较来排序

    console.log('Final posts:', sortedPosts.map(post => ({
      slug: post.slug,
      title: post.title,
      contentType: typeof post.content
    })));

    return sortedPosts;
  } catch (error) {
    console.error('Error loading blog posts:', error);
    console.error('Error stack:', error.stack);
    return [];
  }
} 