describe('Logo Component', () => {
  it('Logo Component! is visible', async browser => {
    await browser.url('http://localhost:9515/#/')
    await browser.waitForElementVisible('a')
    browser.assert.containsText('logo', 'ndtech')
  })
})
