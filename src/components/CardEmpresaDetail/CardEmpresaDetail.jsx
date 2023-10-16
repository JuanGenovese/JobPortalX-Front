import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getCompanyDetail } from '../../Redux/Actions/actionsFunction/actionsCompanys';

import StarReview from '../StarsAndReview/starsAndReviews';
import style from "./CardEmpresaDetail.module.css";

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
      
      <ul className={style.list}>
        <li>Razón Social: {company?.name}</li>
        <li>Email: {company?.email}</li>
        <li>País: {company?.country}</li>
        <li>CUIT: {company?.cuit}</li>
      </ul>
      
      <h1 className={style.nombreEmpresa}>{company?.business_name}</h1>
      
      <div className={`${style.comentarios} ${showComments ? style.comentariosActive : ""}`}>
        <button className={`${style.commentButton} ${showComments ? style.commentButtonActive : ""}`} onClick={toggleComments}>
          {showComments ? 'Ocultar comentarios' : 'Mostrar comentarios'}
        </button>
        {showStarsAndUser && (
          <div className={style.puntajes}>
            {company && <StarReview starsData={company?.Stars} showComments={showComments} companyId={companyId}/>}
          </div>
        )}
      </div>
    </div>
  );
};

export default CardEmpresaDetail;
