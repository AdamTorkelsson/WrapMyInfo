---


                                        
                                         ### Still in development ###
                                         
This API is still heavily under development and therefore much will change during the development. Use this versions more to see if it is something that could interest you as a developer to use or contribute to.

                                              

---


# WrapMyInfo

A backend project supported by Internetfonden.

https://www.internetfonden.se/wrapmyinfo/ (In Swedish)
www.encubator.com 

## Introduction
WrapMyInfo is a backend that makes it easier to store and handle information in secure. It connects to the frontend and your backend through an the below described API. It enables you to organize, maintain and encrypt information your users want you to keep safe. The software includes functionality as storing non-predefined JSON’s, BLOB(large files),include metadata and handle users. It is built to keep the information secure and fulfil many of the regulations in the EU Directive 95/46/EC 
## Contact & Meeting
Please use Github or adam@wrapmyinfo.com for any questions or ideas regarding this project. We will moreover arrange a meeting somewhere in Sweden during the fall and help those interested in using the software explore this software. We will publish a date and time for this event here and on meetup.com 
## Security & Integrity 
This code was created to strictly use SSL and encrypt sensetiv information when in rest, we highly recommend extended validation for all those using this software and storing personal information. The security will be tested by a third party to ensure the quality of the code during the fall, we moreover hope that the community will help us to make it even more secure. The main target with this development will be to protect and ensure that the information is not accessible in any way by third parties so that the integrity of the end-users are maintained.  

## Recommended database & Server
We recommend everyone that uses this software to use postgreSQL and only use servers that are locally within their own country. Always check the owner of the server as well since this affect who has legal access to the information stored on the servers.

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

## Overview 
Architecture Overview Image - Coming soon

The main resources of this backend is the Schema, Document, Blob, Users and Groups.  The Schema is where you decide how the data your store within your Documents are going to be structured and what it consist of, it is also where you decide if your Documents should have Blob's(large files) or not. For example could you (Ex. step1) define a schema after what you need for a hospital visit. Then you (Ex. step2)create a Document after that Schema and start to (Ex. step3)store a users information within it. As a hospital visit may include pictures you have defined your hospital visit schema to make the Document have zero,one or several Blob "children" in which you easily can store these pictures. We have designed it this way to make it possible for the backend to verify and maintain the database for you while being dynamic and possible to use for a lot of different kind of softwares.  

Primarly this software is built to work together with your own backend and not on its own. It is built in a way that we hopes enable as many as possible to be able to integrate with it and gain value from it. The things your own backend needs to take care of is if you have more than one type of user and these users needs to gain access to each others information. This is done with groups but this functionality needs your backend to verify which users should be permitted to become owners of groups. You moreover need a backend to handle login and update tokens. You moreover need to distribute the tokens to the right user. In your own backend you should therefore store the developerID, developerKey and all your users unique UserID. It is however important to never transfer user sensetive information through your own backend since this would require you to keep as a high security level on your own backend.   

A short description of the main resources:
* A Schema contains the description of a documents data, it is used to verify data and maintain consistensy in the stored information.
* A Document consist of data and meta. 
    * The data will be stored encrypted and is the location were you should store all sensetive information about your users. For larger files it is recommended to use blobs instead. 
    * The Meta is used to identify, organize and find documents faster with a lower process cost.
* To store large files BLOBs are used.  A BLOB consist of binary data that is encrypted and meta data that identifies it, blobs is linked to documents which is their identifier. 
* Groups are used to handle permission to information between users. A group correlates to one or several schemas. The Schemas identifies which documents the owners has access to. All owners of a group therefore has access to all the documents of the members which correlates to the schemas of which the groups has ownership rights to. 
* Users are identified by their UserID which is given as a response when users are created.
* Developers are identified by their DeveloperID and DeveloperKey
* For high level calls a Developer Token is required, these has a lifespan of 24 hours and are created with the DeveloperID and DeveloperKey
* For low level calls a user token is required, these has a lifespan of 24 hours and are created with the UserID and Developer Token

### Logs 
All accesses calls and logins will be logged and saved.

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

### CREATE A DEVELOPER TOKEN
```javascript
URL: BASE_URL + /auth/:developer
Method: [GET]
Content-Type: application/json 
Authorization: <DeveloperID,DevelopeKey>
```

