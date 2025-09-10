import { expect } from '@wdio/globals'

describe('Login Tests', () => {
    
    describe('Basic Authentication', () => {
        it('should successfully navigate to a page with basic auth simulation', async () => {
            // Create a simple HTML page with basic auth simulation
            const htmlContent = `
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Basic Auth Test</title>
                </head>
                <body>
                    <h1>Authentication Test</h1>
                    <div id="auth-status">authenticated</div>
                    <p>This page simulates successful basic authentication.</p>
                </body>
                </html>
            `
            
            const dataUrl = `data:text/html;base64,${Buffer.from(htmlContent).toString('base64')}`
            
            await browser.url(dataUrl)
            
            // Verify the page loaded correctly
            await browser.waitUntil(
                async () => {
                    const title = await browser.getTitle()
                    return title.includes('Basic Auth Test')
                },
                {
                    timeout: 10000,
                    timeoutMsg: 'Authentication test page did not load within 10 seconds'
                }
            )
            
            // Verify authentication status
            const authStatus = await $('#auth-status')
            await authStatus.waitForDisplayed({ timeout: 5000 })
            const statusText = await authStatus.getText()
            expect(statusText).toBe('authenticated')
        })
    })

    describe('Form-based Login', () => {
        it('should successfully login using form with setValue and click', async () => {
            // Create a login form HTML page
            const loginFormHtml = `
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Login Test Page</title>
                    <style>
                        body { font-family: Arial, sans-serif; padding: 20px; }
                        .form-container { max-width: 400px; margin: 0 auto; }
                        input, button { margin: 5px 0; padding: 8px; width: 100%; }
                        .success { color: green; display: none; }
                        .error { color: red; display: none; }
                    </style>
                </head>
                <body>
                    <div class="form-container">
                        <h2>Login Form</h2>
                        <form id="loginForm">
                            <input type="text" id="username" placeholder="Username" required>
                            <input type="password" id="password" placeholder="Password" required>
                            <button type="submit" id="loginButton">Login</button>
                        </form>
                        <div id="successMessage" class="success">Login successful! Welcome to the secure area.</div>
                        <div id="errorMessage" class="error">Invalid credentials!</div>
                    </div>
                    
                    <script>
                        document.getElementById('loginForm').addEventListener('submit', function(e) {
                            e.preventDefault();
                            const username = document.getElementById('username').value;
                            const password = document.getElementById('password').value;
                            
                            if (username === 'testuser' && password === 'testpass') {
                                document.getElementById('successMessage').style.display = 'block';
                                document.getElementById('errorMessage').style.display = 'none';
                                // Simulate redirect by changing page title
                                document.title = 'Secure Area';
                                // Add secure area indicator
                                setTimeout(() => {
                                    document.body.innerHTML = '<h2>Secure Area</h2><p class="success">You logged into a secure area!</p>';
                                }, 500);
                            } else {
                                document.getElementById('errorMessage').style.display = 'block';
                                document.getElementById('successMessage').style.display = 'none';
                            }
                        });
                    </script>
                </body>
                </html>
            `
            
            const dataUrl = `data:text/html;base64,${Buffer.from(loginFormHtml).toString('base64')}`
            
            // Navigate to the login form
            await browser.url(dataUrl)
            
            // Wait for the page to load
            await browser.waitUntil(
                async () => {
                    const title = await browser.getTitle()
                    return title.includes('Login Test Page')
                },
                {
                    timeout: 10000,
                    timeoutMsg: 'Login page did not load within 10 seconds'
                }
            )
            
            // Find username field and enter credentials
            const usernameField = await $('#username')
            await usernameField.waitForDisplayed({ timeout: 5000 })
            await usernameField.setValue('testuser')
            
            // Find password field and enter credentials
            const passwordField = await $('#password')
            await passwordField.waitForDisplayed({ timeout: 5000 })
            await passwordField.setValue('testpass')
            
            // Find and click the login button
            const loginButton = await $('#loginButton')
            await loginButton.waitForDisplayed({ timeout: 5000 })
            await loginButton.click()
            
            // Wait for success message to appear
            await browser.waitUntil(
                async () => {
                    const successMsg = await $('#successMessage')
                    try {
                        await successMsg.waitForDisplayed({ timeout: 2000 })
                        return await successMsg.isDisplayed()
                    } catch {
                        return false
                    }
                },
                {
                    timeout: 10000,
                    timeoutMsg: 'Success message did not appear within 10 seconds'
                }
            )
            
            // Verify success message is displayed
            const successMessage = await $('#successMessage')
            const messageText = await successMessage.getText()
            expect(messageText).toContain('Login successful!')
            
            // Wait for page transition to secure area
            await browser.waitUntil(
                async () => {
                    const title = await browser.getTitle()
                    return title === 'Secure Area'
                },
                {
                    timeout: 10000,
                    timeoutMsg: 'Page did not transition to secure area within 10 seconds'
                }
            )
        })

        it('should handle invalid login credentials gracefully', async () => {
            // Create the same login form
            const loginFormHtml = `
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Login Test Page</title>
                    <style>
                        body { font-family: Arial, sans-serif; padding: 20px; }
                        .form-container { max-width: 400px; margin: 0 auto; }
                        input, button { margin: 5px 0; padding: 8px; width: 100%; }
                        .success { color: green; display: none; }
                        .error { color: red; display: none; }
                    </style>
                </head>
                <body>
                    <div class="form-container">
                        <h2>Login Form</h2>
                        <form id="loginForm">
                            <input type="text" id="username" placeholder="Username" required>
                            <input type="password" id="password" placeholder="Password" required>
                            <button type="submit" id="loginButton">Login</button>
                        </form>
                        <div id="successMessage" class="success">Login successful! Welcome to the secure area.</div>
                        <div id="errorMessage" class="error">Invalid credentials!</div>
                    </div>
                    
                    <script>
                        document.getElementById('loginForm').addEventListener('submit', function(e) {
                            e.preventDefault();
                            const username = document.getElementById('username').value;
                            const password = document.getElementById('password').value;
                            
                            if (username === 'testuser' && password === 'testpass') {
                                document.getElementById('successMessage').style.display = 'block';
                                document.getElementById('errorMessage').style.display = 'none';
                            } else {
                                document.getElementById('errorMessage').style.display = 'block';
                                document.getElementById('successMessage').style.display = 'none';
                            }
                        });
                    </script>
                </body>
                </html>
            `
            
            const dataUrl = `data:text/html;base64,${Buffer.from(loginFormHtml).toString('base64')}`
            
            // Navigate to login page
            await browser.url(dataUrl)
            
            // Enter invalid credentials
            const usernameField = await $('#username')
            await usernameField.waitForDisplayed({ timeout: 5000 })
            await usernameField.setValue('invalid_user')
            
            const passwordField = await $('#password')
            await passwordField.waitForDisplayed({ timeout: 5000 })
            await passwordField.setValue('invalid_password')
            
            // Click login button
            const loginButton = await $('#loginButton')
            await loginButton.waitForDisplayed({ timeout: 5000 })
            await loginButton.click()
            
            // Wait for error message to appear
            await browser.waitUntil(
                async () => {
                    const errorMsg = await $('#errorMessage')
                    try {
                        await errorMsg.waitForDisplayed({ timeout: 2000 })
                        return await errorMsg.isDisplayed()
                    } catch {
                        return false
                    }
                },
                {
                    timeout: 10000,
                    timeoutMsg: 'Error message did not appear within 10 seconds'
                }
            )
            
            // Verify error message is displayed
            const errorMessage = await $('#errorMessage')
            const errorText = await errorMessage.getText()
            expect(errorText).toContain('Invalid credentials!')
            
            // Verify we're still on the login page
            const title = await browser.getTitle()
            expect(title).toBe('Login Test Page')
        })
    })
})