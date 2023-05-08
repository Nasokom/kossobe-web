export default {
    name:'client',
    title:'Ils nous font confiance',
    type:'document',
    fields:[
        {
            name:'name',
            type:'string',
            title:'Nom'
        },
        {
            name:'image',
            type:'image',
            title:'Image'
        },
        {
            name:'url',
            type:'string',
            title:'lien du client',
            description:'Lien redirigeant vers le site du client, ou reseau social'
        }

    ]
}