
export default ({
  getWelcomeMessage() {
    return 'Welcome to test project 🚀';
  },

  async find(query){
    return await strapi.entityService.findMany("plugin::event.event",query)
  },

  async delete(id){
    return await strapi.entityService.delete("plugin::event.event",id)
  },

  async create(data){
    return await strapi.entityService.create("plugin::event.event",data)
  },

  async update(id,data){
    return await strapi.entityService.update("plugin::event.event",id,data)
  },
  
});