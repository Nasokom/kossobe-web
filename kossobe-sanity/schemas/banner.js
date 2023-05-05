export default
    {
      title: "Banner",
      name: "banner",
      type: "document",
      fields: [
        {
          title: "Name",
          name: "name",
          type: "string",
          description: "Pour identifier la banner"
        },
        {
          name: 'image',
          title: 'Image',
          type: 'image',
          options: {
              hotspot: true,
          },
      },
      {
        name:"intro",
        title:"introduction",
        type:"titleTrad"
      },
      {
        name:"catchP",
        title:"phrase d'accroche",
        type:"titleTrad"
      },
      {
        name:"text",
        title:"Text",
        type:"textTrad"
      }

      ]
    }  

