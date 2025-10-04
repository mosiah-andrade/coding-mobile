export function register() {
  // Verifica se o navegador suporta service workers.
  if ('serviceWorker' in navigator) {
    // O evento 'load' garante que o registo não atrase o carregamento inicial da página.
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/service-worker.js') // Regista o ficheiro que está na pasta 'public'
        .then((registration) => {
          console.log('Service Worker registado com sucesso. Escopo:', registration.scope);
        })
        .catch((error) => {
          console.error('Erro ao registar o Service Worker:', error);
        });
    });
  } else {
    console.log('Service workers não são suportados neste navegador.');
  }
}
