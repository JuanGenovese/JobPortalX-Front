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
        ? <p>No hay empleos relacionados</p> 
        :<div className={style.mainConteiner}>
          {empleosRelSelected.map( (empleo) => {
            return (
              <div key={empleo.id}>
                <h2>Vacante sugerida</h2>
                <div>
                  <h1>{empleo.title}</h1>
                  <p>Jornada: {empleo.Workday.name}</p>
                  <p>Método: {empleo.WorkMethod.name}</p>
                  <Link to={`/empleoDetail/${empleo.id}`}>
                    <button onClick={ () => {
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
