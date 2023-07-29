import {colorInput} from '@sanity/color-input'

export default{
    name:"service",
    title:"Service",
    type:"document",
    fields:[
        {
            name:'backOfficeName',
            title:'Nom de la categorie de service',
            type:"string",
            description:"Nom de la categorie de service pour le backOffice"

        },
        {
            name: 'color',
            title: 'Service Color',
            type: 'color',
            description:'couleur du service 👍'
          },
        {
            name:"name",
            title:"Nom de la Categorie de Service",
            type:"titleTrad",
            description:"Nom de la categorie afficher sur le site web"
        },
        {
            name:"image",
            title:"Image",
            type:"image"
        },
        {
            name:"services",
            title:"Services",
            type:"array",
            of:[{type:"serviceItem"}],
            description:"Service unique liée a cette categ ex : concert, atelier etc .."
        },
        { 
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
              source: 'name',
              maxLength: 90,
            },
            description:"nom de l'url"
        },

    ]
}