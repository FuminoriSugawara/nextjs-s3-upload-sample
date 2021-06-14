import aws from 'aws-sdk'
import { NextApiRequest, NextApiResponse } from 'next'
export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { key } = req.query
    aws.config.update({
        region: process.env.ASW_S3_REGION,
        signatureVersion: 'v4',
    })
    const s3 = new aws.S3()
    if (key) {
        const url = s3.getSignedUrl('getObject', {
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: key,
            Expires: 5,
        })
        res.status(200).json(JSON.stringify(url))
    } else {
        res.status(400).end()
    }
}
export default handler
