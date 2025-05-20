
import * as fs from 'node:fs';
import * as path from 'node:path';

export const readFile = (filepath) => {
    const fullpath = path.resolve(process.cwd(), filepath);
    console.log('Leyendo archivo en:', fullpath);
    return fs.readFileSync(fullpath, 'utf-8');
}

export const parse = (content, extension) =>{
    if (extension === '.json' ){
        return JSON.parse(content);
    }
    throw new Error(`${extension} Not supported`);
}