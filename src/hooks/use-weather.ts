import { useQuery } from '@tanstack/react-query';
import { z } from 'zod';

const WeatherApiSchema = z.object({
  current: z.object({
    interval: z.number(),
    precipitation: z.number(),
    snowfall: z.number(),
    precipitation_probability: z.number(),
    temperature_2m: z.number(),
    time: z.string(),
  }),
  current_units: z.object({
    interval: z.string(),
    precipitation: z.string(),
    precipitation_probability: z.string(),
    temperature_2m: z.string(),
    time: z.string(),
  }),
  elevation: z.number(),
  generationtime_ms: z.number(),
  latitude: z.number(),
  longitude: z.number(),
  timezone: z.string(),
  timezone_abbreviation: z.string(),
  utc_offset_seconds: z.number(),
});

const fetchWeatherApi = async () => {
  const url = new URL('https://api.open-meteo.com/v1/forecast');
  url.searchParams.set('latitude', '40.71');
  url.searchParams.set('longitude', '-74.01');
  url.searchParams.set(
    'current',
    'temperature_2m,precipitation_probability,precipitation,snowfall'
  );

  const response = await fetch(url).then((res) => res.json());

  return WeatherApiSchema.parse(response);
};

export const useWeather = () => {
  return useQuery({
    queryKey: ['weather'],
    queryFn: fetchWeatherApi,
  });
};
