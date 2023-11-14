import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import axios from 'axios';

const Prices = ({tarif}) => {

    const handleClick = async () => {
      console.log("you clicked");
      const response = await axios.post("/create-subscription", {
        priceId: "13exemple",
        customersId: "testID123",
        price: tarif.price,
        }
      )
      console.log(response.data);
    }
    return(
        <div className="col-sm-4 mx-auto md-auto">
            <Card style={{ width: '15rem' }}> 
      <Card.Body>
        <Card.Title>{tarif.name}</Card.Title>
        <Card.Img variant="top" src={`../src/img/${tarif.image}`} />
        <Card.Text>
          <h1 style = {{padding: "5%"}}>{tarif.price} €</h1>
          <ListGroup  key = {tarif.price}variant="flush">
            {tarif.avantages.map(avantage => (
                <ListGroup.Item>{avantage}</ListGroup.Item>
            ))}

          </ListGroup>

        </Card.Text>

        <Button  variant=" btn btn-primary" size="mx-auto" onClick={handleClick}> subscribe</Button>
      </Card.Body>
    </Card>
        </div>
    )
}
export default Prices