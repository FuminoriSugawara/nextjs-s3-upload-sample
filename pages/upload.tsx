import { useEffect, useState } from 'react'

export default function Upload() {
    const [fileUrl, setFileUrl] = useState('')
    const uploadPhoto = async (e) => {
        const file = e.target.files[0]
        const filename = encodeURIComponent(file.name)
        const res = await fetch(`/api/presigned?file=${filename}`)
        const { url, fields } = await res.json()
        const formData = new FormData()

        Object.entries<any>({ ...fields, file }).forEach(([key, value]) => {
            formData.append(key, value)
        })

        const upload = await fetch(url, {
            method: 'POST',
            body: formData,
        })

        if (upload.ok) {
            console.log('Uploaded successfully!')
            setFileUrl(await getFileUrl(fields.key))
        } else {
            console.error('Upload failed.')
        }
    }
    const getFileUrl = async (key: string) => {
        const response = await fetch(`/api/file?key=${key}`)
        if (response) {
            const downloadUrl = await response.json()
            return downloadUrl
        }
    }
    useEffect(() => {
        console.log(fileUrl)
    }, [fileUrl])

    return (
        <>
            <p>Upload a .png or .jpg image (max 1MB).</p>
            <input
                onChange={uploadPhoto}
                type="file"
                accept="image/png, image/jpeg"
            />
            {fileUrl && <img src={fileUrl} />}
        </>
    )
}
