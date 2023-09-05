export default{
    name:"aboutValues",
    title:"Ours Values",
    type:"object",
    fields:[
        {
            name:'backOfficeName',
            title:'Nom du Service',
            type:"string",
            description:"Nom du back office"

        },
        {
            name:"title",
            title:"Titre Traduit",
            type:'titleTrad',
            description:" ex: 'Nos Valuers' Nom afficher sur le site web"
        },
        {
            name:'image',
            title:'Image Unique',
            type:'image',
            description:'Optionel'
        },
        {
            name:'valeur',
            title:'une Valeur + text',
            type:'array',
            of:[{type:'titleText'}]
        }
    ]
}