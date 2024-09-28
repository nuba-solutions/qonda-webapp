'use server'

export const login = async (values: any) => {
    let response = { status: 403 }
    if (values.username === 'test@qonda.ai' && values.password === 'nuba') {
        response = { status: 200 }
    }

    return response
}
