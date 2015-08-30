---


                                         ### Still in development ###
                                              

---


# WrapMyInfo

A project driven by WrapMyInfo and supported by Internetfonden.

https://www.internetfonden.se/wrapmyinfo/ (In Swedish)

www.encubator.com 

## Introduction
WrapMyInfo is a fully working backend that makes it possible to store and handle information in JSON format encrypted. It connects to the frontend through an API that builds upon express and can store non-predefined JSON’s, BLOB, metadata and create users. It is built to keep the information secure and fulfil many of the regulations in the EU Directive 95/46/EC 
## Contact & Meeting
Please use Github or adam@wrapmyinfo.com for any questions or ideas regarding this project. We will moreover arrange a meeting somewhere in Sweden during the fall and help those interested in using the software in any way we can. We will publish a date and time for this event here and on meetup.com 
## Security & Integrity 
This code was created to strictly use SSL and encrypt JSON files when in rest. The security will be tested by a third party to ensure the quality of the code during the fall, we moreover hope that the community will help us to make it even more secure. The main target with this development will be to protect and ensure that the information is not accessible in any way by third parties so that the integrity of the end-users are maintained.  
## Recommended database & Server
We recommend everyone that uses this software to use postgreSQL and only use servers that are locally within their own country. Always check the owner of the server as well since this affect who has legal access to the information stored on the servers. 

## Overview 
Architecture Overview Image - Coming soon 

These are the main resources:

* The content of a Document is described by the Schema of a Document. It is used to securely index Documents and to enable search operations while leaving the Documents encrypted. 
 
* A document contains Meta data which is used to describe and organize Documents.

* The data within a Document is contained in JSON format. Every Document is associated to a Schema. The Document fields can also contain other representations such as HL7 or binary data. 

* To store large files BLOBs are used (rec. to have up to 500MB). 

* Managing of access to other users data is easily achievable through groups. 

* A group correlates to one or several schemas. A group is a collection of users that are members or owners. A groups owners has permission to the members documents that correlates to the schema the group correlates to. 

### Logs
In the backend an easy way to access logs and get an overview of how users has accessed data will be included, all access to the stored data will be logged.

---
# Get started
To get up and running fast, use https://www.vagrantup.com

1. git clone git@github.com:AdamTorkelsson/WrapMyInfo.git && cd wrapmyinfo
2. vagrant up
3. vagrant ssh
4. cd /home/vagrant/wrapmyinfo
5. wrapmyinfo-migrate
6. npm start

---
# API Documentation
This will be further developed as the software functionality grows! 

The API calls are created to be simplistic but still powerful. More extended and exact information will soon be added about this under each call description. This API is still heavily under development and therefore much will change during the development. Use this versions more to see if it is something that could interest you as a developer to use or contribute to.

##### The API will be divided into:
+ Standard Response messages
+ Auth/Tokens
+ Schemas
+ Documents
+ BLOB
+ Users
+ Groups
    + Owners
    + Members
+ Search

## Response messages
Coming Soon

## Tokens
Two different kind of tokens exist, Developer token and the user token. The developer token is unique for each software and the user token is unique for each user of a software. 

### CREATE 
#### Developer token
```javascript
URL: BASE_URL + /auth/:developer
Method: [POST]
Content-Type: application/json 
Authorization: <DeveloperToken>
```
**body:**
```javascript
{
  'developerID': 'nfalnaSNama...',
  'developerKey': 'afafebeeaf'
}
```

**answer:**
```javascript
{
  'token': 'eybsfmAvSao...'
}
```

#### User token
```javascript
URL: BASE_URL + /auth/user/:user
Method: [POST]
Content-Type: application/json 
Authorization: <DeveloperToken>
```

**body**
```javascript
{
  'userID': 'nfalnaSNama...'
}
```

