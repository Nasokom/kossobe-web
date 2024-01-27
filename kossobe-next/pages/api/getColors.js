import { client } from "../../Utils/sanityClient";


export default async function getColors(req, res) {

    //const appColors = await client.fetch(`*[_type == "service"]{color,colorTxt}`);
    const appColors = await client.fetch(`*[_type == "settings"][0]`);
    //console.log(appColors)
    return res.send(appColors); 
}