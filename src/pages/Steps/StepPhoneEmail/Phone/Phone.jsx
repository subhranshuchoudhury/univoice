import React, { useState } from 'react';
import Card from '../../../../components/shared/Card/Card';
import Button from '../../../../components/shared/Button/Button';
import TextInput from '../../../../components/shared/TextInput/TextInput';
import styles from '../StepPhoneEmail.module.css';
import { sendOtp } from '../../../../http/index';
import { useDispatch } from 'react-redux';
import { setOtp } from '../../../../store/authSlice';

const Phone = ({ onNext }) => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const dispatch = useDispatch();

    async function submit() {
        if (!phoneNumber) return;
        const { data } = await sendOtp({ phone: phoneNumber.toLowerCase() }); // changed ##
        console.log(data);
        dispatch(setOtp({ phone: data.phone, hash: data.hash }));
        onNext();
    }

    return (
        <Card title="Enter Your Mobile Number / Mail" icon="phone">
            <TextInput
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <div>
                <div className={styles.actionButtonWrap}>
                    <Button text="Next" onClick={submit} />
                </div>
                <p className={styles.bottomParagraph}>
                    enter mobile number first time, then ask +918249587552 (Whatsapp) for your password.<br></br> (For testing: Number:123, Password:0)
                </p>
            </div>
        </Card>
    );
};

export default Phone;
