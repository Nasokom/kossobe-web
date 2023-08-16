import { client } from "../../Utils/sanityClient";


export default async function getColors(req, res) {

    const appColors = await client.fetch(`*[_type == "service"]{color,colorTxt}`);
    console.log(appColors)
    return res.send(appColors); 
}