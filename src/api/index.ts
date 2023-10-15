import axios, { AxiosResponse } from 'axios'

const baseUrl = 'http://185.244.51.218:8070/api/v1'

export type ClientType = 1 | 2

export interface Service {
    "handling_id": number,
    "title": string,
    "client_type": ClientType,
    "handling_duration": number
}

interface GetServicesQuery {
  clientType: ClientType
}

type Location = [number, number]

interface GetOfficesQuery {
  location: Location,
  filters: {
    type: number,
    clientType: ClientType,
    service?: Service
  }
}

export interface OfficeWorkload {
  office_id: number,
  latitude: number,
  longitude: number,
  rate: number,
  distance: number,
  wait_time: number,
  travel_duration_human: number,
  travel_duration_car: number,
  count_people: number,
  address: string,
  workload_koef: number,
  officeName: string,
  metro_station: string,
  has_ramp: boolean,
  client_types: Array<number>,
  handling_types: Array<number>,
  handling_duration: number
}

interface GetOfficesResponseResult {
  data: OfficeWorkload[]
}

export interface GeocodeResponceResult {
  location: Location
}

export default {
  getServices(query: GetServicesQuery): Promise<AxiosResponse<{data: Service[]}>> {
    return axios.get(baseUrl + '/handling_list/by_client', { params: {
      client_type: query.clientType
    }})
  },
  getOffices(query: GetOfficesQuery): Promise<AxiosResponse<GetOfficesResponseResult>> {
    return axios.post(baseUrl + '/office/location', { 
      "longitude":  +query.location[1],
      "latitude":  +query.location[0],
      "filter": {
          "handling_type": query.filters.service?.handling_id || 1,
          "client_type": query.filters.clientType
      }
    })
  },
  async geocode(query: string): Promise<GeocodeResponceResult[]> {
      const response = await axios.get('https://geocode-maps.yandex.ru/1.x/', {
        params: {
          format: 'json',
          apikey: 'a458bd1e-2865-48a6-be5e-d0d80bbeaa18',
          results: 1,
          geocode: query,
        }
      })

      const features = response.data.response.GeoObjectCollection.featureMember as Array<any>

      return features.map(f => ({location: f.GeoObject.Point.pos.split(' ').reverse()}))
  }
}