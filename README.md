<h1 align="center"> hexagonal-lambda </h1>
Hexagonal architecture archetype for use in lambdas

## Table of Contents
- [Domain](#domain)
    - [Entities](#entities)
    - [Models](#models)
    - [ValueObjects](#valueObjects)
    - [Types](#types)
    - [DomainErrors](#domainErrors)
- [Application](#application)
    - [Ports](#ports)
        - [PrimaryPorts](#primaryPorts)
        - [SecondaryPorts](#secondaryPorts)
    - [UseCases](#useCases)
- [Infrastructure](#infrastructure)
    - [Driven](#driven)
        - [Driven Adapters](#drivenAdapters)
        - [Mappers - Driven](#drivenMappers)
        - [Repositories](#repositories)
    - [Driving](#driving)
        - [Driving Adapters](#drivingAdapters)
        - [DTO](#dto)
        - [Mappers - Driving](#drivingMappers)

# domain
The Domain is the core of the service, it sholudn´t change at least the bussiness logic changes.

# entities
The Entities are classes that represent the bussiness's objects and their rules. An instanced Entity cloud be the representation of a record in the DB or not.

# valueObjects
Value Objects are classes used to represent data in a more complex way than a primitive value for example: And address could be a string but if we want attach validation logic and work with the parts of the address we need something more than a string and use a class to represent the addrress.

# domainErrors
The Domain Errors are classes responibles for map the errors that could occur in the domain, these errors ar not exceptions but bussiness logic related errors.

# application
The Application is the layer where we define our ports and use cases.

# ports
A port is an interface that every adapter wants to connnect to the port must implement.

# primaryPorts
Primary ports are used to connect with the driving adapters (input adapters) in the infrastructure layer. 

# secondaryPorts
Secondary ports are used to connect with the driven adapters in the infrastructure layer, commonly used to call external services like databases, third party APIs, and more.

# useCases
The use cases are used to execute the logic of our application by calling entity methods, external services and executing its own logic and validations.

# infrastructure
The infrastructure layer is used to comunicate the core with "the external world", here we have impletentations of the ports known as Adapters.

# driven

# drivenAdapters
The driven Adapters are implementations of the application secondary ports, we use these implementations to comunicate with external resources and mantain the core of our service completily independent of a particular external service.

# drivenMappers
A mapper is a class that take a object in a format and transform it to another format needed for any layer or component, in the driven mapper the class can transform a entity to a plain object nedeed in the repository and also can take a plain object and transform to a entity.

# repositories
A repository a class responsible for the comunication with the data base, here we make our queries!.

# driving

# drivingAdapters
The driving adapter is a function responsible por connecting the core to a particular entrypoint and make the needed validations and transformations to the data, for example we could have and adapter in the case http request was used to call our core and use other adapter when the request came from and SQS message or a eventBridge Event. Is impotant to mantain the low coupling for what is necesary to use interfaces between the adapter and use case, those interfaces are the primary adapters defined in application layer.
# dto
The DTO is like a contract that indicates what properties a request object must have to be valid for our service, and moreover indicates the object client must wait as a response.

# drivingMappers
This mapper takes the data that comes from the entrypoints of the software and transform it in the format needed for the Application layer.