**answer:**
```javascript
{
  'token': 'eybsSKvSao...'
}
```
## Schemas 
A Schema is the description of documents, they include standardvalue, type and name. Schemas are built both to validate the data stored in the Documents and to in a less costly way enable search over data. It is moreover a way for developers to have higher controll over what information is stored. 
#### CREATE 
```javascript
URL: BASE_URL + /schemas
Method: [CREATE]
Content-Type: application/json 
Authorization: <DeveloperToken>
```
**body structure/example**
```javascript
{
  ‘description’: ‘patientSchema’,
   ‘fields’: [
      {
      ‘name’: ‘physician’,
        ‘type’: ‘string’
        'standardvalue': 'null'
      },
      {
        ‘name’: ‘birth_date’,
        ‘type’: ‘date',
        'standardvalue': 'null'
      },
      {
        ‘name’: ‘disease’,
        ‘type’: ‘string’,
        'standardvalue': '"none"'
      },
      {
        ‘name’: ‘date_visit’,
        ‘type’: ‘int’,
        'standardvalue': '-1'
      }
    ]
}
```
**answer**
```javascript
Coming soon
```
#### UPDATE
```javascript
URL: BASE_URL + /schemas/Schema/:Schema
Method: [PUT]
Content-Type: application/json 
Authorization: <DeveloperToken>
```

**body structure/example**
```javascript
{
  ‘description’: ‘patientSchema’,
   ‘fields’: [
      {
      ‘name’: ‘physician’,
        ‘type’: ‘string’,
        'standardvalue': ''
      },
      {
        ‘name’: ‘birth_date’,
        ‘type’: ‘year’,
        'standardvalue': '-1'
      }
    ]
}
```
#### LIST
```javascript
URL: BASE_URL + /schemas
Method: [GET]
Content-Type: application/json 
Authorization: <DeveloperToken>
```
**answer:**
```javascript
Coming soon
```

#### READ
```javascript
URL: BASE_URL + /schemas/Schema/:Schema
Method: [GET]
Content-Type: application/json 
Authorization: <DeveloperToken> or <UserToken>
```

**answer:**
```javascript
Coming soon
```
#### DELETE
```javascript
URL: BASE_URL + /schemas/Schema/:Schema
Method: [DELETE]
Content-Type: application/json 
Authorization: <DeveloperToken>
```
**answer:**
```javascript
Coming soon
```

## Documents
Documents are meant to store all information and are defined by correlating schemas
#### CREATE 
```javascript
URL: BASE_URL + /User/:User/Schema/:Schema
Method: [CREATE]
Content-Type: application/json 
Authorization: <UserToken>
```

**body example/structure:**
```javascript
{
'meta': {
    'hospital': 'Storsjukhuset',
    'physician': 'Adam Torkelsson',
  }
  'body': {
   'physician': 'Adam Torkelsson',
   'patient': 'Johanna Jonsson',
    'disease': 'Korsbandet avdraget',
    'date_visit': '2014-01-13 11:29:22',
    'patient_journal': 'The patient seems to...'
  }
}
```

#### READ
To get all documents that correlates to a schema for a user
```javascript
URL: BASE_URL + /User/:user/Schema/:Schema
Method: [GET]
Content-Type: application/json 
Authorization: <UserToken>
```
**answer:**
```javascript
Coming soon
```


To get a document
```javascript
URL: BASE_URL + /User/:User/Schema/:Schema/:document
Method: [GET]
Content-Type: application/json 
Authorization: <UserToken>
```
**answer:**
```javascript
Coming soon
```

#### LIST
To get a list of all schemas that a user has created correlating document(s) to.
```javascript
URL: BASE_URL + /User/:User/schemaList
Method: [GET]
Content-Type: application/json 
Authorization: <UserToken>
```
**answer:**
```javascript
Coming soon
```

#### UPDATE
```javascript
URL: BASE_URL + /User/:User/Schema/:Schema/:document
Method: [PUT]
Content-Type: application/json 
Authorization: <UserToken>
```

**body:**
```javascript
Coming soon
```

**answer:**
```javascript
Coming soon
```
#### DELETE
```javascript
URL: BASE_URL + /User/Schema/:Schema/:document
Method: [DELETE]
Content-Type: application/json 
Authorization: <UserToken>
```

## BLOB
```javascript
Coming soon
```

## Users & Authentication
Below is the json structure for creating, updating, authenticating and logout for a user

#### CREATE USER
```javascript
URL: BASE_URL + /users
Method: [CREATE]
Content-Type: application/json 
Authorization: <DeveloperToken>
```

**body:**
```javascript
Coming soon
```

