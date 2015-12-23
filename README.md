# WrapMyInfo

A software project supported by Internetfonden.

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
2. vagrant up && vagrant ssh
4. cd /home/vagrant/wrapmyinfo
5. (Optional) wrapmyinfo-seed-db
6. npm start

---
# API Documentation
This will be further developed as the software functionality grows! 

## Overview 
![API](http://i60.tinypic.com/317b14g.png)

As seen in the image the main resources is the Schema, Document, Blob, Users and Groups. 
* A Schema contains the structure of the document data. It is used to verify data and maintain consistency in the stored information.
* A Document consist of information that is stored as data(encrypted) and meta(not encrypted). 
    * The data is were you store all sensitive information about your users. This information will always be stored encrypted and secure. For larger files it is recommended to use blobs instead. 
    * The Meta is used to identify, organize and find documents faster without going through sensitive information.
* To store large files BLOBs are used. A BLOB consist of binary data that is encrypted and meta data that identifies it. BLOBs are children to documents. 
* Groups are used to handle permission to information between users. A group correlates to one or several Schemas. 
    * The Schemas identifies which documents the owners has access to. 
    * Owners can list, view, create, edit and delete members Documents.
    * Members are the ones sharing their information to the owners. A user can both be a member and a owner. 
* Users are identified by their UserID which is given as a response when users are created. 
* Developers are identified by their DeveloperID and DeveloperKey.
* For permission changes and structural changes a Developer Token is required, these has a lifespan of 24 hours and are created with the DeveloperID and DeveloperKey
* For other calls a user token is required, these has a lifespan of 24 hours and are created with the UserID and DeveloperToken

##### EXAMPLE HOSPITAL VISIT
During development: 
Define a Schema (step 1) after what shall be included in a hospital visit. This could for example be structured to store information about a visit to a Physician and should therefore include information such as 'PhysicianName','PatientJournal','Hospital','Disease'. Develop your frontend software to upload a json structured (step 2) as described in your Schema to our backend.

In production
A user visit the hospital and inputs data about his/her visit. In the software a JSON is created that correlates to the previously created Schema (step 3). The information is then uploaded directly to the this backend through a secure TLS connection. In the backend the information is thereafter validated by the predefined Schema which was created in step 1, encrypted and safely stored until requested by a user or owner with the correct permission. 

##### The API will be divided into:
+ Standard Response messages
+ Logs
+ Auth/Tokens
+ Schemas
+ Documents
+ BLOB
+ Users
+ Groups
    + Owners
    + Members
+ Search

## STANDARD RESPONSE MESSAGES

### ERROR MESSAGES


##### RESOURCE NOT FOUND
```javascript
        status: "Error",
        errorCode: 0,
        httpCode: 404,
        message: "Resource not found",
        description: "",
        path: req.url,
        method: req.method
```

##### NOT FOUND
```javascript
        status: "Error",
        errorCode: 0,
        httpCode: 404,
        message: 'Requested page could not be found',
        description: "",
        path: req.url,
        method: req.method
    }
};
```
##### NOT MODIFIED
 ```javascript
        status: "Error",
        errorCode: 0,
        httpCode: 304,
        message: 'Not modified',
        description: "",
        path: req.url,
        method: req.method
 ```

##### MALFORMED REQUEST
```javascript
        status: "Error",
        errorCode: 0,
        httpCode: 400,
        message: "Malformed request, missing important information",
        description: "",
        path: req.url,
        method: req.method
    }
};
```

##### ACCESS DENIED
```javascript
        status: "Error",
        errorCode: 0,
        httpCode: 403,
        message: "Access denied. You do not have permission to access this resource.",
        description: "",
        path: req.url,
        method: req.method
```

##### DEVELOPER KEY NOT FOUND 
```javascript
    status: "Error",
    errorCode: 0,
    httpCode: 404,
    message: "Key not found",
    description: ""
```


##### DEVELOPER KEY MISSING CREDENTIALS
```javascript
    status: "Error",
    errorCode: 0,
    httpCode: 400,
    message: "Access denied, missing DeveloperId or DeveloperKey",
    description: ""
```

##### USER AUTHENTICATION FAILED 
```javascript
    status: "Error",
    errorCode: 0,
    httpCode: 401,
    message: "Authentication failed, you do not have permission to create token for this User",
    description: ""
```

##### USER NOT AUTHENTICATED
```javascript
    status: "Error",
    errorCode: 0,
    httpCode: 400,
    message: "Access denied or missing UserId",
    description: ""
```


##### NOT IMPLEMENTED 
```javascript
    status: "Error",
    errorCode: 0,
    httpCode: 501,
    message: "Not yet implemented",
    description: ""
```


### SUCCESS

##### AUTHENTICATED 
```javascript
    status: "Authenticated",
    authenticated: true,
    id: null,
    type: null
```

##### NOT AUTHENTICATED
```javascript
    status: "Not authenticated",
    authenticated: false
```

##### RESOURCE SUCCESSFULLY DELETED
```javascript
    status: "Success",
    successCode: 0,
    httpCode: 200,
    message: "Resource was successfully deleted"
```


## LOGS 
All calls are logged and saved. These will be accessible through an API call with the DeveloperToken. The logs consist of the URL, requested resources, if it was approved and the ID of the user/developer. 

## TOKENS
Tokens are used to make API requests to the backend. Two different kind of tokens exist, the DeveloperToken and the UserToken. The DeveloperToken is unique for each software and the UserToken is unique for each user of the software. 

### CREATE A DEVELOPER TOKEN
The DeveloperToken needs to be attached on all permission changes and structural changes. 
```javascript
URL: BASE_URL + '/auth/'
Method: [POST]
Content-Type: application/json
Authorization: <>
```
**body**
```javascript
{
DeveloperID: 'gagaVASNk',
DeveloperKey: 'faafasvKSj'
}
```
**answer:**
```javascript
{
  token: 'eybsfmAvSao...'
}
```

### CREATE A USER TOKEN
The UserToken needs to be attached on all user specific calls and is unique for each user.
```javascript
URL: BASE_URL + '/auth/'
Method: [POST]
Content-Type: application/json 
Authorization: <DeveloperID, DeveloperToken>
```

**body**
```javascript
{
  userID: 'nfalnaSNama...'
}
```

**answer:**
```javascript
{
  token: 'eybsSKvSao...'
}
```

### CHECK IF A USER IS LOGGED IN 
Check if a UserToken is valid or expired. The standard expiration time is set to 24 hours.

```javascript
URL: BASE_URL + '/auth/status/'
Method: [GET]
Content-Type: application/json
Authorization: <DeveloperID, UserToken> or <DeveloperID, DeveloperToken> 
```

## SCHEMAS 
A Schema defines the structure of Documents. As a developer you decide what the standardvalue/initial value should be, what type it is and the name of the key. Schemas are required to both validate stored data in Documents and to keep them organized.

These datatypes are supported as Schema types: 
+ String 
+ Number 
+ boolean 
+ function 
+ Object (JSON , JSONArray, null...)
    + A JSON will not be multilevel indexed, they can however still be multilevel 

In the schema you will moreover decide if it should be possible to store Blobs for the users and the number & maxsize of these Blobs. 

+ name: patientSchema
+ maxBlobs: 4
+ maxBlobSize: 100

#### CREATE A SCHEMA
Create a new schema that structures document content. 
```javascript
URL: BASE_URL + '/schemas/'
Method: [POST]
Content-Type: application/json 
Authorization: <DeveloperID, DeveloperToken>
```

**body structure/example**
```javascript
{
    name: 'patientSchema',
    maxBlobs: 4,
    maxBlobSize: 100,
    dataRules: [
      {
      name: 'patient',
        type: 'String'
        standardvalue: 'null'
      },
            {
        name: 'patient_journal',
        type: 'object',
        standardvalue: 'null'
      },
      {
        name: 'disease',
        type: 'String',
        standardvalue: 'none'
      },
      {
        name: 'date_visit',
        type: 'number',
        standardvalue: '-1'
      }
    ]
}

```
**answer**
```javascript
{
    SchemaID: 'dvasknaJH',
    Schema: { 
    //the schema you created
    }
}
```

#### UPDATE AN EXISTING SCHEMA - This can change existing user data/documents as described below! 
Updates an existing schema that describes document content. This will affect all previously created documents linked to this Schema. Previously created values will change: 
+ If a standardvalue is changed all documents with the old standardvalue will be **changed into the new one**
+ If the type is changed this will affects all Documents with validated by this Schema. **ALL previously stored values with the previous type will have its value changed** into the new standardvalue and type. 
+ If a key is changed all old keys will change into the new key. 
+ If a key is deleted all Documents with this SchemaID will delete this key and any previously stored value. 

You only need to include those fields that you want to change and the presentKey as identifier. 
```javascript
URL: BASE_URL + '/schemas/:schema'
Method: [PUT]
Content-Type: application/json 
Authorization: <DeveloperID, DeveloperToken>
```

**body structure/example**
```javascript
    {
    name: 'patientSchema',
    dataRules: [
      {
        presentKey: 'patient',
        newKey: 'KneePhysicianID',
        type: 'number',
        standardvalue: -1
      },
       {
        presentKey: 'patient_journal',
        delete: true
      }
    ],
}
```
#### LIST ALL EXISTING SCHEMAS
List all the Schemas you have created.
```javascript
URL: BASE_URL + '/schemas/'
Method: [GET]
Content-Type: application/json 
Authorization: <DeveloperID, DeveloperToken>
```
**answer:**
```javascript
Coming soon
```

#### GET A SCHEMA
Get a single Schema you previously have created. 
```javascript
URL: BASE_URL + '/schemas/' + :schema
Method: [GET]
Content-Type: application/json 
Authorization: <DeveloperID, DeveloperToken> or <DeveloperID, UserToken>
```

**answer:**
```javascript
Coming soon
```
#### DELETE AN EXISTING SCHEMA 
Delete a Schema you have created, all related documents will be deleted as well. 
```javascript
URL: BASE_URL + '/schemas/' + :schema
Method: [DELETE]
Content-Type: application/json 
Authorization:  <DeveloperID, DeveloperToken>
```

**answer:**
```javascript
Coming soon
```

## DOCUMENTS
Documents is were you store all information. The data stored within them is validated and structured by their correlating schemas. 

#### CREATE A DOCUMENT
Create a new Document for a specific user for a specific Schema. To create a Document a JSON with meta and data needs to be posted as body(as seen below). All information that is or can be sensitive should be stored within the data as this is encrypted in rest. Within the meta should information that is not sensitive be stored. The meta is not encrypted to enable you to easier identify & search for Documents. 

```javascript
URL: BASE_URL + '/users/' + :user + '/schemas/' + :schema + '/documents/'
Method: [POST]
Content-Type: application/json 
Authorization: <DeveloperID, UserToken>
```

**body example/structure:**
```javascript
{
meta: {
    hospital: 'Storsjukhuset',
    physician: 'Adam Torkelsson',
  }
  data: {
    patient: 'Johanna Jonsson',
    disease: 'Korsbandet avdraget',
    date_visit: '2014-01-13 11:29:22',
    patient_journal: 'The patient seems to...'
  }
}
```

**answer:**
```javascript
{
    id: 'smamaeLKAS'
}
```
#### GET ALL DOCUMENTS OF A USER FOR A SPECIFIC SCHEMA
Get all documents that corellates to a Schema for a user.
```javascript
URL: BASE_URL + '/users/' + :user '/schemas/' + :schema + '/documents/'
Method: [GET]
Content-Type: application/json 
Authorization: <DeveloperID, UserToken>
```
**answer:**
```javascript
Coming soon
```

#### GET A SPECIFIC DOCUMENT WITH ITS ID
Get a single document, by identifing it with its ID.
```javascript
URL: BASE_URL + '/users/' + :user '/schemas/' + :schema '/documents/' + :document
Method: [GET]
Content-Type: application/json 
Authorization: <DeveloperID, UserToken>
```
**answer:**
```javascript
Coming soon
```

#### LIST ALL SCHEMAS A USER HAS CORRELATING DOCUMENTS TO
Get a list of all schemas that a user has created correlating document(s) to.
```javascript
URL: BASE_URL + '/user/' + :user + '/schemas/'
Method: [GET]
Content-Type: application/json 
Authorization: <DeveloperID, UserToken>
```
**answer:**
```javascript
Coming soon
```

#### UPDATE A USERS EXISTING DOCUMENT
Update an existing document with new information or change previously created information.
```javascript
URL: BASE_URL + '/users/' + :user + '/schemas/' + :schema + '/documents/' + :document
Method: [PUT]
Content-Type: application/json 
Authorization: <DeveloperID, UserToken>
```

**body:**
```javascript
{
meta: {},
data: {} 
}
```

**answer:**
```javascript
Coming soon
```
#### DELETE A USERS DOCUMENT
Delete a created document
```javascript
URL: BASE_URL + '/users/' + :user + '/schemas/' + :schema + '/documents/' + :document
Method: [DELETE]
Content-Type: application/json 
Authorization:  <DeveloperID, UserToken>
```

### BLOB 
In BLOBs it is possible to encrypt and store large files. A BLOB consist of meta and filebin. The filebin is the file and should be in a base64 format, this will be encrypted in rest. Meta will not be encrypted and is used to identify them. BLOBs are children to documents. If you want to store sensitive information about the files this should be stored in the Document data.  


#### CREATE A NEW BLOB
```javascript
URL: BASE_URL + '/users/' + :user + '/schemas/' + :schema + '/documents/' + :document + '/blobs'
Method: [POST]
Content-Type: application/json 
Authorization:  <DeveloperID,UserToken>
```
**body structure**
```javascript
{
    meta: {
        imageNr: 14
    },
    filebin: 'adavaeSMAFKA..'
}
```
#### CHANGE AN EXISTING BLOB
```javascript
URL: BASE_URL + '/users/' + :user + '/schemas/' + :schema + '/documents/' + :document + '/blobs/' + :blob
Method: [PUT]
Content-Type: application/json 
Authorization:  <DeveloperID, UserToken>
```

**body structure** 
```javascript
{
    filebin: {avaSK..}
}
```

#### LIST ALL BLOBS OF A DOCUMENT
```javascript
URL: BASE_URL + '/users/' + :user + '/schemas/' + :schema + '/documents/' + :document + '/blobs/'
Method: [GET]
Content-Type: application/json 
Authorization:  <DeveloperID, UserToken>
```

#### GET A BLOB
```javascript
URL: BASE_URL + '/users/' + :user + '/schemas/' + :schema + '/documents/' + :document + '/blobs/' +:blob
Method: [GET]
Content-Type: application/json 
Authorization:  <DeveloperID, UserToken>
```

#### DELETE A BLOB
```javascript
URL: BASE_URL + '/users/' + :user + '/schemas/' + :schema + '/documents/' + :document + '/blobs/' + :blob
Method: [DELETE]
Content-Type: application/json 
Authorization:  <DeveloperID, UserToken>
```

## USERS 
Users can only be created and modified by you as a developer. Every users stored information is from the beginning separated from other users. To share information between users groups are used.

#### CREATE A NEW USER
```javascript
URL: BASE_URL + '/users/'
Method: [POST]
Content-Type: application/json 
Authorization: <DeveloperID, DeveloperToken>
```

**body:**
```javascript
Coming soon
```

**answer:**
```javascript
{
    userID: 'nfalnaSNama..'
}
```

#### LIST ALL USERS
Get a list of all users.
```javascript
URL: BASE_URL + '/users/'
Method: [GET]
Content-Type: application/json 
Authorization:  <DeveloperID, DeveloperToken>
```

#### DELETE A USER
Delete a user, all the users previously stored information will be deleted as well. 
```javascript
URL: BASE_URL + '/users/' + :user
Method: [DELETE]
Content-Type: application/json 
Authorization: <DeveloperID, DeveloperToken>
```

## GROUPS & PERMISSIONS
Groups handle permission to specific Documents and BLOBs between users. A group consist of members and owners. Members of a group has given permission to owners to access their information. The Documents and BLOBs that permission is given to is defined by the SchemaIDs of the Group. 

#### CREATE A NEW GROUP
Create a group
```javascript
URL: BASE_URL + '/groups/'
Method: [POST]
Content-Type: application/json 
Authorization: <DeveloperID, DeveloperToken>
```

**body:**
```javascript
Coming soon
```
#### LIST ALL GROUPS
```javascript
URL: BASE_URL + '/groups/'
Method: [GET]
Content-Type: application/json 
Authorization: <DeveloperID, DeveloperToken>
```
**answer:**
```javascript
Coming soon
```

#### LIST ALL OWNERS OF A GROUP
```javascript
URL: BASE_URL +  '/groups/' + :group + '/owners/'
Method: [GET]
Content-Type: application/json 
Authorization: <DeveloperID, UserToken> (if owner) 
```
#### LIST ALL MEMBERS OF A GROUP
```javascript
URL: BASE_URL +  /groups/:group/members
Method: [GET]
Content-Type: application/json 
Authorization:  <DeveloperID, UserToken> (if owner) 
```

#### DELETE A GROUP
```javascript
URL: BASE_URL + '/groups/' + :group
Method: [DELETE]
Content-Type: application/json 
Authorization: <DeveloperID, DeveloperToken>
```
**answer:**
```javascript
Coming soon
```

#### OWNERS
A group owner can access all the Documents shared by the members in the group. A group can have one or many owners.

##### GIVE A USER OWNER PERMISSION
Add a user as owner of a group and give them permission to access the members Documents.
```javascript
URL: BASE_URL +  '/groups/' + :group + '/owners/'
Method: [POST]
Content-Type: application/json 
Authorization: <DeveloperID, DeveloperToken>
```

**body**
```javascript
{
    userID: 'VasvMSA..'
}
```



##### LIST ALL GROUPS A USER IS OWNER IN
Get all groups a user is owner in. 
```javascript
URL: BASE_URL +  '/users/' + :user + '/ownergroups/'
Method: [GET]
Content-Type: application/json 
Authorization: <DeveloperID, UserToken>
```
##### GET GROUP INFORMATION
Get information about a group and which Schemas it gives access to. 
```javascript
URL: BASE_URL +  '/users/' + :user + '/ownergroups/' + :group
Method: [GET]
Content-Type: application/json 
Authorization: <DeveloperID, UserToken>
```
##### REMOVE A OWNERS PERMISSION
Remove a user as owner from a group.
```javascript
URL: BASE_URL +  '/groups/' + :group + '/owners/' + :user
Method: [DELETE]
Content-Type: application/json 
Authorization: <DeveloperID, DeveloperToken>
```

##### ACCESS MEMBERS DATA
A owner access members data in the same way as the user.
```javascript
URL: BASE_URL +  '/users/' + :memberuser + '/schemas/' + :schema + '/documents/' + :document
Method: [GET]
Content-Type: application/json 
Authorization: <DeveloperID, UserToken>
```

#### MEMBERS 
A member of a group is a user which share information to the owner/owners of the group. 

#### ADD USER AS A MEMBER TO AN EXISTING GROUP
Add user as a member to an existing group.
```javascript
URL: BASE_URL +  '/groups/' + :group + '/members/'
Method: [POST]
Content-Type: application/json 
Authorization: <DeveloperID, UserToken>
```
#### LIST ALL GROUPS A USER IS MEMBER IN 
Get all the groups that a user is member in.
```javascript
URL: BASE_URL +  '/users/' + :user + '/membergroups/'
Method: [GET]
Content-Type: application/json 
Authorization: <DeveloperID, UserToken>
```
#### REMOVE A USERS MEMBERSHIP
Removes a user from a group.
```javascript
URL: BASE_URL +  '/groups/' + :group + '/members/' + :user
Method: [DELETE]
Content-Type: application/json 
Authorization: <DeveloperID, UserToken>
```

## SEARCH
To avoid costly searches over encrypted information a layered approach is used, where each level limits the amount of encrypted information that needs to be decrypted. Searches can be made over: 
+ Documents
    + Meta
    + Data
+ BLOBs
    + Meta  

The Schema is utilized automatically in all searches to prevent unnecessary decryptions. The different elements in a search is:  
+ Span - The data which the search should be made over
+ Layered Search
+ Query structure


A search can be made over :
##### A USERS OWN INFORMATION 
#

```javascript
URL: BASE_URL +  '/users/' + :user + '/search/'
Method: [POST]
Content-Type: application/json 
Authorization: <DeveloperID, UserToken>
```

##### ALL DOCUMETS OF A SCHEMA
#
This search should not be requested by users since this may require them to send sensitive information through your backend.  
```javascript
URL: BASE_URL +  '/schemas/' + :schema + '/doucmentSearch/'
Method: [POST]
Content-Type: application/json 
Authorization: <DeveloperID, DeveloperToken>
```

##### ALL MEMBERS INFORMATION THAT IS LINKED TO A SPECIFIC GROUP
#
```javascript
URL: BASE_URL +  'groups/' + :group + '/search'
Method: [POST]
Content-Type: application/json 
Authorization: <DeveloperID, UserToken>
```

### SPAN
In the Span it is possible to decrease the amount of data that the search should include. This is done by letting either of these attributes be false:
+ **documentMeta:** boolean - standardvalue false
+ **documentData:** boolean - standardvalue false
+ **blobMeta:** boolean - standardvalue false

To prevent mistakes were huge dataset is searched over these attributes could be added.
+ **maxCountDataDocument:** number - The maximum nr of encrypted documents/blobs which will be decrypted. If higher the search will not initiate. Standardvalue is 1000. 
+ **maxSpanDataSize:** number (mb) The maximum amount of encrypted documents/blobs which will be decrypted. If higher the search will not initiate. Standardvalue is 1 (mb).

#### QUERY 
The query/queries search operators:
```javasript
$and: {a: 5}           // AND (a = 5)
$or: [{a: 5}, {a: 6}]  // (a = 5 OR a = 6)
$eq: 5,                 // id == 5
$gt: 6,                // id > 6
$gte: 6,               // id >= 6
$lt: 10,               // id < 10
$lte: 10,              // id <= 10
$ne: 20,               // id != 20
$between: [6, 10],     // BETWEEN 6 AND 10
$notBetween: [11, 15], // NOT BETWEEN 11 AND 15
$in: [1, 2],           // IN [1, 2]
$notIn: [1, 2],        // NOT IN [1, 2]
$like: '%hat',         // LIKE '%hat'
$notLike: '%hat'       // NOT LIKE '%hat'
$iLike: '%hat'         // ILIKE '%hat' (case insensitive)
```

Below is some examples on the query search combination/structure
```javasript
query: {
  visitNr: {
    $or: {
      $lt: 20,
      $eq: null
    }
  }
}
// rank < 20 OR rank IS NULL

query: {
  createdAt: {
    $lt: Calendar.getTimeInMillis(),
    $gt: Calendar.getTimeInMillis() - 24 * 60 * 60 * 1000
  }
}
// createdAt < [time in milli ] AND createdAt > [time in milli]

query: {
  $or: [
    {
      disease: {
        $like: 'Knee%'
      }
    },
    {
      Physician: {
        $like: '%Carl G%'
      }
    }
  ]
}
```


#### LAYERED SEARCH APPROACH
The Layered search approach is built to first go through the meta and identify which Documents that fulfills specific criterias. Only these Documents is then decrypted and searched. For a Blob to be included in the answer its parent Document data needs to fulfill the criterias set in the encrypted data layer. 

Another layer that is possible to add and usefull when searching over several Schemas is the schemaQuery. This will go through the Schema and exclude all of the Documents with a Schema that does not include the right keys.

A finished search body can in the end look like and should be structured as the example below:
**body**
```javasript
{ 
      span: {
        DocumentMeta: true,
        DocumentData: true,
        maxSizeDataSearch: 0.1
        },
      metaQuery: {
        hospital: 'Storsjukhuset',
        physician: 'Adam Torkelsson'
        },
      dataQuery: {
        hospital: 'Storsjukhuset',
        disease: 'Knäled',
        $or: [
            {Physician: { $like: '%Adam T%'}},
            {age: 25}
            ]
        }
    }
```

**Answer**
```javascript
result: 'success', 
data: [{
    schemaID: 'vakaa'
    documentID: 'favajk'
    blobID: null
    userID: 'vmaafl'
},
{
    schemaID: 'vvmkaE',
    documentID: 'caavWH',
    blobID: 'cAWJN',
    userID: 'ASNh'
}
]
```

##### META LAYER
By adding a meta query you can further on limit the amount of searches required to be done over encrypted information. This query is only runned over the meta stored in Documents and BLOBs. After this layer the search span will only consist of information which correlates to this data. The metaQuery is structured as seen below: 
```javasript
 metaQuery: {
    hospital: 'Storsjukhuset',
    physician: 'Adam Torkelsson'
    }
```

##### THE ENCRYPTED DATA LAYER
The encrypted data layer is the criteria set for the data within the Document. This is set by adding a dataQuery structured as seen below:

```javasript
 dataQuery: {
            hospital: 'Storsjukhuset',
            disease: 'Knäled',
            $or: [
                {Physician: { $like: '%Adam T%'}},
                {age: 25}
                ]
            ]
            
        }
    }
```
