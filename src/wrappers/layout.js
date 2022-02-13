import Footer from "../components/footer";
import Navbar from "../components/navbar";

const withLayout = (BaseComponent, {bgWhite=false} = {}) => (props) => {
    return (<>
        <Navbar />
        <main className={`px-4 bg-${bgWhite? 'white': 'gray-200'}`} >
            <BaseComponent {...props} />
        </main>
        <Footer />
    </>);
};

export { withLayout };