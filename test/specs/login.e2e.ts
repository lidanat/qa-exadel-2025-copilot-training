describe('Login Page', () => {
  it('should log in via basic auth', async () => {
    await browser.url('https://example.com/protected', {
      auth: { user: 'testUser', pass: 'testPassword' }
    })
    await expect($('h1=Welcome')).toBeDisplayed()
  })

  it('should perform form login', async () => {
    await browser.url('/login')
    await $('#username').setValue('testUser')
    await $('#password').setValue('testPassword')
    await $('#login-button').click()
    await expect($('#dashboard')).toBeDisplayed()
  })
})
