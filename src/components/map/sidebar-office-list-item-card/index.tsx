import { OfficeWorkload } from "@/api";

import styles from "./index.module.css";

interface Props {
  office: OfficeWorkload;
  onClick?: () => void;
}

const humanIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="15"
    height="15"
    viewBox="0 0 15 15"
    fill="none"
  >
    <path
      d="M8.20913 2.28806C8.20751 1.9835 8.29634 1.6853 8.46437 1.43128C8.6324 1.17725 8.87206 0.978826 9.15298 0.861149C9.4339 0.743472 9.74343 0.711841 10.0423 0.770265C10.3413 0.828689 10.6161 0.974537 10.832 1.18933C11.048 1.40412 11.1953 1.67818 11.2553 1.97678C11.3153 2.27537 11.2853 2.58507 11.1692 2.86661C11.053 3.14816 10.8558 3.38887 10.6027 3.55825C10.3496 3.72764 10.0519 3.81806 9.74731 3.81806C9.34099 3.81735 8.9514 3.65619 8.66332 3.36965C8.37524 3.0831 8.212 2.69437 8.20913 2.28806Z"
      fill="#696F84"
    />
    <path
      d="M12.9545 8.10819C12.8951 8.229 12.8031 8.3308 12.6889 8.40212C12.5746 8.47344 12.4428 8.51144 12.3081 8.51183C12.2006 8.51014 12.095 8.48304 12 8.43274L10.2354 7.56274C10.1114 7.50244 10.0072 7.40778 9.93542 7.29001L9.27269 6.16638L8.3536 8.29637L9.64087 10.2818C9.73385 10.4246 9.78314 10.5914 9.78269 10.7618V13.3636C9.78289 13.4928 9.75493 13.6205 9.70077 13.7378C9.6466 13.8551 9.56753 13.9591 9.46906 14.0427C9.30686 14.1783 9.10224 14.2526 8.89087 14.2527C8.84101 14.258 8.79074 14.258 8.74088 14.2527C8.53137 14.2107 8.34323 14.0965 8.20919 13.9301C8.07516 13.7636 8.00369 13.5555 8.00724 13.3418V11.0291L6.97088 9.43092C6.84761 9.44452 6.72323 9.44452 6.59997 9.43092L5.99997 10.6991C5.94199 10.8187 5.85815 10.924 5.75451 11.0073L3.43633 12.9164C3.27627 13.045 3.07713 13.1152 2.87178 13.1155C2.73854 13.1142 2.60731 13.0828 2.48785 13.0238C2.36839 12.9648 2.26378 12.8796 2.18178 12.7746C2.1074 12.6849 2.0517 12.5813 2.01798 12.4699C1.98425 12.3584 1.97318 12.2413 1.98542 12.1255C2.00941 11.8895 2.12615 11.6727 2.30997 11.5227L4.49178 9.75547L5.28815 8.07819C5.24998 7.79591 5.2886 7.50856 5.39997 7.24638L6.43906 4.83547L5.7436 5.10819L4.77815 7.29001C4.69874 7.46102 4.5552 7.59389 4.37857 7.65987C4.20195 7.72584 4.00645 7.71962 3.83437 7.64255C3.6623 7.56547 3.5275 7.42375 3.45913 7.24803C3.39076 7.07232 3.39433 6.87675 3.46906 6.70365L4.55997 4.2491C4.59893 4.15626 4.65767 4.07302 4.73209 4.0052C4.80651 3.93737 4.89482 3.88659 4.99088 3.85638L6.86178 3.16092C7.04564 3.09332 7.2419 3.06612 7.43721 3.08118C7.63251 3.09624 7.82229 3.15321 7.9936 3.24819C8.01928 3.26295 8.04154 3.28297 8.05894 3.30694C8.07633 3.33092 8.08845 3.3583 8.09451 3.38728C8.14683 3.65132 8.289 3.88908 8.49684 4.06012C8.70467 4.23116 8.96534 4.32493 9.23451 4.32547C9.34154 4.32652 9.44813 4.31182 9.55088 4.28183C9.58253 4.2723 9.61605 4.2708 9.64843 4.27746C9.68081 4.28413 9.71102 4.29875 9.73633 4.32001C9.92275 4.47288 10.0806 4.65755 10.2027 4.86547L11.0754 6.36001L12.6545 7.13728C12.8222 7.22706 12.9478 7.37935 13.004 7.56111C13.0601 7.74287 13.0424 7.93945 12.9545 8.10819Z"
      fill="#696F84"
    />
  </svg>
);

const carIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="15"
    height="15"
    viewBox="0 0 15 15"
    fill="none"
  >
    <path
      d="M14.3826 4.47849C14.3173 4.47849 14.2503 4.4878 14.1834 4.50629L13.4264 4.71483L12.6403 2.79999C12.4177 2.25747 11.7594 1.81616 11.173 1.81616H3.81642C3.22996 1.81616 2.5717 2.25747 2.34907 2.79999L1.56403 4.71221L0.816547 4.50629C0.749713 4.48786 0.682624 4.47849 0.617384 4.47849C0.259683 4.47849 0 4.75175 0 5.12833V5.57468C0 6.01426 0.357574 6.37184 0.79716 6.37184H0.882743L0.755899 6.68088C0.54902 7.18494 0.380724 8.03816 0.380724 8.58297V12.3871C0.380724 12.8267 0.738361 13.1842 1.17788 13.1842H2.21904C2.65862 13.1842 3.0162 12.8267 3.0162 12.3871V11.4371H11.9733V12.3871C11.9733 12.8267 12.3309 13.1842 12.7705 13.1842H13.8116C14.2512 13.1842 14.6088 12.8267 14.6088 12.3871V8.58297C14.6088 8.03822 14.4405 7.18494 14.2335 6.68088L14.1067 6.37184H14.2028C14.6424 6.37184 15 6.01426 15 5.57468V5.12833C15 4.75175 14.7404 4.47849 14.3826 4.47849ZM2.13569 5.93882L3.32473 3.04245C3.45795 2.71797 3.85392 2.45249 4.20467 2.45249H10.7849C11.1356 2.45249 11.5316 2.71797 11.6647 3.04245L12.8538 5.93882C12.987 6.26329 12.809 6.52878 12.4583 6.52878H2.53127C2.18052 6.52878 2.00253 6.26329 2.13569 5.93882ZM4.7901 9.60231C4.7901 9.77769 4.64661 9.92117 4.47124 9.92117H2.21241C2.03703 9.92117 1.89354 9.77769 1.89354 9.60231V8.51824C1.89354 8.34286 2.03703 8.19937 2.21241 8.19937H4.47124C4.64661 8.19937 4.7901 8.34286 4.7901 8.51824V9.60231ZM13.0746 9.60231C13.0746 9.77769 12.9311 9.92117 12.7557 9.92117H10.4969C10.3216 9.92117 10.1781 9.77769 10.1781 9.60231V8.51824C10.1781 8.34286 10.3216 8.19937 10.4969 8.19937H12.7557C12.9311 8.19937 13.0746 8.34286 13.0746 8.51824V9.60231Z"
      fill="#696F84"
    />
  </svg>
);

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

  if (minutes < 60) return `${minutes} мин.`;

  const hours = Math.ceil(minutes / 60);

  if (hours < 24) return `${hours} ч`;

  return `${Math.ceil(hours / 24)} дней`;
};

export const SidebarOfficeListItemCard: React.FC<Props> = ({
  office,
  onClick,
}) => {
  const showHuman = office.travel_duration_human <= 15 * 60;

  const travelIcon = showHuman ? humanIcon : carIcon;
  const travelTime = showHuman
    ? office.travel_duration_human
    : office.travel_duration_car;

  return (
    <div className={styles.container} onClick={onClick}>
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="33"
          viewBox="0 0 32 33"
          fill="none"
        >
          <circle cx="16" cy="16.5" r="16" fill="#0D69F2" />
          <path d="M10 13.5L11.2857 10.5H25L23.7143 13.5H10Z" fill="white" />
          <path d="M8.5 17.5L10 14.5H23.5L22.5 17.5H8.5Z" fill="white" />
          <path d="M7 21.5L8.2 18.5H22L21 21.5H7Z" fill="white" />
        </svg>
      </div>
      <div>
        <div className={styles.mainInfo}>
          <div className={styles.address}>{office.address}</div>
          <div className={styles.distance}>
            {formatDistance(office.distance)}
          </div>
        </div>
        <div className={styles.time}>
          <div className={styles.waittime}>
            Время ожидания: {toHumanTime(office.wait_time)}
          </div>
          <div className={styles.roadTime}>
            {travelIcon} {toHumanTime(travelTime)}
          </div>
        </div>
      </div>
    </div>
  );
};
