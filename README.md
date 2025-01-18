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
