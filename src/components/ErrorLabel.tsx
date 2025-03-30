import React from 'react'

function ErrorLabel({message}: {message: string}) {
    return (
        <div className='text-red-500'>{message}</div>
    )
}

export default ErrorLabel