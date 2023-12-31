import { useDispatch } from "react-redux";
import { findPerName } from "../../Redux/Actions/actionsFunction/actionsSearchBar";
import { useLocalStorage } from "../../useLocalStorage/useLocalStorage";
import style from "./NavBarLog.module.css";
import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import { AiFillStepBackward } from "react-icons/ai";
import Pathname from './Pathname'

const NavBarCliente = ({ setValidateState, setCurrentUserStore2 }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const [isNavVisible, setIsNavVisible] = useState(false);

  const abrirNav = () => {
    setIsNavVisible(true);
  };
  const cerrarNav = () => {
    setIsNavVisible(false);
  };

  const handlerLogin = () => {
    setValidateState(false);
    setCurrentUserStore2("");
    navigate("/");
  };

  const salirDeNav = () => {
    if (isNavVisible === true) {
      cerrarNav();
    }
  }

  const userLocalStorage = JSON.parse(localStorage.getItem("currentUser2"));

  return (
    <div className={`${style.fixed} ${isNavVisible ? style.fixedOpen : ""}`}>
      <div className={style.container}>
        <div className={style.titleConteiner}>
          {location.pathname === '/'
          ? <></>
          : <button onClick={() => window.history.go(-1)} className={style.btnNav}><i className="bi bi-arrow-bar-left"></i></button>
          }
          <h2 className={style.title}>
            {
            userLocalStorage?.profile === "Admin" 
            ? (<a href="/applicant">JobPortalX</a>) 
            : userLocalStorage?.profile === "applicant" 
              ? (<a href="/Applicant">JobPortalX</a>) 
              : (<a href="/empresa">JobPortalX</a>)
            }
          </h2>
        </div>
        <button className={style.abrirNav} onClick={abrirNav}>
          <i class="bi bi-list"></i>
        </button>
        <div onClick={salirDeNav} className={`${style.restoContainer} ${isNavVisible ? style.restoContainerVisible : ""}`}></div>
        <nav className={`${style.nav} ${isNavVisible ? style.navVisible : ""}`}>
          <button className={style.cerrarNav} onClick={cerrarNav}>
            <i className="bi bi-arrow-bar-right"></i>
          </button>
          <ul className={style.navList}>
            <li>
              <h3 onClick={handlerLogin} className={style.cerrarSesion}>
                cerrar sesion
              </h3>
              {userLocalStorage?.profile === "Admin" 
              ? 
              (<h3 className={style.dashboard}>
                <a href="https://jobportalx-adminpanel.vercel.app" target="_blank">
                  dashboard
                </a>
              </h3>) 
              : null}
            </li>

          </ul>
        </nav>
      </div>
    </div>
  );
};

export default NavBarCliente;
