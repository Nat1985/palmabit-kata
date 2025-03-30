import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import ServiceCard from "../components/ServiceCard";
import { useServices } from "../hooks/useServices";
import ErrorLabel from "../components/ErrorLabel";

export interface Services {
  id: number;
  serviceName: string;
  serviceDuration: number;
}

function ServicesPage() {
  const { data, isLoading, error } = useServices<Services[]>("/services");
  return (
    <main>
      <Link to="/"><button className="secondary">Back</button></Link>
      <h2>Select a Service</h2>
      <div className="w-full flex flex-col items-center gap-6">
        {
          data?.map((service, index) => {
            return <ServiceCard
              key={index}
              id={service.id}
              serviceName={service.serviceName}
              serviceDuration={service.serviceDuration}
            />
          })
        }
        {
          isLoading &&
          <Loader />
        }
        {
          error &&
          <ErrorLabel message={error} />
        }
      </div>
    </main>
  )
}

export default ServicesPage