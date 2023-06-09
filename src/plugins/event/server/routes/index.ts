
export default [
  {
    method: 'GET',
    path: '/',
    handler: 'myController.index',
    config: {
      policies: [],
    },
  },
  {
    method: 'GET',
    path: '/events',
    handler: 'event.find',
    config: {
      policies: []
    }
  },
  {
    method: 'POST',
    path: '/events',
    handler: 'event.create',
    config: {
      policies: []
    }
  },
  {
    method: 'PUT',
    path: '/events/:id',
    handler: 'event.update',
    config: {
      policies: []
    }
  },
  {
    method: 'DELETE',
    path: '/events/:id',
    handler: 'event.delete',
    config: {
      policies: []
    }
  }
  ];
