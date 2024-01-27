import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import {colorInput} from '@sanity/color-input'
import {orderableDocumentListDeskItem} from '@sanity/orderable-document-list'


export default defineConfig({
  name: 'default',
  title: 'kossobe-web',

  projectId: 'jp385fcn',
  dataset: 'production',

 
  plugins: [colorInput(),deskTool({
    structure: (S,context) =>
      S.list()
        .title('WestSide')
        .items([
          // Minimum required configuration
          //orderableDocumentListDeskItem({type: '', S, context,title: 'Questions',}),
          S.listItem()
          .title("Settings")
          .child(
            // Instead of rendering a list of documents, we render a single
            // document, specifying the `documentId` manually to ensure
            // that we're editing the single instance of the document
            S.document().schemaType("settings").documentId("settings"),
          ),
          ...S.documentTypeListItems().filter(listItem => !['settings'].includes(listItem.getId()))
          
]),
  }), visionTool()],


  schema: {
    types: schemaTypes,
  },
})
