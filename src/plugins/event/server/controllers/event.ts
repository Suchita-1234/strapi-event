export default {
    async create(ctx) {
        try {
          return await strapi.plugin("event").service("event").create(ctx.request.body);
        } catch (error) {
          ctx.throw(500,error);
        }
      },

      async delete(ctx){
        try{
          ctx.body = await strapi
              .plugin("event")
              .service("event")
              .delete(ctx.params.id);
        } catch (error){
          ctx.throw(500,error)
        }
      },

      async update(ctx){
        try{
          ctx.body = await strapi
              .plugin("event")
              .service("event")
              .delete(ctx.params.id,ctx.request.body);
        } catch (error){
          ctx.throw(500,error)
        }
      }

  };