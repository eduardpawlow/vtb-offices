import { GeocodeResponceResult, OfficeWorkload } from "@/api";

import styles from "./index.module.css";
import classNames from "classnames";
import { useState } from "react";
import { Button, Input, Modal, QRCode, Select } from "antd";
import { CopyOutlined, ExportOutlined } from "@ant-design/icons";
interface Props {
  userPoint?: GeocodeResponceResult;
  office: OfficeWorkload;
}

const round = (num: number, d = 2) => {
  const coef = Math.pow(10, d);
  return Math.round(num * coef) / coef;
};

const formatDistance = (distance: number) => {
  const mInKm = 1000;

  if (distance < mInKm) return `${round(distance)} м.`;

  return `${round(distance / mInKm)} км`;
};

const toHumanTime = (seconds: number) => {
  const minutes = Math.ceil(seconds / 60);

  if (minutes < 60) return `${minutes} минут`;

  const hours = Math.ceil(minutes / 60);

  if (hours < 24) return `${hours} часов`;

  return `${Math.ceil(hours / 24)} дней`;
};

export const getWorkloadColor = (num: number) => {
  if (num > 4 && num <= 7.5) {
    return "yellow";
  }

  if (num > 7.5) {
    return "red";
  }

  return "green";
};

export const SidebarOfficeInfo: React.FC<Props> = ({ office, userPoint }) => {
  const barWidth = (office.workload_koef / 10) * 100;
  const indexColor = getWorkloadColor(office.workload_koef);

  const [open, setOpen] = useState(false);

  const link = `https://yandex.ru/maps/?rtext=${userPoint?.location.join(
    ","
  )}~${[office.latitude, office.longitude].join(",")}`;

  const devices = [
    {
      value: "Iphone13",
      label: "Iphone 13",
    },
  ];

  return (
    <>
      <Modal open={open} onCancel={() => setOpen(false)} footer={""}>
        <div className={styles.modalDevice}>
          <Select
            style={{ width: "100%" }}
            options={devices}
            labelInValue
            placeholder="Выберите устройтво"
          />
          <Button>Отправить</Button>
        </div>

        <div className={styles.modalLink}>
          <Input value={link} readOnly />
          <Button icon={<CopyOutlined />} />
          <Button
            icon={<ExportOutlined />}
            onClick={() => window.open(link, "_blank")}
          />
        </div>

        <div className={styles.modalQR}>
          <QRCode value={link} />
        </div>
      </Modal>

      <div className={styles.info}>
        <div className={styles.title}>{office.officeName}</div>
        <div className={styles.address}>{office.address}</div>
        <div className={styles.actions}>
          <button
            className={classNames(styles.btn)}
            onClick={() => setOpen(true)}
          >
            Проложить маршрут • {formatDistance(office.distance)}
          </button>
        </div>

        <div className={styles.workloadInfo}>
          <div className={styles.workLoadInfoTitle}>Загруженность</div>

          <div
            className={classNames(
              styles.workloadInfoStatus,
              styles[`workloadInfoStatus_${indexColor}`]
            )}
          >
            <div className={styles.workloadInfoBar}>
              <div
                className={styles.workloadInfoBarProgress}
                style={{ width: `${barWidth}%` }}
              ></div>
            </div>
            <div className={styles.workloadInfoIndex}>
              {round(office.workload_koef)}
            </div>
          </div>

          <div className={styles.workloadInfoDetail}>
            <div className={styles.detailRow}>
              <div className={styles.detailRowTitle}>Рейтинг отделения:</div>
              <div className={styles.detailRowValue}>{round(office.rate)}</div>
            </div>

            <div className={styles.detailRow}>
              <div className={styles.detailRowTitle}>Количество клиентов:</div>
              <div className={styles.detailRowValue}>{office.count_people}</div>
            </div>

            <div className={styles.detailRow}>
              <div className={styles.detailRowTitle}>
                Среднее время операции:
              </div>
              <div className={styles.detailRowValue}>
                {toHumanTime(office.handling_duration)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
