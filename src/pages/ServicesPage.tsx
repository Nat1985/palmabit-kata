import { SecondaryButton } from "../components/buttons"
import ServiceCard from "../components/ServiceCard";
import { useServices } from "../hooks/useServices";

export interface Services {
  id: number;
  serviceName: string;
  serviceDuration: number;
}

function ServicesPage() {
  const { data, isLoading, error } = useServices<Services[]>("/services");
  return (
    <main>
      <SecondaryButton link="/">Back</SecondaryButton>
      <h2>Select a Service</h2>
      <div>
        {
          data?.map((service, index) => {
            return <ServiceCard
              id={service.id}
              serviceName={service.serviceName}
              serviceDuration={service.serviceDuration}
            />
          })
        }
        {
          isLoading &&
          <div>Loading...</div>
        }
      </div>
    </main>
  )
}

export default ServicesPage