
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
            name:"ordre",
            title:"Ordre d'affichage croissant",
            type:"number",
        },
        {
            name: 'color',
            title: 'Service Color',
            type: 'color',
            description:'couleur du service 👍'
          },
          {
            name: 'colorTxt',
            title: 'Service Color 2',
            type: 'color',
            description:'deuxieme couleur du service 👍'
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
            name:"introTitle",
            title:"Intro Title",
            type:"titleTrad",
            description:'New filed intro title'
        },
        {
            name:"introText",
            title:"Intro Text",
            type:"textTrad",
            description:'New filed text'
        },
        {
            name:"list",
            title:"Key points List",
            type:'array',
            of:[{type:'titleTrad'}],
            description:'New field key point'
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