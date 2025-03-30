import { ChangeEvent, useState } from 'react'
import { useServices } from '../hooks/useServices'
import Loader from './Loader';
import { getDate } from '../utils/getDate';
import BookingModal from './BookingModal';
import ErrorLabel from './ErrorLabel';

interface AppointmentList {
    id: number,
    serviceDuration: number
}

interface Appointments {
    id: string;
    servicesName: string;
    apptStartTime: string;
}

function AppointmentList({ id, serviceDuration }: AppointmentList) {
    // Ricevo la lista di appuntamenti
    const { data, error, isLoading } = useServices<Appointments[]>(`/appointments/${id}`);
    const [selection, setSelection] = useState<string | null>(null);
    const handleSelection = (event: ChangeEvent<HTMLInputElement>) => {
        const { id } = event.target;
        setSelection(id);
    }
    // Gestisco la modale di prenotazione
    const [booking, setBooking] = useState<string | null>(null);
    const closeModal = () => {
        setBooking(null)
    }
    return (
        <div onClick={(e) => e.stopPropagation()} className='mt-2 flex flex-col gap-4'>
            <hr className="text-[#5F7FCF]" />

            <div className='text-xs mt-[-8px] text-neutral-400'>Duration of surgery: {serviceDuration / 60} minutes.</div>
            {
                isLoading && <Loader />
            }
            {
                !isLoading && data &&
                <ul>
                    {
                        data.map((element, index) => {
                            return <li key={index} className='mt-2 flex gap-1'>
                                <input
                                    type="radio"
                                    name="appointments"
                                    id={element.id}
                                    data-servicename={element.servicesName}
                                    onChange={handleSelection}
                                    checked={element.id === selection}
                                    className='cursor-pointer'
                                />
                                <label htmlFor={element.id} className='cursor-pointer'>{getDate(element.apptStartTime)}</label>
                            </li>
                        })
                    }
                </ul>
            }
            {
                !isLoading && error &&
                <ErrorLabel message={error} />
            }
            {selection && <button className='primary' onClick={() => setBooking(selection)}>Book Now</button>}
            {!selection && <button className='disabled'>Book Now</button>}
            {/* Overlay con modale di prenotazione */}
            {booking && <BookingModal id={booking} closeModal={closeModal} />}
        </div>
    )
}

export default AppointmentList