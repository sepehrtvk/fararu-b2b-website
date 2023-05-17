import React from "react";
import styles from "./Footer.module.css";
import phoneIcon from "../../assets/icons/phone.svg";
import trcukIcon from "../../assets/icons/truck.svg";
import mailIcon from "../../assets/icons/mail.svg";

const Footer = () => {
  const contactItem = (title: string, content: string, icon: string) => {
    return (
      <div>
        <img src={icon} alt={title} className='ms-2' />
        {title && <span className='fw-bold ms-1'>{title} : </span>}
        <span>{content} </span>
      </div>
    );
  };

  return (
    <footer>
      <div className='container-fluid mb-4 bg-light'>
        <div className={styles.contactBox}>
          {contactItem("شماره تلفن", "937103713-021", phoneIcon)}
          {contactItem("آدرس ایمیل", "support@henkel.ir", mailIcon)}
          {contactItem("", "ارسال رایگان و در سریعترین زمان ممکن", trcukIcon)}
        </div>
      </div>
      <div className='container mb-5'>
        <div className='row'>
          <div className='col-12'>
            <h4 className='my-3 fw-bold'>درباره هنکل</h4>
            <p className='mx-2 mx-md-5 textJustify'>
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
              استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله
              در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد
              نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد،
              کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان
              جامعه و متخصصان را می طلبد. لورم ایپسوم متن ساختگی با تولید سادگی
              نامفهوم از صنعت چاپ
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
