export default {
    name:"trustClient",
    title:'Ils nous font confiance',
    type:'document',
    fields:[
        {
            name:"name",
            title:'Nom',
            type:'string',
        },
        {
            name:'image',
            type:'image',
            title:'Image',
        },
        {
            name:'url',
            title:'Lien du client',
            type:'string',
            description:'lien redirigeant vers le site ou reseau social du client'
        }
    ]
}