
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
            name:'name',
            title:"Phrase d'accroche",
            type:'simpleTextTrad',
        },
        {
            name:'intro',
            title:'Introduction',
            type:'array',
            of:[{type:'simpleTextImage'}],
            desctiption:'introdution',
        },
        {
            name:'keyPoint',
            title:'keypoint',
            type:'array',
            of:[{type:'titleText'}],
            description:'our mission & our Vision'
        },
        {
            name:'values',
            title:'Nos Valeurs',
            type:'aboutValues'
        },
    ]
}