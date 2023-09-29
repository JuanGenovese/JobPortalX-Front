import styles from './ProfilesCompany.module.css';
import NavBar from '../../components/NavBar/NavBar';
import Page from '../../components/Paginated/Page';
import CardProfileCompany from '../../components/CardsProfilesCompany/CardsProfilesCompany';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import Loading from '../../components/Loading/Loading';
import { getAllCompanys } from '../../Redux/Actions/actionsFunction/actionsCompanys';

const ProfilesCompany = ({ setCurrentUserStore2, setValidateState }) => {
    const companies = useSelector(state => state.Company);
    const [currentPage, setCurrentPage] = useState(1);
    const [companiesPerPage, setCompaniesPerPage] = useState(6);
    const indexOfLastCharacter = currentPage * companiesPerPage;
    const indexOfFirstCharacter = indexOfLastCharacter - companiesPerPage;
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();
    
   
  
    useEffect(()=> {
        dispatch(getAllCompanys())
  
    },[dispatch, getAllCompanys]);
    
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 2000);
    }, []);
    

    const paginated = (pageNumber) => {
        setCurrentPage(pageNumber)
    };

    const currentCompanies = companies.slice(indexOfFirstCharacter, indexOfLastCharacter);

    useEffect(() => {
        if (currentCompanies.length === 0 && companies.length > 0) {
            const newPage = Math.ceil(companies.length / companiesPerPage);
            setCurrentPage(newPage);
    }
    }, [currentCompanies, companies, companiesPerPage]);

    return (
        <div className={styles.container}>
            <NavBar setCurrentUserStore2={setCurrentUserStore2} setValidateState={setValidateState}/>
            <div className={styles.page}>
            <Page
                usersPerPage={companiesPerPage}
                users={companies}
                paginated={paginated}
            />
            </div>
            {  isLoading ? (
                <Loading/>
            ) : (
                    <div className={styles.cardsContainer}>
                        {
                            currentCompanies?.map(compan => {
                                console.log(compan.webPage);
                                return ( 
                                    <div key={compan.id} className={styles.cardDiv}>
                                        <CardProfileCompany
                                        key={compan.id}
                                        id={compan.id}
                                        photo={compan.photo}
                                        business_name={compan.business_name}
                                        description={compan.description}
                                        job_area={compan.job_area}
                                        name={compan.name}
                                        country={compan.country}
                                        cuit={compan.cuit}
                                        email={compan.email}
                                        webPage={compan.webPage}
                                        />
                                    </div>
                                )
                            })
                        }
                    </div>
                )
            }
            <footer></footer>
        </div>
    )
};

export default ProfilesCompany;


