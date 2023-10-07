import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { relationVacantApplicant } from "../../Redux/Actions/actionsFunction/axtionsVacants";
import { getUserDetail } from "../../Redux/Actions/actionsFunction/actionsUsers";
import { getCompanyDetail } from "../../Redux/Actions/actionsFunction/actionsCompanys";

import Swal from "sweetalert2";
import style from "./CardEmpleoDetail.module.css";

const CardEmpleoDetail = ({ setValidate, validate, id, CompanyId, title, description, createdAt, Workday, WorkMethod, Seniority }) => {
  const dispatch = useDispatch();

  const userVacants = useSelector((state) => state.UserDetail.Vacants);
  const user = useSelector((state) => state.UserDetail);
  const company = useSelector((state) => state.CompanyDetail);
 
  const vacantPostuled = userVacants?.find((vacant) => vacant.id === id);
  const currentUserId = JSON.parse(localStorage.getItem("currentUser2")).id;
  
  const relationIds = {
    VacantId: id,
    ApplicantId: currentUserId,
  };



  useEffect(() => {
    dispatch(getUserDetail(currentUserId));
    dispatch(getCompanyDetail(CompanyId));
    if (vacantPostuled) {
      setValidate(true)
    }
  }, [dispatch]);



  const handlerClick = () => {
    if (!user.Cv){
      return Swal.fire({
        title: "Error",
        text: "Debes registrar tu CV para poder postular a una vacante",
        icon: 'error'
      })
    } else {
      dispatch( relationVacantApplicant(relationIds) );
      setValidate(true);
    }
  };
  
  return (
    <div className={style.mainContainer}>
      <img className={style.logo} variant="top" src={company.photo} />
      <div className={style.noImgConteiner}>

        <div className={style.containerTitle}>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>

        <div className={style.listButtonConteiner}>
          <ul className={style.list}>
            <li>Jornada {Workday}</li>
            <li>Modalidad {WorkMethod}</li>
            <li>Seniority {Seniority}</li>
          </ul>
          <div className={style.conteinerButton}>
            <button className={style.button} onClick={handlerClick} disabled={validate || vacantPostuled}>
              {vacantPostuled || validate ? "YA POSTULADO" : "POSTULAR"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardEmpleoDetail;
