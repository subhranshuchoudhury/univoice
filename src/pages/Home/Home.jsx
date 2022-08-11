import React from 'react';
import styles from './Home.module.css';
import { Link, useHistory } from 'react-router-dom';
import Card from '../../components/shared/Card/Card';
import Button from '../../components/shared/Button/Button';

const Home = () => {
    const signInLinkStyle = {
        color: '#0077ff',
        fontWeight: 'bold',
        textDecoration: 'none',
        marginLeft: '10px',
    };
    const history = useHistory();
    function startRegister() {
        history.push('/univoice/authenticate');
    }
    return (
        <div className={styles.cardWrapper}>
            <Card title="Welcome to UNIVOICE!" icon="logo">
                <p className={styles.text}>
                    A multi way communication system! Add your friends and talk with crystal clear sound. Thanks to webRTC!
                </p>
                <div>
                    <Button onClick={startRegister} text="Let's Go" />
                </div>
                <div className={styles.signinWrapper}>
                    <span className={styles.hasInvite}>
                        Inspiration - CodersGyan, Subhranshu Choudhury
                    </span>
                </div>
            </Card>
        </div>
    );
};

export default Home;
