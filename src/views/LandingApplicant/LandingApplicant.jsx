import React from "react";
import styles from "./LandingApplicant.module.css";
import { NavBar } from "../../components";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getUserDetail } from '../../Redux/Actions/actionsFunction/actionsUsers'




const LandingApplicant = ({ setValidateState, setCurrentUserStore2 }) => {
  const dispatch = useDispatch()

  const userType2 = JSON.parse( localStorage.getItem("currentUser2") );
  const [ greeting , setGreeting ] = useState(`¡Hola, ${userType2.name}!`);
  const userCv = useSelector(state => state.UserDetail)


  useEffect(() => {
    dispatch( getUserDetail(userType2.id) )
  }, [ dispatch, userType2.id ])
  

  return (
    <div>
      <NavBar
        setValidateState={setValidateState}
        setCurrentUserStore2={setCurrentUserStore2}
      ></NavBar>
      <div className={styles.containerPrincipal}>
        <div className={styles.saludo}>
          <h1 className={styles.titulo}>{greeting}</h1>
          <h3 className={styles.info}>Te damos la bienvenida a JobPortalX</h3>
        </div>
        <div className={styles.containerButtons}>
          <Link to="/empleos">
            <button className={styles.Button}>
              <span className={styles.ButtonText}>POSTULAR</span>
            </button>
          </Link>
          <Link to="/postulaciones">
            <button className={styles.Button2} title="Mis postulaciones">
              <span className={styles.ButtonText}>MIS POSTULACIONES</span>
            </button>
          </Link>
          {
            userCv.Cv ? <></> : 
            <Link to="/registro-cv">
            <button className={styles.Button}>
              <span className={styles.ButtonText}>CREAR CV</span>
            </button>
          </Link>
          }
          <Link to="/PlansAndPrices">
            <button className={styles.Button2}>
              <span className={styles.ButtonText}>PLANES Y PRECIOS</span>
            </button>
          </Link>
          <Link to="/registro-experiencia">
            <button className={styles.Button}>
              <span className={styles.ButtonText}>REGISTRAR EXPERIENCIA</span>
            </button>
          </Link> 
          <Link to="/Miperfil">
            <button className={styles.Button2}>
              <span className={styles.ButtonText}>MI PERFIL</span>
            </button>
          </Link>
          <Link to="/profiles-company">
            <button className={styles.Button}>
              <span className={styles.ButtonText}>EMPRESAS</span>
            </button>
          </Link>
          <Link to="/registro-estudio">
            <button className={styles.Button2}>
              <span className={styles.ButtonText}>REGISTRAR EDUCACION</span>
            </button>
          </Link> 
        </div>
      </div>
    </div>
  );
}

export default LandingApplicant;