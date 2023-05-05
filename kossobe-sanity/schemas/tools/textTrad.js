export default {
    title:"textTrad",
    name:"textTrad",
    type:"object",
    
    fields:[
        {name: 'fr',
       title: 'francais',
       type: 'array',
       of:[{type:"block"}],
       description:"texte en francais"
      },
      {name: 'en',
      title: 'Anglais',
      type: 'array',
      of:[{type:"block"}],
      description:"texte en anglais"
     },
     {name: 'de',
      title: 'Allemand',
      type: 'array',
      of:[{type:"block"}],
      description:"texte en allemand"
     },
    ]
}