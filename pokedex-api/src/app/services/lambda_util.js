import AWS from 'aws-sdk';
import bluebird from 'bluebird';

const { ACCESS_KEY_ID, SECRET_ACCESS_KEY, AWS_REGION, LAMBDA_REPORT_NAME } = process.env;

class LambdaUtil {
    async invokeLambdaReport(payload){
        AWS.config.setPromisesDependency(bluebird);
        AWS.config.update({ accessKeyId: ACCESS_KEY_ID, secretAccessKey: SECRET_ACCESS_KEY, region: AWS_REGION });
        const lambda = new AWS.Lambda();
        let params = {
            FunctionName   : LAMBDA_REPORT_NAME,
            InvocationType : 'RequestResponse',
            LogType        : 'None',
            Payload        : JSON.stringify(payload),
        };
        const result = await lambda.invoke(params).promise();
        return result;
    }
}

export default new LambdaUtil();