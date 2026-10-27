export interface InfrastructureMetrics {
  latency: number[];
  efficiency: number;
  pulse: number;
  isOnline: boolean;
}

const latencyHistory: Record<string, number[]> = {};

export const fetchInfrastructureMetrics = async (subdomain: string): Promise<InfrastructureMetrics> => {
  const startTime = performance.now();
  let isOnline: boolean;
  let currentLatency: number;

  try {
    const targetUrl = subdomain === window.location.hostname || subdomain.includes('localhost') 
      ? '/api/health' 
      : `https://${subdomain}/api/v1/health`;
      
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);
    
    const response = await fetch(targetUrl, { 
      signal: controller.signal,
      mode: 'cors',
      cache: 'no-cache'
    });
    clearTimeout(timeoutId);
    
    currentLatency = Math.round(performance.now() - startTime);
    isOnline = response.ok;
  } catch {
    currentLatency = Math.round(performance.now() - startTime);
    isOnline = false;
  }

  // Maintain real historical latency array (up to 60 data points)
  if (!latencyHistory[subdomain]) {
    latencyHistory[subdomain] = Array(60).fill(currentLatency);
  } else {
    latencyHistory[subdomain].push(currentLatency);
    if (latencyHistory[subdomain].length > 60) {
      latencyHistory[subdomain].shift();
    }
  }

  return {
    latency: latencyHistory[subdomain],
    efficiency: isOnline ? 99 : 0,
    pulse: isOnline ? 80 : 0,
    isOnline,
  };
};
