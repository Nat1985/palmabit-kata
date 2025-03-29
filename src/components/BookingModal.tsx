import React, { ChangeEvent, Dispatch, FormEvent, SetStateAction, useEffect, useState } from 'react'
import closeIcon from '../assets/images/close.png'

interface Modal {
    id: string;
    closeModal: () => void
}

interface Form {
    name: string;
    email: string;
    make: string;
    model: string;
    modelYear: number | null;
}

const initialState = {
    name: '',
    email: '',
    make: '',
    model: '',
    modelYear: null
}

// INSERISCI sotto il titolo la data e il tipi di servizio che si sta prenotando
function BookingModal({ id, closeModal }: { id: string, closeModal: () => void }) {
    const [formInput, setFormInput] = useState<Form>(initialState)
    const handleFormInput = (event: ChangeEvent<HTMLInputElement>) => {
        const { id, value } = event.target;
        setFormInput(prevState => ({
            ...prevState,
            [id]: value
        }))
    }
    useEffect(() => {
        console.log(formInput)
    }, [formInput])
    // Controllo che i dati siano tutti presenti
    //
    //
    //
    // Gestisco l'invio dei dati
    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        
    }
    return (
        <div className='fixed inset-0 bg-black/80 z-10 flex justify-center items-center p-4' onClick={closeModal}>
            <div className="bg-white p-4 rounded-xl w-full md:w-fit" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-end"><img src={closeIcon} alt="Close Icon" className='w-8 cursor-pointer' onClick={closeModal} /></div>
                <h3 className='text-center'>Book your Service</h3>
                <p className='mb-4 text-center text-neutral-300 italic'>Enter all required data and click Book</p>
                <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                    <div className='flex flex-col md:flex-row gap-2'>
                        <div className="input-box">
                            <label htmlFor="name">Name:</label>
                            <input type="text" id="name" onChange={handleFormInput} />
                        </div>
                        <div className="input-box flex-1">
                            <label htmlFor="email">Email:</label>
                            <input type="text" id="email" onChange={handleFormInput} />
                        </div>
                    </div>
                    <div className='flex flex-col md:flex-row gap-2'>
                        <div className="input-box">
                            <label htmlFor="make">Make:</label>
                            <input type="text" id="make" onChange={handleFormInput} />
                        </div>
                        <div className="input-box">
                            <label htmlFor="model">Model:</label>
                            <input type="text" id="model" onChange={handleFormInput} />
                        </div>
                        <div className="input-box w-24">
                            <label htmlFor="modelYear">Year:</label>
                            <input type="number" id="modelYear" onChange={handleFormInput} />
                        </div>
                    </div>
                    <button className='primary mt-8' type='submit'>Book</button>
                </form>
            </div>
        </div>
    )
}

export default BookingModal