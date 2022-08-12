import React, { useState } from 'react';
import Card from '../../../components/shared/Card/Card';
import Button from '../../../components/shared/Button/Button';
import TextInput from '../../../components/shared/TextInput/TextInput';
import { useDispatch, useSelector } from 'react-redux';
import { setName } from '../../../store/activateSlice';
import styles from './StepName.module.css';
const StepName = ({ onNext }) => {
    const { name } = useSelector((state) => state.activate);
    const dispatch = useDispatch();
    const [fullname, setFullname] = useState(name);

    function nextStep() {
        if (!fullname) {
            return;
        }
        dispatch(setName(fullname));
        onNext();
    }
    return (
        <>
            <Card title="Only registered user can login. Ask Admin (+918249587552) to get your login credentials. While you can use 123 or 456 as number and 0 as password for test login." icon="goggle-emoji">
                {/* <TextInput
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                />
                <p className={styles.paragraph}>
                    Use your original name for better identification.
                </p>
                <div>
                    <Button onClick={nextStep} text="Next" />
                </div> */}
            </Card>
        </>
    );
};

export default StepName;
