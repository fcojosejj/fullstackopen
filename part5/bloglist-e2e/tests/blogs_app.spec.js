const { test, expect, describe, beforeEach } = require('@playwright/test')

describe('Blogs App', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:5173/api/testing/reset')
    await request.post('http://localhost:5173/api/users', {
      data: {
        username: 'root',
        name: 'root',
        password: 'root'
      }
    })

    await request.post('http://localhost:5173/api/users', {
      data: {
        username: 'fcojosejj',
        name: 'Francisco José Jordán Jiménez',
        password: 'fcojosejj'
      }
    })

    await page.goto('http://localhost:5173/')
  })

  test('5.17. login form is shown', async ({ page }) => {
    const locator = await page.getByRole('heading', { name: 'Login' })
    await expect(locator).toBeVisible()
    await expect(page.getByRole('textbox').first()).toBeVisible()
    await expect(page.getByRole('textbox').last()).toBeVisible()
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
  })

  describe('5.18. login', () => {
    test('login success with valid credentials', async ({ page }) => {
      await page.getByRole('textbox').first().fill('root')
      await page.getByRole('textbox').last().fill('root')
      await page.getByRole('button', { name: 'login' }).click()

      const locator = await page.getByRole('heading', { name: 'blogs' })
      await expect(locator).toBeVisible()
      await expect(page.getByRole('button', { name: 'logout' })).toBeVisible()
    })

    test('login fails with invalid credentials', async ({ page }) => {
      await page.getByRole('textbox').first().fill('notroot')
      await page.getByRole('textbox').last().fill('notroot')
      await page.getByRole('button', { name: 'login' }).click()

      const locator = await page.getByRole('heading', { name: 'Login' })
      await expect(locator).toBeVisible()
      await expect(page.getByRole('textbox').first()).toBeVisible()
      await expect(page.getByRole('textbox').last()).toBeVisible()
      await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
    })
  })

  describe('when logged in', () => {
    beforeEach(async ({ page }) => {
      await page.getByRole('textbox').first().fill('root')
      await page.getByRole('textbox').last().fill('root')
      await page.getByRole('button', { name: 'login' }).click()
    })

    test('5.19. a new blog can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'create blog' }).click()

      const textboxes = await page.locator('input').all()
      await textboxes[0].fill('my new blog')
      await textboxes[1].fill('Francisco José Jordán Jiménez')
      await textboxes[2].fill('https://fcojosejj.dev')
      await page.getByRole('button', { name: 'create blog' }).click()

      await expect(page.getByText('my new blog.')).toBeVisible()
    })

    describe('5.20 - 5.23 tests', () => {
      beforeEach(async ({ page }) => {
        await page.getByRole('button', { name: 'create blog' }).click()

        const textboxes = await page.locator('input').all()
        await textboxes[0].fill('my new blog')
        await textboxes[1].fill('Francisco José Jordán Jiménez')
        await textboxes[2].fill('https://fcojosejj.dev')
        await page.getByRole('button', { name: 'create blog' }).click()
      })

      test('5.20. a blog can be edited', async ({ page, request }) => {
        await expect(page.getByText('my new blog.')).toBeVisible()

        const response = await request.get('http://localhost:5173/api/blogs/')
        const blogs = await response.json()
        const blog = blogs[blogs.length - 1]

        await request.put(`http://localhost:5173/api/blogs/${blog.id.toString()}`, {
          data: {
            title: 'my new blog title',
            author: 'Francisco José Jordán Jiménez',
            url: 'https://fcojosejj.dev',
            likes: 10,
            user: blog.user
          }
        })

        page.reload()
        await expect(page.getByText('my new blog title.')).toBeVisible()
        await page.getByRole('button', { name: 'view' }).click()
        await expect(page.getByText('Likes: 10')).toBeVisible()
      })

      test('5.21. a blog can be deleted', async ({ page, request }) => {
        await expect(page.getByText('my new blog.')).toBeVisible()

        page.on('dialog', async dialog => {
          expect(dialog.type()).toBe('confirm')
          expect(dialog.message()).toBe('Are you sure you want to delete my new blog?')
          await dialog.accept()
        })

        await page.getByRole('button', { name: 'view' }).click()
        await page.getByRole('button', { name: 'remove' }).click()

        await expect(page.getByText('Blog my new blog was deleted')).toBeVisible()
      })

      test('5.22. only the author visualize the delete button', async ({ page, request }) => {
        await expect(page.getByText('logout')).toBeVisible()
        await page.getByRole('button', { name: 'logout' }).click()

        await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible()
        await page.getByRole('textbox').first().fill('fcojosejj')
        await page.getByRole('textbox').last().fill('fcojosejj')
        await page.getByRole('button', { name: 'login' }).click()

        await expect(page.getByRole('heading', { name: 'blogs' })).toBeVisible()
        await expect(page.getByText('my new blog.')).toBeVisible()
        await page.getByRole('button', { name: 'view' }).click()
        await expect(page.getByRole('button', { name: 'remove' })).toBeHidden()
      })

      describe('5.23 test', () => {
        beforeEach(async ({ page }) => {
          await page.getByRole('button', { name: 'logout' }).click()
          await page.getByRole('textbox').first().fill('root')
          await page.getByRole('textbox').last().fill('root')
          await page.getByRole('button', { name: 'login' }).click()
          await page.getByRole('button', { name: 'create blog' }).click()

          const textboxes = await page.locator('input').all()
          await textboxes[0].fill('a second blog')
          await textboxes[1].fill('Francisco José Jordán Jiménez')
          await textboxes[2].fill('https://secondblog.com')
          await page.getByRole('button', { name: 'create blog' }).click()
        })

        test('5.23. the blogs are sorted by the number of likes', async ({ page }) => {
          await expect(page.getByText('a second blog.')).toBeVisible();
          await page.locator('div').filter({ hasText: /^a second blog\.view$/ }).getByRole('button').click();
          for (let i = 0; i < 3; i++) {
            await page.getByRole('button', { name: 'like' }).click();
          }

          await page.waitForFunction(() => {
            const blogs = Array.from(document.querySelectorAll('[data-testid="blog"]'));
            const likes = blogs.map(blog => {
              const text = blog.innerText.match(/Likes:\s*(\d+)/);
              return text ? parseInt(text[1], 10) : 0;
            });
            return likes.every((like, i, arr) => i === 0 || arr[i - 1] >= like);
          });

          const blogs = await page.getByTestId('blog').all();
          expect(blogs.length).toBe(2);

          const likesArray = await Promise.all(
            blogs.map(async (blog) => {
              const text = await blog.locator('text=/Likes:/i').innerText();
              return parseInt(text.replace(/\D/g, ''), 10);
            })
          );

          expect(likesArray[0]).toBeGreaterThanOrEqual(likesArray[1])
        });

      })
    })
  })
})