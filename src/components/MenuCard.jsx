import {
    Card,
    CardHeader,
    CardBody,
    Typography,
  } from "@material-tailwind/react";
   
  const MenuCard =({item})=> {
    const {nombre, precio, descripcion, imagenes}=item; 

    return (
      <div>
        <Card className="flex-row w-full max-w-[48rem] select-none shadow-black shadow-lg">
          <CardHeader shadow={false} floated={false} className="w-2/5 shrink-0 m-0 rounded-r-none">
            <img
              src={imagenes[0]}
              alt={nombre}
              className="w-full md:h-96 h-80 object-cover"
            />
          </CardHeader>
          <CardBody className="my-auto">
            <Typography variant="h6" className="uppercase mb-4 text-green-900 underline">{nombre}</Typography>
            <Typography color="gray" className="font-normal mb-8">
              {descripcion}
            </Typography>
            <Typography variant="h4" className="mb-2 text-green-900">
              ${precio}
            </Typography>
            <Typography className="my-auto mx-auto rounded-lg border bg-green-900 text-white text-center">
              ADD to cart
            </Typography>
          </CardBody>
        </Card>
      </div>
    );
  }
export default MenuCard

