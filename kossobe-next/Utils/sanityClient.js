import { createClient } from "next-sanity";
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
    projectId: 'jp385fcn',
    dataset: "production",
    apiVersion: "2022-03-25",
    useCdn: false
  });

const builder = imageUrlBuilder(client);

export const urlFor = (source) => {  
  const sanityImage = builder.image(source)
  const proxyUrl = () => `/api/image-proxy?url=${encodeURIComponent(sanityImage)}`
    return {url:proxyUrl}
};



export const  urlForVid = (asset)=> {
  return client
    .fileAsset(asset)
    .url();
}