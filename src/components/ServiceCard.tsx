import { Services } from "../pages/ServicesPage"
import carDetailingIcon from '../assets/images/car-detailing.png'
import discBrakeIcon from '../assets/images/disc-brake.png'
import oilIcon from '../assets/images/oil.png'
import tireIcon from '../assets/images/tire.png'
import arrowDown from '../assets/images/arrow-down.png'
import { useEffect, useState } from "react"
import AppointmentList from "./AppointmentList"
import { useServices } from "../hooks/useServices"

const iconArray = [
  carDetailingIcon,
  discBrakeIcon,
  oilIcon,
  tireIcon
]

function ServiceCard({ id, serviceName, serviceDuration }: Services) {
  const [isSelected, setIsSelected] = useState<boolean>(false);
  return (
    <div className="w-full md:w-[600px] border rounded-lg p-4 border-[#5F7FCF]"
      onClick={() => setIsSelected(prev => !prev)}
    >
      {/* Titolo */}
      <div className="w-full flex gap-2 justify-between cursor-pointer">
        <div className="flex gap-6 items-center">
          <img src={iconArray[id]} alt={`${serviceName} Icon`} className="w-12" />
          <h3 className="!text-black hidden md:block">{serviceName}</h3>
          <h4 className="!text-black md:hidden">{serviceName}</h4>
        </div>
        <div className={`
          flex items-center
          ${isSelected ? 'rotate-180' : 'rotate-0'}
          transition-transform duration-200 ease-in-out
          `}><img src={arrowDown} /></div>
      </div>
      {/* Contenuto */}
      {
        isSelected &&
        <AppointmentList id={id} serviceDuration={serviceDuration} />
      }
    </div>
  )
}

export default ServiceCard