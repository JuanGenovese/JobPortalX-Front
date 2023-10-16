import { useEffect } from 'react';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import { getAllVacants, getVacantDetail } from '../../Redux/Actions/actionsFunction/axtionsVacants';
import { getCompanyDetail } from '../../Redux/Actions/actionsFunction/actionsCompanys'

import style from "./MiniCardEmpleosRel.module.css";


const MiniCardEmpleosRel = ({ companyId, idEmpleoSelected, title, setValidate}) => {
  const dispatch = useDispatch();
  const empleos = useSelector(state => state.Vacant);
  


  useEffect(()=>{
    dispatch(getAllVacants());
  },[dispatch])
  
  

  const wordKeysRaw = title.split(' ');
  const wordKeys = wordKeysRaw.filter((wrd) => wrd.length > 3);
  const empleosRelSelected = empleos.filter((emple) => {
    if(emple.id !== idEmpleoSelected ){
      return wordKeys.some( (word) => emple.title.includes(word) ) 
    }
  });

  return (
    <div className={style.componentConteiner}>
      {empleosRelSelected.length === 0 
        ? <p className={style.componentParrafo}>No hay empleos relacionados</p> 
        :<div className={style.mainConteiner}>
          <h2 className={style.Title}>Vacantes sugeridas</h2>
          {empleosRelSelected.map( (empleo) => {
            return (
              <div key={empleo.id} className={style.cardConteiner}>
                <h1 className={style.cardTitle}>{empleo.title}</h1>
                <p className={style.jornada}>Jornada:</p>
                <p className={style.jornadaDetail}>{empleo.Workday.name} - {empleo.WorkMethod.name}</p>
                <div className={style.buttonConteiner}>
                  <Link to={`/empleoDetail/${empleo.id}`}>
                    <button className={style.button} onClick={ () => {
                      dispatch(getVacantDetail(empleo.id))
                      dispatch(getCompanyDetail(companyId))
                      setValidate(false)
                    }}> VER DETALLE </button>
                  </Link>          
                </div>
              </div>
            )
          })}
        </div>
      }
    </div> 
  );
}

export default MiniCardEmpleosRel;