**answer:**
```javascript
{
  'token': 'eybsfmAvSao...'
}
```

### CREATE A USER TOKEN
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
A Schema is the description of documents, they include standardvalue, type and name. Schemas are built both to validate the data stored in the Documents and organize them. They moreover enable you as a developer to prevent uncessary searches. 

These datatypes are supported as schema types: 

integer, float, Strings, boolean, 
date - Standard ISO 8601 format.time
JSON (JSON can not be indexed, they can however still be multilevel) 

#### CREATE A SCHEMA
Create a new schema that describes document content. 
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
        ‘name’: ‘patient_journal’,
        ‘type’: ‘json',
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
{
    SchemaID: 'dvasknaJH'
}
```
#### UPDATE AN EXISTING SCHEMA
Update an existing schema that describes document content. ** Did we do this by updating or replacing?"  ** 
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
#### LIST ALL EXISTING SCHEMAS
List all the Schemas you have created.
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

#### GET A SCHEMA
Get a single Schema you previously have created.
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
#### DELETE AN EXISTING SCHEMA 
Delete a schema you have created, all relating documents will be deleted as well. 
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
Documents are meant to store all information and are defined by their correlating schemas
#### CREATE A DOCUMENT
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

**answer:**
```javascript
{
    DocumentID: 'smamaeLKAS'
}
```
#### GET USER DOCUMENTS FOR A SPECIFIC SCHEMA
Get all documents that correlates to a Schema for a user.
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

Get a single document, by identifing it with its ID.
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

#### LIST ALL SCHEMAS A USER HAS CORRELATING DOCUMENTS TO
Get a list of all schemas that a user has created correlating document(s) to.
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

#### UPDATE A USERS EXISTING DOCUMENT
Update an existing document with new information or hange previously created information.
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
#### DELETE A USERS DOCUMENT
Delete a created document
```javascript
URL: BASE_URL + /User/Schema/:Schema/:document
Method: [DELETE]
Content-Type: application/json 
Authorization: <UserToken>
```

### BLOB 
Blobs are children to document, all sensetive information of them should exist in their parents documents data. Blobs exist of meta data and binary data. The binary data is encrypted while the meta data is left unencrypted. 

#### CREATE
/User/Schema/:Schema/:document/blob/:blob
Blobs 
```javascript
Coming soon
```
#### PUT
/User/Schema/:Schema/:document/blob/:blob

#### LIST
/User/Schema/:Schema/:document/blob

#### GET
/User/Schema/:Schema/:document/blob/:blob

#### DELETE
/User/Schema/:Schema/:document/blob/:blob

## Users 
#### CREATE A NEW USER
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

#### LIST ALL USERS
Get a list of all users
```javascript
URL: BASE_URL + /users
Method: [GET]
Content-Type: application/json 
Authorization: <DeveloperToken>
```

#### DELETE A USER
Delete a user
```javascript
URL: BASE_URL + /users/:User
Method: [DELETE]
Content-Type: application/json 
Authorization: <DeveloperToken>
```

## Groups
#### CREATE A NEW GROUP
Create a group
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
#### LIST ALL USERS IN A GROUP
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
#### GET * TEST* 
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
#### DELETE A GROUP
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

##### MAKE A USER OWNER OF A GROUP *TEST* 
Create group and add a user as owner of a group
```javascript
URL: BASE_URL +  /User/:UserID/ownerGroups/:GroupID
Method: [CREATE]
Content-Type: application/json 
Authorization: <DeveloperToken>
```
##### ADD A USER AS OWNER OF AN EXISTING GROUP
Add a user as owner of an existing group
```javascript
URL: BASE_URL +  /User/:UserID/ownerGroups/:GroupID
Method: [PUT]
Content-Type: application/json 
Authorization: <DeveloperToken>
```
##### LIST ALL GROUPS A USER IS OWNER IN
Get all groups a user is owner in. 
```javascript
URL: BASE_URL +  /User/:UserID/ownerGroups
Method: [GET]
Content-Type: application/json 
Authorization: <UserToken>
```
##### GET GROUP INFORMATION
Get information about a group and which Schemas it has. 
```javascript
URL: BASE_URL +  /User/:UserID/ownerGroups/:Group
Method: [GET]
Content-Type: application/json 
Authorization: <UserToken>
```
##### DELETE A GROUP
Remove a user as owner from a group
```javascript
URL: BASE_URL +  /User/:UserID/ownerGroups/:Group
Method: [DELETE]
Content-Type: application/json 
Authorization: <DeveloperToken>
```

##### Access member data
 /User/:UserID/ownerGroups/:Group/User/:UserID/
```javascript
Coming soon
```

#### Members 
A member of a group is the ones which shares their information to the owners of the group. 

#### ADD USER AS A MEMBER TO AN EXISTING GROUP
Add user as a member to an existing group
```javascript
URL: BASE_URL +  /User/:UserID/memberGroups/:GroupID  
Method: [PUT]
Content-Type: application/json 
Authorization: <UserToken>
```
#### LIST ALL GROUPS A USER IS MEMBER IN 
Get all groups a user is member in
```javascript
URL: BASE_URL +  /User/:UserID/memberGroups/
Method: [GET]
Content-Type: application/json 
Authorization: <UserToken>
```
#### REMOVE A USERS MEMBERSHIP
Removes a user from a group
```javascript
URL: BASE_URL +  /User/:UserID/memberGroups/:GroupID  
Method: [DELETE]
Content-Type: application/json 
Authorization: <UserToken>
```

## SEARCH
To search over data a JSON as seen below is posted to the backend. A search can be done over Documents and/or Blobs. It can be done over the meta data or/and the encrypted information. Since it is costly to do large searches over many files with encrypted information this should be avoided to as large extent as possible. How the search should be done is included in the JSON posted as seen below.
A search consist of 
+ Span
+ Options
+ Query

#### SPAN - THE DATA TO SEARCH OVER
These choices are the main choices over which information to search over.
+ **schemaID:** SchemaID( standardvalue false) or/and **userID**:  UserID (standardvalue false)
+ **DocumentMeta:** boolean - standardvalue false
+ **DocumentData:** boolean - standardvalue false
+ **BlobMeta:** boolean - standardvalue false

So if you include both schemaID and userID the search will only include that users documents that relates to that Schema. If only a Schema is included the search will be done over all users documents correlates to that Schema. If only userID is included the search will be done over all Documents that user has. 

#### OPTIONS - THE SETTINGS FOR YOUR SEARCH
In options all the settings for the search is choosed. 
+ **maxCountDocument:** number - The maximum count coverage of the query, if higher the search will not initiate. Standardvalue is 100. 
+ **maxSpanSize:** number (mb) The maximum size coverage of the query, if higher the search will not initiate. Standardvalue is 1 (mb).

#### QUERY 
This query is an jsonArray that can include these search terms: 
+ **field:** The key you want to find 
+ **Value** Below is two different options listed, **only one can be used in an element**
    + **Value:**: The value of the above stated key
    + **LowValue** && **HighValue**:  All values between these values. Can be numbers or string
+ **case_sensetive:** If sensetive for large/small characters - Standardvalue is false
+ **relation_to_next**: 'and'/'or'/'exclude', The relation to the next element in the JSONARRAY.   Stanardvalue is and


The JSON with the search request should be structured as the example below:
```javascript
{ span: {
    schemaID: 'vadfafsmKFF9',
    DocumentMeta: true,
    DocumentData: true,
    }
    options: {
    maxSizeSearch: 0.1
    }
    filters:[
        {
            ‘field’: ‘hospital’,
            ‘value’: ’Storsjukhuset’, 
            ‘case_sensitive’: true,
            'relation_to_next': 'and'
        },
        {
            ‘field’:’disease’,
            ‘value’:’Knäled’,
            'relation_to_next': 'or'
        },
        {
            ‘field’:’Physician’,
            ‘lowValue’: 'Adam',
            'highValue': 'Karl'
            'relation_to_next': 'and'
        },
   	{
            ‘field’:’age’,
            ‘lowValue’: 6,
	        ‘highValue’:15
        }
    ]
```

```javascript
'result': success, 
'data': {
    'schemaID':
    'documentID': 
    'userID':
}
```
