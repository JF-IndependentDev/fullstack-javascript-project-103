
import yaml from 'js-yaml';

const parse = (content, extension) => {
    const cleanExt = extension.replace(/^\./, '').toLowerCase().trim();
    if (cleanExt  === 'json') {
        return JSON.parse(content);
    }

    if (cleanExt  === 'yml' || cleanExt  === 'yaml') {
        return yaml.load(content);
    }

    throw new Error(`${extension} No compatible`);
}
export default parse