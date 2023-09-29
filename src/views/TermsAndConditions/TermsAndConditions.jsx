import React from "react";
import styles from "./TermsAndConditions.module.css";
import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function TermsAndConditions() {
	const navigate = useNavigate();
	const userType2 = JSON.parse(localStorage.getItem("currentUser2"));
	const [accepted, setAccepted] = useState(false);

	const handleAcceptance = () => {
		if (accepted) {
			if (userType2.profile === "Applicant") {
				navigate("/applicant");
			} else if (userType2.profile === "Company") {
				navigate("/empresa");
			} else {
				navigate("/");
			}
		} else {
			Swal.fire({
				title: "Aceptar términos y condiciones",
				text: "Debes aceptar los términos y condiciones antes de continuar.",
				icon: "error",
			});
		}
	};

	const handleCheckboxChange = (event) => {
		setAccepted(event.target.checked);
	};

	return (
		<>
			<div className={styles.container}>
				<div className={styles.card}>
					<h1 className={styles.cardTitle}>
						Términos y Condiciones de uso de JobPortalX
					</h1>
					<hr className={styles.cardDivider} />
					<ol className={styles.cardList}>
						<li>
							<h2>Aceptación de los términos</h2>
							<p>
								Al utilizar el portal de empleos JobPortalX,
								aceptas los siguientes términos y condiciones en
								su totalidad. Si no estás de acuerdo con alguno
								de estos términos, te pedimos que no utilices el
								sitio.
							</p>
						</li>
						<li>
							<h2>Propósito del portal</h2>
							<p>
								JobPortalX es un portal de empleos diseñado para
								ayudar a los usuarios a encontrar oportunidades
								laborales y a los empleadores a publicar ofertas
								de trabajo. No garantizamos la obtención de un
								empleo, ni la calidad de las ofertas publicadas.
							</p>
						</li>
						<li>
							<h2>Responsabilidad de los usuarios</h2>
							<p>
								Tú eres responsable de la información que
								proporcionas en JobPortalX. Debes asegurarte de
								que tus datos personales y profesionales sean
								precisos y verídicos. No nos hacemos
								responsables de las consecuencias derivadas de
								información falsa o engañosa.
							</p>
						</li>
						<li>
							<h2>Publicación de ofertas de trabajo</h2>
							<p>
								Los empleadores son los únicos responsables del
								contenido de las ofertas de trabajo publicadas
								en JobPortalX. No nos hacemos responsables por
								la veracidad, legalidad o calidad de las mismas.
								Nos reservamos el derecho de eliminar cualquier
								oferta que considere inapropiada o que incumpla
								nuestras políticas.
							</p>
						</li>
						<li>
							<h2>Privacidad y protección de datos</h2>
							<p>
								Nos comprometemos a proteger tu privacidad y tus
								datos personales de acuerdo con nuestra Política
								de Privacidad. Sin embargo, no podemos
								garantizar la seguridad completa de la
								información transmitida a través de Internet.
							</p>
						</li>
						<li>
							<h2>Propiedad intelectual</h2>
							<p>
								Todos los derechos de propiedad intelectual
								relacionados con JobPortalX, incluyendo el
								diseño, logotipos, contenido y software, son
								propiedad exclusiva de sus respectivos dueños.
								No se permite la reproducción, distribución o
								modificación sin autorización previa.
							</p>
						</li>
						<li>
							<h2>Limitación de responsabilidad</h2>
							<p>
								JobPortalX no será responsable de ningún daño
								directo, indirecto, incidental, especial o
								consecuente que surja del uso o la incapacidad
								de uso del sitio. Asimismo, no nos
								responsabilizamos por cualquier interrupción en
								el servicio, falla técnica o virus informático
								que pueda afectar el uso del portal.
							</p>
						</li>
						<li>
							<h2>Modificaciones y término</h2>
							<p>
								Nos reservamos el derecho de modificar estos
								términos y condiciones en cualquier momento.
							</p>
							<p>
								Te recomendamos revisar regularmente esta
								sección. Asimismo, nos reservamos el derecho de
								suspender o terminar el portal de empleos
								JobPortalX en cualquier momento, sin previo
								aviso.
							</p>
						</li>
					</ol>
					<hr className={styles.cardDivider} />
					<p>
						Al utilizar JobPortalX, aceptas cumplir con estos
						términos y condiciones.
					</p>
					<p>
						Si no estás de acuerdo, te pedimos que no utilices el
						sitio. Para cualquier duda o consulta, puedes
						contactarnos a través de nuestros canales de atención al
						cliente.
					</p>
					<div className={styles.acceptWrapper}>
						<input
							type='checkbox'
							id='acceptCheckbox'
							className={styles.acceptCheckbox}
							checked={accepted}
							onChange={handleCheckboxChange}
						/>
						<label
							htmlFor='acceptCheckbox'
							className={styles.acceptLabel}
						>
							Acepto los términos y condiciones
						</label>
					</div>
					<button
						className={styles.acceptButton}
						onClick={handleAcceptance}
					>
						Aceptar
					</button>
				</div>
			</div>
		</>
	);
}
