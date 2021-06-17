const AWS  = require('aws-sdk');
const PDFKit = require("pdfkit")

const { ACCESS_KEY_ID, SECRET_ACCESS_KEY, BUCKET_NAME, REGION, URL_BUCKET_REPORT } = process.env;

const getPDF = async (data) => {

    return new Promise(resolve => {
        const doc = new PDFKit()

        doc.fontSize(20);
        doc.text(`Pokédex trainer: ${data.trainer.id} `, {
            width: 410,
            align: 'center',
            lineGap: 30
            }
        );
        
        data.pokedex.forEach((p) => {
    
            doc.fontSize(13);
            doc.text(`Pokemon: ${p.pokemon}`, {
                width: 410,
                align: 'left',
                lineGap: 10
                }
            );
    
            doc.fontSize(11);
            doc.text(`Local: ${p.local}`, {
                width: 410,
                align: 'left',
                lineGap: 10
                }
            );
            doc.text(`Date: ${p.date}`, {
                width: 410,
                align: 'left',
                lineGap: 10
                }
            );

            doc.text(`Image: ${p.image}`, {
                width: 600,
                align: 'left',
                lineGap: 30,
                link: p.image
                }
            );
        });

        

        const buffers = []
        doc.on("data", buffers.push.bind(buffers))
        doc.on("end", () => {
        const pdf = Buffer.concat(buffers)
        
        resolve(pdf);
        })

        doc.end();
    });
}

const upload = async (buffer, trainerId) => {
        AWS.config.update({ accessKeyId: ACCESS_KEY_ID, secretAccessKey: SECRET_ACCESS_KEY, region: REGION });
        const s3 = new AWS.S3();
        const key = `report_${trainerId}_${new Date().getTime()}.pdf`;
        const params = {
          Bucket: BUCKET_NAME,
          Key: key,
          Body: buffer,
          ACL: 'public-read',
          ContentType: `application/pdf`
        }

    return await new Promise((resolve, reject) => {
        s3.putObject(params, (err, results) => {
            if(err) reject(err);
            else {
                resolve(key);
            }
        })
    });
}

const main = async (event) => {
    const pdf = await getPDF(event);
    const result = await upload(pdf, event.trainer.id);
    return `${URL_BUCKET_REPORT}${result}`;
}

exports.handler = main;