// Configuración para Semantic Release
module.exports = {
    // Ramas en las cuales se desencadenarán las liberaciones
    branches: ['main'], // o el nombre de tu rama principal
    // Lista de plugins que Semantic Release debe utilizar
    plugins: [
      // Analiza los commits para determinar el tipo de versión (mayor, menor, parche)
      '@semantic-release/commit-analyzer',
      // Genera las notas de la versión basándose en los commits
      '@semantic-release/release-notes-generator',
      // Plugin específico para GitHub que publica la liberación y sus activos en GitHub
      ['@semantic-release/github', {
        // Define los activos que se adjuntarán en la liberación de GitHub
        assets: [
          // Archivo ZIP 'hello-world.zip' con la etiqueta 'Hello World'
          { path: 'hello-world.zip', label: 'Hello World' }
        ]
      }]
    ]
  };