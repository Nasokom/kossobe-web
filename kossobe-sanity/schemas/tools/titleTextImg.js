export default {
    name:'titleTextImg',
    title:'titleTextImg',
    type:'object',
    fields:[
        {
            name:'nameBack',
            type:'string',
            title:'Nom back office',
            description:'Uniquement pour le back office'
        },
        {
            name:'name',
            type:'titleTrad',
            title:'Title'
        },
        {
            name:'text',
            type:'textTrad',
            title:'Text'
        },
        {
            name:'image',
            type:'image',
            title:'Image'
        }
    ]
}