import Loading from "../../components/Loading/Loading"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import style from "./MiPerfil.module.css"
import NavBar from "../../components/NavBar/NavBar"
import { BsFillEnvelopeAtFill, BsFillTelephoneFill, BsGlobeAmericas, BsLinkedin, BsPersonSquare } from 'react-icons/bs'
import {PDFDownloadLink} from "@react-pdf/renderer"
import DocuPDF from "../../components/DocuPDF/DocuPDF"
import ListItem from "../../components/ListItemExperience/ListItemExperience";
import ListItemStudy from "../../components/ListItemStudy/ListItemStudy";
import { getUserDetail } from "../../Redux/Actions/actionsFunction/actionsUsers";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";


const MiPerfil = ({ setValidateState, setCurrentUserStore2 }) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

//   const [showPDF, setShowPDF] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  

  const currentUser = JSON.parse(localStorage.getItem("currentUser2"))

  const userDetail = useSelector(state => state.UserDetail);

  const [perfil, setPerfil] = useState({
    photo: '',
    name: '',
    email: '',
    celular: '',
    profile: '',
    profesion: '',
    descripcion: '',
    apellido: '',
    pais: '',
    linkedin: '',
    skills: '',
	plan:'',
	objetivo:'',
    Experiences:[],
    Formations:[],
    
  });


  useEffect(() => {
    dispatch(getUserDetail(currentUser.id))

  }, [currentUser.id, dispatch]);

  

  useEffect(() => {
    if (userDetail.Cv === null) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
      setIsLoading2(false);
      setPerfil(prevCv => ({
        ...prevCv,
        photo: userDetail.Cv?.photo,
        name: userDetail.name,
        email: userDetail.email,
        celular: userDetail.cellphone,
        profile: userDetail.profile,
        profesion: userDetail.Cv?.profession,
        descripcion: userDetail.Cv?.personal_description,
        apellido: userDetail.lastName,
        pais: userDetail.Cv?.country,
        linkedin: userDetail.Cv?.linkedin,
        skills: userDetail.Cv?.skill,
		plan: userDetail.PayMethods?.length > 0 ?userDetail.PayMethods[0]?.Operation?.detail : 'ninguno',

        objetivo: userDetail.Cv?.educational_institution,
		Experiences:userDetail.Cv?.Experiences,
        Formations:userDetail.Cv?.Formations
      }));
    }
  }, [navigate, userDetail.Cv, userDetail.PayMethods, userDetail.cellphone, userDetail.email, userDetail.lastName, userDetail.name, userDetail.profile]);



	useEffect(() => {
		setTimeout(() => {
			setIsLoading2(true);
		}, 2000);
	}, []);


	//   const handleClick = () => {
	//     setShowPDF(!showPDF);
	//   };


	if (!isLoading2) {
		return <div><Loading /></div>
	}

	if (!isLoading) {


		Swal.fire({
			title: "Opps",
			text: "Parece que no tienes CV registrada",
			icon: "warning",
			preConfirm: () => {
				navigate('/registro-cv')
			}
		});

	} else {
		return (
			<>
				<NavBar
					setValidateState={setValidateState}
					setCurrentUserStore2={setCurrentUserStore2}
				></NavBar>
				<div className={style.container}>

					<div id='pdf-content' className={style.container2}>
						<div className={style.container1}>
							<div>
								<img
									className={style.image}
									src={perfil.photo}
									alt='Profile'
								/>
							</div>

							<div>
								<h1 style={{ whiteSpace: "nowrap" }}>
									{perfil.name} {perfil.apellido}
								</h1>

								<div className={style.container6}>
									<div className={style.container4}>
										<div className={style.container3}>
											<BsFillEnvelopeAtFill></BsFillEnvelopeAtFill>
											<p style={{ marginBottom: "3px" }}>
												{perfil.email}
											</p>
										</div>
										<div className={style.container3}>
											<BsLinkedin></BsLinkedin>
											<a href={perfil.linkedin} target="_blank" rel="noopener noreferrer">
												<p style={{ whiteSpace: 'nowrap', marginBottom: '3px' }}>
													{perfil.linkedin.slice(12, 35)}...
												</p>
											</a>
										</div>
										<div className={style.container3}>
											<BsPersonSquare></BsPersonSquare>
											<p style={{ marginBottom: "3px", color: "yellow" }}>
												{perfil.plan}
											</p>
										</div>

									</div>

									<div className={style.container4}>
										<div className={style.container3}>
											<BsFillTelephoneFill></BsFillTelephoneFill>
											<p style={{ marginBottom: "3px" }}>
												{perfil.celular}
											</p>
										</div>

										<div className={style.container3}>
											<BsGlobeAmericas></BsGlobeAmericas>
											<p
												style={{
													whiteSpace: "nowrap",
													marginBottom: "3px",
												}}
											>
												{perfil.pais}
											</p>
										</div>
									</div>
									<div className={style.container4}>
									</div>
								</div>
							</div>
						</div>

					<div className={style.container5}>
						<h2 style={{ "text-align": "left" }}>
							{perfil.profesion}
						</h2>
						<p style={{ "text-align": "justify", margin: '15px' }}>
							{perfil.descripcion}
						</p>
					</div>


					<div className={style.container5}>
						<h2 style={{ "text-align": "left" }}>Objetivo laboral</h2>
						<p style={{ "text-align": "justify", margin: '15px' }}>{perfil.objetivo}</p>
					</div>


					<div className={style.container5}>
						<h2 style={{ "text-align": "left" }}>Skills</h2>
						<p style={{ "text-align": "justify", margin: '15px' }}>{perfil.skills}</p>
					</div>

					<div className={style.container5}>
						<h2 style={{ "text-align": "left" }}>
							Mis experiencias profesionales
						</h2>
						<div className={style.containerList}>
							{perfil.Experiences?.length === 0 ? (
								<div>
									No tienes experiencia registrada{" "}
									<button
										className={style.button}
										onClick={() =>
											navigate("/registro-experiencia")
										}
									>
										Registrar
									</button>{" "}
								</div>
							) : (
								perfil.Experiences?.map((exp) => {
									return (
										<ListItem
											charge={exp.charge}
											company={exp.company}
											startDate={exp.start_date}
											endDate={
												exp.still_working
													? "Actualmente"
													: exp.end_date
											}
										></ListItem>
									);
								})
							)}
						</div>
					</div>

					<div className={style.container5}>
						<h2 style={{ "text-align": "left" }}>Mis estudios</h2>

						<div className={style.containerListStudy}>
							{perfil.Formations?.length === 0 ? (
								<div>
									No tienes formación registrada{" "}
									<button
										className={style.button}
										onClick={() =>
											navigate("/registro-estudio")
										}
									>
										Registrar
									</button>{" "}
								</div>
							) : (
								perfil.Formations?.map((exp) => {
									return (
										<ListItemStudy
											title={exp.title}
											study_level={exp.study_level}
											institute={exp.institute}
											state={exp.state}
										></ListItemStudy>
									);
								})
							)}
						</div>
					</div>

					

					{userDetail.Cv &&  <div className={style.container3}>

                <PDFDownloadLink document={<DocuPDF perfil={perfil}></DocuPDF>} fileName={`Cv ${perfil.name} ${perfil.apellido}`}>
                  <button className={style.button}>Descargar CV en PDF</button>
                </PDFDownloadLink>

              </div>}
				</div>
			</div>
		</>
	);
    }

}

export default MiPerfil;
