export default{
    name:"serviceItem",
    title:"Service Item",
    type:"object",
    fields:[
        {
            name:'backOfficeName',
            title:'Nom du Service',
            type:"string",
            description:"Nom du back office"
        },
        {
            name:"name",
            title:"Nom du service",
            type:'titleTrad',
            description:"Nom afficher sur le site web"
        },
        {
            name:'image',
            title:'Image Unique',
            type:'image',
            description:'New img field'
        },
        {
            name:'text',
            title:'text',
            type:'textTrad',
            description:'New text field'
        },
        /* {
            name:'content',
            title:'Contenu',
            type:'array',
            of:[{type:'textImage'}],
            description:"Gerer le contenu de chaque carte service"
        }, */
    ]
}