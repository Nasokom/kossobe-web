export default{
    name:"serviceItem",
    title:"Service Item",
    type:"object",
    fields:[
        {
            name:"name",
            title:"Nom du service",
            type:'titleTrad',
        },
        {
            name:"image",
            title:"Image",
            type:"array",
            of:[{type:"image"}],
            description: "2 photos qui decrivent le service"
        },
        {   
            name:"text",
            title:'Text',
            type:"textTrad"
        },

        {   
            name:"text2",
            title:'Text2',
            type:"textTrad"
        },


    ]
}