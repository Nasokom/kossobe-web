export default{
    name:'textImage',
    title:'TextImage',
    type:'object',
    fields:[
        {
            name:'name',
            title:'Nom',
            type:'string',
            description:"identifiant back office"
        },
        {
            name:'text',
            title:'Text traduit',
            type:'textTrad',
        },
        {
            name:'image',
            title:'image',
            type:'image',
        }
    ]
}