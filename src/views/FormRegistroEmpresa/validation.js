export const validate = (company) => {
  const nameRegex = /^[A-Za-z]+$/;
  const nameCompanyRegex = /^[\w\s]+$/;
  const cuitRegex = /^\d{1,12}$/;
  //const phoneNumberRegex = /^\+?\d{1,3}[\s-]?\d{1,14}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const urlRegex = /^(https?:\/\/)?([A-Za-z\d.-]+)\.([A-Za-z.]{2,6})(\/[\w .-]*)*\/?$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*[\W_])(?!.*\s).{1,10}$/;
  const regexSimbol = /[^a-zA-Z0-9\s]*[^a-zA-Z0-9\s]?[^a-zA-Z0-9\s]?/;
  const regexMayus = /[A-Z]{1}/;
  const regexNum = /\d.*\d/;

  let errors = {};
  if(company.business_name){
    if(!nameCompanyRegex.test(company.business_name)) errors.business_name = "Nombre de empresa no valido"
    if(company.business_name.length >= 20) errors.business_name = "No puede tener mas de 20 caracteres"
  }
  if(company.cuit){
    if(!cuitRegex.test(company.cuit)) errors.cuit = "Cuit no valida"
  }
  if(company.name){
    if(!nameCompanyRegex.test(company.name)) errors.name = "Nombre no valido"
    if(company.name.length >= 20) errors.name = "No puede tener mas de 20 caracteres"
  }
  if(company.email){
    if(!emailRegex.test(company.email)) errors.email = "Email no valido"
  }
  if(company.password){
    if(!regexSimbol.test(company.password)) errors.password = "Debe tener almenos 2 simbolo"
    if(!regexMayus.test(company.password)) errors.password ="Debe tener una letra mayuscula"
    if(!regexNum.test(company.password)) errors.password = "Debe tener almenos 2 numeros"
    if(company.password.length >= 15) errors.password = "Debe tener menos de 15 caracteres"
  }
  if(company.webPage){
    if(!urlRegex.test(company.webPage)) errors.webPage = "Url no valido"
  }
  if(company.job_area){
    if(!nameRegex.test(company.job_area)) errors.job_area = "Nombre no valido"
    if(company.job_area.length >= 20) errors.job_area = "No puede tener mas de 20 caracteres"  
  }
  return errors
};
