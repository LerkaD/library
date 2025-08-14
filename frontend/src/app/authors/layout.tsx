
import HeaderComponent from "@/baseComponents/SimpleHeaderComponent_1/SimpleHeaderComponent";
import { Container } from 'react-bootstrap';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Container className={`containerMainPage`}>
                <HeaderComponent
                    title="Authors"
                    buttonText="Add author"
                />
            </Container>
            {children}
        </>);
}
