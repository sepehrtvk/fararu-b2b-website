import {
  toLocaleCurrencyString,
  toLocaleNumberString,
} from "../../common/Localization";

type PriceBadgeProps = { highPrice: number; lowPrice: number };

const PriceBadge = ({ highPrice, lowPrice }: PriceBadgeProps) => {
  return (
    <div>
      <div>
        <span className='text-info ms-2 fs-6 text-decoration-line-through'>
          {toLocaleCurrencyString(highPrice)}{" "}
        </span>
        <span className='badge bg-primary fs-6'>
          {"٪" +
            toLocaleNumberString(Math.ceil(100 - (lowPrice / highPrice) * 100))}
        </span>
      </div>
      <div className='mt-1'>
        <span className='fw-bold fs-5'>
          {toLocaleCurrencyString(lowPrice, true)}
        </span>
      </div>
    </div>
  );
};

export default PriceBadge;
