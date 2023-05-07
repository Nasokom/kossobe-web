export default {
    name:'policy',
    type:'document',
    title:"Info reglementaire",
    fields:[
            {
              name: 'nameBack',
              type: 'string',
              title: 'Categorie pour le backoffice'
            },
            {
              name: 'name',
              type: 'titleTrad',
              title: 'Categorie'
            },
            {
              name: 'id',
              type: 'string',
              title: 'id',
              description:'Lien url, a voir ensemble',
            },
            {
              title: 'Sous Categorie',
              name: 'subCateg',
              type: 'array',
              description:" titre de sous categorie + un texte ",
              of: [{
                      type: 'titleText',
                  },]
            },
    ]

}