import { createHash } from 'crypto'

export const convertFilesToBase64 = async (files: File[]) => {
    const convertedFiles: {
        content: string
        cert: string
        name: string
    }[] = []

    await Promise.all(
        files.map(async (file) => {
            const buffer = Buffer.from(await file.arrayBuffer())
            const base64File = Buffer.from(buffer).toString('base64')
            const md5Hash = createHash('md5').update(base64File).digest('hex')

            convertedFiles.push({
                content: base64File,
                cert: md5Hash,
                name: file.name,
            })
        })
    )

    return convertedFiles
}
