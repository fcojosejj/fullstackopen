const _ = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  let likes = 0;
  blogs.forEach((blog) => {
    likes += blog.likes;
  });
  return likes;
};

const favoriteBlog = (blogs) => {
  let favorite = 0,
    pos = 0;
  blogs.forEach((blog) => {
    if (blog.likes > favorite) {
      favorite = blog.likes;
      pos = blogs.indexOf(blog);
    }
  });
  return blogs[pos];
};

const authorWithMostBlogs = (blogs) => {
  const authors = _.countBy(blogs, "author");
  const maxAuthor = _.maxBy(Object.entries(authors), ([, count]) => count);

  if (maxAuthor) return { author: maxAuthor[0], blogs: maxAuthor[1] };
  else return undefined;
};

const authorWithMoreLikes = (blogs) => {
  const authors = _.groupBy(blogs, "author");

  const totalLikes = _.map(authors, (blogs, author) => {
    const likes = _.sumBy(blogs, "likes");
    return { author, likes: likes };
  });

  const maxLikes = _.maxBy(totalLikes, "likes");

  return maxLikes;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  authorWithMostBlogs,
  authorWithMoreLikes,
};
