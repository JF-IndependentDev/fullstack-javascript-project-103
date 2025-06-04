


const parse = (content, extension) =>{
    if (extension === 'json' ){
        return JSON.parse(content);
    }
    throw new Error(`${extension} No compatible`);
}
export default parse