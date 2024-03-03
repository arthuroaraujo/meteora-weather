import { fetchWeatherApi } from 'openmeteo';
import { validateDates } from '@/utils/utils';

interface WeatherRequest {
    startDate: string,
    endDate: string,
}

interface WeatherResponse {
    hourly: {
        time: any,
        temperature2m: any,
        apparentTemperature: any,
        windSpeed10m: any,
        windSpeed80m: any,
    }
}

export async function fetchWeatherData({ startDate, endDate }: WeatherRequest) {

    const validationMessage = validateDates(startDate, endDate);
    if (validationMessage) {
        alert(validationMessage);
        return;
    }

    const params = {
        "latitude": 52.52,
        "longitude": 13.41,
        "hourly": ["temperature_2m", "apparent_temperature", "wind_speed_10m", "wind_speed_80m"],
        "start_date": startDate,
        "end_date": endDate
    };

    const range = (start: number, stop: number, step: number) =>
        Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

    const url = "https://api.open-meteo.com/v1/gfs";
    try {
        const responses = await fetchWeatherApi(url, params);
        const response = responses[0];
        const utcOffsetSeconds = response.utcOffsetSeconds();

        const hourly = response.hourly()!;

        const weatherData: WeatherResponse = {

            hourly: {
                time: range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map(
                    (t) => new Date((t + utcOffsetSeconds) * 1000)
                ),
                temperature2m: hourly.variables(0)!.valuesArray()!,
                apparentTemperature: hourly.variables(1)!.valuesArray()!,
                windSpeed10m: hourly.variables(2)!.valuesArray()!,
                windSpeed80m: hourly.variables(3)!.valuesArray()!,
            },

        };


        return weatherData;



    } catch (error) {
        console.error('Erro ao buscar dados meteorológicos:', error);
    }
}
