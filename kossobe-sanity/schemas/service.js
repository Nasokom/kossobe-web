export default{
    name:"service",
    title:"Service",
    type:"document",
    fields:[
        {
            name:'backOfficeName',
            title:'Nom de la categorie de service',
            type:"string",
            description:"Nom de la categorie"

        },
        {
            name:"name",
            title:"Nom de la Categorie de Service",
            type:"titleTrad",
            description:" exemple : Pedagogie , live , etc .."
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