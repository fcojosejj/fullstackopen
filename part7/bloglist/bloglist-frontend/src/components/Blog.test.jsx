import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog.jsx";

test("5.13. renders title but not author, url and likes", () => {
  const blog = {
    title: "Test",
    author: "Test",
    url: "https://test.com",
    likes: 10,
  };

  render(<Blog blog={blog} />);

  const title = screen.getByText("Title: Test");
  expect(title).toBeDefined();

  const author = screen.getByText("Author: Test");
  expect(author).not.toBeVisible();

  const url = screen.getByText("Url: https://test.com");
  expect(url).not.toBeVisible();

  const likes = screen.getByText("Likes: 10");
  expect(likes).not.toBeVisible();
});

test("5.14. renders title, author, url and likes when view button is clicked", async () => {
  const blog = {
    title: "Test",
    author: "Test",
    url: "https://test.com",
    likes: 10,
  };

  render(<Blog blog={blog} />);

  const viewButton = screen.getByText("view");
  await userEvent.click(viewButton);

  const title = screen.getByText("Title: Test");
  expect(title).toBeVisible();

  const author = screen.getByText("Author: Test");
  expect(author).toBeVisible();

  const url = screen.getByText("Url: https://test.com");
  expect(url).toBeVisible();

  const likes = screen.getByText("Likes: 10");
  expect(likes).toBeVisible();
});

test("5.15. if like button is pressed twice, the event handler is called twice", async () => {
  const blog = {
    title: "Test",
    author: "Test",
    url: "https://test.com",
    likes: 10,
  };

  const handleLikeBlog = vi.fn();

  render(<Blog blog={blog} handleLikeBlog={handleLikeBlog} />);

  const likeButton = screen.getByText("like");
  await userEvent.click(likeButton);
  await userEvent.click(likeButton);

  expect(handleLikeBlog).toHaveBeenCalledTimes(2);
});
