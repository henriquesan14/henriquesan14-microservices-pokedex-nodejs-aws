import axios from 'axios';
import btoa from 'btoa';

class ImageUtil {

    getImage(url){
        return axios.get(url, {responseType: 'arraybuffer'});
    }

    imageEncode (arrayBuffer) {
        let b64encoded = btoa([].reduce.call(new Uint8Array(arrayBuffer),function(p,c){return p+String.fromCharCode(c)},''))
        let mimetype="image/png"
        return "data:"+mimetype+";base64,"+b64encoded
    }
}

export default new ImageUtil();