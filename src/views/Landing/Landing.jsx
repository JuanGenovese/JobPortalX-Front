import style from "./Landing.module.css";
import NavBar from "../../components/NavBar/NavBar";
import { Link } from "react-router-dom";
import cartel from "../../assets/img/cartel.jpg";
import celular from "../../assets/img/celular.jpg";
import texto from "../../assets/img/texto.jpg";
import freelancer3 from "../../assets/img/freelancer3.png";
import { Button } from "react-bootstrap";

const Landing = ({ setValidateState, setCurrentUserStore2 }) => {
  // eslint-disable-next-line
  const user = JSON.parse(localStorage.getItem("currentUser2"));

  return (
    <div className={style.landingDiv}>


      <NavBar
        setValidateState={setValidateState}
        setCurrentUserStore2={setCurrentUserStore2}
      />


      <div className={style.containerFirst}>
        <div className={style.containerBienvenida}>
          <h1 className={style.title}> Bienvenido a JobPortalX </h1>
          <p className={style.parrafo}> El sinónimo de trabajo Perfecto </p>
          <Link to="/empleos">
            <Button variant="outline-secondary" className="ms-auto">
              Aplicá ahora
            </Button>
          </Link>
        </div>
        <div className={style.containerLogoFirst}>
          <img className={style.imageFirst} src={cartel} alt="Logo de empresa"/>
        </div>
      </div>


      <div className={style.containerSecond}>
        <div className={style.containerLogoSecond}>
          <img className={style.imageSecond} src={celular} alt="Foto de celular"/>
        </div>
        <div className={style.containerText}>
          <h2 className={style.titleSecond}>Nuestra <span className={style.misionVision}>misión y visión</span><br/>reflejan lo más profundo de JobPortalX </h2>
        </div>
      </div>


      <div className={style.containerThird}>
        <div className={style.containerTextThird}>
          <h1 className={style.titleThird}> El talento te pertenece, nosotros lo cuidamos </h1>
          <h3 className={style.parrafo2}> Únetenos y navega entre las mejores oportunidades laborales{" "}</h3>
          <Link to="/empleos">
            <Button variant="outline-secondary" className="ms-auto">
              Aplicá ahora
            </Button>
          </Link>
        </div>
        <div className={style.containerLogoThird}>
          <img src={freelancer3} alt="Foto de landing" className={style.imageThird}/>
        </div>
      </div>
      

      <div className={style.containerFourth}>
        <div className={style.containerLogo4}>
          <img src={texto} alt="Foto de landing" className={style.imageFour} />
        </div>
        <h1 className={style.titleFourth}>
          <span className={style.span1}>JobPortalX</span>
          <span className={style.span2}>la responsabilidad social es tomada muy en serio</span>
        </h1>
      </div>
    </div>
  );
};


export default Landing;


