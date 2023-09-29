import { Link} from "react-router-dom";
import { BsBuildings, BsStopwatch, BsBookmark } from 'react-icons/bs';
import { FaMedal } from 'react-icons/fa'
import style from './CardEmpleo.module.css';

const CardEmpleo = (props) => {
return (
        <Link className={style.words} to={`/empleoDetail/${props.id}`}>
            <div className={style.mainContainer}>
                <div className={style.containerInfo}>
                    <div className={style.imgContainer}>
                        <img className={style.image} src={props.company?.photo} alt="logo" />
                    </div>
                    <div className={style.descriptionDiv}>
                        <h2 className={style.temps} >{props.title}</h2>
                        <p className={style.description} >{props.description}</p>
                    </div>
                </div>
                <div className={style.containerView}>
                    <div className={style.containerIcons}>
                        <div className={style.detailIcons}>
                            <BsBuildings className={style.icons}/>
                        </div>
                        <div className={style.containerText}>
                            <p className={style.text}>{props.WorkMethod}</p>
                        </div>   
                    </div>
                    <div className={style.containerIcons}>
                        <BsStopwatch className={style.icons}/>
                        <div className={style.containerText}>
                            <p className={style.text}>{props.Workday}</p>
                        </div> 
                    </div>
                    <div className={style.containerIcons}>
                        <FaMedal className={style.icons}/>
                        <div className={style.containerText}>
                            <p className={style.text}>{props.Seniority}</p>
                        </div> 
                    </div>
                </div>
                <div className={style.containerLastIcons}>
                    <BsBookmark className={style.icons}/>
                    <p className={style.identification}>{props.operation}</p>
                </div>
            </div>
        </Link>
    )
}

export default CardEmpleo;