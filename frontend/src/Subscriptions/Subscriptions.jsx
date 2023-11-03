import Prices from "./Prices";
import Stack from 'react-bootstrap/Stack';


const Subscription = ({subscription}) => {
    console.log(subscription.tarifs)
    
    return (
        <div className='grille-tarifiaire' >
            <Stack direction="horizontal" gap={1}>
                {subscription.tarifs.map(tarif => (
                    <Prices tarif={tarif} />
                ))}
            </Stack>           
        </div>
    )
}
export default Subscription;