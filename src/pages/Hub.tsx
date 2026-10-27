import { CymaticLayout } from '../components/CymaticLayout';
import { HubPortal } from '../components/HubPortal';

export const Hub = () => {
  return (
    <CymaticLayout>
      <div className="w-full">
        <h1 className="text-3xl font-sans font-black uppercase tracking-tight mb-8">Cymatic Hub: Operational Dashboard</h1>
        <HubPortal />
      </div>
    </CymaticLayout>
  );
};

export default Hub;
