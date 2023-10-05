import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCompanyDetail } from '../../Redux/Actions/actionsFunction/actionsCompanys';
import style from "./CardEmpresaDetail.module.css";
import { TfiEmail } from "react-icons/tfi";
import StarReview from '../StarsAndReview/starsAndReviews';
import styles from './CardEmpresaDetail.module.css';

const CardEmpresaDetail = ({ companyId }) => {
  const dispatch = useDispatch();

  const [showComments, setShowComments] = useState(false);
  const [showStarsAndUser, setShowStarsAndUser] = useState(false);

  const toggleComments = () => {
    setShowStarsAndUser(!showStarsAndUser);
    setShowComments(!showComments);
  };



  useEffect(() => {
    dispatch(getCompanyDetail(companyId));
  }, [dispatch, companyId]);



  const company = useSelector(state => state.CompanyDetail);

  return (
    <div className={style.mainContainer}>
      <div>
        <img className={style.logo} variant="top" src={company?.photo} />
      </div>
      <div>
        <h1>{company?.business_name}</h1>
      </div>
      <ul className={style.container2}>
        <li>Razón Social: {company?.name}</li>
        <li><TfiEmail className={style.icon} />{company?.email}</li>
        <li>País: {company?.country}</li>
        <li>CUIT: {company?.cuit}</li>
      </ul>
      <div>
        <button className={styles.commentButton} onClick={toggleComments}>
          {showComments ? 'Ocultar comentarios' : 'Mostrar comentarios'}
        </button>
        {showStarsAndUser && (
          <div>
            {company && <StarReview starsData={company?.Stars} showComments={showComments} companyId={companyId}/>}
          </div>
        )}
      </div>
    </div>
  );
};

export default CardEmpresaDetail;
