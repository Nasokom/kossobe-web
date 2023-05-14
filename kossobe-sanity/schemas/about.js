
export default{
    name:'about',
    title:'A propos de kossobe',
    type:'document',
    fields:[
        {
            name:'nameBackOffice',
            title:'Nom',
            type:'string',
            description:'pour identifier dans le backoffice'
        },
        {
            name:'ordre',
            type:'number',
            title:"Ordre",
            description:"ordre d'apparition dans l'app"
        },
        {
            name:'name',
            title:'Titre',
            type:'titleTrad',
            description:'Titre afficher sur le site web Optionnel'
        },
        {
            name:'text',
            title:'contenu du block',
            type:'textTrad',
        },
        {
            name:'image',
            title:'Image',
            type:'image',
            description:'optionnelle'
        },

    ]
}