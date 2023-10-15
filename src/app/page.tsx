"use client";
import styles from "./page.module.css";
import classNames from "classnames";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Chip } from "@/components/ui/chip";
import api, {
  ClientType,
  GeocodeResponceResult,
  OfficeWorkload,
  Service,
} from "@/api";
import useDebounce from "@/hooks/use-debounce";
import { SidebarOfficeListItemCard } from "@/components/map/sidebar-office-list-item-card";
import {
  SidebarOfficeInfo,
  getWorkloadColor,
} from "@/components/map/sidebar-office-info";
export default function Home() {
  const defaultState = {
    center: [55.751574, 37.573856],
    zoom: 5,
  };

  const mapRef = useRef<ymaps.Map>();

  const [search, setSearch] = useState("");
  const [officeType, setOfficeType] = useState("office");
  const [clientType, setClientType] = useState<ClientType>(1);

  const [services, setServices] = useState<Service[]>([]);
  const [selectedService, setSelectedService] = useState<Service>();

  const [userPoint, setUserPoint] = useState<GeocodeResponceResult>();
  const [error, setError] = useState("");

  const [offices, setOffices] = useState<OfficeWorkload[]>([]);
  const [selectedOffice, setSelectedOffice] = useState<OfficeWorkload>();

  const fetchLocation = async (query: string) => {
    if (!query) return;

    try {
      const points = await api.geocode(query);

      if (!points.length) {
        setError("Ничего не найдено");
      } else {
        setUserPoint(points[0]);
      }
    } catch (err) {
      setError("Ошибка выполнения запроса");
    }
  };

  const fetchLocationDebounced = useDebounce(fetchLocation, 1000);

  const fetchServices = async (cT: ClientType) => {
    if (!cT) return;

    try {
      const response = await api.getServices({
        clientType: cT,
      });

      setServices(response.data.data ? response.data.data : []);
    } catch (error) {}
  };

  const fetchOffices = async () => {
    if (!userPoint) return;

    try {
      const response = await api.getOffices({
        location: userPoint.location,
        filters: {
          type: 1,
          clientType: clientType,
          service: selectedService,
        },
      });

      setOffices(response.data.data ? response.data.data : []);
    } catch (err) {
      setOffices([]);
    }
  };

  const onChangeClientType = (cT: ClientType) => {
    setClientType(cT);
    fetchServices(cT);
    setSelectedService(undefined);
  };

  const onChangeSearch = (event: ChangeEvent<HTMLInputElement>) => {
    !!error && setError("");
    setSearch(event.target.value);
  };

  const showOffice = (office: OfficeWorkload) => {
    setSelectedOffice(office);
    mapRef.current?.setCenter([office.latitude, office.longitude], 16, {
      duration: 300,
    });
  };

  const toggleSelectedService = (ser: Service) => {
    if (ser === selectedService) {
      setSelectedService(undefined);
    } else {
      setSelectedService(ser);
    }
  };

  useEffect(() => {
    fetchServices(clientType);
  }, []);

  useEffect(() => {
    setUserPoint(undefined);
    fetchLocationDebounced(search);
  }, [search]);

  useEffect(() => {
    fetchOffices();
  }, [userPoint, officeType, clientType, selectedService]);

  const isShowingServices = !!clientType && !!services.length;
  return (
    <main className={styles.main}>
      <div className={classNames("container", styles.heading)}>
        <h1>ВТБ. Банки и отделения</h1>
        <h3>
          Здесь вы можете найти ближайшее отделение банка и посмотреть его
          загруженность
        </h3>
      </div>

      <div className={styles.mapWrapper}>
        {!selectedOffice && (
          <div className={styles.sidebar}>
            <div className={styles.sidebarContent}>
              <div className={styles.sidebarInputWrapper}>
                <input
                  className={styles.sidebarInput}
                  value={search}
                  onChange={onChangeSearch}
                  placeholder="Город, район, улица..."
                />
                {error && <div className={styles.inputError}>{error}</div>}
              </div>

              <div className={styles.scrollContainer}>
                <div className={styles.filters}>
                  <div className={styles.chipsBlock}>
                    <div className={styles.label}>Показать</div>
                    <div className={styles.chips}>
                      <Chip
                        label="Отделения"
                        filled={officeType === "office"}
                        onCick={() => setOfficeType("office")}
                      />
                      <Chip
                        label="Банкоматы"
                        filled={officeType === "atm"}
                        onCick={() => setOfficeType("atm")}
                      />
                    </div>
                  </div>

                  <div className={styles.chipsBlock}>
                    <div className={styles.label}>Выбрать сегмент</div>
                    <div className={styles.chips}>
                      <Chip
                        label="Физ. лицо"
                        filled={clientType === 1}
                        onCick={() => onChangeClientType(1)}
                      />
                      <Chip
                        label="Юр. лицо"
                        filled={clientType === 2}
                        onCick={() => onChangeClientType(2)}
                      />
                    </div>
                  </div>

                  {isShowingServices && (
                    <div className={styles.chipsBlock}>
                      <div className={styles.label}>Уточнить услугу</div>
                      <div className={styles.chips}>
                        {services.map((ser, index) => (
                          <Chip
                            key={ser.title + " " + index}
                            label={ser.title}
                            filled={selectedService === ser}
                            onCick={() => toggleSelectedService(ser)}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className={styles.officesInfo}>
                  <div className={styles.radiusInfo}>В радиусе 3 км</div>
                  <div className={styles.officeList}>
                    {offices.map((o) => (
                      <SidebarOfficeListItemCard
                        key={o.office_id}
                        office={o}
                        onClick={() => showOffice(o)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {!!selectedOffice && (
          <div className={styles.sidebar}>
            <div
              className={styles.sidebarContent}
              style={{ paddingTop: "20px" }}
            >
              <div
                className={styles.sidebarClose}
                onClick={() => setSelectedOffice(undefined)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="13"
                  height="13"
                  viewBox="0 0 13 13"
                  fill="none"
                >
                  <g clip-path="url(#clip0_148_222)">
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M0.488466 1.00824C0.793075 0.703633 1.28694 0.703633 1.59155 1.00824L6.24001 5.6567L10.8885 1.00824C11.1931 0.703633 11.6869 0.703633 11.9916 1.00824C12.2962 1.31285 12.2962 1.80672 11.9916 2.11133L7.3431 6.75978L11.9916 11.4082C12.2962 11.7128 12.2962 12.2067 11.9916 12.5113C11.6869 12.8159 11.1931 12.8159 10.8885 12.5113L6.24001 7.86287L1.59155 12.5113C1.28694 12.8159 0.793075 12.8159 0.488466 12.5113C0.183858 12.2067 0.183858 11.7128 0.488466 11.4082L5.13692 6.75978L0.488466 2.11133C0.183858 1.80672 0.183858 1.31285 0.488466 1.00824Z"
                      fill="#8A96A8"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_148_222">
                      <rect width="13" height="13" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <SidebarOfficeInfo
                office={selectedOffice}
                userPoint={userPoint}
              />
            </div>
          </div>
        )}

        <YMaps>
          <Map
            instanceRef={mapRef}
            className={styles.map}
            defaultState={defaultState}
          >
            {userPoint && (
              <Placemark
                defaultOptions={{
                  iconLayout: "default#image",
                  iconImageHref: "/user-point.svg",
                  cursor: "default",
                }}
                geometry={userPoint.location}
              />
            )}

            {offices.map((o) => (
              <Placemark
                key={o.office_id}
                defaultOptions={{
                  iconLayout: "default#image",
                  iconImageHref: `/office-workload-${getWorkloadColor(
                    o.workload_koef
                  )}.svg`,
                  cursor: "pointer",
                }}
                geometry={[o.latitude, o.longitude]}
              />
            ))}
          </Map>
        </YMaps>
      </div>
    </main>
  );
}
