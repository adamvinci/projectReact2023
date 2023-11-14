import Prices from "./Prices";
import Stack from 'react-bootstrap/Stack';


const Subscription = ({subscription}) => {

    
    return (
        <div className='grille-tarifaire' >
            <Stack direction="horizontal" gap={1}>
                {subscription.tarifs.map(tarif => (
                    <Prices key={tarif} tarif={tarif} />
                ))}
            </Stack>           
        </div>
    )
}
export default Subscription;