**answer:**
```javascript
{
    'userID': 'nfalnaSNama..',
    'userToken': 'avasanS...'
}
```
To renew userToken and identify user **the userID needs to be saved in the developer backend.**

#### LIST
/users
```javascript
URL: BASE_URL + /users
Method: [GET]
Content-Type: application/json 
Authorization: <DeveloperToken>
```

#### Delete
```javascript
URL: BASE_URL + /users/:User
Method: [DELETE]
Content-Type: application/json 
Authorization: <DeveloperToken>
```

## Groups
#### CREATE 
```javascript
URL: BASE_URL + /groups
Method: [CREATE]
Content-Type: application/json 
Authorization: <DeveloperToken>
```

**body:**
```javascript
Coming soon
```
#### LIST 
```javascript
URL: BASE_URL + /groups
Method: [GET]
Content-Type: application/json 
Authorization: <DeveloperToken>
```

**answer:**
```javascript
Coming soon
```
#### READ
```javascript
URL: BASE_URL + /groups/Group/:GroupID
Method: [GET]
Content-Type: application/json 
Authorization: <DeveloperToken>
```
**answer:**
```javascript
Coming soon
```
#### DELETE 
```javascript
URL: BASE_URL + /groups/Group/:GroupID
Method: [DELETE]
Content-Type: application/json 
Authorization: <DeveloperToken>
```
**answer:**
```javascript
Coming soon
```

#### Owners
A group owner can access all shared documents by its members, a group can have one or many owners.

##### CREATE 
Create group and add a user as owner of a group
```javascript
URL: BASE_URL +  /User/:UserID/ownerGroups/:GroupID
Method: [CREATE]
Content-Type: application/json 
Authorization: <DeveloperToken>
```

##### PUT
Add a user as owner of an existing group
```javascript
URL: BASE_URL +  /User/:UserID/ownerGroups/:GroupID
Method: [PUT]
Content-Type: application/json 
Authorization: <DeveloperToken>
```
##### LIST
Get all groups a user is owner in. 
```javascript
URL: BASE_URL +  /User/:UserID/ownerGroups
Method: [GET]
Content-Type: application/json 
Authorization: <UserToken>
```
##### READ   
```javascript
URL: BASE_URL +  /User/:UserID/ownerGroups/:Group
Method: [GET]
Content-Type: application/json 
Authorization: <UserToken>
```
##### DELETE
Remove a user as owner from a group
```javascript
URL: BASE_URL +  /User/:UserID/ownerGroups/:Group
Method: [DELETE]
Content-Type: application/json 
Authorization: <DeveloperToken>
```

##### Access member data
```javascript
Coming soon
```

#### Members
#### Add user as member
Add user as a member to an existing group
```javascript
URL: BASE_URL +  /User/:UserID/memberGroups/:GroupID  
Method: [PUT]
Content-Type: application/json 
Authorization: <UserToken>
```
#### LIST
Get all groups a user is member in
```javascript
URL: BASE_URL +  /User/:UserID/memberGroups/
Method: [GET]
Content-Type: application/json 
Authorization: <UserToken>
```
#### Remove user membership
Removes a user from a group
```javascript
URL: BASE_URL +  /User/:UserID/memberGroups/:GroupID  
Method: [DELETE]
Content-Type: application/json 
Authorization: <UserToken>
```

### SEARCH 
A JSON is sent with the search request that is supposed to run over the encrypted JSON document. This JSON can include these search terms: 
Coming soon
The JSON with the search request should be structured as below:
```javascript
[ {   
‘full_document’: true,
    ‘filter_type’: ‘and’,
    ‘filters’:[
        {
            ‘field’: ‘hospital’,
            ‘value’: ’Storsjukhuset’, 
            ‘case_sensitive’: true
        },
        {
            ‘field’:’disease’,
            ‘type’:’not’,
            ‘value’:’Knäled’,
            ‘case_sensitive’: false
        },
        {
            ‘field’:’Physician’,
            ‘type’:’in’,
            ‘value’:[‘Adam’, ‘Torkelsson’],
            ‘case_sensitive’:false
        },
   	{
            ‘field’:’age’,
            ‘type’:’between’,       
            ‘valueMin’: 6,
	‘valueMax’:15
        }
    ]
```
