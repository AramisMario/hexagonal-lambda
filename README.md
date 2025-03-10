<h1 align="center"> hexagonal-lambda </h1>
Hexagonal architecture archetype for use in lambdas

## Table of Contents
- [Domain](#Domain)
    - [Entities](#Entities)
    - [Models](#Models)
    - [Value Objects](#value-objects)
    - [Types](#Types)
    - [Domain Errors](#domain-errors)
- [Application](#Application)
    - [Ports](#Ports)
        - [Primary Ports](#primary-ports)
        - [Secondary Ports](#secondary-ports)
    - [Use Cases](#UseCases)
- [Infrastructure](#Infrastructure)
    - [Driven](#Driven)
        - [Driven Adapters](#driven-adapters)
        - [Driven Mappers](#driven-mappers)
        - [Repositories](#Repositories)
    - [Driving](#Driving)
        - [Driving Adapters](#driving-adapters)
        - [DTO](#DTO)
        - [Driving Mappers](#driving-mappers)

# Domain
The Domain is the core of the service. It contains the business logic and should not change unless the business requirements change.

# Entities
Entities are classes that represent the business objects and their rules. An instantiated Entity could represent a record in the database or not.

https://github.com/AramisMario/hexagonal-lambda/blob/2ad8d12d7507ef3a4210c5a4003b76a4d46ab0d9/src/domain/entities/entity.ts#L1-L40

# Models
There are many different approaches to define what a model is, but in this case, models are interfaces used to describe important elements of the core that are not entities, such as the core's response or the data required by the use case.

https://github.com/AramisMario/hexagonal-lambda/blob/2ad8d12d7507ef3a4210c5a4003b76a4d46ab0d9/src/domain/models/debitedSucess.ts#L1-L4

# Value Objects
Value Objects are classes used to represent data in a more complex way than a primitive value. For example, an address could be stored as a string, but if we want to attach validation logic and work with the individual parts of the address, we need something more than a string and use a class to represent the address.

https://github.com/AramisMario/hexagonal-lambda/blob/2ad8d12d7507ef3a4210c5a4003b76a4d46ab0d9/src/domain/valueObjects/address.ts#L16-L40

# Types
The types folder is not related to hexagonal architecture; it is simply a place to store TypeScript types used in the code.

# Domain Errors
Domain Errors are classes responsible for mapping the errors that could occur in the domain. These errors are not exceptions but business logic-related errors.

https://github.com/AramisMario/hexagonal-lambda/blob/2ad8d12d7507ef3a4210c5a4003b76a4d46ab0d9/src/domain/domainErrors/EntityErrors/entityNotFound.ts#L1-L10

# Application
The Application is the layer where we define our ports and use cases.

# Ports
A port is an interface that every adapter wanting to connect to it must implement.

# Primary Ports
Primary ports are used to connect with the driving adapters (input adapters) in the infrastructure layer.

https://github.com/AramisMario/hexagonal-lambda/blob/2ad8d12d7507ef3a4210c5a4003b76a4d46ab0d9/src/application/ports/primaryPorts/useCases/useCasePort.ts#L4-L6

# Secondary Ports
Secondary ports are used to connect with the driven adapters in the infrastructure layer, commonly used to call external services like databases, third-party APIs, and more.

https://github.com/AramisMario/hexagonal-lambda/blob/2ad8d12d7507ef3a4210c5a4003b76a4d46ab0d9/src/application/ports/secondaryPorts/serviceRepository/serviceRepositoryPort.ts#L1-L8

# Use Cases
Use cases execute the logic of our application by calling entity methods, external services, and performing their own logic and validations.

https://github.com/AramisMario/hexagonal-lambda/blob/2ad8d12d7507ef3a4210c5a4003b76a4d46ab0d9/src/application/useCases/useCase.ts#L20-L78

# Infrastructure
The Infrastructure layer is used to communicate the core with "the external world." Here, we implement the ports, known as Adapters.

# Driven
The Driven folder contains everything in the infrastructure layer related to other services our software needs. Here you'll find the secondary adapters, repositories, and mappers to transform data from entities to plain objects and vice versa.

# Driven Adapters
Driven Adapters are implementations of the application's secondary ports. We use these implementations to communicate with external resources while keeping the core of our service completely independent of any particular external service.

https://github.com/AramisMario/hexagonal-lambda/blob/2ad8d12d7507ef3a4210c5a4003b76a4d46ab0d9/src/infrastructure/driven/adapters/thirdPartyApi/thirdPartyApi.ts#L1-L24

# Driven Mappers
A mapper is a class that takes an object in one format and transforms it into another format needed by any layer or component. In the driven mapper, the class can transform an entity into a plain object needed by the repository and vice versa.

https://github.com/AramisMario/hexagonal-lambda/blob/2ad8d12d7507ef3a4210c5a4003b76a4d46ab0d9/src/infrastructure/driven/mappers/myEntityMapper/myEntityMapper.ts#L1-L24

# Repositories
A repository is a class responsible for communication with the database. Here we perform our queries!

# Driving
The Driving folder contains everything related to the consumption of our service. Here, we handle the data sent to us, the origin of the request, and the appropriate response.

# Driving Adapters
The driving adapter is a function responsible for connecting the core to a particular entry point and performing the necessary validations and transformations on the data. For example, we could have an adapter for HTTP requests used to call our core and another adapter for requests coming from an SQS message or an EventBridge event. It is important to maintain low coupling, so it is necessary to use interfaces between the adapter and use case. These interfaces are the primary adapters defined in the application layer.

https://github.com/AramisMario/hexagonal-lambda/blob/2ad8d12d7507ef3a4210c5a4003b76a4d46ab0d9/src/infrastructure/driving/adapters/apigateway/apiGatewayAdapter.ts#L13-L70

# DTO
A DTO (Data Transfer Object) is like a contract that specifies the properties a request object must have to be valid for our service. Moreover, it defines the object the client can expect as a response.

https://github.com/AramisMario/hexagonal-lambda/blob/2ad8d12d7507ef3a4210c5a4003b76a4d46ab0d9/src/infrastructure/driving/DTOs/requestDTO.ts#L1-L17

# Driving Mappers
This mapper takes the data that comes from the entry points of the software and transforms it into the format needed for the Application layer.
