import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getVacantDetail } from "../../Redux/Actions/actionsFunction/axtionsVacants";

import NavBar from "../../components/NavBar/NavBar";
import CardEmpleoDetail from "../../components/CardEmpleoDetail/CardEmpleoDetail";
import CardEmpresaDetail from "../../components/CardEmpresaDetail/CardEmpresaDetail";
import MiniCardEmpleosRel from "../../components/MiniCardEmpleosRel/MiniCardEmpleosRel";
import Loading from "../../components/Loading/Loading";

import style from "./EmpleoDetail.module.css";



const EmpleoDetail = ({ setValidateState, setCurrentUserStore2 }) => {
  const dispatch = useDispatch();
  const empleoSelected = useSelector(state => state.VacantDetail);

  const [ isLoading, setIsLoading ] = useState(true);
  const [ validate, setValidate ] = useState(false);
  
  const { detailId } = useParams();



  useEffect(() => {
    dispatch(getVacantDetail( detailId ));
  }, [ dispatch, detailId ]);
    

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);
   
  

  const companyId = empleoSelected.CompanyId;

  if (isLoading) {
    return <Loading/>;
  };
  
  return(
    <div>
      <NavBar setValidateState={setValidateState} setCurrentUserStore2={setCurrentUserStore2} />
      <div className={style.mainContainer}>
        <div className={style.empleoConteiner}>
          <CardEmpleoDetail 
            validate={validate}
            setValidate={setValidate}
            id={empleoSelected.id}
            CompanyId={empleoSelected.CompanyId}
            title={empleoSelected.title}
            description={empleoSelected.description}
            createdAt={empleoSelected.createdAt}
            Workday={empleoSelected.Workday.name}
            Seniority={empleoSelected.Seniority.name}
            WorkMethod={empleoSelected.WorkMethod.name}
          />
          <CardEmpresaDetail companyId={companyId}/>
        </div>
        <MiniCardEmpleosRel companyId={companyId} setValidate={setValidate} idEmpleoSelected={empleoSelected.id} title={empleoSelected.title}/>   
      </div>
    </div>
  );
};

export default EmpleoDetail;