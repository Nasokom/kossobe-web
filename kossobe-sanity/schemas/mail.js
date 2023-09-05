export default {
    name:'mail',
    type:'document',
    title:'Mail',
    fields:[
        {
            name:'name',
            type:'string',
            title:'Name',
        },
        {
            name:'subject',
            title:'Sujet',
            type:'titleTrad',
            description:'inclure $name pour le nom du client'
        },
        {   
            name:'message',
            title:'Message',
            type:'textTrad',
            description:'$name , $message, $sujet, $tel'
        },
    ]
}