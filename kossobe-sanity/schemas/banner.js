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
        name:"imgDesc",
        title:"Image description",
        type:"string",
        description: "Descritpion de l'image pour l'accessibilité"
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
      },

      {
        name:"text1",
        title:"Text1",
        type:"string",
        description:'Old way delete when unsuse'
      },
      {
        name:"text2",
        title:"Text2",
        type:"string",
        description:'Old way delete when unsuse'
      },
      {
        name:"text3",
        title:"Text3",
        type:"string",
        description:'Old way delete when unsuse'
      },
      ]
    }  

