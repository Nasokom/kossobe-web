export default {
    name:'settings',
    type:'document',
    title:'App Settings',

    fields:[
        {
            name:'colorLigth',
            description:"Couleur pour le light Theme",
            type:'color',
            title:'Couleur LightMode',
        },

        {
            name:'colorDark',
            description:"Couleur pour le dark theme",
            type:'color',
            title:'Couleur DarkMode'
        }
    ],
    // Option pour rendre ce type de document unique
    options: {
      // Utilisez l'option singleInstance pour définir un document unique
      singleInstance: true
    }
    
}