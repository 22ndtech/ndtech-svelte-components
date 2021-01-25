const fs = require('fs-extra')

// copy package.json to the public folder
fs.copyFile('package.json', 'public\\package.json', err => {
  if (err) throw err
  console.log('package.json copied successfully')
})

// copy src folder to the public folder
fs.copy('src', 'public\\src', err => {
  if (err) {
    console.log('err.message = ' + err.message)
  }

  console.log('src folder copied successfully')
})
