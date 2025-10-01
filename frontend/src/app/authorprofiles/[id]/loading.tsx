import { Container, Spinner } from 'react-bootstrap';

export default function AuthorProfileLoading() {
    return (
        <Container className="py-4">
            <div className="text-center">
                <Spinner animation="border" variant="primary" />
                <p className="mt-2">loading..</p>
            </div>
        </Container>
    );
}