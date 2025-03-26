import { Services } from "../pages/ServicesPage"

function ServiceCard({id, serviceName, serviceDuration}: Services) {
  return (
    <div>
      <div>{id}</div>
      <div>{serviceName}</div>
      <div>{serviceDuration}</div>
    </div>
  )
}

export default ServiceCard