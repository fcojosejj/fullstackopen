import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm.jsx'

test('5.16. a new blog is created when submit button is pressed', async () => {
  const mockHandler = vi.fn()
  const user = userEvent.setup()

  render(<BlogForm handleNewBlog={mockHandler} />)

  const inputs = screen.getAllByRole('textbox')
  const titleInput = inputs[0]
  const authorInput = inputs[1]
  const urlInput = inputs[2]
  const submitButton = screen.getByText('create blog')

  await user.type(titleInput, 'Test2')
  await user.type(authorInput, 'Test2')
  await user.type(urlInput, 'https://test2.com')
  await user.click(submitButton)

  expect(mockHandler.mock.calls).toHaveLength(1)
  expect(mockHandler.mock.calls[0][0].title).toBe('Test2')
  expect(mockHandler.mock.calls[0][0].author).toBe('Test2')
  expect(mockHandler.mock.calls[0][0].url).toBe('https://test2.com')
})