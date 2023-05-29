import Icon from "../../../components/Icon/Icon";

const ShopSort = () => {
  return (
    <div className='card rounded-3 my-4'>
      <div className='card-body p-2'>
        <div className='d-flex align-items-center'>
          <div className='d-flex align-items-center ms-md-5 ms-0'>
            <span>
              <Icon name='filter' size={4} color='black' />
            </span>
            <span className='me-2'>ترتیب نمایش:</span>
          </div>
          <div className='d-flex align-items-center'>
            <span className=' bg-light2 rounded-3 text-danger mx-3 py-2 px-3'>
              پرفروش ترین
            </span>
            <span className='text-dark mx-3'>جدیدترین</span>
            <span className='text-dark mx-3'>جدیدترین</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopSort;
