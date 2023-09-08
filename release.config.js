module.exports = {
    branches: ['main'], // o el nombre de tu rama principal
    plugins: [
      '@semantic-release/commit-analyzer',
      '@semantic-release/release-notes-generator',
      ['@semantic-release/github', {
        assets: [
          { path: 'hello-world.zip', label: 'Hello World' }
        ]
      }]
    ]
  };