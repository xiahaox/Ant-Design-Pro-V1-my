const fs=require('fs');
const path=require('path');
const mockPath=path.join(__dirname+'/mock');
import { format, delay } from 'roadhog-api-doc';
const mock={};
fs.readdirSync(mockPath).forEach(file=>{
    Object.assign(mock,require('./mock/'+file));
});

export default delay(mock,1000) ;