import { useTranslation } from "react-i18next";

const LoadingSpinner = () => {
  const { t } = useTranslation();
  return (
    <div className='d-flex flex-column align-items-center text-primary py-5'>
      <div
        className='spinner-border'
        style={{ width: "3rem", height: "3rem" }}
        role='status'>
        <span className='visually-hidden'>Loading...</span>
      </div>
      <span className='mt-3'>{t("loading_")}</span>
    </div>
  );
};

export default LoadingSpinner;
