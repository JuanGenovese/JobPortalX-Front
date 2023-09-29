import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBarLog/NavBarLog";
import { useDispatch, useSelector } from "react-redux";
import { Form, FormLabel, FormSelect, FormGroup, Row, Col, FormCheck, } from "react-bootstrap";
import countries from "countries-list";
import ButtonGeneral from "../../components/Button/ButtonGeneral";
import { getUserDetail, postExpe, } from "../../Redux/Actions/actionsFunction/actionsUsers";
import validation from "./validation";
import style from "./FormregistroExperiencia.module.css";
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';

const FormRegistroExperincia = ({ setValidateState, setCurrentUserStore2 }) => {
 
	const countriesNames = Object.values(countries.countries).map(
    (country) => country
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
//   const validate = JSON.parse(localStorage.getItem("state"));
  const userType2 = JSON.parse(localStorage.getItem("currentUser2"));
  const currentUser = useSelector((state) => state.UserDetail);
  const [validated, setValidated] = useState(false);


useEffect(() => {
	dispatch(getUserDetail(userType2.id));
}, [dispatch, userType2.id]);


  const [experiencia, setExperiencia] = useState({
    company: "",
    charge: "",
    experience_level: "",
    location: "",
    start_date: "",
    end_date: "",
    still_working: false,
    CvId: "",
  });
  console.log(experiencia);
  const fecharequired = experiencia.still_working;

	useEffect(() => {
		if (currentUser.Cv) {
			setExperiencia((prevExp) => ({
				...prevExp,
				CvId: currentUser.Cv?.id,
			}));
		}
	}, [currentUser.Cv]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validation(experiencia)) {
      Swal.fire({
        title: "Faltan Datos",
        text: "Completa todos los campos",
        icon: "warning",
      });
    } else {
      setValidated(true);
      dispatch(postExpe(experiencia));
	  Swal.fire({
        title: "Registro exitoso",
        icon: "success",
      });
      return navigate('/applicant')
    }
  };

  const handlerChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;
    setExperiencia({ ...experiencia, [property]: value });
  };

  return (
		<div className={style.mainContainer}>
			<div className={style.containerFirst}>{/* no quitar */}</div>
			<div className={style.containerSecond}>
				<NavBar
					setValidateState={setValidateState}
					setCurrentUserStore2={setCurrentUserStore2}
				></NavBar>
        
        <div className={style.title}>
				<h2>
					Añadir Experiencia Profesional al CV
				</h2>
        </div>
				<Form className={style.Form} validated={!validated}>
					<Row className='mb-6'>
						<FormGroup as={Col} md='6' className='mb-3'>
							<FormLabel>Empresa</FormLabel>
							<Form.Control
								name='company'
								value={experiencia.company}
								type='text'
								onChange={handlerChange}
								required
							/>
							<Form.Control.Feedback type='invalid'>
								Rellena este campo.
							</Form.Control.Feedback>
						</FormGroup>

						<FormGroup as={Col} md='6' className='mb-3'>
							<FormLabel>Cargo</FormLabel>
							<Form.Control
								name='charge'
								placeholder='Cargo desempeñado'
								value={experiencia.charge}
								type='text'
								onChange={handlerChange}
								required
							/>
							<Form.Control.Feedback type='invalid'>
								Rellena este campo.
							</Form.Control.Feedback>
						</FormGroup>
					</Row>

					<Row className='mb-3'>
						<FormGroup as={Col} md='6' className='mb-3'>
							<FormLabel className='me-2'>Experiencia</FormLabel>
							<FormSelect
								name='experience_level'
								value={experiencia.experience_level}
								onChange={handlerChange}
								required
							>
								<option disabled></option>
								<option value='Sin Experiencia'>
									Sin Experiencia
								</option>
								<option value='Trainee'>Trainee</option>
								<option value='Junior'>Junior</option>
								<option value='Semi-senior'>Semi-senior</option>
								<option value='Senior'>Senior</option>
							</FormSelect>
							<Form.Control.Feedback type='invalid'>
								Selecciona una opcion.
							</Form.Control.Feedback>
						</FormGroup>

						<FormGroup as={Col} md='6' className='mb-3'>
							<FormLabel>Ubicación</FormLabel>
							<FormSelect
								name='location'
								value={experiencia.location}
								onChange={handlerChange}
								required
							>
								<option disabled></option>
								{countriesNames.map((count) => (
									<option id={count.emoji} value={count.name}>
										{count.name}
									</option>
								))}
							</FormSelect>
							<Form.Control.Feedback type='invalid'>
								Seleciona una opcion.
							</Form.Control.Feedback>
						</FormGroup>
					</Row>

					<Row className='mb-3'>
						<FormGroup as={Col} md='6' className='mb-3 '>
							<FormLabel>Fecha de inicio</FormLabel>
							<Form.Control
								name='start_date'
								value={experiencia.start_date}
								type='date'
								onChange={handlerChange}
								required
							/>
							<Form.Control.Feedback type='invalid'>
								Rellena este campo.
							</Form.Control.Feedback>
						</FormGroup>

						<FormGroup as={Col} md='6' className='mb-3 '>
							<FormLabel>Fecha de Finalización</FormLabel>
							<Form.Control
								name='end_date'
								value={experiencia.end_date}
								type='date'
								onChange={handlerChange}
								required={!fecharequired}
							/>
							<Form.Control.Feedback type='invalid'>
								Rellena este campo.
							</Form.Control.Feedback>
						</FormGroup>
					</Row>

					<FormGroup>
            <div className={style.check}>
						<FormLabel>
							Trabajo actualmente en esta empresa
						</FormLabel>
            
						<FormCheck
							name='actualmente'
							onChange={(event) =>
								setExperiencia({
									...experiencia,
									still_working: event.target.checked,
								})
							}
						/>
            </div>
					</FormGroup>
				</Form>

				<FormGroup as={Col}>
					<ButtonGeneral
						textButton='Agregar Experiencia'
						handlerClick={handleSubmit}
					/>
				</FormGroup>
			</div>
		</div>
  );
};

export default FormRegistroExperincia;
