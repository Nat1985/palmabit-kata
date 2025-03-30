import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import closeIcon from '../assets/images/close.png'
import Loader from './Loader';
import ErrorLabel from './ErrorLabel';
import { getDate } from '../utils/getDate';
import { Link } from 'react-router-dom';

interface Modal {
    id: string;
    closeModal: () => void
}

export interface Form {
    name: string;
    email: string;
    make: string;
    model: string;
    modelYear: number | null;
}

const formInitialState = {
    name: '',
    email: '',
    make: '',
    model: '',
    modelYear: null
}

interface ApptBooked {
    id: string | null;
    serviceName: string | null;
    serviceId: number | null;
    apptStartTime: string | null;
    email: string | null;
    name: string | null;
    make: string | null;
    model: string | null;
    modelYear: string | null;
}

function BookingModal({ id, closeModal }: Modal) {
    const [formInput, setFormInput] = useState<Form>(formInitialState)
    const handleFormInput = (event: ChangeEvent<HTMLInputElement>) => {
        const { id, value } = event.target;
        setFormInput(prevState => ({
            ...prevState,
            [id]: value
        }))
    }
    // Controllo che i dati siano tutti presenti
    const [isAllField, setIsAllField] = useState<boolean>(false);
    const checkAllField = () => {
        if (
            formInput.name &&
            formInput.email &&
            formInput.make &&
            formInput.model &&
            formInput.modelYear
        ) {
            setIsAllField(true)
        } else {
            setIsAllField(false)
        }
    }
    useEffect(() => {
        checkAllField()
    }, [formInput])
    // Invio dei dati
    const [fetchStatus, setFetchStatus] = useState<string>('i');
    const [error, setError] = useState<string | null>(null);
    const [appBooked, setAppBooked] = useState<ApptBooked | null>(null)
    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        bookAppointment();
    }
    const bookAppointment = async () => {
        setFetchStatus('l');
        try {
            // Simulo in piccolo ritardo
            await new Promise(resolve => setTimeout(resolve, 1000));
            const url = `http://localhost:2000/appointments/${id}`;
            const headers = { 'Content-Type': 'application/json' };
            const options = { method: 'POST', headers, body: JSON.stringify(formInput) };
            const response = await fetch(url, options);
            if (!response.ok) {
                const error = await response.json();
                throw error
            }
            const result = await response.json();
            setAppBooked(result);
            setFetchStatus('s');
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("Errore da parte del server.");
            }
            setFetchStatus('f');
        }
    }
    return (
        <div className='fixed inset-0 bg-black/80 z-10 flex justify-center items-center p-4' onClick={closeModal}>
            {
                !appBooked &&
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
                        {
                            fetchStatus === 'i' && isAllField &&
                            <button className='primary mt-8' type='submit'>Book</button>
                        }
                        {
                            fetchStatus === 'i' && !isAllField &&
                            <button className='disabled mt-8' disabled>Book</button>
                        }
                        {
                            fetchStatus === 'l' &&
                            <div className='mt-8 min-h-[42px] self-center'>
                                <Loader />
                            </div>
                        }
                        {
                            fetchStatus === 'f' && error &&
                            <div className='mt-8 min-h-[42px] self-center'>
                                <ErrorLabel message={error} />
                            </div>
                        }
                    </form>
                </div>
            }
            {
                fetchStatus === 's' && appBooked &&
                <div className="bg-white p-8 rounded-xl w-full md:w-fit">
                    <h3 className='text-center'>Service Booked!</h3>
                    <p className='text-center text-green-600 mt-4'>Appointment successfully booked. Here are the details of your reservation</p>
                    <ul className='list-disc mt-4 p-2 border-t border-neutral-300'>
                        <li className='ml-8'><span className='text-[#CF675F]'>Service:</span> {appBooked.serviceName}</li>
                        <li className='ml-8'><span className='text-[#CF675F]'>Email:</span> {appBooked.email}</li>
                        <li className='ml-8'><span className='text-[#CF675F]'>Make:</span> {appBooked.make}</li>
                        <li className='ml-8'><span className='text-[#CF675F]'>Model:</span> {appBooked.model}</li>
                        <li className='ml-8'><span className='text-[#CF675F]'>modelYear:</span> {appBooked.modelYear}</li>
                        <li className='ml-8 font-bold underline'><span className='text-[#CF675F]'>Date:</span> {getDate(appBooked.apptStartTime as string)}</li>
                    </ul>
                    <div className="flex justify-center">
                        <Link to="/"><button className="primary mt-8">Back to Homepage</button></Link>
                    </div>
                </div>
            }
        </div>
    )
}

export default BookingModal