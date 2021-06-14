import aws from 'aws-sdk'
import { NextApiRequest, NextApiResponse } from 'next'
export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    aws.config.update({
        region: process.env.ASW_S3_REGION,
        signatureVersion: 'v4',
    })
    const s3 = new aws.S3()
    const post = s3.createPresignedPost({
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Fields: {
            key: req.query.file,
        },
        Expires: 10, // seconds
        Conditions: [
            ['content-length-range', 0, 1048576], // up to 1 MB
        ],
    })
    res.status(200).json(post)
}
export default handler
