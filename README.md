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
These are the main resources:
* Meta data is used to describe and organize Documents, Schemas and BLOBs.

* The content of a Document is described by the Schema of a Document. It is used to securely index Documents and to enable search operations while leaving the Documents encrypted. 

* The data within a Document is contained in JSON format. Every Document is associated to a Schema. The Document fields can also contain other representations such as HL7 or binary data. The max size of a document is from the start set to 10MB. 

* To store large files BLOBs are used (rec. to have up to 500MB). This is executed through a chunk-based upload. To properly handle BLOB retrieval, each BLOB should have a corresponding Document containing its metadata.

* Managing of permission and access to the data is easily setup through groups. The code is built to enable you as a developer to easily manage Groups, Users and their permissions to Schemas, Blobs and Documents. 

* A group is a collection of users with the same access rights. A user is a person who can store and access documents with a specific access right. 

###Logs
In the backend an easy way to access logs and get an overview of how users has accessed data will be included, all access to the stored data will be logged.

---
# API Documentation
This will be further developed as the software functionality grows! 

The API calls are created to be simplistic but still powerful. It is built to have the functions of SCRUD (search, create, read, update and delete). For most calls the access token, userID and userKey needs to be provided. More extended and exact information will soon be added about this under each call description. This API is still heavily under development and therefore much will change during the development. Use this versions more to see if it is something that could interest you as a developer to use or contribute to.  

#####The API will be divided into:
+ Response messages
+ Documents
+ Schemas
+ BLOB
+ User & Authentication
+ Groups

## Response messages
Coming Soon
## Documents
Documents are meant to store all information and are defined by correlating schemas
#### CREATE 
To create a document data structured as seen below is sent.
```javascript
{
  'content': {
    'hospital': 'Storsjukhuset',
    'physician': 'Adam Torkelsson',
    'disease': 'Korsbandet avdraget',
    'date_visit': '2014-01-13 11:29:22'
  }
}
```
#### READ
Coming soon
#### UPDATE
Coming soon
#### DELETE
Coming soon
#### SEARCH 
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
## Schemas 
Schemas are built both to ensure the data stored in the Documents and to in a less costly way be able to search over data. It is a tool to lower the number of decryptions needed when reading the information.
#### CREATE & UPDATE
```javascript
{
  ‘description’: ‘patientSchema’,
   ‘fields’: [
      {
      ‘name’: ‘physician’,
        ‘type’: ‘string’
      },
      {
        ‘name’: ‘birth_date’,
        ‘type’: ‘date’
      },
      {
        ‘name’: ‘disease’,
        ‘type’: ‘string’
      },
      {
        ‘name’: ‘date_visit’,
        ‘type’: ‘datetime’
      }
    ]
}
```
#### READ
Coming soon
#### DELETE
Coming soon
## BLOB
Coming soon
## Users & Authentication
Below is the json structure for creating, updating, authenticating and logout for a user

#### Create & Update
```javascript
{
  'username': 'Adam',
  'password': 'mfak!fna8=234',
  'attr': {
    'firstName': 'Adam',
    'lastName': 'Torkelsson',
    'email': 'adam@wrapmyinfo.com'
  }
}
```
#### Delete
Coming soon

#### Authenticate
```javascript
{
  'user_id': '871y4nafakmeahfaoz',
  'username': 'Adam',
  'password': 'mfak!fna8=234'
}
```
#### Logout 
Coming soon

## Groups
#### Create & Update
```javascript
{
  'name': 'anesthesiaPhysician',
  'attributes': {
    'role': 'anesthesia',
    'hospital': "Storsjukhuset'
  }
}
```
#### Read
Coming soon
#### Delete 
Coming soon
#### Add user to group
```javascript
{
  'group': 'groupID',
  'user': 'userID'
}
```
