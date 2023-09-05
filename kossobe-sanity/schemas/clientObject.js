export default {
    name:"clientObject",
    title:'Ils nous font confiance',
    type:'object',
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