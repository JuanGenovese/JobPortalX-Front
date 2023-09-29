import style from './RatingList.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getCompanyDetail } from '../../Redux/Actions/actionsFunction/actionsCompanys';
import { Container } from 'react-bootstrap';

const RatingListDiv = () => {
    const userType = JSON.parse(localStorage.getItem("currentUser2"));
    const companyDetails = useSelector(state => state.CompanyDetail).Stars;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCompanyDetail(userType.id));
    }, [dispatch, userType.id ]);

    const starsArray = []; 

    companyDetails?.map((review) => {
        const stars = parseInt(review.stars, 10);
        starsArray.push(stars);
    });

    const sum = starsArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    const average = (sum / starsArray.length).toFixed(2);

    let averageNumber = parseFloat(average);

    if (isNaN(averageNumber)) {
        averageNumber = '';
    };
    
    return (
        <div className={style.container}>
            <div className={style.table}>
                <div className={style.titles}>
                    <div className={style.titleStars}>
                        <p>Stars</p>
                    </div>
                    <div className={style.titleComments}>
                        <p>Comments</p>
                    </div>
                </div>
                <div className={style.reviewsColumn}>
                    <div className={style.starRow}>
                        <p className={style.pText}>{averageNumber}</p>
                    </div>
                    <div className={style.textRow}>
                        {
                            companyDetails?.map((description) => {
                                return (
                                    <p key={description.id} className={style.pText}>{description.text}</p>
                                )
                            })
                        }
                    </div>
                </div>
            </div>   
        </div>
    )
};

export default RatingListDiv;