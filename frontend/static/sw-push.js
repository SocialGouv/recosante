self.addEventListener('push', function (event) {
  console.log('push', event)

  if (!(self.Notification && self.Notification.permission === 'granted')) {
    return
  }

  const data = event.data
    ? typeof event.data === 'string'
      ? { title: event.data, link: 'https://recosante.beta.gouv.fr/' }
      : event.data.json()
    : {
        title: 'Découvrez les données Recosanté',
        link: 'https://recosante.beta.gouv.fr/',
      }

  const promiseChain = self.registration.showNotification(data.title, {
    body: data.body,
    data: data.link.toLowerCase(),
    icon: '/favicon.png',
    actions: [
      {
        action: data.link.toLowerCase(),
        title: 'Voir tous les indicateurs',
      },
    ],
    requireInteraction: true,
  })

  event.waitUntil(promiseChain)
})
self.addEventListener('notificationclick', function (event) {
  console.log('notificationclick')
  self.clients.openWindow(event.notification.data)
})
