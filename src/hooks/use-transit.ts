import { useQuery } from '@tanstack/react-query';
import GtfsRealtimeBindings from 'gtfs-realtime-bindings';

const fetchTransitApi = async () => {
  const url = new URL(
    'https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs'
  );

  const response = await fetch(url);

  const buffer = await response.arrayBuffer();
  const feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(
    new Uint8Array(buffer)
  );

  const vehicles = feed.entity
    .filter((e) => e.vehicle)
    .map((e) => {
      const vehicle = e.vehicle;

      if (!vehicle) {
        throw new Error('Vehicle data is missing');
      }
      return {
        id: e.id,
        tripId: vehicle.trip?.tripId,
        routeId: vehicle.trip?.routeId,
        currentStopSequence: vehicle.currentStopSequence,
        currentStatus: vehicle.currentStatus,
        congestionLevel: vehicle.congestionLevel,
        timestamp: vehicle.timestamp || Date.now(),
        latitude: vehicle.position?.latitude,
        longitude: vehicle.position?.longitude,
        bearing: vehicle.position?.bearing,
        speed: vehicle.position?.speed,
      };
    })
    .filter((v) => v.routeId === '1');

  return { vehicles, timestamp: Date.now() };
};

export const useTransit = () => {
  return useQuery({
    queryKey: ['transit'],
    queryFn: fetchTransitApi,
  });
};
