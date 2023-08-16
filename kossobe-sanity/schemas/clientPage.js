export default {
    name:"trustClient",
    title:'Ils nous font confiance',
    type:'document',
    fields:[
        {
            name:'backOfficeName',
            type:'string',
            title:'Nom back office',
            description:"Ce champ n'est pas afficher sur le site web"
        },
        {
            name:'title',
            type:'titleTrad',
            title:'Catch phrase',
        },
        {
            name:"text",
            title:'Intro Text',
            type:'textTrad',
        },
        {
            name:'clients',
            title:'Tout les clients ',
            type:'array',
            of:[{type:'clientObject',}]
        }
    ]
}