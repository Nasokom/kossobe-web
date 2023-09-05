export default{
    name:'simpleTextImage',
    title:'simpleTextImage',
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
            type:'simpleTextTrad',
        },
        {
            name:'image',
            title:'image',
            type:'image',
        }
    ]
}