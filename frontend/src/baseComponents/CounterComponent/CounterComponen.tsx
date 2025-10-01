'use client';

import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { setValueIncrement, setValueDecrement } from '@/store/buttonSlice';
import { RootState } from '@/store';
import { Row, Col } from 'react-bootstrap';

export default function ReduxCounter() {
    const currentValue = useSelector((state: RootState) => state.buttonClick.value);
    const dispatch = useDispatch();

    const fetchIncrement = () => {
        dispatch(setValueIncrement());
    };

    const fetchDecrement = () => {
        dispatch(setValueDecrement());
    };

    return (
        <Row className="justify-content-center align-items-center" style={{ height: '70vh' }}>
            <Col xs={1} className="d-flex justify-content-center">
                <Button variant="danger" onClick={fetchDecrement} aria-label="Decrement">
                    -
                </Button>
            </Col>

            <Col xs={1} className="d-flex justify-content-center">
                <h2>{currentValue}</h2>
            </Col>

            <Col xs={1} className="d-flex justify-content-center">
                <Button variant="primary" onClick={fetchIncrement} aria-label="Increment">
                    +
                </Button>
            </Col>
        </Row>
    );
}
