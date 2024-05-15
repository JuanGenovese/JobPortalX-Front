import style from "./Step1FormCv.module.css"
import validation from "./validation";
import Loading from "../Loading/Loading";
import React, { useState } from "react";
import Dropzone from "react-dropzone";
import Swal from "sweetalert2";
import countries from "countries-list";
import { BsCheckCircleFill, BsFillTrashFill } from 'react-icons/bs'



function Step1FormCv({ cv, setCv, handlerChange, nextStep, currentUser }) {


  const countriesNames = Object.values(countries.countries).map((country) => country);

  const [validated, setValidated] = useState(false);
  const [validatedLinkedin, setValidatedLinkedin] = useState(false);
  const [image, setImage] = useState(null);



  const handleNext = (event) => {
    event.preventDefault();
    console.log(cv)
    if (!validation(cv)) {
      Swal.fire({
			title: "Faltan Datos",
			text: "Completa todos los campos o carga tu foto de perfil",
			icon: "warning",
		});
    } else if(validatedLinkedin === false){
      Swal.fire({
        title: "Error en campo LinkedIn o sitio web",
        text: "Debe ingresar una URL que inicie por https://, como se muestra en el ejemplo",
        icon: "warning",
      });

    }else {
      setValidated(true)
      nextStep()
    }
  };



  const handleDrop = async (acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();

    reader.onload = () => {
      setImage(reader.result);
    };

      Swal.fire({
        title: "Info",
        text: `Por favor haz click en confirmar tu imagen o elimínala`,
        icon: "info",
      });

    reader.readAsDataURL(file);
  };

  const handleUpload = async (event) => {
    event.preventDefault()
    try {
      const response = await fetch(image);
      const data = await response.blob();

      const formData = new FormData();
      formData.append("file", data);
      formData.append("upload_preset", "portaljobx");

      const uploadResponse = await fetch(
        `https://api.cloudinary.com/v1_1/portaljobx/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const uploadData = await uploadResponse.json();
      setCv({...cv, photo:uploadData.secure_url})
      Swal.fire({
        title: "Éxito",
        text: "Imagen cargada correctamente",
        icon: "success",
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: `${error}`,
        icon: "error",
      });
    }
  };

  const handleRemove = (event) => {
    event.preventDefault()
    setImage(null);
  };




  if (!currentUser) {
    return (
      <Loading></Loading>
    )
  } else {



    return (
      <div className={style.mainContainer}>

        <form className={style.Form} validated={!validated}>

          <div className={style.firstRow}>
            <div className={style.dniNum}>
              <div className={style.dni}>
                <h4>D.N.I.</h4>
                <input 
                  className={style.input}
                  placeholder="D.N.I."
                  value={cv.dni}
                  onChange={(event) => handlerChange(event, cv, setCv)}
                  type="number"
                />
              </div>
  
              <div className={style.num}>
                <h4>Número de celular</h4>
                <input
                  className={style.input}
                  placeholder="Número de celular"
                  value={cv.phone}
                  onChange={(event) => handlerChange(event, cv, setCv)}
                  type="text"
                />
              </div>
            </div>
  
            <div className={style.dirLinkdn}>
              <div className={style.dir}>
                <h4>Dirección</h4>
                <input
                  className={style.input}
                  placeholder="Dirección"
                  value={cv.address}
                  onChange={(event) => handlerChange(event, cv, setCv)}
                  type="text"
                />
              </div>
  
  
              <div className={style.Linkdn}>
                <h4>LinkedIn o sitio web</h4>
                <input
                  className={style.input}
                  placeholder="ej: https://www.linkedin.com/usuario"
                  value={cv.linkedin}
                  onChange={(event) => handlerChange(event, cv, setCv, setValidatedLinkedin)}
                  type="text"
                />
                {!validatedLinkedin ? (
                 <div className={style.linkedinError}>Error en Linkedin: la URL debe iniciar por https://</div>
                ): 
                (console.log("ok"))
                }
              </div>
  
            </div>
          </div>
            




          <div className={style.imgNac}>
            <div>
              <div className={!image ? style.dropzone : 'none'}>
                <Dropzone onDrop={handleDrop}>
                  {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      {!image ? <p style={{ 'color': 'gray', 'textAlign': 'center' }}>Selecciona o arrastra una imagen</p> : <></>}
                    </div>
                  )}
                </Dropzone>
              </div>
              {image && (
                <div> 
                  <img className={style.image} src={image} alt="Imagen cargada" />
                  <button className={style.buttonCont}  style={{ margin: "10px" }} onClick={(event) => handleRemove(event)}>
								  <BsFillTrashFill />
								  <span className={style.tooltip}>Eliminar</span>
								</button>
								<button className={style.buttonCont} onClick={(event) => handleUpload(event)}>
								  <BsCheckCircleFill />
								  <span className={style.tooltip}>Subir</span>
								</button>
                </div>
              )}
            </div>

            <div className={style.FechaNacionalidad}>
              <div>
                <h4>Fecha de nacimiento</h4>
                <input
                  placeholder='Página web'
                  value={cv.initial_date}
                  type="date"
                  onChange={(event) => handlerChange(event, cv, setCv)}
                />
              </div>

              <div>
                <h4>Nacionalidad</h4>
                <select
                  name='country'
                  value={cv.country}
                  onChange={(event) => handlerChange(event, cv, setCv)}
                  required>
                  <option disabled></option>
                  {countriesNames.map((count) => <option id={count.emoji} value={count.name}>{count.name}</option>)}
                </select>
              </div>
            </div>
          </div>

        </form>

          <div className={style.button}>
            <button
              textButton="Siguiente"
              handlerClick={(event) => handleNext(event)}
            />
          </div>

      </div>
    )
  };
}

export default Step1FormCv