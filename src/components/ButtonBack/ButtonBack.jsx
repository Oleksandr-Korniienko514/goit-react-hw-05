import { useNavigate } from 'react-router-dom';
import styles from './ButtonBack.module.css';

const ButtonBack = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <button className={styles.button} onClick={handleGoBack}>
            Go back
        </button>
    );
};

export default ButtonBack;
